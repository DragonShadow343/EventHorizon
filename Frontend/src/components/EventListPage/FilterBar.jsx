import { useState } from "react";

const FilterBar = ({ className, onFilterChange }) => {
  const [selected, setSelected] = useState({
    dates: [],
    categories: [],
    ratings: []
  });

  const handleChange = (type, value) => {
    let updated;

    if (selected[type].includes(value)) {
      updated = selected[type].filter(v => v !== value);
    } else {
      updated = [...selected[type], value];
    }

    const newState = { ...selected, [type]: updated };
    setSelected(newState);

    if (onFilterChange) {
      onFilterChange(newState);
    }
  };

  return (
    <>
      <div className={`flex w-full flex-col items-start rounded-2xl bg-blue-200 p-6 text-black shadow-xl lg:w-60 ${className}`}>
        <h1 className={`text-2xl font-semibold`}>Filters</h1>
        <form className={'flex flex-col gap-4 mt-4'}>
          {/* Date filter options */}
          <label className={'font-semibold'}>Date:</label>
          <ul>
            <li><label><input type="checkbox" value="today" onChange={() => handleChange("dates", "today")} /> Today</label></li>
            <li><label><input type="checkbox" value="tomorrow" onChange={() => handleChange("dates", "tomorrow")} /> Tomorrow</label></li>
            <li><label><input type="checkbox" value="this-week" onChange={() => handleChange("dates", "this-week")} /> This Week</label></li>
            <li><label><input type="checkbox" value="this-month" onChange={() => handleChange("dates", "this-month")} /> This Month</label></li>
          </ul>
          
          {/* Category filter options */}
          <label className={'font-semibold'}>Category:</label>
          <ul>
            <li><label><input type="checkbox" value="business" onChange={() => handleChange("categories", "business")} /> Business</label></li>
            <li><label><input type="checkbox" value="sports" onChange={() => handleChange("categories", "sports")} /> Sports</label></li>
            <li><label><input type="checkbox" value="food" onChange={() => handleChange("categories", "food")} /> Food</label></li>
            <li><label><input type="checkbox" value="technology" onChange={() => handleChange("categories", "technology")} /> Technology</label></li>
            <li><label><input type="checkbox" value="networking" onChange={() => handleChange("categories", "networking")} /> Networking</label></li>
            <li><label><input type="checkbox" value="social" onChange={() => handleChange("categories", "social")} /> Social</label></li>
            <li><label><input type="checkbox" value="music" onChange={() => handleChange("categories", "music")} /> Music</label></li>
            <li><label><input type="checkbox" value="arts-and-crafts" onChange={() => handleChange("categories", "arts-and-crafts")} /> Arts and Crafts</label></li>
            <li><label><input type="checkbox" value="health-and-wellness" onChange={() => handleChange("categories", "health-and-wellness")} /> Health and Wellness</label></li>
            <li><label><input type="checkbox" value="education" onChange={() => handleChange("categories", "education")} /> Education</label></li>
            <li><label><input type="checkbox" value="charity" onChange={() => handleChange("categories", "charity")} /> Charity</label></li>
            <li><label><input type="checkbox" value="other" onChange={() => handleChange("categories", "other")} /> Other</label></li>
          </ul>

          {/* Rating filter options */}
          <label className={'font-semibold'}>Rating:</label>
          <ul>
            <li><label><input type="checkbox" value="5" onChange={() => handleChange("ratings", "5")} /> 5 Stars</label></li>
            <li><label><input type="checkbox" value="4" onChange={() => handleChange("ratings", "4")} /> 4 Stars</label></li>
            <li><label><input type="checkbox" value="3" onChange={() => handleChange("ratings", "3")} /> 3 Stars</label></li>
          </ul>
        </form>
      </div>
    </>
  )
}

export default FilterBar
