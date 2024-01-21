import { ApiResponse, IBoard } from "@/types/apiBoard";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}boards`,
  }),
  tagTypes: ["boards"],
  endpoints: (build) => ({
    fetchBoards: build.query<ApiResponse<IBoard[]>, void>({
      query: () => "",
      providesTags: ["boards"],
    }),
    searchBoards: build.query<ApiResponse<IBoard[]>, { searchText: string }>({
      query: ({ searchText }) => `/?search=${searchText}`,
      providesTags: ["boards"],
    }),
    searchForId: build.query<ApiResponse<IBoard[]>, { id: string }>({
      query: ({ id }) => `/?id=${id}`,
      providesTags: ["boards"],
    }),
    createBoard: build.mutation<ApiResponse<IBoard[]>, Partial<IBoard>>({
      query: ({ name }: { name: string }) => ({
        url: "",
        method: "POST",
        body: {
          name,
        },
      }),
      invalidatesTags: ["boards"],
    }),
    deleteBoard: build.mutation<ApiResponse<IBoard[]>, { id: string }>({
      query: ({ id }) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boards"],
    }),
    updateBoardTitle: build.mutation<
      ApiResponse<IBoard[]>,
      { id: string; newName: string }
    >({
      query: ({ id, newName }) => {
        return {
          url: `?id=${id}`,
          method: "PUT",
          body: { newName },
        };
      },
      invalidatesTags: ["boards"],
    }),
  }),
});

export const {
  useFetchBoardsQuery,
  useSearchBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardTitleMutation,
  useSearchForIdQuery,
} = boardsApi;
