import React from "react";
import { useSelector } from "react-redux";
import DataSection from "../components/pages/Home/DataSection";
import ChartSection from "../components/pages/Home/ChartSection";
import TableSection from "../components/pages/Home/TableSection";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi";
import RequestLoader from "../components/modals/RequestLoader";
import ErrorPage from "../components/ui/ErrorPage";
import CardsSkeletons from "../components/skeleton/CardsSkeletons";
import HeaderSkeleton from "../components/skeleton/HeaderSkeleton";
import ChartsSkeleton from "../components/skeleton/ChartsSkeleton";
import { ErrorNotify } from "../utils/getNotify";

const Home = () => {
  const { auth } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetTransactionsQuery(
    auth?._id
  );

  if (isLoading) {
    return (
      <div>
        <HeaderSkeleton></HeaderSkeleton>
        <CardsSkeletons></CardsSkeletons>
        <ChartsSkeleton></ChartsSkeleton>
      </div>
    );
  }
  if(isError){
    ErrorNotify(error?.data?.message);
  }

  let totalIncome = data
    ?.filter((trx) => trx.trxType === "INCOME")
    ?.reduce((sum, trx) => sum + trx.trxAmount, 0);
  let totalExpense = data
    ?.filter((trx) => trx.trxType === "EXPENSE")
    .reduce((sum, trx) => sum + trx.trxAmount, 0);
  let currentBalance = totalIncome - totalExpense;

  const extractedInfo = {
    current_balance: currentBalance,
    total_income: totalIncome,
    total_expense: totalExpense,
  };

  return (
    <div>
      <div className="bg-light pt-15">
        <DataSection extractedInfo={extractedInfo} />
        <ChartSection data={data} />
        <TableSection data={data} />
      </div>
    </div>
  );
};

export default Home;
