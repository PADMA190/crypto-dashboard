# React + Vite
## Filtering/Sorting strategy

This dashboard uses client-side search and sorting for the prices table:
- Search filters the in-memory list by name/symbol
- Sorting (Price, 24h change, Market Cap, 24h Volume) is applied client-side

Rationale: responses are already paginated and small enough (50 rows) that client-side operations are instantaneous and reduce API churn. If scaling to thousands of rows, we would move sorting/filtering server-side.

## Environment

Create a `.env.local` (or `.env`) with:

```
VITE_COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
# Optional demo key. Sign up at CoinGecko docs if required
VITE_COINGECKO_API_KEY=your_demo_key_here
```

The app reads these via `import.meta.env` and attaches the key as `x-cg-demo-api-key`.

## Features checklist

- All Coins View: rank, coin+icon, price, 24h change, market cap, 24h volume
- Search by name/symbol with 300ms debounce
- Client-side sorting by price, 24h, market cap, volume (header click toggles asc/desc)
- Pagination (Prev/Next)
- Row click opens detail modal
- Highlights: Top gainers, Top losers, Highest volume, Trending, Top by 7d
- Resilience: skeletons/spinner, retry on failure, empty-state messaging



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
