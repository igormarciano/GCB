import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Tela de Conta (placeholder). Perfil do operador vem do Cognito na v1 real.
export function ContaScreen() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-base">Operador CEMIG</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1 text-sm">
        <div className="text-muted-foreground">operador@cemig.com.br</div>
        <div className="text-muted-foreground">Perfil: Operador (sacado)</div>
      </CardContent>
    </Card>
  )
}
