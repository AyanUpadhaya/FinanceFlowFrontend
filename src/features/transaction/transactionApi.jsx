import { apiSlice } from "../api/apiSlice";

const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (userId) => `/transactions/${userId}`,
      transformResponse: (transactions) => transactions.reverse(),
    }),
    postTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(transaction, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            undefined,
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
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            undefined,
            (draft) => {
              return draft.filter((transaction) => transaction._id !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    updateTransaction: builder.mutation({
      query: ({ data, id }) => ({
        url: `/transaction/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (transaction) => transaction._id === id
              );
              if (index !== -1) {
                draft[index] = { ...draft[index], ...data };
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
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
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        try {
          const { data: newTransactions } = await queryFulfilled;

          // Manually update the cache with the new transactions
          dispatch(
            transactionApi.util.updateQueryData(
              "getTransactions",
              undefined,
              (draft) => {
                newTransactions.forEach((transaction) => {
                  draft.unshift(transaction);
                });
              }
            )
          );
        } catch (error) {
          console.error("Bulk upload failed:", error);
        }
      },
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
