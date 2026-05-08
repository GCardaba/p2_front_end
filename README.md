# Práctica 2 - Países del Mundo

Aplicación web desarrollada con Next.js 16 y React 19 que consume la API pública de [REST Countries](https://restcountries.com) para mostrar información sobre países del mundo.

## Instalación y arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Para construir la versión de producción:

```bash
npm run build
npm run start
```

## Estructura de la navegación

La app usa el **App Router** de Next.js con dos rutas. Todas las llamadas a la API se hacen con **axios** desde una instancia centralizada en `src/api/api.ts` con la `baseURL` configurada mediante la variable de entorno `NEXT_PUBLIC_API_URL`.

### `/` — Página principal

- Componente cliente con `useState` y `useEffect` que llama a `/all?fields=name,flags,population,region,capital` al montarse.
- Solo pide los campos necesarios para reducir el tamaño de la respuesta.
- Renderiza `<CountryList>`, que gestiona el estado del buscador con `useState` y filtra los resultados en el cliente sin llamadas adicionales a la API.

### `/country/[name]` — Detalle del país

- Componente cliente que obtiene el nombre del país con `useParams()` de `next/navigation`.
- Llama a `/name/{name}?fullText=true` al montarse, con un fallback sin `fullText` por si el nombre no coincide exactamente.

## Datos anidados de la API

La API de REST Countries devuelve algunos campos como objetos en vez de arrays:

- **`languages`**: objeto con código ISO como clave y nombre del idioma como valor. Ej: `{ "spa": "Spanish", "eng": "English" }`. Se recorre con `Object.values()` y se une con coma.
- **`currencies`**: objeto con código ISO como clave y `{ name, symbol }` como valor. Ej: `{ "EUR": { "name": "Euro", "symbol": "€" } }`. Se recorre con `Object.values()` formateando cada moneda como `"Euro (€)"`.

## Estructura de archivos

```
src/
├── api/
│   └── api.ts               # instancia axios con baseURL desde .env.local
├── app/
│   ├── globals.css          # todo el CSS en un único archivo
│   ├── layout.tsx
│   ├── page.tsx             # página principal (client component)
│   └── country/
│       └── [name]/
│           └── page.tsx     # detalle del país (client component)
├── components/
│   └── CountryList.tsx      # listado + buscador (client component)
└── types/
    └── index.ts             # tipo Country
```
