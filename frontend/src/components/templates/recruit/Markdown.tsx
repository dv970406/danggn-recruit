import Image from "next/image";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

interface IMarkdown {
  content: string;
}

// /recruit/:recruitPostId
// 채용 정보를 설명하는 Markdown Template
const Markdown = ({ content }: IMarkdown) => {
  return (
    <section>
      <ReactMarkdown
        className="prose lg:prose-xl"
        remarkPlugins={[remarkGfm]}
        components={{
          //   code({ node, inline, className, children, ...props }) { return ''},
          img: (image) => (
            <Image
              className="object-cover w-full"
              src={image.src || ""}
              alt={image.alt || ""}
              width={500}
              height={500}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
};

export default Markdown;
