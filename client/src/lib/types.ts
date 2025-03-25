export interface Transaction {
    sender: string
    recipient: string
    amount: number
  }
  
  export interface Block {
    index: number
    timestamp: number
    transactions: Transaction[]
    hash: string
    previousHash: string
    nonce: number
  }
  
  export interface BlockchainState {
    blocks: Block[]
    pendingTransactions: Transaction[]
    isValid: boolean
  }
  
  