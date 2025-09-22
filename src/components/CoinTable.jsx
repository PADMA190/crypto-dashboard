import React from "react";

const CoinTable=({coins})=>{
    return(
        <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">24h Change</th>
            <th className="p-2">Market Cap</th>
            <th className="p-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <tr key={coin.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-2">{coin.market_cap_rank}</td>
              <td className="p-2 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6"/>
                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              </td>
              <td className="p-2">${coin.current_price}</td>
              <td className={`p-2 ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {coin.price_change_24h.toFixed(2)} (${coin.price_change_percentage_24h.toFixed(2)}%)
              </td>
              <td className="p-2">${coin.market_cap.toLocaleString()}</td>
              <td className="p-2">${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>        
    );
};
export default CoinTable;