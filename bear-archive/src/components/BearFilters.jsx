
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* ========================================
   FILTER OPTIONS
======================================== */

const yearOptions = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  'Older',
  'Unknown'
];

const typeOptions = [
  'Bear',
  'Bunny',
  'Cat',
  'Dog',
  'Frog',
  'Fox',
  'Bat',
  'Chinchilla',
  'Llama',
  'Character',
  'Unicorn'
];

const colorOptions = [
  { name: 'Brown', color: '#b98b68' },
  { name: 'White', color: '#ffffff' },
  { name: 'Pink', color: '#f77eae' },
  { name: 'Purple', color: '#9564c8' },
  { name: 'Blue', color: '#278de0' },
  { name: 'Red', color: '#e90040' },
  { name: 'Yellow', color: '#ffd04b' },
  { name: 'Green', color: '#15a275' },
  { name: 'Black', color: '#33465e' },
  {
    name: 'Multicolor',
    color: 'conic-gradient(red, yellow, green, blue, violet, red)'
  }
];

const sizeOptions = [
  'Mini',
  'Regular',
  'Large'
];


/* ========================================
   FILTER COMPONENT
======================================== */

export default function BearFilters({
  bears,
  filters,
  setFilters,
  clear
}) {

  // Track which filter sections are expanded
  const [expanded, setExpanded] = useState({
    years: true,
    types: true,
    colors: true,
    sizes: true
  });


  /* ========================================
     TOGGLE FILTER SECTION
  ======================================== */

  const toggleSection = (section) => {

    setExpanded((previous) => ({
      ...previous,
      [section]: !previous[section]
    }));

  };


  /* ========================================
     TOGGLE SELECTED FILTER
  ======================================== */

  const toggleFilter = (category, value) => {

    setFilters((previous) => {

      const current = previous[category];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...previous,
        [category]: updated
      };

    });

  };
  
/* ========================================
   FILTER DROPDOWN HEADING
======================================== */

const FilterHeading = ({ title, section }) => (

  <button
    type="button"
    className="filter-heading"
    onClick={() => toggleSection(section)}
    aria-expanded={expanded[section]}
  >

    <span>
      {title}
    </span>

    <ChevronDown size={18} />

  </button>

);

  /* ========================================
     RENDER FILTERS
  ======================================== */

  return (

    <aside className="filters">

      {/* FILTER TITLE */}

      <div className="filter-title">

        <strong>Filters</strong>

        <button
          type="button"
          onClick={clear}
        >
          Clear
        </button>

      </div>


      {/* ========================================
          YEAR FILTER
      ======================================== */}

      <section className="filter-section">

        <FilterHeading
          title="Year"
          section="years"
        />

        {expanded.years && (

          <div className="filter-options">

            {yearOptions.map((year) => (

              <label
                key={year}
                className="check-line"
              >

                <input
                  type="checkbox"
                  checked={filters.years.includes(year)}
                  onChange={() => toggleFilter('years', year)}
                />

                <span>{year}</span>

              </label>

            ))}

          </div>

        )}

      </section>


      {/* ========================================
          PLUSH TYPE FILTER
      ======================================== */}

      <section className="filter-section">

        <FilterHeading
          title="Plush Type"
          section="types"
        />

        {expanded.types && (

          <div className="filter-options">

            {typeOptions.map((type) => (

              <label
                key={type}
                className="check-line"
              >

                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => toggleFilter('types', type)}
                />

                <span>{type}</span>

              </label>

            ))}

          </div>

        )}

      </section>


      {/* ========================================
          COLOR FILTER
      ======================================== */}

      <section className="filter-section">

        <FilterHeading
          title="Color"
          section="colors"
        />

        {expanded.colors && (

          <div className="swatches">

            {colorOptions.map((color) => (

              <button
                key={color.name}
                type="button"
                className={
                  filters.colors.includes(color.name)
                    ? 'swatch active'
                    : 'swatch'
                }
                style={{
                  background: color.color
                }}
                title={color.name}
                aria-label={`Filter by ${color.name}`}
                aria-pressed={filters.colors.includes(color.name)}
                onClick={() => toggleFilter('colors', color.name)}
              />

            ))}

          </div>

        )}

      </section>


      {/* ========================================
          SIZE FILTER
      ======================================== */}

      <section className="filter-section">

        <FilterHeading
          title="Size"
          section="sizes"
        />

        {expanded.sizes && (

          <div className="filter-options">

            {sizeOptions.map((size) => (

              <label
                key={size}
                className="check-line"
              >

                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleFilter('sizes', size)}
                />

                <span>{size}</span>

              </label>

            ))}

          </div>

        )}

      </section>

    </aside>

  );

}
