import { BadgeCent, Clapperboard, LayoutDashboard, MarsStroke } from "lucide-react"


export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard, label: "Maskapai" },
  { to: "/admin/genre", icon: MarsStroke , label: "Penerbangan" },
  { to: "/admin/movie", icon: Clapperboard , label: "Pemesanan" },
   { to: "/admin/transaksi", icon: BadgeCent , label: "Pembayaran" },
]

export type IMenu = typeof adminMenu[0]