import React from "react";

const RegionFilter = ({ handleFilter }) => {
  return (
    <>
      <button
        className="bg-coffee-medium hover:bg-coffee-creamLight hover:text-coffee-medium text-coffee-creamLight p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
        onClick={() => handleFilter("all")}
        value={"all"}
      >
        All Reviews
      </button>
      <button
        className="bg-coffee-medium hover:bg-coffee-creamLight hover:text-coffee-medium text-coffee-creamLight  p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
        onClick={() => handleFilter("asia")}
        value={"asia"}
      >
        Asia
      </button>
      <button
        className="bg-coffee-medium hover:bg-coffee-creamLight hover:text-coffee-medium text-coffee-creamLight p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
        onClick={() => handleFilter("europe")}
        value={"europe"}
      >
        Europe
      </button>
      <button
        className="bg-coffee-medium hover:bg-coffee-creamLight hover:text-coffee-medium text-coffee-creamLight p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
        onClick={() => handleFilter("north-america")}
        value={"north-america"}
      >
        North America
      </button>
    </>
  );
};

export default RegionFilter;
