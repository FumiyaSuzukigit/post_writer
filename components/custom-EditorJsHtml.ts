import editorJsHtml from "editorjs-html";

const customParsers = [
  {
    type: "linkTool",
    parse: (block) => {
      return {
        type: block.type,
        data: block.data,
      };
    },
  },
];

const edjsParser = editorJsHtml(customParsers);

export default edjsParser;
