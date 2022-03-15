---
to: <%= name %>/main.py
---
#!/usr/bin/python3
 
from AlgorithmImports import *


class CustomAlgorithm(QCAlgorithm):
    def Initialize(self):
        self.SetStartDate(2018, 1, 1)  # Set Start Date
        self.SetEndDate(2022, 2, 20)  # Set End Date
        self.SetCash(100000)  # Set Strategy Cash

        self.SetCash("USD", 100000, 0.3)
        self.SetCash("BTC", 100000, 0.2)

        self.SetBrokerageModel(BrokerageName.Binance, AccountType.Cash)
        self.AddCrypto("BTCUSDT", Resolution.Hour)

    def OnData(self, data):
        if not self.Portfolio.Invested:
            self.SetHoldings("BTCUSDT", 1)

