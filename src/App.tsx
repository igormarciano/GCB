import { useState } from "react"

import { LoginScreen } from "@/components/operador/login-screen"
import { PortalOperador } from "@/components/operador/portal"

function App() {
  const [autenticado, setAutenticado] = useState(false)

  if (!autenticado) {
    return <LoginScreen onAuth={() => setAutenticado(true)} />
  }

  return <PortalOperador onLogout={() => setAutenticado(false)} />
}

export default App
