const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
const Transaction = require("./transaction.model");
const financeTrackerRoutes = express.Router();
const decodeIDToken = require("./authenticationToken");
app.use(decodeIDToken);
dotenv.config({ path: "./config/config.env" });
const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

financeTrackerRoutes.route("/").post(async (req, res) => {
  console.log(req.body.userId);
  const auth = req.currentUser;
  if (auth) {
    const transactions = await Transaction.find({
      userId: req.body.userId,
    });
    return res.json(transactions.map((transaction) => transaction.toJSON()));
  }
  return res.status(403).send("Not authorized");
});

financeTrackerRoutes.route("/addTransactionDetails").post(async (req, res) => {
  const auth = req.currentUser;
  console.log({ auth });

  if (auth) {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    return res.status(201).json(savedTransaction);
  }
  return res.status(403).send("Not authorized");
});

financeTrackerRoutes.route("/addMonthlyBudget").post(function (req, res) {
  transaction
    .save()
    .then((transaction) => {
      res.status(200).json({ todo: "Budget added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

financeTrackerRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Transaction.findById(id, function (err, todo) {
    res.json(todo);
  });
});

financeTrackerRoutes.route("/update/:id").post(function (req, res) {
  Transaction.findById(req.params.id, function (err, todo) {
    if (!transaction) res.status(404).send("data is not found");
    else transaction.category = req.body.category;
    transaction.item = req.body.item;
    transaction.price = req.body.price;
    transaction.date = req.body.date;
    transaction
      .save()
      .then((transaction) => {
        res.json("Todo updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

financeTrackerRoutes.route("/getTotalExpenses").get(function (req, res) {
  Transaction.aggregate(
    [
      {
        $match: {
          _id: "$_id",
        },
      },
      {
        $group: {
          _id: "$_id",
          balance: { $sum: "$amount" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    }
  );
});

app.use("/api/transactions", financeTrackerRoutes);
