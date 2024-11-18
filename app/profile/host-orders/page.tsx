import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const orderStatuses = {
  pending: { label: '待确认', color: 'bg-yellow-500/10 text-yellow-500' },
  confirmed: { label: '已确认', color: 'bg-green-500/10 text-green-500' },
  completed: { label: '已完成', color: 'bg-blue-500/10 text-blue-500' },
  cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-500' }
} as const

const orders = [
  {
    id: '1',
    title: '东京湾希尔顿酒店',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    date: '2024-02-20',
    price: '¥2,888',
    status: 'pending',
    location: '东京·涩谷区',
    checkIn: '2024-03-01',
    checkOut: '2024-03-03',
    guest: {
      name: '李四',
      phone: '138****8888',
      adults: 2,
      children: 1
    }
  }
] as const

export default function HostOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">房东订单</h3>
        <p className="text-sm text-muted-foreground">
          管理您的房源预订订单
        </p>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">全部订单</TabsTrigger>
          <TabsTrigger value="pending">待确认</TabsTrigger>
          <TabsTrigger value="confirmed">已确认</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
          <TabsTrigger value="cancelled">已取消</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="block hover:bg-accent/50 transition-colors"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={order.image}
                          alt={order.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{order.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{order.location}</p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={orderStatuses[order.status].color}
                          >
                            {orderStatuses[order.status].label}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="text-muted-foreground">房客：</span>
                            {order.guest.name} ({order.guest.phone})
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">人数：</span>
                            成人 {order.guest.adults} 人
                            {order.guest.children > 0 && `，儿童 ${order.guest.children} 人`}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">入住：</span>
                            {order.checkIn} - {order.checkOut}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm font-medium">{order.price}</div>
                          <div className="flex gap-2">
                            <Link 
                              href={`/profile/host-orders/${order.id}`}
                              className="hover:text-primary"
                            >
                              <Button variant="ghost" size="sm">查看详情</Button>
                            </Link>
                            {order.status === "pending" && (
                              <>
                                <Button variant="default" size="sm">确认订单</Button>
                                <Button variant="destructive" size="sm">拒绝订单</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
        {/* 其他状态的内容可以类似实现 */}
      </Tabs>
    </div>
  )
} 