import React from "react";

const HighlightSection = ({title,coins})=>{
    return(
        <div className="p-4 border rounded bg-white shadow">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <ul>
          {coins.map(coin => (
            <li key={coin.id} className="flex justify-between p-1">
              <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              <span>${coin.current_price}</span>
            </li>
          ))}
        </ul>
      </div>
    );
};
export default HighlightSection;