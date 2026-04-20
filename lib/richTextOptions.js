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
      const fields = node.data.target.fields;
      if (fields.images) {
        const count = fields.images.length;
        const gridClass =
          count === 1 ? "flex justify-center" :
          count === 2 ? "grid grid-cols-2 gap-4" :
          "grid grid-cols-2 sm:grid-cols-3 gap-4";
        return (
          <div className="my-12">
            {fields.locationTitle && (
              <h3 className="font-bold text-xl mb-4">{fields.locationTitle}</h3>
            )}
            <div className={gridClass}>
              {fields.images.map((img) => (
                <Image
                  key={img.sys.id}
                  src={`https:${img.fields.image.fields.file.url}`}
                  alt={img.fields.imageTitle || img.fields.image.fields.description || ""}
                  width={count === 1 ? 800 : 400}
                  height={count === 1 ? 600 : 300}
                  className={count === 1 ? "w-full max-w-2xl h-auto rounded-lg" : "w-full h-auto object-cover rounded-lg"}
                />
              ))}
            </div>
          </div>
        );
      } else if (fields.image) {
        return (
          <Image
            src={`https:${fields.image.fields.file.url}`}
            alt={fields.altText}
            width={200}
            height={200}
            className="w-[300px] my-12"
          />
        );
      } else {
        return (
          <video
            src={`https:${fields.video.fields.file.url}`}
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
