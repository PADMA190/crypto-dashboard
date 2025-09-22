import React from "react";

const formatNumber = (value, options) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value.toLocaleString(undefined, options);
    }
    return '—';
};

const formatFixed = (value, digits = 2) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value.toFixed(digits);
    }
    return '0.00';
};

const SortHeader = ({ label, field, sortKey, sortDir, onSort, alignRight }) => {
    const active = sortKey === field;
    return (
        <th className={`p-3 font-semibold ${alignRight ? 'text-right' : 'text-left'} text-gray-800`}>
            <button
                type="button"
                className={`inline-flex items-center gap-1 group ${active ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'} cursor-pointer`}
                onClick={() => onSort(field)}
            >
                <span>{label}</span>
                <span className={`text-xs opacity-0 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`}>
                    {active ? (sortDir === 'asc' ? '▲' : '▼') : '▲'}
                </span>
            </button>
        </th>
    );
};

const CoinTable = ({ coins = [], onRowClick, sortKey, sortDir, onSort }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr className="text-left text-gray-500">
                        <th className="p-3 font-medium w-12">#</th>
                        <th className="p-3 font-medium">Coin</th>
                        <SortHeader label="Price" field="price" sortKey={sortKey} sortDir={sortDir} onSort={onSort} alignRight />
                        <SortHeader label="24h" field="change24" sortKey={sortKey} sortDir={sortDir} onSort={onSort} alignRight />
                        <SortHeader label="Market Cap" field="marketCap" sortKey={sortKey} sortDir={sortDir} onSort={onSort} alignRight />
                        <SortHeader label="24h Volume" field="volume24" sortKey={sortKey} sortDir={sortDir} onSort={onSort} alignRight />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {coins.map((coin, idx) => {
                    const pct = coin?.price_change_percentage_24h;
                    const isUp = typeof pct === 'number' ? pct >= 0 : true;
                    return (
                        <tr key={coin?.id || idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick?.(coin)}>
                            <td className="p-3 text-gray-600">{coin?.market_cap_rank ?? '—'}</td>
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {coin?.image && <img src={coin.image} alt={coin?.name || ''} className="w-6 h-6 rounded-full" />}
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900">{coin?.name || '—'}</span>
                                        <span className="uppercase text-gray-500">{coin?.symbol}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3 text-right tabular-nums font-mono">
                                ${formatNumber(coin?.current_price, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-right">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    <span>{isUp ? '▲' : '▼'}</span>
                                    {formatFixed(coin?.price_change_percentage_24h)}%
                                </span>
                            </td>
                            <td className="p-3 text-right tabular-nums font-mono">
                                ${formatNumber(coin?.market_cap)}
                            </td>
                            <td className="p-3 text-right tabular-nums font-mono">
                                ${formatNumber(coin?.total_volume)}
                            </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CoinTable;