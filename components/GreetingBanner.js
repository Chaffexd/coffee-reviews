import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Experience } from "@ninetailed/experience.js-next";
import { bannerRichTextOptions } from "@/lib/richTextOptions";
import { mapEntryExperiences } from "@/lib/experiences";
import ProfileValue from "@/components/ProfileValue";
import RenderBaselineWhileLoading from "@/components/RenderBaselineWhileLoading";

const FALLBACK_CITY = "there";

// Props in, JSX out. <Experience> renders this with either the baseline entry's
// fields or a variant's, so it must not read from anywhere else — whatever it
// receives is the resolved variant.
export const GreetingBannerContent = ({ enabled, message }) => {
  if (enabled === false) {
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

// Keeping the built-in copy as a fallback means the strip never renders empty if
// the entry is unpublished or the fetch comes back without it.
const GreetingBanner = ({ banner }) => {
  if (!banner) {
    return <GreetingBannerContent />;
  }

  return (
    <Experience
      {...banner.fields}
      id={banner.sys.id}
      component={GreetingBannerContent}
      experiences={mapEntryExperiences(banner)}
      loadingComponent={RenderBaselineWhileLoading}
    />
  );
};

export default GreetingBanner;
