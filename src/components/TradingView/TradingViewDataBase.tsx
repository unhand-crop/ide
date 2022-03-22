import React, { PureComponent } from 'react';
import { widget as Widget } from "./Chart/charting_library.esm";


interface Iprops {
    tradingData?: any;
    on?: any;
}


export default class TradingViewDataBase extends PureComponent<Iprops> {
    constructor(props: Iprops) {
        super(props)
    }

    currency1 = "USD";
    currency2 = "BTC";
    saved_chart: any = null;
    chart: any = null;
    feed: any = null;
    last_price = 1234.2365;

    componentDidMount() {
        const that = this;
        that.feed = that.createFeed();
        that.chart = new Widget({
            fullscreen: false,
            autosize: true,
            symbol: that.currency1 + ":" + that.currency2,
            container_id: "TradingViewRef",
            datafeed: that.feed,
            locale: "en",
            timezone: "Etc/UTC",
            debug: false,
            interval: "60",
            height: 400,
            disabled_features: ["header_symbol_search", "header_compare"],
        });
    }

    createFeed = () => {
        let that = this;
        interface Datafeed {
            DataPulseUpdater: any;
        }
        let Datafeed: any = {};

        Datafeed.DataPulseUpdater = function (datafeed: any, updateFrequency: any) {
            this._datafeed = datafeed;
            this._subscribers = {};

            this._requestsPending = 0;
            var that = this;

            var update = function () {
                if (that._requestsPending > 0) {
                    return;
                }

                for (var listenerGUID in that._subscribers) {
                    var subscriptionRecord = that._subscribers[listenerGUID];
                    var resolution = subscriptionRecord.resolution;
                    const num = String(((new Date().valueOf()) / 1000));
                    var datesRangeRight = parseInt(num);

                    //	BEWARE: please note we really need 2 bars, not the only last one
                    //	see the explanation below. `10` is the `large enough` value to work around holidays
                    var datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);

                    that._requestsPending++;

                    (function (_subscriptionRecord) { // eslint-disable-line
                        that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function (bars: any) {
                            that._requestsPending--;

                            //	means the subscription was cancelled while waiting for data
                            if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                                return;
                            }

                            if (bars.length === 0) {
                                return;
                            }

                            var lastBar = bars[bars.length - 1];
                            if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
                                return;
                            }

                            var subscribers = _subscriptionRecord.listeners;

                            //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
                            //	_subscriptionRecord.lastBarTime = NaN
                            var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;

                            //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
                            //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
                            if (isNewBar) {
                                if (bars.length < 2) {
                                    throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
                                }

                                var previousBar = bars[bars.length - 2];
                                for (var i = 0; i < subscribers.length; ++i) {
                                    subscribers[i](previousBar);
                                }
                            }

                            _subscriptionRecord.lastBarTime = lastBar.time;

                            for (var i = 0; i < subscribers.length; ++i) {
                                subscribers[i](lastBar);
                            }
                        },

                            //	on error
                            function () {
                                that._requestsPending--;
                            });
                    })(subscriptionRecord);
                }
            };

            if (typeof updateFrequency != 'undefined' && updateFrequency > 0) {
                setInterval(update, updateFrequency);
            }
        };

        Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function (resolution: any, requiredPeriodsCount: any) {
            var daysCount = 0;

            if (resolution === 'D') {
                daysCount = requiredPeriodsCount;
            } else if (resolution === 'M') {
                daysCount = 31 * requiredPeriodsCount;
            } else if (resolution === 'W') {
                daysCount = 7 * requiredPeriodsCount;
            } else {
                daysCount = requiredPeriodsCount * resolution / (24 * 60);
            }
            return daysCount * 24 * 60 * 60;
        };

        Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function (symbolInfo: any, resolution: any, newDataCallback: any, listenerGUID: any) {
            if (!this._subscribers.hasOwnProperty(listenerGUID)) {
                this._subscribers[listenerGUID] = {
                    symbolInfo: symbolInfo,
                    resolution: resolution,
                    lastBarTime: NaN,
                    listeners: []
                };
            }
            this._subscribers[listenerGUID].listeners.push(newDataCallback);
        };

        Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function (listenerGUID: any) {
            delete this._subscribers[listenerGUID];
        };

        Datafeed.Container = function (updateFrequency: any) {
            this._configuration = {
                supports_search: false,
                supports_group_request: false,
                supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
                supports_marks: false,
                supports_timescale_marks: false,
                exchanges: ['myExchange']
            };

            this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);

            this._enableLogging = true;
            this._callbacks = {};

            this._initializationFinished = true;
        };

        Datafeed.Container.prototype._logMessage = function (message: any) {
            if (this._enableLogging) {
                var now = new Date();
            }
        };

        Datafeed.Container.prototype.on = function (event: any, callback: any) {
            if (!this._callbacks.hasOwnProperty(event)) {
                this._callbacks[event] = [];
            }

            this._callbacks[event].push(callback);
            return this;
        };

        Datafeed.Container.prototype.onReady = function (callback: any) {
            let that = this;
            if (this._configuration) {
                callback(that._configuration);
            }
            else {
                this.on('configuration_ready', function () {
                    callback(that._configuration);
                });
            }
        };

        Datafeed.Container.prototype.resolveSymbol = function (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) {
            Promise.resolve().then(() => {
                function adjustScale() {
                    if (that.last_price > 1000)
                        return 100;
                    else
                        return 100000000;
                }
                onSymbolResolvedCallback({
                    "name": that.currency1 + ":" + that.currency2,
                    "timezone": "Europe/Warsaw",
                    "pricescale": adjustScale(),
                    "minmov": 1,
                    "minmov2": 0,
                    "ticker": that.currency1 + ":" + that.currency2,
                    "description": "",
                    "session": "24x7",
                    "type": "bitcoin",
                    "exchange-traded": "myExchange",
                    "exchange-listed": "myExchange",
                    "has_intraday": true,
                    "intraday_multipliers": ['60'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                    "has_weekly_and_monthly": false,
                    "has_no_volume": false,
                    "regular_session": "24x7"
                });
            })
        };

        Datafeed.Container.prototype.getBars = function (symbolInfo: any, resolution: any, rangeStartDate: number, onHistoryCallback: any, onDataCallback: any, onErrorCallback: any) {
            if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
                throw new Error('Got a JS time instead of Unix one.');
            }
            onHistoryCallback([], { noData: true });
        };

        Datafeed.Container.prototype.subscribeBars = (symbolInfo: any, resolution: any, onRealtimeCallback: any, listenerGUID: any, onResetCacheNeededCallback: any) => {
            this.props.tradingData.map(function (bar: any) {
                onRealtimeCallback(bar)
            });
        };

        Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID: any) {
            this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
        };

        return new Datafeed.Container;
    }

    render() {
        return <div id="TradingViewRef" key="key" style={{ height: 400 }}></div>
    }

}
