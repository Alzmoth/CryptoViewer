import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_CRYPTO_API_URL;

const cryptoHeaders = {
  'x-access-token': process.env.REACT_CRYPTO_ACCES_TOKEN,
};

const createRequest = (url) => ({ url, Headers: cryptoHeaders });
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
