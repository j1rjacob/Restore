
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../models/product";
import { baseQueryWithErrorHandling } from "../../api/bestApi";

export const catalogAPI = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({url: 'products'})
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}`
        })
    })
});

export const {useFetchProductDetailsQuery, useFetchProductsQuery} = catalogAPI;