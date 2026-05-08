"use client";

import { useEffect, useState } from "react";
import CountryList from "@/components/CountryList";
import { api } from "@/api/api";
import type { Country } from "@/types";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get("/all?fields=name,flags,population,region,capital")
      .then((res) => {
        const sorted = (res.data as Country[]).sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      })
      .catch((e) => {
        console.log("Error cargando países:", e);
        setError("No se pudieron cargar los países. Inténtalo de nuevo.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="main-container">
      <h1 className="page-title">Países del Mundo</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <CountryList countries={countries} />}
    </main>
  );
}
