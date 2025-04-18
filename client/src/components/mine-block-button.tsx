import { Button } from "@/components/ui/button"
import { Loader2, Pickaxe } from "lucide-react"

interface MineBlockButtonProps {
  onMine: () => void
  isMining: boolean
  disabled: boolean
  selector:string
}

export function MineBlockButton({ onMine, isMining, disabled ,selector}: MineBlockButtonProps) {
  return (
    <Button onClick={onMine} disabled={disabled || isMining} className={`${selector} w-full relative overflow-hidden group`}>
      {isMining ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mining Block...
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-50 animate-shimmer" />
        </>
      ) : (
        <>
          <Pickaxe className="mr-2 h-4 w-4 group-hover:animate-bounce" />
          Mine New Block
        </>
      )}
    </Button>
  )
}

