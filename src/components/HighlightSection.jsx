import React from "react";

const HighlightSection = ({ title, coins = [] }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
            <ul className="divide-y divide-gray-100">
                {coins.slice(0, 5).map((coin) => (
                    <li key={coin.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 min-w-0">
                            {coin.image && <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />}
                            <span className="truncate text-sm text-gray-900">
                                {coin.name}
                                <span className="ml-1 text-gray-500 uppercase">{coin.symbol}</span>
                            </span>
                        </div>
                        <span className="text-sm font-mono tabular-nums text-gray-700">
                            ${typeof coin.current_price === 'number' ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HighlightSection;