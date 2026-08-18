import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { bannerRichTextOptions } from "@/lib/richTextOptions";
import ProfileValue from "@/components/ProfileValue";

const FALLBACK_CITY = "there";

// The banner reads its copy from a greetingBanner entry when one is linked, and
// otherwise uses the wording below. Keeping the built-in copy means the strip
// never renders empty if the entry is unpublished or the fetch comes back
// without it.
const GreetingBanner = ({ banner }) => {
  const { enabled, message } = banner?.fields ?? {};

  if (banner && enabled === false) {
    return null;
  }

  return (
    <div className="w-full bg-accent text-bg border-b-2 border-divider">
      <p
        data-testid="greeting"
        className="max-w-[1200px] mx-auto px-[clamp(24px,4vw,56px)] py-2 text-[13px]"
      >
        {message ? (
          documentToReactComponents(message, bannerRichTextOptions)
        ) : (
          <>
            Hello <ProfileValue id="location.city" fallback={FALLBACK_CITY} />,
            we&apos;re glad you are here
          </>
        )}
      </p>
    </div>
  );
};

export default GreetingBanner;
