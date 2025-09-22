import React from 'react';
import { useCoins, useTrendingCoins } from '../hooks/useCoins';
import HighlightsBoard from '../components/HighlightsBoard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Highlights = () => {
  const navigate = useNavigate();
  const { data: coins } = useCoins(1, 50, '', 'market_cap_desc');
  const { data: trending, isLoading, error, refetch } = useTrendingCoins();

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Crypto Highlights</h1>
        <p className="text-sm text-gray-600">Which cryptocurrencies are people more interested in? Track and discover the most interesting cryptocurrencies based on market and CoinGecko activity.</p>
      </header>

      <div className="flex items-center gap-2 text-sm">
        <button type="button" onClick={() => navigate('/')} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border cursor-pointer border-gray-200 bg-gray-50 text-gray-600">All</button>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800">Highlights</span>
      </div>

      <div className="space-y-4">
        {isLoading && <Spinner />}
        {error && <ErrorMessage message="Failed to load highlights." onRetry={refetch} />}
        {trending && <HighlightsBoard coins={coins || []} trending={trending || []} />}
      </div>
    </div>
  );
};

export default Highlights;


