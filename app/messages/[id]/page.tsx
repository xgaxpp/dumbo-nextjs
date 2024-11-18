import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronLeft, ShoppingCart, Settings, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// 通知类型定义
type NotificationType = 'order' | 'system' | 'review'

// 通知图标映射
const notificationIcons = {
  order: ShoppingCart,
  system: Settings,
  review: Star,
}

// 添加索引签名
interface NotificationsMap {
  [key: string]: {
    id: string;
    type: NotificationType;
    title: string;
    content: string;
    time: string;
    isRead: boolean;
    details: any; // 或者定义更具体的类型
  };
}

// 模拟通知数据
const notifications: NotificationsMap = {
  '1': {
    id: '1',
    type: 'order' as NotificationType,
    title: '新订单通知',
    content: '您有一个新的订单待确认',
    time: '2024-02-20 10:30:00',
    isRead: false,
    details: {
      orderNumber: 'ORD20240220001',
      guest: '张三',
      checkIn: '2024-03-01',
      checkOut: '2024-03-03',
      property: '东京湾希尔顿酒店',
      amount: '¥2,888',
    }
  },
  '2': {
    id: '2',
    type: 'system' as NotificationType,
    title: '系统通知',
    content: '您的房源信息已通过审核',
    time: '2024-02-20 09:30:00',
    isRead: true,
    details: {
      propertyName: '东京湾希尔顿酒店',
      auditTime: '2024-02-20 09:30:00',
      auditResult: '通过',
      remarks: '恭喜您的房源已通过审核，现在可以开始接受预订了。',
    }
  },
  '3': {
    id: '3',
    type: 'review' as NotificationType,
    title: '新评价通知',
    content: '有房客对您的房源发表了新的评价',
    time: '2024-02-20 08:30:00',
    isRead: false,
    details: {
      guest: '张三',
      property: '东京湾希尔顿酒店',
      rating: 4.8,
      comment: '房间非常干净整洁，位置很好，靠近地铁站，房东服务也很周到。下次来东京还会选择这里。',
      reviewTime: '2024-02-20 08:30:00',
    }
  }
}

export default function NotificationDetailPage({ params }: { params: { id: string } }) {
  const notification = notifications[params.id]
  const Icon = notificationIcons[notification.type]

  const renderDetails = () => {
    switch (notification.type) {
      case 'order':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">订单详情</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">订单编号</span>
                <span className="font-medium">{notification.details.orderNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">房客姓名</span>
                <span className="font-medium">{notification.details.guest}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">入住时间</span>
                <span className="font-medium">
                  {notification.details.checkIn} 至 {notification.details.checkOut}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">房源名称</span>
                <span className="font-medium">{notification.details.property}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">订单金额</span>
                <span className="font-medium">{notification.details.amount}</span>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline">拒绝订单</Button>
              <Button>确认订单</Button>
            </div>
          </div>
        )

      case 'system':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">审核详情</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">房源名称</span>
                <span className="font-medium">{notification.details.propertyName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">审核时间</span>
                <span className="font-medium">{notification.details.auditTime}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">审核结果</span>
                <Badge variant="outline">{notification.details.auditResult}</Badge>
              </div>
              <div className="py-2 border-b">
                <div className="text-muted-foreground mb-2">备注说明</div>
                <p className="text-sm">{notification.details.remarks}</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button>查看房源</Button>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">评价详情</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">房源名称</span>
                <span className="font-medium">{notification.details.property}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">评价房客</span>
                <span className="font-medium">{notification.details.guest}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">评分</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{notification.details.rating}</span>
                </div>
              </div>
              <div className="py-2 border-b">
                <div className="text-muted-foreground mb-2">评价内容</div>
                <p className="text-sm">{notification.details.comment}</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">评价时间</span>
                <span className="font-medium">{notification.details.reviewTime}</span>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button>回复评价</Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto pt-[84px] pb-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/messages">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            返回通知列表
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle>{notification.title}</CardTitle>
                  <Badge variant="outline">
                    {notification.type === 'order' ? '订单通知' : 
                     notification.type === 'system' ? '系统通知' : '评价通知'}
                  </Badge>
                </div>
                <CardDescription>
                  {notification.time}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {notification.content}
              </p>
            </div>
            {renderDetails()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 