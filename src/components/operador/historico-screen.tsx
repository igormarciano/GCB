import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { STATUS_META, type Solicitacao } from "@/lib/domain"
import { formatBRL, formatDateBR } from "@/lib/format"

interface HistoricoScreenProps {
  solicitacoes: Solicitacao[]
  onAbrir: (id: string) => void
}

// Tela O3 — Historico (solicitacoes ja decididas, somente leitura).
export function HistoricoScreen({
  solicitacoes,
  onAbrir,
}: HistoricoScreenProps) {
  const decididas = solicitacoes
    .filter((s) => s.status === "APROVADA" || s.status === "REPROVADA")
    .sort((a, b) => b.dataSolicitacao.localeCompare(a.dataSolicitacao))

  return (
    <Card className="py-0">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Solicitacao</TableHead>
              <TableHead>Fornecedor (cedente)</TableHead>
              <TableHead className="text-center">Notas</TableHead>
              <TableHead className="text-right">Valor total</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {decididas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  Nenhuma solicitacao decidida ainda.
                </TableCell>
              </TableRow>
            ) : (
              decididas.map((s) => {
                const meta = STATUS_META[s.status]
                return (
                  <TableRow
                    key={s.id}
                    className="cursor-pointer"
                    onClick={() => onAbrir(s.id)}
                  >
                    <TableCell className="pl-6 font-medium">
                      {s.numero}
                    </TableCell>
                    <TableCell>
                      <div>{s.fornecedor}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.cnpj}
                      </div>
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      {s.notas.length}
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {formatBRL(s.valorTotal)}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {formatDateBR(s.dataSolicitacao)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onAbrir(s.id)
                        }}
                      >
                        Ver detalhe
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
