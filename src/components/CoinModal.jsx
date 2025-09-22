import React from "react";

const Row = ({ label, value, accent }) => (
    <div className="flex items-center justify-between py-1 text-sm">
        <span className="text-gray-500">{label}</span>
        <span className={accent}>{value}</span>
    </div>
);

const CoinModal = ({ coin, onClose }) => {
    if (!coin) return null;
    const pct = coin.price_change_percentage_24h;
    const isUp = typeof pct === 'number' ? pct >= 0 : true;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    {coin.image && <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{coin.name}</h3>
                        <p className="uppercase text-gray-500 text-sm">{coin.symbol}</p>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    <Row label="Current Price" value={(typeof coin.current_price==='number'? coin.current_price.toLocaleString(undefined,{style:'currency',currency:'USD'}) : '—')} />
                    <Row label="24h Change" value={`${(pct ?? 0).toFixed(2)}%`} accent={isUp ? 'text-green-600' : 'text-red-600'} />
                    <Row label="Market Cap" value={(typeof coin.market_cap==='number'? `$${coin.market_cap.toLocaleString()}` : '—')} />
                    <Row label="24h Volume" value={(typeof coin.total_volume==='number'? `$${coin.total_volume.toLocaleString()}` : '—')} />
                </div>
                <div className="mt-4 text-right">
                    <button onClick={onClose} className="px-3 py-2 border border-gray-300 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default CoinModal;


