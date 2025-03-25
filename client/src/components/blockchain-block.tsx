"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Clock, Database, Hash, AlertTriangle } from "lucide-react"
import type { Block } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface BlockchainBlockProps {
  block: Block,
}

export function BlockchainBlock({ block }: BlockchainBlockProps) {
  const [isOpen, setIsOpen] = useState(block.index === 0)


  return (
    <Card className={`border border-muted transition-all duration-300 hover:border-primary/50`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              #{block.index}
            </Badge>
            <CardTitle className="text-lg">{block.index === 0 ? "Genesis Block" : `Block ${block.index}`}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{formatDate(block.timestamp)}</span>
            </Badge>

          </div>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="pb-0 pt-2 cursor-pointer hover:bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Database className="h-4 w-4" />
                <span>{block.index>0?block.transactions.length :0} transactions</span>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Hash className="h-4 w-4" /> Hash
                </h4>
                <div className="p-2 bg-muted rounded-md">
                  <code className="text-xs font-mono break-all">{block.hash}</code>
                </div>
              </div>

              {block.index > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Hash className="h-4 w-4" /> Previous Hash
                  </h4>
                  <div className="p-2 bg-muted rounded-md">
                    <code className="text-xs font-mono break-all">{block.previousHash}</code>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" /> Transactions
                </h4>
                {block.transactions.length > 0 && block.index>0 ? (
                  <div className="space-y-2">
                    {block.transactions.map((tx, idx) => (
                      <div key={idx} className="p-2 bg-muted rounded-md">
                        <div className="text-xs">
                          <span className="font-medium">{tx.sender}</span>
                          {" → "}
                          <span className="font-medium">{tx.recipient}</span>
                          {": "}
                          <span>{tx.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2 bg-muted rounded-md text-xs text-muted-foreground">
                    No transactions in this block
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      <CardFooter className="py-2">
        <div className="w-full text-xs text-muted-foreground">Nonce: {block.nonce}</div>
      </CardFooter>
    </Card>
  )
}

