import React from "react";

// A loadingComponent for <Experience>.
//
// The SDK default hides the baseline for up to 5 seconds while the profile
// resolves, which leaves a hole where the content should be. These pages are
// statically generated, so the baseline is already in the delivered HTML —
// showing it immediately and letting a matched variant replace it trades a
// possible swap for no layout shift at all.
//
// Experience calls this with the baseline props plus component, passthroughProps
// and experiences, so those three are peeled off before rendering.
const RenderBaselineWhileLoading = ({
  component: Component,
  passthroughProps,
  experiences,
  ...baseline
}) => {
  const baselineContent = <Component {...baseline} {...passthroughProps} />;

  if (process.env.NODE_ENV === "production") {
    return baselineContent;
  }

  // Rendering the baseline makes "still resolving" and "resolved to the
  // baseline" pixel-identical, so a selection that never completes — or one
  // silently overridden by a plugin — looks exactly like working software.
  // Outline rather than border, and an absolute label, so nothing reflows and
  // the dev view still matches production layout.
  return (
    <div
      data-nt-state="resolving"
      className="relative outline-dashed outline-2 outline-offset-[-2px] outline-accent/40"
    >
      <span className="absolute right-0 top-0 z-10 bg-accent px-2 py-[2px] font-archivo text-[10px] font-semibold uppercase tracking-[0.1em] text-bg">
        Resolving variant
      </span>
      {baselineContent}
    </div>
  );
};

export default RenderBaselineWhileLoading;
