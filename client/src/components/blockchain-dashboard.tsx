import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Loader2, FileQuestion } from "lucide-react"
import { BlockchainBlock } from "@/components/blockchain-block"
import { TransactionForm } from "@/components/transaction-form"
import { MineBlockButton } from "@/components/mine-block-button"
import { BlockchainValidator } from "@/components/blockchain-validator"
import { BlockchainState, type Block, type Transaction } from "@/lib/types"

import { Position, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowDiagram from "./FlowDiagram"
import { Lock, FileText } from "lucide-react"
import { useTheme } from './theme-provider';
import { ApiRequest } from "@/lib/Api"
import { Button } from "./ui/button"
import { TourProvider, useTour } from '@reactour/tour';

export function BlockchainDashboard() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isMining, setIsMining] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false)
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  

  const tourSteps = [
    {
      selector: '.header-title',
      content: "Welcome to the Blockchain Simulation! Let's take a quick tour.",
    },
    {
      selector: '.blockchain-card',
      content: "This section displays the blockchain and its blocks. Each block contains transactions and is cryptographically linked to the previous block.",
    },
    {
      selector: '.transactions-tab',
      content: "Click here to add transactions that will be included in the next block.",
    },
    {
      selector: '.transaction-form',
      content: "Use this form to create new transactions by specifying sender, recipient, and amount.",
    },
    {
      selector: '.pending-transactions',
      content: "Pending transactions wait here until they're mined into a new block.",
    },
    {
      selector: '.mine-block-button',
      content: "After adding transactions, use this button to mine a new block. Mining creates a new block with pending transactions.",
    },
    {
      selector: '.validation-tab',
      content: "Use this section to validate the blockchain's integrity. It checks if all blocks are properly linked.",
    },
    {
      selector: '.flow-diagram-button',
      content: "Click here to view a visual representation of the blockchain.",
    },
  ];

  const fetchBlockchainData=async()=>{
    const data = await ApiRequest<BlockchainState>("GET", "blockchain");
    return data;
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchBlockchainData();
      setBlocks(data.blocks)
      setPendingTransactions(data.pendingTransactions)
      setIsValid(data.isValid)
    } catch (error) {
      console.error("Failed to fetch blockchain data:", error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  const handleAddTransaction = async (transaction: Transaction) => {
    setIsAddingTransaction(true)
    try {
      await ApiRequest("POST", "transaction", transaction)
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
      const newBlock = await ApiRequest<Block>("POST", "mine");
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
      const valid = await ApiRequest<{ valid: boolean }>("GET", "validate")
      setIsValid(valid.valid)
    } catch (error) {
      console.error("Failed to validate blockchain:", error)
    } finally {
      setIsValidating(false)
    }
  }

  const handleResetBlockChain=async()=>{
    try{
      const data=await ApiRequest<{message:string}>("POST","reset");
      loadData();
    }
    catch(err){
      console.log(err);
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
          ${(theme === "dark" || theme === "system") ? "bg-gray-800 border-gray-700 text-white" : "bg-white text-gray-900"}
        `}
        >
          <div className={`font-bold text-sm flex items-center justify-center gap-1 ${(theme === "dark" || theme === "system") ? "text-blue-400" : "text-primary"}`}>
            <FileText className="h-4 w-4" />
            Block #{block.index}
          </div>
          <p className={`text-[11px] flex items-center justify-center gap-1 mt-1 ${(theme === "dark" || theme === "system") ? "text-gray-400" : "text-muted-foreground"}`}>
            <Lock className="h-3 w-3" />
            <span className="truncate w-32">{block.hash.slice(0, 10)}...</span>
          </p>
          <p className={`text-[11px] mt-1 ${(theme === "dark" || theme === "system") ? "text-gray-300" : "text-muted-foreground"}`}>
            Transactions: <span className="font-semibold">{block.transactions.length}</span>
          </p>
          <p className={`text-[11px] flex items-center justify-center gap-1 mt-1 ${(theme === "dark" || theme === "system") ? "text-gray-400" : "text-muted-foreground"}`}>
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
    <TourProvider 
      steps={tourSteps}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor:( theme === 'dark' || theme==="system") ? '#1e1e1e' : '#ffffff',
          color: (theme === 'dark' || theme === "system") ? '#ffffff' : '#000000',
        }),
        maskArea: (base) => ({
          ...base,
          rx: 8,
        }),
        maskWrapper: (base) => ({
          ...base,
          color: (theme === 'dark' || theme === "system")  ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
        }),
      }}
    >
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-2 flex justify-between items-center header-title">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blockchain Simulation</h1>
              <p className="text-muted-foreground">A simple demonstration of blockchain technology</p>
            </div>
            <div className="flex gap-2">
            <TourButton />
            <Button variant={"destructive"} onClick={handleResetBlockChain}>Reset</Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="blockchain-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Blockchain</CardTitle>
                    <div className="flex gap-2">
                      {/* <Badge variant={isValid ? "outline" : "destructive"} className="ml-2">
                        {isValid ? (
                          <span className="flex items-center">
                            <Check className="mr-1 h-3 w-3" /> Valid
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Invalid
                          </span>
                        )}
                      </Badge> */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flow-diagram-button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        View Diagram
                      </Button>
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
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="transactions">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="transactions" className="transactions-tab">Transactions</TabsTrigger>
                  <TabsTrigger value="validation" className="validation-tab">Validation</TabsTrigger>
                </TabsList>

                <TabsContent value="transactions" className="space-y-4">
                  <Card className="transaction-form">
                    <CardHeader>
                      <CardTitle>Add Transaction</CardTitle>
                      <CardDescription>Create a new transaction to be added to the next block</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionForm onAddTransaction={handleAddTransaction} isLoading={isAddingTransaction} />
                    </CardContent>
                  </Card>

                  <Card className="pending-transactions">
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
                        selector="mine-block-button"
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
        
        <FlowDiagram edges={edges} nodes={nodes} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </TourProvider>
  )
}

function TourButton() {
  const { setIsOpen } = useTour();
  
  return (
    <Button 
      onClick={() => setIsOpen(true)} 
      variant="default"
      className="ml-4"
    >
      <FileQuestion/>
      Start Tour
    </Button>
  );
}