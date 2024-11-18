'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, TrendingDown, Users, Star, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// 添加数据类型定义
interface EarningOverview {
  totalEarnings: string;
  totalOrders: string;
  thisMonth: string;
  lastMonth: string;
  growth: string;
  occupancyRate: string;
}

interface EarningItem {
  id: string;
  date: string;
  amount: string;
  type: 'order' | 'refund';
  status: 'settled' | 'pending';
  orderNumber: string;
  property: {
    id: string;
    name: string;
    image: string;
  };
  guest: {
    name: string;
    checkIn: string;
    checkOut: string;
  };
}

// 模拟数据
const mockOverview: EarningOverview = {
  totalEarnings: "¥28,888",
  totalOrders: "208",
  thisMonth: "¥8,888",
  lastMonth: "¥6,888",
  growth: "+29%",
  occupancyRate: "85%",
}

const mockEarnings: EarningItem[] = [
  {
    id: '1',
    date: '2024-02-20',
    amount: '¥2,888',
    type: 'order',
    status: 'settled',
    orderNumber: 'NO.20240220001',
    property: {
      id: '1',
      name: '东京湾希尔顿酒店',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    },
    guest: {
      name: '张三',
      checkIn: '2024-03-01',
      checkOut: '2024-03-03',
    }
  },
  // ... 可以添加更多数据
]

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">收入统计</h3>
          <p className="text-sm text-muted-foreground">
            查看您的收入和订单数据
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          导出报表
        </Button>
      </div>

      {/* 数据概览卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOverview.totalEarnings}</div>
            <div className="text-xs text-muted-foreground mt-1">
              共 {mockOverview.totalOrders} 笔订单
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月收入</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOverview.thisMonth}</div>
            <div className="text-xs text-green-500 mt-1">
              较上月增长 {mockOverview.growth}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">上月收入</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOverview.lastMonth}</div>
            <div className="text-xs text-muted-foreground mt-1">
              历史月度数据
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">入住率</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOverview.occupancyRate}</div>
            <div className="text-xs text-muted-foreground mt-1">
              较上月提升 5%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 收入明细 */}
      <Card>
        <CardHeader>
          <CardTitle>收入明细</CardTitle>
          <CardDescription>
            查看每笔订单的收入详情
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="settled">已结算</TabsTrigger>
              <TabsTrigger value="pending">待结算</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {mockEarnings.map((earning) => (
                  <Card key={earning.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* 房源图片 */}
                        <div className="relative h-20 w-32 flex-shrink-0">
                          <Image
                            src={earning.property.image}
                            alt={earning.property.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* 订单信息 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link 
                                href={`/profile/listings/${earning.property.id}`}
                                className="font-medium hover:text-primary"
                              >
                                {earning.property.name}
                              </Link>
                              <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {earning.guest.checkIn} 至 {earning.guest.checkOut}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>房客：{earning.guest.name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {earning.type === 'refund' && '-'}
                                {earning.amount}
                              </div>
                              <Badge 
                                variant="secondary"
                                className={
                                  earning.status === 'settled'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }
                              >
                                {earning.status === 'settled' ? '已结算' : '待结算'}
                              </Badge>
                            </div>
                          </div>

                          {/* 底部信息 */}
                          <div className="mt-4 flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div>订单号：{earning.orderNumber}</div>
                              <div>收入日期：{earning.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href={`/profile/host-orders/${earning.orderNumber}`}>
                                <Button variant="ghost" size="sm">
                                  查看订单
                                </Button>
                              </Link>
                              {earning.status === 'pending' && (
                                <Button variant="outline" size="sm">
                                  确认收款
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 其他标签页内容类似，可以通过筛选显示对应状态的数据 */}
            <TabsContent value="settled">
              {/* 已结算列表 */}
            </TabsContent>
            <TabsContent value="pending">
              {/* 待结算列表 */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 