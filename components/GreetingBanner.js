import React from "react";
import { useProfile } from "@ninetailed/experience.js-next";

const FALLBACK_CITY = "there";

// This reads the visitor profile directly rather than using the SDK's
// <MergeTag>, which returns null until the profile resolves. On a statically
// generated page that would paint "Hello , we're glad you are here" on first
// load. Holding the fallback word keeps the sentence whole and the strip a
// stable height, so nothing shifts when the real city arrives.
const GreetingBanner = () => {
  const { profile, loading } = useProfile();
  const city = (!loading && profile?.location?.city) || FALLBACK_CITY;

  return (
    <div className="w-full bg-accent text-bg border-b-2 border-divider">
      <p
        data-testid="greeting"
        className="max-w-[1200px] mx-auto px-[clamp(24px,4vw,56px)] py-2 text-[13px]"
      >
        {`Hello ${city}, we're glad you are here`}
      </p>
    </div>
  );
};

export default GreetingBanner;
