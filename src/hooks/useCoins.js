import { useQuery } from "@tanstack/react-query";
import { fetchCoinsMarkets,fetchTrendingCoins} from '../api/coingecko';

export const useCoins=(page,perPage,search,order)=>{
    return useQuery(['coins',page,perPage,search,order],()=>
        fetchCoinsMarkets({page,per_page:perPage,search,order})
    );
};

export const useTrendingCoins=()=>{
    return useQuery(
        ['trending'],
        fetchTrendingCoins
    );
};
