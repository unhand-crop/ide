import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from "./Chart/charting_library";
import React, { useEffect, useRef } from "react";

import { widget as Widget } from "./Chart/charting_library.esm";

interface TradingViewProps {
  options: {
    symbol: ChartingLibraryWidgetOptions["symbol"];
    interval: ChartingLibraryWidgetOptions["interval"];

    // BEWARE: no trailing slash is expected in feed URL
    datafeedUrl: string;
    chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
    chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
    clientId: ChartingLibraryWidgetOptions["client_id"];
    userId: ChartingLibraryWidgetOptions["user_id"];
    fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
    autosize: ChartingLibraryWidgetOptions["autosize"];
    studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
    locale?: ChartingLibraryWidgetOptions["locale"];
    theme?: ChartingLibraryWidgetOptions["theme"];

    height?: ChartingLibraryWidgetOptions["height"];
    width?: ChartingLibraryWidgetOptions["width"];
  };
}

const TradingView = (props: TradingViewProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tv: IChartingLibraryWidget | null;
    if (ref.current) {
      tv = new Widget({
        ...(props.options ?? {}),
        container: ref.current,
        libraryPath: "/charting_library/",
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
          props.options.datafeedUrl
        ),
      });

      tv.onChartReady(() => {});
    }

    return () => {
      if (tv) {
        tv.remove();
        tv = null;
      }
    };
  }, [ref.current]);

  return <div ref={ref} style={{ height: props.options.height }}></div>;
};

export default TradingView;
