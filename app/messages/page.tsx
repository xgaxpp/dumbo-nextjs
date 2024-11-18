import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Bell, ShoppingCart, Settings, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 通知类型定义
type NotificationType = 'order' | 'system' | 'review'

interface Notification {
  id: string
  type: NotificationType
  title: string
  content: string
  time: string
  isRead: boolean
}

// 通知图标映射
const notificationIcons = {
  order: ShoppingCart,
  system: Settings,
  review: Star,
}

// 通知类型标签映射
const notificationLabels = {
  order: '订单通知',
  system: '系统通知',
  review: '评价通知',
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: '新订单通知',
    content: '您有一个新的订单待确认，订单号：ORD20240220001',
    time: '10分钟前',
    isRead: false,
  },
  {
    id: '2',
    type: 'system',
    title: '系统通知',
    content: '您的房源信息已通过核，现在可以接受预订了',
    time: '1小时前',
    isRead: true,
  },
  {
    id: '3',
    type: 'review',
    title: '新评价通知',
    content: '房客"张三"对您的房源"东京湾希尔顿酒店"发表了新的评价',
    time: '2小时前',
    isRead: false,
  },
  {
    id: '4',
    type: 'order',
    title: '订单状态更新',
    content: '订单号 ORD20240219001 的房客已完成入住',
    time: '3小时前',
    isRead: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="container mx-auto pt-[84px] pb-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-semibold">消息通知</h1>
            <p className="text-sm text-muted-foreground mt-2">
              查看您的所有通知
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索通知" 
              className="pl-9 w-[200px]"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="w-full justify-start border-b rounded-none h-14 bg-transparent px-2">
            <TabsTrigger value="all" className="flex gap-2 data-[state=active]:bg-transparent">
              全部
              <Badge variant="secondary">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="order" className="flex gap-2 data-[state=active]:bg-transparent">
              订单通知
              <Badge variant="secondary">
                {notifications.filter(n => n.type === 'order').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex gap-2 data-[state=active]:bg-transparent">
              系统通知
              <Badge variant="secondary">
                {notifications.filter(n => n.type === 'system').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex gap-2 data-[state=active]:bg-transparent">
              评价通知
              <Badge variant="secondary">
                {notifications.filter(n => n.type === 'review').length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8 px-2">
            <div className="space-y-6">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-2 -mx-2 rounded-lg hover:bg-accent/40 transition-colors">
                  <NotificationCard notification={notification} />
                </div>
              ))}
            </div>
          </TabsContent>

          {(['order', 'system', 'review'] as const).map((type) => (
            <TabsContent key={type} value={type} className="mt-8 px-2">
              <div className="space-y-6">
                {notifications
                  .filter(n => n.type === type)
                  .map((notification) => (
                    <div key={notification.id} className="p-2 -mx-2 rounded-lg hover:bg-accent/40 transition-colors">
                      <NotificationCard notification={notification} />
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

// 通知卡片组件
function NotificationCard({ notification }: { notification: Notification }) {
  const Icon = notificationIcons[notification.type]

  return (
    <Link href={`/messages/${notification.id}`}>
      <Card 
        className={cn(
          "transition-colors border-0 shadow-none",
          !notification.isRead && "bg-accent/50"
        )}
      >
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-base">{notification.title}</span>
                    {!notification.isRead && (
                      <Badge variant="default" className="h-5">新</Badge>
                    )}
                    <Badge variant="outline">
                      {notificationLabels[notification.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification.content}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 