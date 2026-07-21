import React from "react";

const options = [
  { label: "All", value: "all", countKey: "all" },
  { label: "Asia", value: "asia", countKey: "asia" },
  { label: "Europe", value: "europe", countKey: "europe" },
  { label: "N. America", value: "north-america", countKey: "north-america" },
];

const RegionFilter = ({ handleFilter, counts = {}, active = "all" }) => {
  return (
    <div className="inline-flex border-2 border-divider rounded-none">
      {options.map((option) => {
        const isActive = active === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleFilter(option.value)}
            value={option.value}
            className={`px-3 py-[7px] text-[13px] font-semibold border-l border-divider first:border-l-0 ${
              isActive ? "bg-accent text-bg" : "bg-surface text-ink"
            }`}
          >
            {option.label} ({counts[option.countKey] ?? 0})
          </button>
        );
      })}
    </div>
  );
};

export default RegionFilter;
