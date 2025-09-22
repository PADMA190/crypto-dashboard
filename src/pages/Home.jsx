import React, { useState } from 'react';
import { useCoins, useTrendingCoins } from '../hooks/useCoins';
import CoinTable from '../components/CoinTable';
import HighlightSection from '../components/HighlightSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data: coins, isLoading, error } = useCoins(page, 50, search, 'market_cap_desc');
  const { data: trending } = useTrendingCoins();

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trending && <HighlightSection title="Trending Coins" coins={trending} />}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search coins..."
        className="p-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Coin Table */}
      {isLoading && <LoadingSkeleton />}
      {error && <ErrorMessage message="Failed to load coins." />}
      {coins && <CoinTable coins={coins} />}

      {/* Pagination */}
      <div className="flex justify-between">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-gray-200 rounded">
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
