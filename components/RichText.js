import React from "react";
import { richTextOptions } from "@/lib/richTextOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const RichText = ({ pageInformation }) => {
  return (
    <>
      {pageInformation && documentToReactComponents(pageInformation, richTextOptions)}
    </>
  );
};

export default RichText;
