import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/constants/urls";
import {serialize} from "object-to-formdata";
import {UserLoginFormData} from "@/schemas/userLoginSchema";
import {UserRegisterFormData} from "@/schemas/userRegisterSchema";
import {IUserResponse} from "@/types/IUserResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RootState} from "@/store/store";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + '/api/Auth',
        prepareHeaders: (headers, { getState }) => {
            headers.set('ngrok-skip-browser-warning', 'true');
            const token = (getState() as RootState).auth.token;
            console.log("TOKEN IN authAPI ",token);
            console.log("BASE_URL:", BASE_URL);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, UserLoginFormData>({
            query: (body) => ({
                url: "/Login",
                method: "POST",
                body: body
            })
        }),
        register: builder.mutation<void, UserRegisterFormData>({
            query: (body) => ({
                url: "/Register",
                method: "POST",
                body: serialize(body)
            })
        }),
        getUserProfile: builder.query<IUserResponse, void>({
            query: () => ({
                url: "/GetMyProfile"
            })
        })
    })
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserProfileQuery
} = authApi

