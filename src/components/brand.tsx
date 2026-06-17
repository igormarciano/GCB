import { cn } from "@/lib/utils"
import logoAdiante from "@/assets/logo-adiante-mark.svg"

// Marca Adiante. Simbolo extraido do DS no Figma (node 293-51, variante Azul).
export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <img src={logoAdiante} alt="Adiante" className="h-8 w-auto" />
    </div>
  )
}
