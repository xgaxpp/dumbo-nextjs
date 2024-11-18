'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { User, ClipboardList, Heart, Settings, Building2, DollarSign, Star, BarChart2 } from "lucide-react"

const sidebarNavItems = [
  {
    title: "个人信息",
    href: "/profile",
    icon: User,
  },
  {
    title: "我的订单",
    href: "/profile/orders",
    icon: ClipboardList,
  },
  {
    title: "收藏夹",
    href: "/profile/favorites",
    icon: Heart,
  },
  {
    title: "账号设置",
    href: "/profile/settings",
    icon: Settings,
  },
]

const hostNavItems = [
  {
    title: "房源管理",
    href: "/profile/listings",
    icon: Building2,
  },
  {
    title: "房东订单",
    href: "/profile/host-orders",
    icon: ClipboardList,
  },
  {
    title: "收入统计",
    href: "/profile/earnings",
    icon: DollarSign,
  },
  {
    title: "房客评价",
    href: "/profile/reviews",
    icon: Star,
  },
  {
    title: "数据分析",
    href: "/profile/analytics",
    icon: BarChart2,
  },
]

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname()
  const isHost = true // 这里应该从全局状态或API获取

  return (
    <div className="container max-w-6xl mx-auto flex-1 items-start md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8 pt-[84px]">
      <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <nav className="grid items-start px-4 py-4">
          {/* 用户功能区 */}
          <div className="mb-4">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              个人中心
            </h2>
            <div className="space-y-1">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
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
            </div>
          </div>

          {/* 房东功能区 */}
          {isHost && (
            <div className="mb-4">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                房东中心
              </h2>
              <div className="space-y-1">
                {hostNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
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
              </div>
            </div>
          )}
        </nav>
      </aside>
      <main className="flex w-full flex-col overflow-hidden py-6">
        <div className="mx-auto w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  )
} 