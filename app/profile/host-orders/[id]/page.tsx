import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, User, Calendar, MapPin, DollarSign, Clock, Phone, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// 订单状态类型
type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// 订单状态配置
const orderStatuses: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '待确认', color: 'bg-yellow-500/10 text-yellow-500' },
  confirmed: { label: '已确认', color: 'bg-green-500/10 text-green-500' },
  completed: { label: '已完成', color: 'bg-blue-500/10 text-blue-500' },
  cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-500' }
} as const;

// 订单接口定义
interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  guest: {
    name: string;
    phone: string;
    avatar: string;
    joinDate: string;
    orderCount: number;
  };
  property: {
    id: string;
    title: string;
    image: string;
    type: string;
    location: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    amount: string;
    createTime: string;
    guestDetails: {
      adults: number;
      children: number;
      infants: number;
    };
    specialRequests?: string[];
    checkInTime: string;
    checkOutTime: string;
    paymentStatus: 'paid' | 'pending' | 'partial';
    paymentMethod: string;
    subtotal: string;
    serviceFee: string;
    tax: string;
    total: string;
  };
}

// 获取订单详情的函数
async function getOrderDetail(orderId: string): Promise<Order | null> {
  // 模拟 API 调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: orderId,
        orderNumber: 'ORD20240220001',
        status: 'pending',
        guest: {
          name: '张三',
          phone: '138****8888',
          avatar: '/avatars/01.png',
          joinDate: '2023年',
          orderCount: 5,
        },
        property: {
          id: '1',
          title: '东京湾希尔顿酒店',
          image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
          type: '整套公寓',
          location: '东京·涩谷区',
        },
        booking: {
          checkIn: '2024-03-01',
          checkOut: '2024-03-03',
          nights: 2,
          guests: 4,
          amount: '¥2,888',
          createTime: '2024-02-20 10:30:00',
          guestDetails: {
            adults: 2,
            children: 2,
            infants: 0,
          },
          specialRequests: [
            '需要额外床品',
            '希望安排高层房间',
            '预计晚上8点到达'
          ],
          checkInTime: '15:00后',
          checkOutTime: '12:00前',
          paymentStatus: 'paid',
          paymentMethod: '信用卡支付',
          subtotal: '¥2,588',
          serviceFee: '¥200',
          tax: '¥100',
          total: '¥2,888'
        }
      });
    }, 100);
  });
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  // 等待参数
  const { id } = await Promise.resolve(params);
  // 使用参数获取数据
  const order = await getOrderDetail(id);

  if (!order) {
    return (
      <div className="container mx-auto pt-[84px] pb-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <h4 className="font-medium">订单不存在</h4>
              <p className="text-sm text-muted-foreground">
                该订单可能已被删除或链接无效
              </p>
              <Link href="/profile/host-orders">
                <Button>返回订单列表</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/profile/host-orders">
            <Button variant="ghost">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回订单列表
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium">订单 {order.orderNumber}</h2>
            <Badge 
              variant="secondary"
              className={orderStatuses[order.status].color}
            >
              {orderStatuses[order.status].label}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {order.status === 'pending' && (
            <>
              <Button variant="outline" className="text-red-600">
                拒绝订单
              </Button>
              <Button>
                确认订单
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* 左侧信息列 */}
        <div className="col-span-2 space-y-6">
          {/* 房客信息 */}
          <Card>
            <CardHeader>
              <CardTitle>房客信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={order.guest.avatar}
                    alt={order.guest.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{order.guest.name}</span>
                    <span className="text-sm text-muted-foreground">
                      注册时间：{order.guest.joinDate}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>联系电话：{order.guest.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>历史订单：{order.guest.orderCount}次</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 预订信息 */}
          <Card>
            <CardHeader>
              <CardTitle>预订信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* 基本预订信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">入住时间</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{order.booking.checkIn}</div>
                        <div className="text-xs text-muted-foreground">{order.booking.checkInTime}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">退房时间</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{order.booking.checkOut}</div>
                        <div className="text-xs text-muted-foreground">{order.booking.checkOutTime}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 入住详情 */}
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-medium">入住详情</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">入住天数</div>
                      <div className="mt-1">{order.booking.nights}晚</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">总人数</div>
                      <div className="mt-1">{order.booking.guests}人</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">房客构成</div>
                      <div className="mt-1 space-x-2 text-sm">
                        <span>成人 {order.booking.guestDetails.adults}</span>
                        {order.booking.guestDetails.children > 0 && (
                          <span>儿童 {order.booking.guestDetails.children}</span>
                        )}
                        {order.booking.guestDetails.infants > 0 && (
                          <span>婴儿 {order.booking.guestDetails.infants}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 特殊要求 */}
                {order.booking.specialRequests && order.booking.specialRequests.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">特殊要求</h4>
                    <ul className="space-y-2">
                      {order.booking.specialRequests.map((request, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          {request}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 支付信息 */}
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-medium">支付信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">支付状态</span>
                      <Badge variant="secondary" className={
                        order.booking.paymentStatus === 'paid' 
                          ? 'bg-green-500/10 text-green-500'
                          : order.booking.paymentStatus === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }>
                        {order.booking.paymentStatus === 'paid' ? '已支付' : 
                         order.booking.paymentStatus === 'pending' ? '待支付' : '部分支付'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">支付方式</span>
                      <span>{order.booking.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">房费小计</span>
                      <span>{order.booking.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">服务费</span>
                      <span>{order.booking.serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">税费</span>
                      <span>{order.booking.tax}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>总计</span>
                      <span>{order.booking.total}</span>
                    </div>
                  </div>
                </div>

                {/* 下单时间 */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>下单时间：{order.booking.createTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧房源信息 - 调整定位和对齐 */}
        <aside className="h-fit">
          <div className="sticky top-[104px]">
            <Link 
              href={`/profile/listings/${order.property.id}`}
              className="block transition-transform hover:-translate-y-1"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full">
                <CardHeader className="pb-3">
                  <CardTitle>房源信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <Image
                      src={order.property.image}
                      alt={order.property.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                      {order.property.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{order.property.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Home className="h-4 w-4 flex-shrink-0" />
                        <span>{order.property.type}</span>
                      </div>
                    </div>
                    <div className="pt-2 text-sm text-primary flex items-center justify-end">
                      查看房源详情 →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
} 