import axios from 'axios';

const API_BASE = import.meta.env.VITE_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const api=axios.create(
    {
        baseURL:API_BASE,
        headers:{
            Accept:'application/json',
            ...(API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {}),
        },
    }
);

//Fetch coin prices
export const fetchCoinPrices=async({page=1,per_page=50,search='',order='market_cap_desc'})=>{
    const { data } = await api.get('/coins/markets',{
        params:{
            vs_currency:'usd',
            order,
            per_page,
            page,
            price_change_percentage: '24h',
            sparkline:false,
        },
    });

    if (search){
        return data.filter(
            coin=>
                coin.name.toLowerCase().includes(search.toLocaleLowerCase())||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }
    return data;
}

//fetching trending coins data
export const fetchTrendingCoins=async()=>{
    const { data }= await api.get('/search/trending');
    return (data?.coins || []).map(c => c.item);
}

//fetching single coin details
export const fetchCoinById=async (id)=>{
    const { data } = await api.get(`/coins/${id}`);
    return data;
}