'use client'

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Home, Hotel, Warehouse, ChevronLeft, ChevronRight, Plane, Car, Mountain, Coffee, Trees, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

// 分类选项类型定义
type Category = {
  value: string
  label: string
  icon: React.ElementType
}

// 组件属性类型定义
interface CategoryNavProps {
  onCategoryChange?: (value: string) => void
}

export default function CategoryNav({ onCategoryChange }: CategoryNavProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // 分类选项
  const categories: Category[] = [
    { value: "all", label: "全部房源", icon: Building2 },
    { value: "house", label: "独栋别墅", icon: Home },
    { value: "hotel", label: "酒店套房", icon: Hotel },
    { value: "apartment", label: "公寓民宿", icon: Warehouse },
    { value: "travel", label: "旅行套餐", icon: Plane },
    { value: "car", label: "租车服务", icon: Car },
    { value: "mountain", label: "山地度假", icon: Mountain },
    { value: "beach", label: "海滨假期", icon: BadgeCheck },
    { value: "cafe", label: "咖啡民宿", icon: Coffee },
    { value: "forest", label: "森林木屋", icon: Trees },
  ]

  // 计算是否需要显示滚动按钮
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      const needsScroll = scrollWidth > clientWidth
      setShowLeftScroll(needsScroll && scrollLeft > 0)
      setShowRightScroll(needsScroll && scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // 监听容器大小变化
  useEffect(() => {
    const tabsList = tabsRef.current
    if (tabsList) {
      const resizeObserver = new ResizeObserver(() => {
        checkScroll()
      })

      resizeObserver.observe(tabsList)
      checkScroll()
      tabsList.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)

      return () => {
        resizeObserver.disconnect()
        tabsList.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  // 滚动函数
  const scroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const container = tabsRef.current
      const scrollAmount = container.clientWidth * 0.8
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  // 处理分类切换
  const handleCategoryChange = (value: string) => {
    setActiveTab(value)
    onCategoryChange?.(value)
  }

  return (
    <div className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b">
      <div className="container mx-auto relative">
        <div className="relative flex items-center">
          {/* 左滚动按钮 */}
          {showLeftScroll && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full border shadow-sm hover:bg-accent"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* 可滚动的分类列表 */}
          <div 
            ref={tabsRef}
            className="flex overflow-x-auto scrollbar-none py-3 px-8"
          >
            {categories.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                className={cn(
                  "flex flex-col items-center min-w-[64px] px-3 py-1 transition-colors group",
                  "hover:text-foreground",
                  activeTab === value 
                    ? "text-foreground relative after:absolute after:bottom-[-12px] after:left-[30%] after:right-[30%] after:h-[2px] after:bg-foreground" 
                    : "text-muted-foreground"
                )}
                onClick={() => handleCategoryChange(value)}
              >
                <Icon className="h-[18px] w-[18px] mb-2.5" />
                <span className="text-xs whitespace-nowrap font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* 右滚动按钮 */}
          {showRightScroll && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full border shadow-sm hover:bg-accent"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 