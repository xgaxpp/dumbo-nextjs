'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  MessageSquare,
  Clock,
  DollarSign,
  FileText,
  Phone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// 订单状态类型
type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

// 订单状态配置
const orderStatuses: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '待确认', color: 'bg-yellow-500/10 text-yellow-500' },
  confirmed: { label: '已确认', color: 'bg-green-500/10 text-green-500' },
  completed: { label: '已完成', color: 'bg-blue-500/10 text-blue-500' },
  cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-500' }
}

async function getOrderDetail(id: string) {
  // 模拟API调用
  return {
    id: '1',
    orderNumber: 'ORD20240220001',
    status: 'confirmed' as OrderStatus,
    property: {
      id: '1',
      title: '东京湾希尔顿酒店',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
      type: '整套公寓',
      location: '东京·涩谷区',
      rating: 4.9,
      reviews: 208,
    },
    booking: {
      checkIn: '2024-03-01',
      checkOut: '2024-03-03',
      nights: 2,
      guests: {
        adults: 2,
        children: 1,
      },
      createTime: '2024-02-20 10:30:00',
    },
    payment: {
      subtotal: '¥2,388',
      cleaningFee: '¥300',
      serviceFee: '¥200',
      total: '¥2,888',
      perNight: '¥1,194',
    },
    host: {
      name: '张三',
      phone: '138****8888',
      avatar: '/avatars/01.png',
    }
  }
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params)
  const order = await getOrderDetail(id)

  return (
    <div className="space-y-6">
      {/* 头部导航 */}
      <div className="flex items-center gap-4">
        <Link href="/profile/orders">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            返回订单列表
          </Button>
        </Link>
        <Badge 
          variant="secondary"
          className={orderStatuses[order.status].color}
        >
          {orderStatuses[order.status].label}
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* 订单信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>订单信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">订单号</div>
                <div className="font-medium">{order.orderNumber}</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm text-muted-foreground">下单时间</div>
                <div>{order.booking.createTime}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">入住时间</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{order.booking.checkIn}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">退房时间</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{order.booking.checkOut}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">入住人数</div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  成人 {order.booking.guests.adults} 人
                  {order.booking.guests.children > 0 && `，儿童 ${order.booking.guests.children} 人`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 房源信息卡片 */}
        <Card>
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
                <Link 
                  href={`/property/${order.property.id}`}
                  className="hover:text-primary"
                >
                  <h3 className="font-medium text-lg mb-2">{order.property.title}</h3>
                </Link>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{order.property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{order.property.rating} ({order.property.reviews}条评价)</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Image
                        src={order.host.avatar}
                        alt={order.host.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-sm">
                      <div>{order.host.name}</div>
                      <div className="text-muted-foreground">{order.host.phone}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    联系房东
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 费用明细卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>费用明细</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                房费
                <span className="text-muted-foreground ml-2">
                  ({order.payment.perNight} × {order.booking.nights}晚)
                </span>
              </div>
              <div>{order.payment.subtotal}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">清洁费</div>
              <div>{order.payment.cleaningFee}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">服务费</div>
              <div>{order.payment.serviceFee}</div>
            </div>
            <div className="pt-4 border-t flex justify-between items-center font-medium">
              <div>总价</div>
              <div>{order.payment.total}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 