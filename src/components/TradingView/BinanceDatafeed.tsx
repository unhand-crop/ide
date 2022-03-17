import request from '../../utils/request';
import configs from "@/configs";

interface BinanceDatafeed {
    super: any,
    binanceHost: any,
    debug: any,
    symbols: any,
}

class BinanceDatafeed {

    constructor(options: any) {
        this.binanceHost = options.datafeedUrl;
        this.debug = options.debug || false;
        this.symbols = null;
    }

    binanceServerTime() {
        return request.get(this.binanceHost + '/time', {})
    }

    binanceSymbols() {
        return request.get(this.binanceHost + '/symbol_info?group=123', {})
    }

    binanceKlines(symbol: string, interval: string, startTime: string, endTime: string, limit: string) {
        const url = `${this.binanceHost}/history?symbol=${symbol}&interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`;
        return request.get(url, {})
    }

    async onReady(callback: any) {
        try {
            const res = await this.binanceSymbols();
            console.log('res', res);

            const { symbol = [] } = res;
            this.symbols = [...symbol];
            console.log(this.symbols);
            callback({
                exchange: [
                    {
                        desc: "",
                        name: "All Exchanges",
                        value: "",
                    },
                    {
                        desc: "Binance",
                        name: "Binance",
                        value: "Binance",
                    }
                ],
                supported_resolutions: [
                    '1', '3', '5', '15', '30', '60', '120', '240', '360', '480', '720', '1D', '3D', '1W', '1M'
                ],
                supports_group_request: false,
                supports_marks: false,
                supports_timescale_marks: false,
                supports_time: true,
            })
        } catch (e) {
            this.debug && console.error(e);
        }
    }

    searchSymbols(userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) {
        userInput = userInput.toUpperCase()
        onResultReadyCallback(
            this.symbols.filter((symbol: any) => {
                return symbol.symbol.indexOf(userInput) >= 0
            }).map((symbol: any) => {
                return {
                    symbol: symbol.symbol,
                    full_name: symbol.symbol,
                    description: symbol.baseAsset + ' / ' + symbol.quoteAsset,
                    ticker: symbol.symbol,
                    //exchange: 'Binance',
                    //type: 'crypto'
                }
            })
        )
    }

    resolveSymbol(symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) {
        try {
            console.log(this.symbols);
            const as: IArguments = arguments;
            this.debug && console.log('👉 resolveSymbol:', symbolName)
            const comps = symbolName.split(':')
            symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase()
            function pricescale(symbol: any) {
                for (let filter of symbol.filters) {
                    if (filter.filterType == 'PRICE_FILTER') {
                        return Math.round(1 / parseFloat(filter.tickSize))
                    }
                }
                return 1
            }
            for (let symbol of this.symbols) {
                if (symbol.symbol == symbolName) {
                    setTimeout(() => {
                        onSymbolResolvedCallback({
                            name: symbol.symbol,
                            description: symbol.baseAsset + ' / ' + symbol.quoteAsset,
                            ticker: symbol.symbol,
                            //exchange: 'Binance',
                            //listed_exchange: 'Binance',
                            //type: 'crypto',
                            session: '24x7',
                            minmov: 1,
                            pricescale: pricescale(symbol),
                            timezone: 'UTC',
                            has_intraday: true,
                            has_daily: true,
                            has_weekly_and_monthly: true,
                            currency_code: symbol.quoteAsset
                        })
                    }, 0)
                    return
                }
            }
        } catch (e) {
            console.log(e);
            onResolveErrorCallback('not found')
        }
    }

    getBars(symbolInfo: any, resolution: string, from: any, to: any, onHistoryCallback: any, onErrorCallback: any, firstDataRequest: any) {
        if (this.debug) {
            console.log('👉 getBars:', symbolInfo.name, resolution)
            console.log('First:', firstDataRequest)
            console.log('From:', from, '(' + new Date(from * 1000).toUTCString() + ')')
            console.log('To:  ', to, '(' + new Date(to * 1000).toUTCString() + ')')
        }

        const interval = {
            '1': '1m',
            '3': '3m',
            '5': '5m',
            '15': '15m',
            '30': '30m',
            '60': '1h',
            '120': '2h',
            '240': '4h',
            '360': '6h',
            '480': '8h',
            '720': '12h',
            'D': '1d',
            '1D': '1d',
            '3D': '3d',
            'W': '1w',
            '1W': '1w',
            'M': '1M',
            '1M': '1M',
        }[resolution]

        if (!interval) {
            onErrorCallback('Invalid interval')
        }

        let totalKlines: any = [];

        const finishKlines = () => {
            if (this.debug) {
                console.log('📊:', totalKlines.length)
            }

            if (totalKlines.length == 0) {
                onHistoryCallback([], { noData: true })
            } else {
                onHistoryCallback(totalKlines.map((kline: any) => {
                    return {
                        time: kline[0],
                        close: parseFloat(kline[4]),
                        open: parseFloat(kline[1]),
                        high: parseFloat(kline[2]),
                        low: parseFloat(kline[3]),
                        volume: parseFloat(kline[5])
                    }
                }), {
                    noData: false
                })
            }
        }

        const getKlines = async (from: any, to: any, limit?: any) => {
            try {
                if (!limit) limit = 500;
                const klines = await this.binanceKlines(symbolInfo.name, interval, from, to, limit);
                totalKlines = totalKlines.concat(klines)
                if (klines.length == 500) {
                    from = klines[klines.length - 1][0] + 1
                    getKlines(from, to)
                } else {
                    finishKlines()
                }
            } catch (e) {
                this.debug && console.error(e);
                onErrorCallback('Some problem')
            }


        }

        from *= 1000
        to *= 1000

        getKlines(from, to)
    }

    subscribeBars(symbolInfo: any, resolution: any, onRealtimeCallback: any, subscriberUID: any, onResetCacheNeededCallback: any) {
        this.debug && console.log('👉 subscribeBars:', subscriberUID)
    }

    unsubscribeBars(subscriberUID: any) {
        this.debug && console.log('👉 unsubscribeBars:', subscriberUID)
    }

    getServerTime(callback: any) {
        this.binanceServerTime().then(time => {
            callback(Math.floor(time / 1000))
        }).catch(err => {
            console.error(err)
        })
    }
}

export default BinanceDatafeed;