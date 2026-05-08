"use client";

import { useState } from "react";
import Link from "next/link";
import type { Country } from "@/types";

const formatPopulation = (n: number): string => n.toLocaleString("es-ES");

export default function CountryList({ countries }: { countries: Country[] }) {
  const [search, setSearch] = useState("");
  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {/* pequeño contador para que se vea que filtra */}
        <span className="search-count">{filtered.length} países</span>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No se encontraron países con ese nombre.</p>
      ) : (
        <div className="country-grid">
          {filtered.map((country) => (
            <Link
              key={country.name.common}
              href={`/country/${encodeURIComponent(country.name.common)}`}
              className="country-card"
            >
              <img
                src={country.flags.svg || country.flags.png}
                alt={country.flags.alt || `Bandera de ${country.name.common}`}
                className="country-flag"
              />
              <div className="country-info">
                <h2 className="country-name">{country.name.common}</h2>
                <p className="country-population">
                  <span>Población: </span>
                  {formatPopulation(country.population)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
