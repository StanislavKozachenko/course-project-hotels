import React from 'react';

export default function Categories({ value, onClickCategory }) {
  const categories = ['All', 'Asia', 'Europe', 'Africa', 'America', 'Australia'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(categoryName)}
            className={value === categoryName ? 'active' : ''}>
            {categoryName === "All" ? "Все" : categoryName === "Asia" ? "Азия" : categoryName === 'Europe' ? "Европа" : categoryName === 'Africa' ? "Африка" : categoryName === 'America' ? "Америка" : categoryName === 'Australia' ? "Австралия" : categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
