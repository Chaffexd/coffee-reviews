import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const availableLocales = [
  { language: "English", locale: "en-GB" },
  { language: "English (US)", locale: "en-US" },
  { language: "German", locale: "de-DE" },
  { language: "French", locale: "fr-FR" },
  { language: "Japanese", locale: "ja-JP" },
  { language: "Chinese (TW)", locale: "zh-Hant-TW" },
  { language: "Korean", locale: "ko-KR" },
];

export default function LocaleDropdown() {
  const router = useRouter();
  // default locale is en-GB
  const [selectedLocale, setSelectedLocale] = useState("en-GB");

  const handleLocaleChange = (e) => {
    const newLocale = e.target.value;
    console.log("Redirecting to new locale =", newLocale)
    // update the locale based on selection, then push them to that locale
    setSelectedLocale(newLocale);
    router.push(`/${newLocale}/`, undefined, { locale: newLocale });
  };

  useEffect(() => {
    if (router.locale) {
      console.log("Router Locale =", router.locale)
      setSelectedLocale(router.locale)
    }
  }, [router.locale])

  return (
    <select
      value={selectedLocale}
      onChange={handleLocaleChange}
      className="border rounded px-2 py-1 hover:cursor-pointer"
    >
      {availableLocales.map((locale) => (
        <option key={locale.locale} value={locale.locale}>
          {locale.language}
        </option>
      ))}
    </select>
  );
}
