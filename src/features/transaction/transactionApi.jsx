import { apiSlice } from "../api/apiSlice";

const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (userId) => `/transactions/${userId}`,
      transformResponse: (transactions) => transactions.reverse(),
      providesTags: ["Transactions"],
    }),
    postTransaction: builder.mutation({
      query: ({ data, userId }) => ({
        url: "/transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions"],
      async onQueryStarted(transaction, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            userId,
            (draft) => {
              draft.unshift({ ...transaction });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTransaction: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          api.util.updateQueryData("getTransactions", userId, (draft) => {
            return draft.filter((transaction) => transaction._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Transactions"],
    }),
    updateTransaction: builder.mutation({
      query: ({ data, id, userId }) => ({
        url: `/transaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transactions"],
      async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            userId, // Ensure you use the correct userId here if necessary
            (draft) => {
              const index = draft.findIndex(
                (transaction) => transaction.id === id
              );
              if (index !== -1) {
                draft[index] = { ...draft[index], ...data };
              }
            }
          )
        );

        try {
          // Await the completion of the mutation
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
    bulkUploadTransactions: builder.mutation({
      query: ({ formData }) => ({
        url: "/transactions/bulk-upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  usePostTransactionMutation,
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useBulkUploadTransactionsMutation,
} = transactionApi;
