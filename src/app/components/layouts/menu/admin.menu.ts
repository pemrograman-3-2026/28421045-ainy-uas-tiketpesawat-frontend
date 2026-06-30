import { BadgeCent, Clapperboard, LayoutDashboard, MarsStroke } from "lucide-react"


export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard, label: "dashboard" },
  { to: "/admin/maskapai", icon: LayoutDashboard, label: "Maskapai" },
   { to: "/admin/penumpang", icon: BadgeCent , label: "Penumpang" },
  { to: "/admin/penerbangan", icon: MarsStroke , label: "Penerbangan" },
  { to: "/admin/pemesanan", icon: Clapperboard , label: "Pemesanan" },
  { to: "/admin/pembayaran", icon: BadgeCent , label: "Pembayaran" },
  
]

export type IMenu = typeof adminMenu[0]