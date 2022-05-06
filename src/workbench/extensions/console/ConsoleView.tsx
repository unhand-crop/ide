import "xterm/css/xterm.css";

import React, { useEffect, useRef } from "react";

import { FitAddon } from "xterm-addon-fit";
import ResizeObserver from "react-resize-observer";
import { Terminal } from "xterm";
import configs from "@/configs";
import styles from "./ConsoleView.module.scss";
import useConsoleModel from "@/models/console";
import { useReactive } from "ahooks";

export default () => {
  const { model } = useConsoleModel();

  const ref = useRef(null);
  const termRef = useRef(null);
  const fitAddonRef = useRef(null);

  const state = useReactive({
    termHeight: 0,
  });

  useEffect(() => {
    if (!!ref.current && !termRef.current) {
      termRef.current = new Terminal({
        fontFamily: `'Fira Mono', monospace`,
        fontSize: 14,
        convertEol: false,
        cursorBlink: true,
        theme: {
          foreground: "#c5c8c6",
          background: "#161719",
          cursor: "#d0d0d0",

          black: "#000000",
          brightBlack: "#000000",

          red: "#fd5ff1",
          brightRed: "#fd5ff1",

          green: "#87c38a",
          brightGreen: "#94fa36",

          yellow: "#ffd7b1",
          brightYellow: "#f5ffa8",

          blue: "#85befd",
          brightBlue: "#96cbfe",

          magenta: "#b9b6fc",
          brightMagenta: "#b9b6fc",

          cyan: "#85befd",
          brightCyan: "#85befd",

          white: "#e0e0e0",
          brightWhite: "#e0e0e0",
        },
      });
      fitAddonRef.current = new FitAddon();
      termRef.current.loadAddon(fitAddonRef.current);
      termRef.current.open(ref.current);
      termRef.current.writeln(`${configs.appName} v${VERSION}`);
      fitAddonRef?.current.fit();
    }
  }, [ref.current, termRef.current]);

  useEffect(() => {
    if (!!termRef?.current && model.outputs) {
      const message = model.outputs[model.outputs?.length - 1];
      if (message) {
        termRef?.current.writeln(
          model.outputs[model.outputs?.length - 1] ?? ""
        );
        termRef?.current.scrollToBottom();
      }
    }
  }, [termRef?.current, model.outputs?.length]);

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ height: state.termHeight }}
    >
      <ResizeObserver
        onResize={(rect) => {
          state.termHeight = (
            document.querySelector(".mo-panel__container") as HTMLElement
          )?.offsetHeight;
          fitAddonRef.current?.fit();
        }}
        onPosition={(rect) => {
          state.termHeight = (
            document.querySelector(".mo-panel__container") as HTMLElement
          )?.offsetHeight;
          fitAddonRef.current?.fit();
        }}
      />
    </div>
  );
};
