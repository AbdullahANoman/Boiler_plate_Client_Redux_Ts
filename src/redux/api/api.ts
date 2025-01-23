//NOTE check that this import from has the query/react
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    //NOTE if you want to add cookies on your browser you need to change it to be credentials:'include'
    credentials: "include",
  }),
  endpoints: () => ({}),
});
