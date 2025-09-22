import { useQuery } from "@tanstack/react-query";
import { fetchCoinPrices, fetchTrendingCoins } from '../api/coingecko';

export const useCoins = (page, perPage, search, order) => {
    return useQuery({
        queryKey: ['coins', page, perPage, search, order],
        queryFn: () => fetchCoinPrices({ page, per_page: perPage, search, order }),
        staleTime: 60 * 1000,
        keepPreviousData: true,
    });
};

export const useTrendingCoins = () => {
    return useQuery({
        queryKey: ['trending'],
        queryFn: fetchTrendingCoins,
        staleTime: 5 * 60 * 1000,
    });
};
