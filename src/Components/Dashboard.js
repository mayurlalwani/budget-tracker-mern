import React, { useContext, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Card } from "antd";
import AddTransactionForm from "./AddTransactionForm";
import TransactionContext from "../context/transactionContext";
const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Payment mode",
    dataIndex: "mode",
    key: "mode",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const Dashboard = (props) => {
  // console.log(props.userId);
  const { userId } = props;
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  console.log(props.isSignedIn, props.userId);
  const transactionContext = useContext(TransactionContext);
  console.log({ transactionContext });

  const { transactions, getTransactions } = transactionContext;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const data = [];

  transactions &&
    transactions.map((transaction) => {
      data.push({
        key: transaction._id,
        category: transaction.category,
        date: transaction.date,
        mode: transaction.paymentMode,
        description: transaction.description,
        amount: transaction.amount,
      });

      return data;
    });

  useEffect(() => {
    let expenses = [];
    let income = [];
    let exp =
      transactions &&
      transactions.map((transaction) => {
        return transaction.transactionType === "expense"
          ? expenses.push(transaction.amount)
          : income.push(transaction.amount);
      });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    setTotalExpenses(expenses.reduce(reducer, 0));
    setTotalIncome(income.reduce(reducer, 0));
    //eslint - disable - next - line;
  }, []);

  useEffect(() => {
    getTransactions({ userId: props.userId });
  }, [props.userId]);

  return (
    <>
      <div className="stats" style={{ display: "flex" }}>
        <Card style={{ width: 300 }}>
          <h1>Income</h1>
          <p>{totalIncome}</p>
        </Card>
        <Card style={{ width: 300 }}>
          <h1>Expenses</h1>
          <p> {totalExpenses} </p>
        </Card>
        <Card style={{ width: 300 }}>
          <h1>Balance</h1>
          <p>90,000</p>
        </Card>
        <Card style={{ width: 300 }}>
          <h1>Budget</h1>
          <p>2,00,000</p>
        </Card>
      </div>

      <AddTransactionForm userId={userId} />

      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
    </>
  );
};

export default Dashboard;
