"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, AlertTriangle, ArrowRight, Loader2, Eye } from "lucide-react"
import { BlockchainBlock } from "@/components/blockchain-block"
import { TransactionForm } from "@/components/transaction-form"
import { MineBlockButton } from "@/components/mine-block-button"
import { BlockchainValidator } from "@/components/blockchain-validator"
import type { Block, Transaction } from "@/lib/types"
import {
  fetchBlockchainData,
  addTransaction as apiAddTransaction,
  mineBlock as apiMineBlock,
  validateBlockchain as apiValidateBlockchain,
  tamperWithBlock as apiTamperWithBlock,
} from "@/lib/demo-data"

import { Position, } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import FlowDiagram from "./FlowDiagram"
import { Lock, FileText } from "lucide-react"
import { useTheme } from './theme-provider';


export function BlockchainDashboard() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isMining, setIsMining] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false)
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const { theme } = useTheme();
  console.log(theme)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchBlockchainData()
        setBlocks(data.blocks)
        setPendingTransactions(data.pendingTransactions)
        setIsValid(data.isValid)
      } catch (error) {
        console.error("Failed to fetch blockchain data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddTransaction = async (transaction: Transaction) => {
    setIsAddingTransaction(true)
    try {
      await apiAddTransaction(transaction)
      setPendingTransactions([...pendingTransactions, transaction])
    } catch (error) {
      console.error("Failed to add transaction:", error)
    } finally {
      setIsAddingTransaction(false)
    }
  }

  const handleMineBlock = async () => {
    if (pendingTransactions.length === 0) return

    setIsMining(true)
    try {
      const newBlock = await apiMineBlock()
      setBlocks([...blocks, newBlock])
      setPendingTransactions([])
      setIsValid(true)
    } catch (error) {
      console.error("Failed to mine block:", error)
    } finally {
      setIsMining(false)
    }
  }

  const handleValidateBlockchain = async () => {
    setIsValidating(true)
    try {
      const valid = await apiValidateBlockchain()
      setIsValid(valid)
    } catch (error) {
      console.error("Failed to validate blockchain:", error)
    } finally {
      setIsValidating(false)
    }
  }

  const handleTamperWithBlock = async (index: number) => {
    if (index <= 0 || index >= blocks.length) return

    try {
      const valid = await apiTamperWithBlock(index)
      setIsValid(valid)
    } catch (error) {
      console.error("Failed to tamper with block:", error)
    }
  }

  const edges = blocks.slice(1).map((block, index) => ({
    id: `edge-${index + 1}`,
    source: blocks[index].index.toString(),
    target: block.index.toString(),
    animated: true,
  }))


  const nodes = blocks.map((block, index) => ({
    id: block.index.toString(),
    position: { x: index * 280, y: 100 },
    data: {
      label: (
        <div
          className={`p-4 border shadow-lg rounded-lg w-48 text-xs text-center
          ${(theme === "dark" || theme==="system") ? "bg-gray-800 border-gray-700 text-white" : "bg-white text-gray-900"}
        `}
        >
          {/* Block Title */}
          <div className={`font-bold text-sm flex items-center justify-center gap-1 ${(theme === "dark" || theme==="system") ? "text-blue-400" : "text-primary"}`}>
            <FileText className="h-4 w-4" />
            Block #{block.index}
          </div>

          {/* Block Hash */}
          <p className={`text-[11px] flex items-center justify-center gap-1 mt-1 ${(theme === "dark" || theme==="system") ? "text-gray-400" : "text-muted-foreground"}`}>
            <Lock className="h-3 w-3" />
            <span className="truncate w-32">{block.hash.slice(0, 10)}...</span>
          </p>

          {/* Transactions Count */}
          <p className={`text-[11px] mt-1 ${(theme === "dark" || theme==="system") ? "text-gray-300" : "text-muted-foreground"}`}>
            Transactions: <span className="font-semibold">{block.transactions.length}</span>
          </p>

          {/* Previous Hash */}
          <p className={`text-[11px] flex items-center justify-center gap-1 mt-1 ${(theme === "dark" || theme==="system") ? "text-gray-400" : "text-muted-foreground"}`}>
            <ArrowRight className="h-3 w-3" />
            <span className="truncate w-32">{block.previousHash.slice(0, 10)}...</span>
          </p>
        </div>
      ),
    },
    type: "default",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }))



  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Simulation</h1>
          <p className="text-muted-foreground">A simple demonstration of blockchain technology</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Blockchain</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={isValid ? "outline" : "destructive"} className="ml-2">
                      {isValid ? (
                        <span className="flex items-center">
                          <Check className="mr-1 h-3 w-3" /> Valid
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <AlertTriangle className="mr-1 h-3 w-3" /> Invalid
                        </span>
                      )}
                    </Badge>

                    <FlowDiagram edges={edges} nodes={nodes} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                  </div>
                </div>
                <CardDescription>
                  {isLoading ? "Loading blockchain data..." : `Current chain length: ${blocks.length} blocks`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-hide p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading blockchain data...</p>
                  </div>
                ) : (
                  blocks.map((block) => (
                    <BlockchainBlock
                      key={block.index}
                      block={block}
                      onTamper={() => handleTamperWithBlock(block.index)}
                    />
                  ))
                )}
              </CardContent>
            </Card>

          </div>

          <div className="space-y-6">
            <Tabs defaultValue="transactions">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="validation">Validation</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>Create a new transaction to be added to the next block</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionForm onAddTransaction={handleAddTransaction} isLoading={isAddingTransaction} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Transactions</CardTitle>
                    <CardDescription>
                      Transactions waiting to be mined: {isLoading ? "..." : pendingTransactions.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[200px] overflow-y-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                        <p className="text-muted-foreground">Loading transactions...</p>
                      </div>
                    ) : pendingTransactions.length > 0 ? (
                      <div className="space-y-2">
                        {pendingTransactions.map((tx, index) => (
                          <div key={index} className="p-3 bg-muted rounded-md text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{tx.sender}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-medium">{tx.recipient}</span>
                            </div>
                            <div className="mt-1 text-muted-foreground">Amount: {tx.amount}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">No pending transactions</div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <MineBlockButton
                      onMine={handleMineBlock}
                      isMining={isMining}
                      disabled={isLoading || pendingTransactions.length === 0}
                    />
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="validation">
                <BlockchainValidator
                  isValid={isValid}
                  isLoading={isLoading || isValidating}
                  onValidate={handleValidateBlockchain}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
