"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/api/api";
import type { Country } from "@/types";

const formatPopulation = (n: number): string => n.toLocaleString("es-ES");

export const CountryPage = () => {
  const params = useParams<{ name: string }>();
  const name = decodeURIComponent(params.name);

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get(`/name/${encodeURIComponent(name)}?fullText=true`)
      .then((res) => {
        setCountry((res.data as Country[])[0]);
      })
      .catch(() => {
        // si fullText falla intentamos sin él
        api
          .get(`/name/${encodeURIComponent(name)}`)
          .then((res) => setCountry((res.data as Country[])[0]))
          .catch((e) => {
            console.log("Error cargando país:", e);
            setError("No se pudo cargar la información de este país.");
          })
          .finally(() => setLoading(false));
      })
      .finally(() => setLoading(false));
  }, [name]);

  const languages =
    country?.languages ? Object.values(country.languages).join(", ") : "N/A";

  const currencies =
    country?.currencies
      ? Object.values(country.currencies)
          .map((c) => `${c.name} (${c.symbol})`)
          .join(", ")
      : "N/A";

  return (
    <main className="main-container">
      <Link href="/" className="back-btn">
        ← Volver a la lista
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && country && (
        <div className="detail-card">
          <div className="detail-flag-col">
            <img
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Bandera de ${country.name.common}`}
              className="detail-flag"
            />
          </div>

          <div className="detail-info-col">
            <h1 className="detail-title">{country.name.common}</h1>

            <div className="detail-grid">
              <div className="detail-field">
                <span className="detail-label">Nombre oficial:</span>
                <span>{country.name.official}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Capital:</span>
                <span>{country.capital?.[0] ?? "N/A"}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Región:</span>
                <span>{country.region}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Subregión:</span>
                <span>{country.subregion ?? "N/A"}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Población:</span>
                <span>{formatPopulation(country.population)}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Idiomas:</span>
                <span>{languages}</span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Monedas:</span>
                <span>{currencies}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
