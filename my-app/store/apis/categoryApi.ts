// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {BASE_URL} from "@/constants/urls";
import {ICreateCategory} from "@/types/ICreateCategory";
import { serialize } from "object-to-formdata";
import {IUpdateCategory} from "@/types/IUpdateCategory";

// Define a service using a base URL and expected endpoints

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    tagTypes: ["Categories", "Category"],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/api/categories' }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryResponse[], void>({
            query:() => '',
            //@ts-ignore
            transformResponse: (response: {data: ICategoryResponse}) => response.data,
            providesTags: ["Categories"]
        }),
        createCategory: builder.mutation<void, ICreateCategory>({
            query:(body) => ({
                url: "",
                method: 'POST',
                body: serialize(body),
            }),
            invalidatesTags: ["Categories","Category"]
        }),
        deleteCategory: builder.mutation<void, string>({
            query: id => ({
                url: `${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories","Category"]
        }),
        getById: builder.query<ICategoryResponse, void>({
            query: id => ({
                url: `${id}`
            }),
            providesTags: ["Categories", "Category"]
        }),
        updateCategory: builder.mutation<void, IUpdateCategory>({
            query:(data) => {
                const { image, ...rest } = data;
                const formData = serialize(rest);

                if (image?.uri && !image.uri.startsWith('http')) {
                    formData.append('image', {
                        uri: image.uri,
                        type: 'image/jpeg',
                        name: 'image.jpg',
                    } as any);
                }
                return {
                    url: "",
                    method: "PUT",
                    body: formData,
                }
            },
            invalidatesTags:["Categories","Category"]
        })

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetByIdQuery,
    useUpdateCategoryMutation
} = categoryApi