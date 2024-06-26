import React from "react";
import customEdjsParser from "./custom-EditorJsHtml"; // カスタムパーサーをインポート
import LinkToolRenderer from "./LinkToolRenderer"; // カスタムLinkToolレンダラーをインポート

interface EditorRendererProps {
  data: any; // Editor.jsのデータ
}

const EditorRenderer: React.FC<EditorRendererProps> = ({ data }) => {
  const html = customEdjsParser.parse(data);

  return (
    <div className="prose lg:prose-xl">
      {data.blocks.map((block: any, index: number) => {
        if (block.type === "linkTool") {
          return <LinkToolRenderer key={index} data={block.data} />;
        } else {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: html[index] }}
            />
          );
        }
      })}
    </div>
  );
};

export default EditorRenderer;
