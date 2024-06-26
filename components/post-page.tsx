import React from "react";
import { Post } from ".prisma/client";
import EditorRenderer from "./EditorRenderer";

interface PostPageProps {
  post: {
    id: Post["id"];
    title: string;
    content: any; // JSON形式のEditor.jsデータ
    published: boolean;
  };
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <EditorRenderer data={post.content} />
    </div>
  );
};

export default PostPage;
