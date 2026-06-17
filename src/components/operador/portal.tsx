import { useMemo, useState } from "react"
import { Menu } from "lucide-react"

import { OperadorSidebar, type NavKey } from "@/components/operador/sidebar"
import { FilaScreen } from "@/components/operador/fila-screen"
import { DetalheScreen } from "@/components/operador/detalhe-screen"
import { ContaScreen } from "@/components/operador/conta-screen"
import { SOLICITACOES } from "@/lib/mock-data"
import type { Solicitacao } from "@/lib/domain"
import logoCemig from "@/assets/logo-cemig.svg"

type Route =
  | { name: "fila" }
  | { name: "conta" }
  | { name: "detalhe"; id: string }

const HEADER: Record<NavKey, { titulo: string; subtitulo: string }> = {
  fila: {
    titulo: "Fila",
    subtitulo: "Solicitações de antecipação a analisar",
  },
  conta: {
    titulo: "Conta",
    subtitulo: "Seus dados de operador",
  },
}

interface PortalOperadorProps {
  onLogout: () => void
}

export function PortalOperador({ onLogout }: PortalOperadorProps) {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(SOLICITACOES)
  const [route, setRoute] = useState<Route>({ name: "fila" })
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  const navAtivo: NavKey = route.name === "detalhe" ? "fila" : (route.name as NavKey)

  function navegar(key: NavKey) {
    setRoute({ name: key } as Route)
  }

  function registrarDecisao(
    id: string,
    decisao: "APROVADA" | "REPROVADA",
    motivo?: string
  ) {
    const agora = new Date().toISOString()
    setSolicitacoes((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: decisao,
              motivoReprovacao:
                decisao === "REPROVADA" ? motivo : s.motivoReprovacao,
              historico: [
                ...s.historico,
                {
                  rotulo:
                    decisao === "APROVADA"
                      ? "Solicitação aprovada"
                      : "Solicitação reprovada",
                  ator: "Operador CEMIG",
                  data: agora,
                },
              ],
            }
          : s
      )
    )
  }

  const selecionada = useMemo(
    () =>
      route.name === "detalhe"
        ? solicitacoes.find((s) => s.id === route.id)
        : undefined,
    [route, solicitacoes]
  )

  const header = HEADER[navAtivo]

  return (
    <div className="flex min-h-screen bg-background">
      <OperadorSidebar
        active={navAtivo}
        onNavigate={navegar}
        onLogout={onLogout}
        mobileAberto={menuMobileAberto}
        onMobileFechar={() => setMenuMobileAberto(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMenuMobileAberto(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight">
                {header.titulo}
              </h1>
              <p className="hidden truncate text-sm text-muted-foreground sm:block">
                {header.subtitulo}
              </p>
            </div>
          </div>
          <img src={logoCemig} alt="CEMIG" className="h-6 w-auto shrink-0" />
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {route.name === "fila" && (
            <FilaScreen
              solicitacoes={solicitacoes}
              onAbrir={(id) => setRoute({ name: "detalhe", id })}
            />
          )}

          {route.name === "conta" && <ContaScreen />}

          {route.name === "detalhe" &&
            (selecionada ? (
              <DetalheScreen
                solicitacao={selecionada}
                onVoltar={() => setRoute({ name: "fila" })}
                onAprovar={(id) => registrarDecisao(id, "APROVADA")}
                onReprovar={(id, motivo) =>
                  registrarDecisao(id, "REPROVADA", motivo)
                }
              />
            ) : (
              <p className="text-muted-foreground">
                Solicitação não encontrada.
              </p>
            ))}
        </main>
      </div>
    </div>
  )
}
