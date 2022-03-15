---
to: <%= name %>/main.py
---
#!/usr/bin/python3
 
from AlgorithmImports import *

### <summary>
### Basic algorithm using SetAccountCurrency
### </summary>
class CustomAlgorithm(QCAlgorithm):
    def Initialize(self):
        '''Initialise the data and resolution required, as well as the cash and start-end dates for your algorithm. All algorithms must initialized.'''

        self.SetStartDate(2018, 4, 4)  #Set Start Date
        self.SetEndDate(2019, 4, 4)    #Set End Date
        self.SetBrokerageModel(BrokerageName.Binance, AccountType.Cash)
        # Before setting any cash or adding a Security call SetAccountCurrency
        self.SetAccountCurrency("USDT")
        self.SetCash(100000)           #Set Strategy Cash

        self._btcEur = self.AddCrypto("BTCUSDT", Resolution.Hour, Market.Binance).Symbol

    def OnData(self, data):
        '''OnData event is the primary entry point for your algorithm. Each new data point will be pumped in here.

        Arguments:
            data: Slice object keyed by symbol containing the stock data
        '''
        if not self.Portfolio.Invested:
            self.SetHoldings(self._btcEur, 1)


