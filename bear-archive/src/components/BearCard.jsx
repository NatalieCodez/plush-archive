
import React, { useState } from 'react';

import {
  Heart,
  ImagePlus
} from 'lucide-react';


/* ========================================
   BEAR CARD COMPONENT
======================================== */

export default function BearCard({
  bear,
  favorite,
  toggleFavorite
}) {

  // Track whether the plush image failed to load
  const [broken, setBroken] = useState(false);


  /* ========================================
     COMPONENT LAYOUT
  ======================================== */

  return (
    <article className="bear-card">

      {/* ========================================
          FAVORITE HEART BUTTON
      ======================================== */}

      <button
        type="button"
        className={`heart ${favorite ? 'active' : ''}`}
        aria-label={
          favorite
            ? 'Remove favorite'
            : 'Add favorite'
        }
        onClick={() => toggleFavorite(bear.id)}
      >

        <Heart
          size={27}
          strokeWidth={2.3}
          fill={favorite ? 'currentColor' : 'none'}
        />

      </button>


      {/* ========================================
          PLUSH IMAGE
      ======================================== */}

      <div className="bear-image">

        {bear.image && !broken ? (

          <img
            src={bear.image}
            alt={bear.name}
            onError={() => setBroken(true)}
          />

        ) : (

          /* Image placeholder */

          <div className="placeholder">

            <span>TEDDYBEAR</span>

            <ImagePlus size={18} />

            <small>
              PHOTO COMING SOON
            </small>

          </div>

        )}

      </div>


      {/* ========================================
          PLUSH INFORMATION
      ======================================== */}

      <div className="bear-info">

        {/* Plush name */}

        <h3>
          {bear.name}
        </h3>


        {/* Release year */}

        <p>
          {bear.year
            ? `Released ${bear.year}`
            : 'Year coming soon'}
        </p>


        {/* ========================================
            DETAILS PAGE BUTTON
        ======================================== */}

        <a
          href={`/plush/${encodeURIComponent(bear.id)}`}
          className="details-button"
        >
          Details
        </a>

      </div>

    </article>
  );
}
