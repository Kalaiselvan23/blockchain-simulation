import { BlockchainDashboard } from "@/components/blockchain-dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BlockchainDashboard />
    </ThemeProvider>
  )
}

