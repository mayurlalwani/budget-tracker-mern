import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  Radio,
  Button,
} from "antd";

const AddTransactionForm = ({ userId, addTransaction }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [transaction, setTransaction] = useState({
    transactionType: "expense",
    category: "",
    description: "",
    mode: "cash",
    amount: 0,
    userId: userId,
  });
  const onFormLayoutChange = (e) => ({ size }) => {
    setComponentSize(size);
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    addTransaction(transaction);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleChangeAmount = (value) => {
    setTransaction({ ...transaction, amount: value });
  };

  const handleChangeDescription = (e) => {
    setTransaction({ ...transaction, description: e.target.value });
  };

  const onChangeDate = (date, dateString) => {
    setTransaction({ ...transaction, date: dateString });
  };

  const handleChangeCategory = (value) => {
    setTransaction({ ...transaction, category: value });
  };
  const {
    transactionType,
    paymentMode,
    amount,
    description,
    category,
  } = transaction;
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Transaction
      </Button>
      <Modal
        title="Add New Transaction"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item name="radio-group">
            <input
              type="radio"
              placeholder="name"
              name="transactionType"
              value={"income"}
              checked={transactionType === "income"}
              onChange={handleChange}
            />
            Income
            <input
              type="radio"
              placeholder="name"
              name="transactionType"
              value={"expense"}
              checked={transactionType === "expense"}
              onChange={handleChange}
            />
            Expense
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item label="Item Name">
            <Input
              name="description"
              value={description}
              onChange={handleChangeDescription}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select name="category" onChange={handleChangeCategory}>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value={"Online Course"}>
                Online Course
              </Select.Option>
              <Select.Option value={"Mobile Recharge"}>
                Mobile Recharge
              </Select.Option>
              <Select.Option value={"Food"}>Food</Select.Option>
              <Select.Option value={"Clothing"}>Clothing</Select.Option>
              <Select.Option value={"Clothing"}>Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Amount" name="amount">
            <InputNumber
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
            />
          </Form.Item>

          <Form.Item name="radio-group">
            <input
              type="radio"
              placeholder="name"
              name="paymentMode"
              value={"Cash"}
              checked={paymentMode === "Cash"}
              onChange={handleChange}
            />
            Cash
            <input
              type="radio"
              placeholder="name"
              name="paymentMode"
              value={"Debit Card"}
              checked={paymentMode === "Debit Card"}
              onChange={handleChange}
            />
            Debit Card
            <input
              type="radio"
              placeholder="name"
              name="paymentMode"
              value={"Credit Card"}
              checked={paymentMode === "Credit Card"}
              onChange={handleChange}
            />
            Credit Card
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTransactionForm;
