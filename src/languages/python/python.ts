import { languages } from "monaco-editor";
import { GetApiTreeMethodsInfoOutPut } from "@/services/apiTree";

export const conf: languages.LanguageConfiguration = {
  comments: {
    lineComment: "#",
    blockComment: ["'''", "'''"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"', notIn: ["string"] },
    { open: "'", close: "'", notIn: ["string", "comment"] },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  onEnterRules: [
    {
      beforeText: new RegExp(
        "^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\\s*$"
      ),
      action: { indentAction: languages.IndentAction.Indent },
    },
  ],
  folding: {
    offSide: true,
    markers: {
      start: new RegExp("^\\s*#region\\b"),
      end: new RegExp("^\\s*#endregion\\b"),
    },
  },
};

export const language = <languages.IMonarchLanguage>{
  defaultToken: "",
  tokenPostfix: ".python",

  keywords: [
    // This section is the result of running
    // `for k in keyword.kwlist: print('  "' + k + '",')` in a Python REPL,
    // though note that the output from Python 3 is not a strict superset of the
    // output from Python 2.
    "False", // promoted to keyword.kwlist in Python 3
    "None", // promoted to keyword.kwlist in Python 3
    "True", // promoted to keyword.kwlist in Python 3
    "and",
    "as",
    "assert",
    "async", // new in Python 3
    "await", // new in Python 3
    "break",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "exec", // Python 2, but not 3.
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "nonlocal", // new in Python 3
    "not",
    "or",
    "pass",
    "print", // Python 2, but not 3.
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield",

    "int",
    "float",
    "long",
    "complex",
    "hex",

    "abs",
    "all",
    "any",
    "apply",
    "basestring",
    "bin",
    "bool",
    "buffer",
    "bytearray",
    "callable",
    "chr",
    "classmethod",
    "cmp",
    "coerce",
    "compile",
    "complex",
    "delattr",
    "dict",
    "dir",
    "divmod",
    "enumerate",
    "eval",
    "execfile",
    "file",
    "filter",
    "format",
    "frozenset",
    "getattr",
    "globals",
    "hasattr",
    "hash",
    "help",
    "id",
    "input",
    "intern",
    "isinstance",
    "issubclass",
    "iter",
    "len",
    "locals",
    "list",
    "map",
    "max",
    "memoryview",
    "min",
    "next",
    "object",
    "oct",
    "open",
    "ord",
    "pow",
    "print",
    "property",
    "reversed",
    "range",
    "raw_input",
    "reduce",
    "reload",
    "repr",
    "reversed",
    "round",
    "self",
    "set",
    "setattr",
    "slice",
    "sorted",
    "staticmethod",
    "str",
    "sum",
    "super",
    "tuple",
    "type",
    "unichr",
    "unicode",
    "vars",
    "xrange",
    "zip",

    "__dict__",
    "__methods__",
    "__members__",
    "__class__",
    "__bases__",
    "__name__",
    "__mro__",
    "__subclasses__",
    "__init__",
    "__import__",
  ],

  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.bracket" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
  ],

  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@numbers" },
      { include: "@strings" },

      [/[,:;]/, "delimiter"],
      [/[{}\[\]()]/, "@brackets"],

      [/@[a-zA-Z_]\w*/, "tag"],
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],
    ],

    // Deal with white space, including single and multi-line comments
    whitespace: [
      [/\s+/, "white"],
      [/(^#.*$)/, "comment"],
      [/'''/, "string", "@endDocString"],
      [/"""/, "string", "@endDblDocString"],
    ],
    endDocString: [
      [/[^']+/, "string"],
      [/\\'/, "string"],
      [/'''/, "string", "@popall"],
      [/'/, "string"],
    ],
    endDblDocString: [
      [/[^"]+/, "string"],
      [/\\"/, "string"],
      [/"""/, "string", "@popall"],
      [/"/, "string"],
    ],

    // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
    numbers: [
      [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, "number.hex"],
      [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, "number"],
    ],

    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [
      [/'$/, "string.escape", "@popall"],
      [/'/, "string.escape", "@stringBody"],
      [/"$/, "string.escape", "@popall"],
      [/"/, "string.escape", "@dblStringBody"],
    ],
    stringBody: [
      [/[^\\']+$/, "string", "@popall"],
      [/[^\\']+/, "string"],
      [/\\./, "string"],
      [/'/, "string.escape", "@popall"],
      [/\\$/, "string"],
    ],
    dblStringBody: [
      [/[^\\"]+$/, "string", "@popall"],
      [/[^\\"]+/, "string"],
      [/\\./, "string"],
      [/"/, "string.escape", "@popall"],
      [/\\$/, "string"],
    ],
  },
};

export const getApiSuggestions = (
  data: GetApiTreeMethodsInfoOutPut[],
  range: {
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
  }
) => {
  return data.map((item, index) => {
    const params = item.inParameters
      .map((param, idx) => "$" + `{${idx + 1}:${param.name}}`)
      .join(",");
    return {
      label: item.apiName,
      kind: languages.CompletionItemKind.Function,
      detail: item.shortApiName,
      documentation: item.description,
      filterText: item.shortApiName.toLowerCase(),
      sortText: "1000" + index + item.apiName,
      insertText: `${item.shortApiName}(${params})`,
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range,
    };
  });
};

export const getCompletionItemProvider = (
  data: GetApiTreeMethodsInfoOutPut[]
) =>
  <languages.CompletionItemProvider>{
    triggerCharacters: ["."],
    provideCompletionItems: async function (
      model,
      position,
      token,
      completionContext
    ) {
      const word = model.getWordUntilPosition(position);

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: languages.CompletionItem[] = [];

      const keywords: languages.CompletionItem[] = language.keywords.map(
        (keyword: string, index: number) => ({
          label: keyword,
          kind: languages.CompletionItemKind.Keyword,
          insertText: keyword,
          sortText: "10000" + index + 1 + keyword,
          filterText: keyword.toLowerCase(),
        })
      );

      const functions: languages.CompletionItem[] = []
        .concat(language.builtinFunctions)
        .concat(language.windowsFunctions)
        .concat(language.innerFunctions)
        .concat(language.otherFunctions)
        .filter(Boolean)
        .map((functionName: string, index: number) => ({
          label: functionName,
          kind: languages.CompletionItemKind.Function,
          insertText: functionName + "($1) ",
          sortText: "20000" + index + functionName,
          filterText: functionName.toLowerCase(),
          range,
        }));

      return {
        suggestions: suggestions
          .concat(keywords)
          .concat(functions)
          .concat(getApiSuggestions(data, range)),
      };
    },
  };
