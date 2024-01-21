import { ApiResponse, IBoard, ICard } from '@/types/apiBoard';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}cards`,
  }),
  tagTypes: ['cards'],
  endpoints: (build) => ({
    createCard: build.mutation<ApiResponse<ICard[]>, {boardId:string, title:string, description:string}>({
      query: ({boardId, title, description}) => ({
        url: `?id=${boardId}`,
        method: 'POST',
        body: {
          title,
          description
        },
      }),
      invalidatesTags: ['cards'],
    }),
    deleteCard: build.mutation<ApiResponse<IBoard[]>, { boardId:string, cardId:string }>({
      query: ({boardId, cardId}) => ({
        url: `?id=${boardId}`,
        method: 'DELETE',
        body:{
          cardId
        }
      }),
      invalidatesTags: ['cards'],
    }),
    updateCard: build.mutation<ApiResponse<IBoard[]>, {boardId:string, cardId:string, title: string, description: string, newStatus: string}>({
      query: ({ boardId, cardId, title, description, newStatus }) => {
        const requestBody = { cardId, title, description, newStatus };
        console.log("Sending PUT request with body:", requestBody);
    
        return {
          url: `?id=${boardId}`, 
          method: 'PUT',
          body: requestBody,
        };
      },
      invalidatesTags: ['cards'],
    }),
    updateCardPosition: build.mutation<ApiResponse<IBoard[]>, {boardId:string, cardId:string, direction: string}>({
      query: ({ boardId, cardId, direction }) => {
        const requestBody = { cardId, direction};
        console.log("Sending PUT request with body:", requestBody);
    
        return {
          url: `?id=${boardId}`, 
          method: 'PATCH',
          body: requestBody,
        };
      },
      invalidatesTags: ['cards'],
    }),
  }),
});

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useUpdateCardPositionMutation,
} = cardsApi;