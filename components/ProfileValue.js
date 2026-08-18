import React from "react";
import { useProfile } from "@ninetailed/experience.js-next";

const readPath = (source, path) =>
  path
    .split(".")
    .reduce((value, key) => (value == null ? value : value[key]), source);

// Renders a single value from the visitor profile — city, country, a trait —
// addressed by dot path, the same way nt_mergetag entries are.
//
// This exists instead of the SDK's <MergeTag> because that component returns
// null until the profile resolves, and only applies its fallback afterwards.
// Used mid-sentence that paints "a flight from ." on every cold load. Holding
// the fallback until the real value arrives keeps the sentence readable
// throughout.
const ProfileValue = ({ id, fallback = "" }) => {
  const { profile, loading } = useProfile();
  const value = (!loading && readPath(profile, id)) || fallback;

  return value ? <>{value}</> : null;
};

export default ProfileValue;
