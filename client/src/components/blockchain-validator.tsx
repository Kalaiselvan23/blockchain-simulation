import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, AlertTriangle, Shield, RefreshCw, Loader2 } from "lucide-react"

interface BlockchainValidatorProps {
  isValid: boolean
  isLoading: boolean
  onValidate: () => void
}

export function BlockchainValidator({ isValid, isLoading, onValidate }: BlockchainValidatorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Validation</CardTitle>
        <CardDescription>Verify the integrity of the blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Validating blockchain...</p>
          </div>
        ) : (
          <>
            <Alert variant={isValid ? "default" : "destructive"}>
              <Shield className="h-4 w-4" />
              <AlertTitle>{isValid ? "Blockchain is valid" : "Blockchain has been tampered with"}</AlertTitle>
              <AlertDescription>
                {isValid
                  ? "All blocks in the chain are valid and properly linked."
                  : "The hash of one or more blocks does not match its contents or the chain is broken."}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Validation Checks:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  {isValid ? (
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  )}
                  <span>Hash integrity: Each block's hash matches its contents</span>
                </li>
                <li className="flex items-start gap-2">
                  {isValid ? (
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  )}
                  <span>Chain integrity: Each block correctly references the previous block's hash</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onValidate} variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Validate Blockchain
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

