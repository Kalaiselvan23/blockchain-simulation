import type { Block, Transaction, BlockchainState } from "@/lib/type"

// Generate a random hash-like string
const generateHash = (length = 64): string => {
  const characters = "0123456789abcdef"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Create demo blockchain data
export const createDemoData = (): BlockchainState => {
  // Create genesis block
  const genesisBlock: Block = {
    index: 0,
    timestamp: Date.now() - 1000000,
    transactions: [],
    hash: generateHash(),
    previousHash: "0",
    nonce: 0,
  }

  // Create some demo blocks
  const blocks: Block[] = [genesisBlock]

  // Add some blocks with transactions
  for (let i = 1; i < 5; i++) {
    const transactions: Transaction[] = []

    // Add random transactions to each block
    const numTransactions = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numTransactions; j++) {
      transactions.push({
        sender: `User${Math.floor(Math.random() * 10)}`,
        recipient: `User${Math.floor(Math.random() * 10)}`,
        amount: Number.parseFloat((Math.random() * 100).toFixed(2)),
      })
    }

    blocks.push({
      index: i,
      timestamp: Date.now() - (5 - i) * 100000,
      transactions,
      hash: generateHash(),
      previousHash: blocks[i - 1].hash,
      nonce: Math.floor(Math.random() * 1000),
    })
  }

  // Create some pending transactions
  const pendingTransactions: Transaction[] = [
    {
      sender: "User3",
      recipient: "User7",
      amount: 25.5,
    },
    {
      sender: "User1",
      recipient: "User9",
      amount: 10.75,
    },
  ]

  return {
    blocks,
    pendingTransactions,
    isValid: true,
  }
}

// Simulate API calls
export const fetchBlockchainData = (): Promise<BlockchainState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createDemoData())
    }, 1500)
  })
}

export const addTransaction = (transaction: Transaction): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transaction)
    }, 800)
  })
}

export const mineBlock = (): Promise<Block> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBlock: Block = {
        index: 5,
        timestamp: Date.now(),
        transactions: [
          {
            sender: "User3",
            recipient: "User7",
            amount: 25.5,
          },
          {
            sender: "User1",
            recipient: "User9",
            amount: 10.75,
          },
        ],
        hash: generateHash(),
        previousHash: generateHash(),
        nonce: Math.floor(Math.random() * 1000),
      }
      resolve(newBlock)
    }, 3000)
  })
}

export const validateBlockchain = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.3) // 70% chance of being valid
    }, 1000)
  })
}

export const tamperWithBlock = (index: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false) // Return invalid after tampering
    }, 800)
  })
}

