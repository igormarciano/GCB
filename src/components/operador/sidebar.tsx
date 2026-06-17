import { Inbox, User2, LogOut, X } from "lucide-react"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type NavKey = "fila" | "conta"

interface OperadorSidebarProps {
  active: NavKey
  onNavigate: (key: NavKey) => void
  onLogout: () => void
  mobileAberto?: boolean
  onMobileFechar?: () => void
}

const ITENS: { key: NavKey; label: string; icon: typeof Inbox }[] = [
  { key: "fila", label: "Fila", icon: Inbox },
  { key: "conta", label: "Conta", icon: User2 },
]

function NavConteudo({
  active,
  onNavigate,
  onLogout,
  onFechar,
}: {
  active: NavKey
  onNavigate: (key: NavKey) => void
  onLogout: () => void
  onFechar?: () => void
}) {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        <Brand />
        {onFechar && (
          <button
            type="button"
            onClick={onFechar}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Fechar menu"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {ITENS.map((item) => {
          const ativo = item.key === active
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                onNavigate(item.key)
                onFechar?.()
              }}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                ativo
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="border-t p-3">
        <div className="mb-2 px-1">
          <div className="text-sm font-medium">Operador CEMIG</div>
          <div className="truncate text-xs text-muted-foreground">
            operador@cemig.com.br
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </>
  )
}

export function OperadorSidebar({
  active,
  onNavigate,
  onLogout,
  mobileAberto = false,
  onMobileFechar,
}: OperadorSidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
        <NavConteudo
          active={active}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileAberto && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onMobileFechar}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar text-sidebar-foreground shadow-xl">
            <NavConteudo
              active={active}
              onNavigate={onNavigate}
              onLogout={onLogout}
              onFechar={onMobileFechar}
            />
          </aside>
        </div>
      )}
    </>
  )
}
