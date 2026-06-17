import { Inbox, User2, LogOut } from "lucide-react"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type NavKey = "fila" | "conta"

interface OperadorSidebarProps {
  active: NavKey
  onNavigate: (key: NavKey) => void
  onLogout: () => void
}

export function OperadorSidebar({
  active,
  onNavigate,
  onLogout,
}: OperadorSidebarProps) {
  const itens: { key: NavKey; label: string; icon: typeof Inbox }[] = [
    { key: "fila", label: "Fila", icon: Inbox },
    { key: "conta", label: "Conta", icon: User2 },
  ]

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center border-b px-4">
        <Brand />
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {itens.map((item) => {
          const ativo = item.key === active
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring",
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
    </aside>
  )
}
