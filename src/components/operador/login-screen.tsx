import { useState } from "react"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginScreenProps {
  onAuth: () => void
}

// Tela O0 — Login do Operador (CEMIG). Auth mockada: qualquer credencial
// preenchida entra. Estado de erro apenas demonstrativo. No produto real a
// autenticacao e AWS Cognito (PRD secao 11), fora do escopo deste prototipo.
export function LoginScreen({ onAuth }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(false)
  const [carregando, setCarregando] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(false)

    if (!email.trim() || !senha.trim()) {
      setErro(true)
      return
    }

    setCarregando(true)
    // Simula uma chamada de autenticacao.
    setTimeout(() => {
      setCarregando(false)
      onAuth()
    }, 600)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center gap-3 text-center">
          <Brand className="justify-center" />
          <div className="space-y-1">
            <CardTitle className="text-xl">Portal do Operador</CardTitle>
            <CardDescription>
              Acesse para analisar e decidir solicitacoes de antecipacao.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@cemig.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={erro}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                aria-invalid={erro}
                autoComplete="current-password"
              />
            </div>

            {erro && (
              <p
                role="alert"
                className="text-sm font-medium text-destructive"
              >
                Credenciais invalidas. Verifique o e-mail e a senha.
              </p>
            )}

            <Button type="submit" className="w-full" disabled={carregando}>
              {carregando ? "Entrando..." : "Acessar portal"}
            </Button>

            <div className="text-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
