import { ExperienceMapper } from "@ninetailed/experience.js-utils-contentful";

// <Experience> spreads the selected variant straight onto the component, and it
// spreads the baseline as `{...entry.fields, id}` — already flattened. But
// mapExperience passes variants through untouched, as whole Contentful entries
// ({id, metadata, sys, fields}), so a selected variant would hand the component
// undefined props and render nothing at all. Flattening variants to match the
// baseline's shape is what keeps the two interchangeable.
export const flattenVariant = (variant) => ({
  id: variant.sys.id,
  ...variant.fields,
});

// Unpublished experiences and variants arrive as unresolvable links, which
// .withoutUnresolvableLinks strips. isExperienceEntry drops whatever is left
// that does not validate, so a half-published experience degrades to the
// baseline rather than throwing.
export function mapEntryExperiences(entry) {
  return (entry?.fields?.nt_experiences || [])
    .filter(ExperienceMapper.isExperienceEntry)
    .map((experience) =>
      ExperienceMapper.mapCustomExperience(experience, flattenVariant),
    );
}
