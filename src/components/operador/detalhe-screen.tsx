import { useState } from "react"
import { ArrowLeft, Check, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { STATUS_META, type Solicitacao } from "@/lib/domain"
import { formatBRL, formatDateBR } from "@/lib/format"

interface DetalheScreenProps {
  solicitacao: Solicitacao
  onVoltar: () => void
  onAprovar: (id: string) => void
  onReprovar: (id: string, motivo: string) => void
}

export function DetalheScreen({
  solicitacao,
  onVoltar,
  onAprovar,
  onReprovar,
}: DetalheScreenProps) {
  const meta = STATUS_META[solicitacao.status]
  const pendente = solicitacao.status === "PENDENTE"

  const [confirmarAprovar, setConfirmarAprovar] = useState(false)
  const [abrirReprovar, setAbrirReprovar] = useState(false)
  const [motivo, setMotivo] = useState("")
  const [processando, setProcessando] = useState(false)

  function aprovar() {
    setProcessando(true)
    setTimeout(() => {
      onAprovar(solicitacao.id)
      setProcessando(false)
      setConfirmarAprovar(false)
    }, 500)
  }

  function reprovar() {
    if (!motivo.trim()) return
    setProcessando(true)
    setTimeout(() => {
      onReprovar(solicitacao.id, motivo.trim())
      setProcessando(false)
      setAbrirReprovar(false)
    }, 500)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 text-muted-foreground"
        onClick={onVoltar}
      >
        <ArrowLeft className="size-4" />
        Voltar para a fila
      </Button>

      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Solicitação {solicitacao.numero}
        </h2>
        <Badge variant={meta.variant}>{meta.label}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fornecedor (cedente)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1 text-sm">
          <div className="font-medium">{solicitacao.fornecedor}</div>
          <div className="text-muted-foreground">CNPJ {solicitacao.cnpj}</div>
          <div className="text-muted-foreground">
            Solicitada em {formatDateBR(solicitacao.dataSolicitacao)}
          </div>
        </CardContent>
      </Card>

      <Card className="py-0">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 font-semibold text-foreground">Nota fiscal</TableHead>
                <TableHead className="font-semibold text-foreground">Sacado</TableHead>
                <TableHead className="font-semibold text-foreground">Vencimento</TableHead>
                <TableHead className="pr-6 text-right font-semibold text-foreground">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solicitacao.notas.map((n) => (
                <TableRow key={n.numero}>
                  <TableCell className="pl-6 font-medium">{n.numero}</TableCell>
                  <TableCell className="text-muted-foreground">CEMIG</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {formatDateBR(n.vencimento)}
                  </TableCell>
                  <TableCell className="pr-6 text-right tabular-nums">
                    {formatBRL(n.valor)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 hover:bg-transparent">
                <TableCell className="pl-6 font-semibold" colSpan={3}>
                  Valor total
                </TableCell>
                <TableCell className="pr-6 text-right font-semibold tabular-nums">
                  {formatBRL(solicitacao.valorTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className={pendente ? "border-primary/30" : undefined}>
        <CardHeader>
          <CardTitle className="text-base">Decisão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendente ? (
            <>
              <p className="text-sm text-muted-foreground">
                A decisão será comunicada ao fornecedor por e-mail e no portal.
                A aprovação é por inteiro, sem aprovação parcial.
              </p>
              <div className="flex gap-2">
                <Button
                  className="bg-success text-success-foreground hover:bg-success/90"
                  onClick={() => setConfirmarAprovar(true)}
                >
                  <Check className="size-4" />
                  Aprovar solicitação
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setAbrirReprovar(true)}
                >
                  <X className="size-4" />
                  Reprovar
                </Button>
              </div>
            </>
          ) : solicitacao.status === "APROVADA" ? (
            <div className="rounded-md border border-success/30 bg-success/10 p-3 text-sm">
              <div className="font-medium text-foreground">Solicitação aprovada</div>
              <p className="mt-1 text-muted-foreground">
                O fornecedor foi avisado. O crédito cai na conta em até 24h
                após o desembolso da CEMIG.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm">
              <div className="font-medium text-foreground">Solicitação reprovada</div>
              {solicitacao.motivoReprovacao && (
                <p className="mt-1 text-muted-foreground">
                  {solicitacao.motivoReprovacao}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmarAprovar} onOpenChange={setConfirmarAprovar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar solicitação {solicitacao.numero}?</DialogTitle>
            <DialogDescription>
              {solicitacao.notas.length} nota(s) &middot;{" "}
              {formatBRL(solicitacao.valorTotal)} para {solicitacao.fornecedor}.
              As notas passam a Antecipado e o fornecedor é notificado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmarAprovar(false)}
              disabled={processando}
            >
              Voltar
            </Button>
            <Button
              className="bg-success text-success-foreground hover:bg-success/90"
              onClick={aprovar}
              disabled={processando}
            >
              {processando ? "Aprovando..." : "Confirmar aprovação"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={abrirReprovar} onOpenChange={setAbrirReprovar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar solicitação {solicitacao.numero}</DialogTitle>
            <DialogDescription>
              O motivo aparece para o fornecedor. Seja claro e construtivo para
              reduzir retrabalho.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Descreva o motivo da reprovação"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={4}
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAbrirReprovar(false)}
              disabled={processando}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={reprovar}
              disabled={processando || !motivo.trim()}
            >
              {processando ? "Reprovando..." : "Confirmar reprovação"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
