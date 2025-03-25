import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import type { Transaction } from "@/lib/types"

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void
  isLoading?: boolean
}

export function TransactionForm({ onAddTransaction, isLoading = false }: TransactionFormProps) {
  const [sender, setSender] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sender || !recipient || !amount) return

    const transaction: Transaction = {
      sender,
      recipient,
      amount: Number.parseFloat(amount),
    }

    onAddTransaction(transaction)
    setSender("")
    setRecipient("")
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sender">Sender</Label>
        <Input
          id="sender"
          placeholder="Enter sender address"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient</Label>
        <Input
          id="recipient"
          placeholder="Enter recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Transaction"
        )}
      </Button>
    </form>
  )
}

