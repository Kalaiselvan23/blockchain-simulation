const CryptoJS = require("crypto-js");

/**
 * Class representing a single block in the blockchain.
 */
class Block {
  /**
   * Creates a new Block.
   * @param {number} index - Position of the block in the blockchain.
   * @param {number} timestamp - Time when the block is created.
   * @param {Array|Object} transactions - Transactions included in this block.
   * @param {string} previousHash - Hash of the previous block in the chain.
   */
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index; // Block number
    this.timestamp = timestamp; // Block creation time
    this.transactions = transactions; // Transactions in this block
    this.previousHash = previousHash; // Reference to previous block's hash
    this.nonce = 0; // Counter for proof-of-work
    this.hash = this.calculateHash(); // Unique hash for this block
  }

  /**
   * Calculates the hash of the block based on its properties.
   * @returns {string} - SHA-256 hash of the block data.
   */
  calculateHash() {
    return CryptoJS.SHA256(
      this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce
    ).toString();
  }

  /**
   * Implements proof-of-work by requiring the hash to start with a certain number of zeros.
   * @param {number} difficulty - The number of leading zeros required in the hash.
   */
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

/**
 * Class representing the entire blockchain.
 */
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; // Array holding all blocks
    this.difficulty = 2; // Difficulty level for proof-of-work
    this.pendingTransactions = []; // Transactions waiting to be added to a block
  }

  /**
   * Creates the first block in the blockchain (Genesis Block).
   * @returns {Block} - The genesis block.
   */
  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  /**
   * Retrieves the last block in the blockchain.
   * @returns {Block} - The most recent block in the chain.
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Adds a new transaction to the pending transactions pool.
   * @param {Object} transaction - The transaction object containing sender, receiver, and amount.
   */
  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  /**
   * Mines a new block with all pending transactions and adds it to the blockchain.
   * @returns {Block} - The newly mined block.
   */
  minePendingTransactions() {
    const newBlock = new Block(
      this.chain.length, // Block index
      Date.now(), // Current timestamp
      this.pendingTransactions, // Transactions to be included
      this.getLatestBlock().hash // Link to previous block
    );

    newBlock.mineBlock(this.difficulty); // Perform proof-of-work
    this.chain.push(newBlock); // Add the mined block to the blockchain
    this.pendingTransactions = []; // Clear pending transactions

    return newBlock;
  }

  /**
   * Validates the blockchain by checking hashes and previous block references.
   * @returns {boolean} - Returns true if the blockchain is valid, otherwise false.
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if the stored hash is still valid
      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      // Ensure the previous hash is correctly referenced
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
