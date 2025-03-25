const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Blockchain = require("./blockchain");

const app = express();
const blockchain = new Blockchain();

app.use(cors());
app.use(bodyParser.json());

app.get("/blockchain", (req, res) => {
  const result={
    blocks:blockchain.chain,
    isValid:blockchain.isChainValid,
    pendingTransactions:blockchain.pendingTransactions,
  }
  res.json(result);
});

app.post("/transaction", (req, res) => {
  const { sender, receiver, amount } = req.body;
  blockchain.addTransaction({ sender, receiver, amount });
  res.json({ message: "Transaction added" });
});

app.post("/mine", (req, res) => {
  const newBlock = blockchain.minePendingTransactions();
  res.json(newBlock);
});

app.post("/reset",(req,res)=>{
  blockchain.resetBlockchain();
  res.json({message:"Reset Successfully!!"})
})

app.get("/validate", (req, res) => {
  const isValid = blockchain.isChainValid();
  res.json({ valid: isValid });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        