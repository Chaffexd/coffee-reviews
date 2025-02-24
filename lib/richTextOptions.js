import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

export const richTextOptions = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return <h1 className="font-bold text-5xl mb-4">{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 className="text-3xl mb-4">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="font-bold text-xl my-4">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="font-bold text-lg my-4 ">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return <h5 className="font-bold text-lg my-4 ">{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (node, children) => {
      return <h6 className="font-bold text-lg my-4">{children}</h6>;
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul className="list-disc  list-inside">{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <li className="my-4">{children}</li>;
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return <ol className="my-4 list-inside list-decimal">{children}</ol>;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="my-4 inline text-xl">{children}</p>;
    },
    [BLOCKS.TABLE]: (node, children) => {
      return (
        <table>
          <tbody>{children}</tbody>
        </table>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.title}
          width={200}
          height={200}
          className="w-[300px] my-12"
        />
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.fields.image) {
        return (
          <Image
            src={`https:${node.data.target.fields.image.fields.file.url}`}
            alt={node.data.target.fields.altText}
            width={200}
            height={200}
            className="w-[300px] my-12"
          />
        );
      } else {
        return (
          <video
            src={`https:${node.data.target.fields.video.fields.file.url}`}
            controls
            className="rounded-xl mb-8 hover:cursor-pointer w-full h-auto mt-8"
          />
        );
      }
    },
    [BLOCKS.QUOTE]: (node, children) => {
      return <blockquote className="border-l-4 border-gray-300 pl-4 text-gray-600 my-4">{children}</blockquote>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link
          target="_blank"
          href={node.data.uri}
          className="text-blue-600 hover:underline"
          style={{ wordWrap: "break-word" }}
        >
          {children}
        </Link>
      );
    },
  },
};
