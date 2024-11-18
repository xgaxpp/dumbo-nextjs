import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// 订单状态类型
type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

// 订单状态配置
const orderStatuses: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '待确认', color: 'bg-yellow-500/10 text-yellow-500' },
  confirmed: { label: '已确认', color: 'bg-green-500/10 text-green-500' },
  completed: { label: '已完成', color: 'bg-blue-500/10 text-blue-500' },
  cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-500' }
}

// 模拟订单数据
const orders = [
  {
    id: '1',
    orderNumber: 'ORD20240220001',
    status: 'confirmed' as OrderStatus,
    property: {
      title: '东京湾希尔顿酒店',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
      location: '东京·涩谷区',
    },
    booking: {
      checkIn: '2024-03-01',
      checkOut: '2024-03-03',
      amount: '¥2,888',
    }
  },
  {
    id: '2',
    orderNumber: 'ORD20240219001',
    status: 'pending' as OrderStatus,
    property: {
      title: '大阪城景观套房',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
      location: '大阪·中央区',
    },
    booking: {
      checkIn: '2024-03-10',
      checkOut: '2024-03-12',
      amount: '¥1,888',
    }
  }
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">我的订单</h3>
        <p className="text-sm text-muted-foreground">
          管理您的所有预订订单
        </p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Link key={order.id} href={`/profile/orders/${order.id}`}>
            <Card className="hover:bg-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative h-32 w-48 flex-shrink-0">
                    <Image
                      src={order.property.image}
                      alt={order.property.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{order.property.title}</h4>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{order.property.location}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={orderStatuses[order.status].color}
                      >
                        {orderStatuses[order.status].label}
                      </Badge>
                    </div>

                    <div className="mt-4 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{order.booking.checkIn} 至 {order.booking.checkOut}</span>
                      </div>
                      <div className="font-medium">
                        {order.booking.amount}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        订单号：{order.orderNumber}
                      </div>
                      <Button variant="ghost" size="sm">
                        查看详情
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 