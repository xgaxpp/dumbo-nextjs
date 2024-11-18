import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Building2, ClipboardList, Settings, Home, DollarSign, Star } from "lucide-react"

const hostNavItems = [
  {
    title: "房源管理",
    href: "/host/listings",
    icon: Building2
  },
  {
    title: "订单管理",
    href: "/host/orders",
    icon: ClipboardList
  },
  {
    title: "收入统计",
    href: "/host/earnings",
    icon: DollarSign
  },
  {
    title: "房客评价",
    href: "/host/reviews",
    icon: Star
  },
  {
    title: "房东设置",
    href: "/host/settings",
    icon: Settings
  }
]

export default function HostSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-20 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
      <div className="flex h-full flex-col">
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold">房东中心</h2>
          <p className="text-sm text-muted-foreground mt-1">管理您的房源和订单</p>
        </div>
        <nav className="grid items-start px-4 py-2">
          {hostNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                  pathname === item.href
                    ? "bg-accent"
                    : "transparent"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
} 