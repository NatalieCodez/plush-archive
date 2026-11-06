
import React, { useMemo, useState } from 'react';

import {
  Search,
  Heart,
  PawPrint,
  ChevronDown
} from 'lucide-react';

import BearCard from './components/BearCard';
import BearFilters from './components/BearFilters';
import bears from './bears.json';
import './App.css';


/* ========================================
   SITE CUSTOMIZATION

   Change your website text here!
======================================== */

const siteConfig = {

  // Logo text (white)
  logoFirst: "Plush",

  // Logo text (yellow)
  logoSecond: "Catalog",

  // Main heading
  heading: "",

  // Subtitle underneath heading
  subtitle: "Unofficial fan-made collector archive of plushies.",

  // Search bar placeholder
  searchPlaceholder: "Search for a plush...",

  // About navigation text
  aboutText: "ABOUT"

};


/* ========================================
   DEFAULT FILTERS
======================================== */

const empty = {
  years: [],
  types: [],
  colors: [],
  sizes: []
};


/* ========================================
   MAIN APP COMPONENT
======================================== */

export default function App() {

  /* ========================================
     STATE VARIABLES
  ======================================== */

  const [search, setSearch] = useState('');

  const [filters, setFilters] = useState(empty);

  const [sort, setSort] = useState('featured');

  const [favorites, setFavorites] = useState([]);

  const [onlyFavorites, setOnlyFavorites] = useState(false);


  /* ========================================
     SEARCH, FILTER, AND SORT BEARS
  ======================================== */

  const filtered = useMemo(() => {

    return bears
      .filter((b) => {

        const query = [
          b.name,
          b.type,
          b.collection,
          b.description
        ]
          .join(' ')
          .toLowerCase();

        const yearMatch =
          !filters.years.length ||
          filters.years.some((y) => {

            if (y === 'Older') {
              return b.year != null && b.year < 2022;
            }

            if (y === 'Unknown') {
              return b.year == null;
            }

            return String(b.year) === y;

          });

        const searchMatch = query.includes(
          search.toLowerCase()
        );

        const typeMatch =
          !filters.types.length ||
          filters.types.includes(b.type);

        const colorMatch =
          !filters.colors.length ||
          filters.colors.includes(b.color);

        const sizeMatch =
          !filters.sizes.length ||
          filters.sizes.includes(b.size);

        const favoriteMatch =
          !onlyFavorites ||
          favorites.includes(b.id);

        return (
          searchMatch &&
          yearMatch &&
          typeMatch &&
          colorMatch &&
          sizeMatch &&
          favoriteMatch
        );

      })
      .sort((a, b) => {

        if (sort === 'newest') {
          return (b.year || 0) - (a.year || 0);
        }

        if (sort === 'oldest') {
          return (a.year || 9999) - (b.year || 9999);
        }

        if (sort === 'name') {
          return a.name.localeCompare(b.name);
        }

        return 0;

      });

  }, [
    search,
    filters,
    sort,
    favorites,
    onlyFavorites
  ]);


  /* ========================================
     TOGGLE FAVORITE BEAR
  ======================================== */

  const toggleFavorite = (id) => {

    setFavorites((prev) => {

      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }

      return [...prev, id];

    });

  };


  /* ========================================
     CLEAR ALL FILTERS
  ======================================== */

  const clearFilters = () => {

    setFilters({
      years: [],
      types: [],
      colors: [],
      sizes: []
    });

    setSearch('');

    setOnlyFavorites(false);

  };


  /* ========================================
     WEBSITE LAYOUT
  ======================================== */

  return (

    <div className="site">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="topbar">

        <div className="top-inner">

          {/* ABOUT LINK */}

          <a
            href="#about"
            className="about-link"
          >
            {siteConfig.aboutText}

            <ChevronDown size={19} />

          </a>


          {/* ========================================
              EDITABLE LOGO
          ======================================== */}

          <div className="brand">

            <span>
              {siteConfig.logoFirst}{' '}

              <em>
                {siteConfig.logoSecond}
              </em>
            </span>

          </div>


          {/* ========================================
              HEADER ACTION BUTTONS
          ======================================== */}

          <div className="top-actions">

            {/* SEARCH ICON */}

            <button
              type="button"
              title="Search"
              aria-label="Focus search"
              onClick={() => {
                document
                  .querySelector('.search-wrap input')
                  ?.focus();
              }}
            >
              <Search />
            </button>


            {/* FAVORITES ICON */}

            <button
              type="button"
              className={
                onlyFavorites ? 'selected' : ''
              }
              title="Show favorites"
              aria-label="Toggle favorites"
              onClick={() => {
                setOnlyFavorites(!onlyFavorites);
              }}
            >
              <Heart
                fill={
                  onlyFavorites
                    ? 'currentColor'
                    : 'none'
                }
              />
            </button>

          </div>

        </div>

      </header>


      {/* ========================================
          MAIN PAGE
      ======================================== */}

      <main className="page">


        {/* ========================================
            HERO SECTION
        ======================================== */}

        <section className="hero">

          


          {/* MAIN HEADING */}

          <h1>
            {siteConfig.heading}
          </h1>


          {/* SUBTITLE */}

          <p>
            {siteConfig.subtitle}
          </p>

        </section>


        {/* ========================================
            CATALOG SECTION
        ======================================== */}

        <section
          id="catalog"
          className="catalog"
        >


          {/* ========================================
              LEFT FILTER SIDEBAR
          ======================================== */}

          <BearFilters
            bears={bears}
            filters={filters}
            setFilters={setFilters}
            clear={clearFilters}
          />


          {/* ========================================
              RIGHT CATALOG AREA
          ======================================== */}

          <div className="catalog-main">


            {/* ========================================
                SEARCH AND SORT
            ======================================== */}

            <div className="catalog-controls">


              {/* SEARCH BAR */}

              <label className="search-wrap">

                <Search size={25} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder={
                    siteConfig.searchPlaceholder
                  }
                  aria-label="Search plush animals"
                />

              </label>


              {/* SORT DROPDOWN */}

              <label className="sort-wrap">

                Sort by:

                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                  aria-label="Sort plush"
                >

                  <option value="featured">
                    Featured
                  </option>

                  <option value="name">
                    Name A–Z
                  </option>

                  <option value="newest">
                    Newest year
                  </option>

                  <option value="oldest">
                    Oldest year
                  </option>

                </select>

                <ChevronDown size={18} />

              </label>

            </div>


            {/* ========================================
                SCROLLABLE BEAR GALLERY
            ======================================== */}

            <div className="gallery-scroll">

              {filtered.length > 0 ? (

                <div className="bear-grid">

                  {filtered.map((b) => (

                    <BearCard
                      key={b.id}
                      bear={b}
                      favorite={
                        favorites.includes(b.id)
                      }
                      toggleFavorite={
                        toggleFavorite
                      }
                    />

                  ))}

                </div>

              ) : (

                <div className="empty">

                  No plush friends match your search.
                  Try clearing the filters.

                </div>

              )}

            </div>

          </div>

        </section>


        {/* ========================================
            FOOTER
        ======================================== */}

        <footer id="about">

          Unofficial fan-made collector archive
          {' · '}
          Not affiliated with Build-A-Bear Workshop
          {' · '}
          Release details need verification.

        </footer>

      </main>

    </div>

  );

}
