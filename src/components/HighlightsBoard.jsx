import React from "react";

const formatCurrency = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
    }
    return '—';
};

const MetricRow = ({ coin, priceRight, changeRight, changeAccent, showChange = true }) => (
    <li className="grid grid-cols-12 items-center py-2 gap-2">
        <div className="col-span-6 flex items-center gap-2 min-w-0">
            {coin?.image && <img src={coin.image} alt={coin?.name || ''} className="w-5 h-5 rounded-full" />}
            <span className="truncate text-sm text-gray-900">
                {coin?.name}
                <span className="ml-1 text-gray-500 uppercase">{coin?.symbol}</span>
            </span>
        </div>
        <span className="col-span-3 text-xs font-mono tabular-nums text-gray-700 text-right">{priceRight}</span>
        {showChange && (
            <span className={`col-span-3 text-xs text-right font-medium ${changeAccent}`}>{changeRight}</span>
        )}
    </li>
);

const Card = ({ title, children, priceHeaderLabel = 'Price', showChange = true }) => (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="grid grid-cols-12 text-[11px] text-gray-500 px-1 pb-1">
            <span className="col-span-6">Coin</span>
            <span className="col-span-3 text-right">{priceHeaderLabel}</span>
            {showChange && <span className="col-span-3 text-right">24h</span>}
        </div>
        <ul className="divide-y divide-gray-100">
            {children}
        </ul>
    </div>
);

const safePct = (coin, key) => {
    const v = coin?.[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : null;
};

const HighlightsBoard = ({ coins = [], trending = [] }) => {
    const coinsWithPct24 = coins.filter(c => Number.isFinite(c?.price_change_percentage_24h));
    const topGainers = [...coinsWithPct24].sort((a,b)=> (b.price_change_percentage_24h||0) - (a.price_change_percentage_24h||0)).slice(0,8);
    const topLosers = [...coinsWithPct24].sort((a,b)=> (a.price_change_percentage_24h||0) - (b.price_change_percentage_24h||0)).slice(0,8);
    const highestVolume = [...coins].sort((a,b)=> (b.total_volume||0) - (a.total_volume||0)).slice(0,8);

    const pct7dKey = 'price_change_percentage_7d_in_currency';
    const coinsWith7d = coins.filter(c => Number.isFinite(c?.[pct7dKey]));
    const top7d = (coinsWith7d.length ? coinsWith7d : coinsWithPct24)
        .sort((a,b)=> (b[pct7dKey]||b.price_change_percentage_24h||0) - (a[pct7dKey]||a.price_change_percentage_24h||0))
        .slice(0,8);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card title="Top Gainers (24h)">
                {topGainers.map(coin => (
                    <MetricRow
                        key={coin.id}
                        coin={coin}
                        priceRight={`${formatCurrency(coin.current_price)}`}
                        changeRight={`${(safePct(coin,'price_change_percentage_24h') ?? 0).toFixed(2)}%`}
                        changeAccent="text-green-600"
                    />
                ))}
            </Card>

            <Card title="Top Losers (24h)">
                {topLosers.map(coin => (
                    <MetricRow
                        key={coin.id}
                        coin={coin}
                        priceRight={`${formatCurrency(coin.current_price)}`}
                        changeRight={`${(safePct(coin,'price_change_percentage_24h') ?? 0).toFixed(2)}%`}
                        changeAccent="text-red-600"
                    />
                ))}
            </Card>

            <Card title="Highest Volume (24h)" priceHeaderLabel="Volume" showChange={false}>
                {highestVolume.map(coin => (
                    <MetricRow
                        key={coin.id}
                        coin={coin}
                        priceRight={`${formatCurrency(coin.total_volume)}`}
                        showChange={false}
                    />
                ))}
            </Card>

        </div>
    );
};

export default HighlightsBoard;


