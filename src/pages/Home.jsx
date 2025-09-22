import React, { useEffect, useState } from 'react';
import { useCoins, useTrendingCoins } from '../hooks/useCoins';
import { useNavigate } from 'react-router-dom';
import CoinTable from '../components/CoinTable';
import HighlightsBoard from '../components/HighlightsBoard';
import HighlightSection from '../components/HighlightSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CoinModal from '../components/CoinModal';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();

  const { data: coins, isLoading, error, refetch } = useCoins(page, 50, debouncedSearch, 'market_cap_desc');
  const { data: trending, isLoading: isTrendingLoading, error: trendingError, refetch: refetchTrending } = useTrendingCoins();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedCoins = React.useMemo(() => {
    if (!coins || !sortKey) return coins;
    const cloned = [...coins];
    const dir = sortDir === 'asc' ? 1 : -1;
    cloned.sort((a,b)=>{
      switch (sortKey) {
        case 'price': return dir * ((a.current_price||0) - (b.current_price||0));
        case 'change24': return dir * ((a.price_change_percentage_24h||0) - (b.price_change_percentage_24h||0));
        case 'marketCap': return dir * ((a.market_cap||0) - (b.market_cap||0));
        case 'volume24': return dir * ((a.total_volume||0) - (b.total_volume||0));
        default: return 0;
      }
    });
    return cloned;
  }, [coins, sortKey, sortDir]);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(id);
  }, [search]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Cryptocurrency Prices by Market Cap</h1>
        <p className="text-sm text-gray-600"></p>
      </header>

      {/* Toolbar */}
      <div className="flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => { navigate('/'); }}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border cursor-pointer border-gray-300 bg-white text-gray-800`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => { navigate('/highlights'); }}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border cursor-pointer border-gray-200 bg-gray-50 text-gray-600`}
        >
          Highlights
        </button>
      </div>

      {/* Search & Sort */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by name or symbol"
          className="p-2 border border-gray-300 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Coin Table */}
      {isLoading && <LoadingSkeleton />}
      {error && <ErrorMessage message="Failed to load coins." onRetry={refetch} />}
      {!isLoading && !error && sortedCoins && sortedCoins.length === 0 && (
        <EmptyState title="No results" subtitle="No coins match your search." />
      )}
      {sortedCoins && sortedCoins.length > 0 && (
        <CoinTable
          coins={sortedCoins}
          onRowClick={setSelectedCoin}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      )}
      <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-2 border border-gray-300 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
