// Maquina de estados (simplificada para o prototipo): a Solicitacao de
// Antecipacao vive em tres estados de decisao.
export type StatusSolicitacao = "PENDENTE" | "APROVADA" | "REPROVADA"

import type { badgeVariants } from "@/components/ui/badge"
import type { VariantProps } from "class-variance-authority"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

// Mapa semantico de status. A cor carrega significado, nao e decorativa,
// e e mantida igual em todas as superficies.
export const STATUS_META: Record<
  StatusSolicitacao,
  { label: string; variant: BadgeVariant }
> = {
  PENDENTE: { label: "Pendente", variant: "warning" },
  APROVADA: { label: "Aprovada", variant: "success" },
  REPROVADA: { label: "Reprovada", variant: "destructive" },
}

export interface Nota {
  numero: string
  valor: number
  vencimento: string // ISO
}

export interface EventoAuditoria {
  rotulo: string
  ator: string
  data: string // ISO
}

export interface Solicitacao {
  id: string
  numero: string
  fornecedor: string
  cnpj: string
  valorTotal: number
  dataSolicitacao: string // ISO
  status: StatusSolicitacao
  notas: Nota[]
  motivoReprovacao?: string
  historico: EventoAuditoria[]
}
