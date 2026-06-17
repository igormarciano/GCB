import { useMemo, useState } from "react"
import { Search, ListFilter, Check, Clock, CheckCircle2, XCircle, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  STATUS_META,
  type Solicitacao,
  type StatusSolicitacao,
} from "@/lib/domain"
import { formatBRL, formatDateBR } from "@/lib/format"

interface FilaScreenProps {
  solicitacoes: Solicitacao[]
  onAbrir: (id: string) => void
}

const STATUS_FILTRO: { value: StatusSolicitacao | "TODAS"; label: string }[] = [
  { value: "TODAS", label: "Todos os status" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "APROVADA", label: "Aprovada" },
  { value: "REPROVADA", label: "Reprovada" },
]

const PRIORIDADE: Record<StatusSolicitacao, number> = {
  PENDENTE: 0,
  APROVADA: 1,
  REPROVADA: 2,
}

export function FilaScreen({ solicitacoes, onAbrir }: FilaScreenProps) {
  const [busca, setBusca] = useState("")
  const [statusFiltro, setStatusFiltro] = useState<
    StatusSolicitacao | "TODAS"
  >("TODAS")

  const aAnalisar = solicitacoes.filter((s) => s.status === "PENDENTE").length
  const aprovadas = solicitacoes.filter((s) => s.status === "APROVADA").length
  const reprovadas = solicitacoes.filter((s) => s.status === "REPROVADA").length
  const totalOperado = solicitacoes
    .filter((s) => s.status === "APROVADA")
    .reduce((acc, s) => acc + s.valorTotal, 0)

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return solicitacoes
      .filter((s) => {
        const casaStatus = statusFiltro === "TODAS" || s.status === statusFiltro
        const casaBusca =
          !termo ||
          s.fornecedor.toLowerCase().includes(termo) ||
          s.numero.toLowerCase().includes(termo)
        return casaStatus && casaBusca
      })
      .sort((a, b) => {
        const p = PRIORIDADE[a.status] - PRIORIDADE[b.status]
        if (p !== 0) return p
        return a.dataSolicitacao.localeCompare(b.dataSolicitacao)
      })
  }, [solicitacoes, busca, statusFiltro])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Visao geral
        </h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <ResumoCard rotulo="A analisar" valor={aAnalisar} Icon={Clock} iconClass="text-warning" />
          <ResumoCard rotulo="Aprovadas" valor={aprovadas} Icon={CheckCircle2} iconClass="text-success" />
          <ResumoCard rotulo="Reprovadas" valor={reprovadas} Icon={XCircle} iconClass="text-destructive" />
          <ResumoCardValor rotulo="Total operado" valor={totalOperado} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por fornecedor ou numero"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-8 bg-white"
            aria-label="Buscar solicitacoes"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-start sm:w-56 bg-white">
              <ListFilter className="size-4" />
              {STATUS_FILTRO.find((f) => f.value === statusFiltro)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {STATUS_FILTRO.map((f) => (
              <DropdownMenuItem
                key={f.value}
                onClick={() => setStatusFiltro(f.value)}
              >
                <span className="flex-1">{f.label}</span>
                {statusFiltro === f.value && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
              {linhas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Nenhuma solicitacao encontrada com esses filtros.
                  </TableCell>
                </TableRow>
              ) : (
                linhas.map((s) => {
                  const meta = STATUS_META[s.status]
                  return (
                    <TableRow
                      key={s.id}
                      className="group cursor-pointer"
                      onClick={() => onAbrir(s.id)}
                    >
                      <TableCell className="py-5 pl-6 font-medium">
                        {s.numero}
                      </TableCell>
                      <TableCell className="py-5">
                        <div>{s.fornecedor}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.cnpj}
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center tabular-nums">
                        {s.notas.length}
                      </TableCell>
                      <TableCell className="py-5 text-right font-semibold tabular-nums">
                        {formatBRL(s.valorTotal)}
                      </TableCell>
                      <TableCell className="py-5 text-muted-foreground tabular-nums">
                        {formatDateBR(s.dataSolicitacao)}
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                      </TableCell>
                      <TableCell
                        className="py-5 pr-6 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          variant={s.status === "PENDENTE" ? "default" : "ghost"}
                          className={cn(
                            s.status !== "PENDENTE" && "text-muted-foreground"
                          )}
                          onClick={() => onAbrir(s.id)}
                        >
                          {s.status === "PENDENTE" ? "Analisar" : "Ver detalhe"}
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
    </div>
  )
}

function ResumoCard({
  rotulo,
  valor,
  Icon,
  iconClass,
}: {
  rotulo: string
  valor: number
  Icon: React.ElementType
  iconClass?: string
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{rotulo}</div>
            <div className="mt-1 text-3xl font-semibold tabular-nums">{valor}</div>
          </div>
          <Icon className={`size-5 mt-0.5 ${iconClass ?? "text-muted-foreground"}`} />
        </div>
      </CardContent>
    </Card>
  )
}

function ResumoCardValor({ rotulo, valor }: { rotulo: string; valor: number }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{rotulo}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {formatBRL(valor)}
            </div>
          </div>
          <TrendingUp className="size-5 mt-0.5 text-primary" />
        </div>
      </CardContent>
    </Card>
  )
}
