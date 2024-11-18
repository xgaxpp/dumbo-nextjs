'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Map,
} from "lucide-react"

// 模拟数据
const analyticsData = {
  overview: {
    revenue: {
      total: "¥128,888",
      trend: "+23.1%",
      isUp: true
    },
    occupancy: {
      rate: "85%",
      trend: "+5.2%",
      isUp: true
    },
    avgPrice: {
      amount: "¥2,888",
      trend: "-2.1%",
      isUp: false
    },
    bookings: {
      count: "208",
      trend: "+12.5%",
      isUp: true
    }
  },
  properties: [
    {
      id: "1",
      name: "东京湾希尔顿酒店",
      revenue: "¥58,888",
      occupancy: "90%",
      avgPrice: "¥2,888",
      rating: 4.9,
      trend: "+15%"
    },
    {
      id: "2",
      name: "大阪城景观套房",
      revenue: "¥38,888",
      occupancy: "80%",
      avgPrice: "¥1,888",
      rating: 4.8,
      trend: "+10%"
    }
  ],
  marketInsights: {
    avgMarketPrice: "¥2,500",
    competitorOccupancy: "75%",
    demandLevel: "高",
    pricePosition: "110%",
    recommendations: [
      "当前价格高于市场均价10%，但入住率保持良好，说明价格具有竞争力",
      "周末入住率较高，可以考虑适当提高周末价格",
      "淡季期间可以通过长住优惠提高入住率"
    ]
  }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">数据分析</h3>
          <p className="text-sm text-muted-foreground">
            查看您的房源运营数据和市场洞察
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">最近7天</SelectItem>
              <SelectItem value="30">最近30天</SelectItem>
              <SelectItem value="90">最近90天</SelectItem>
              <SelectItem value="365">最近一年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            导出报告
          </Button>
        </div>
      </div>

      {/* 数据概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.revenue.total}</div>
            <div className="flex items-center space-x-2 text-sm">
              {analyticsData.overview.revenue.isUp ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={analyticsData.overview.revenue.isUp ? "text-green-500" : "text-red-500"}>
                {analyticsData.overview.revenue.trend}
              </span>
              <span className="text-muted-foreground">vs. 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">入住率</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.occupancy.rate}</div>
            <div className="flex items-center space-x-2 text-sm">
              {analyticsData.overview.occupancy.isUp ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={analyticsData.overview.occupancy.isUp ? "text-green-500" : "text-red-500"}>
                {analyticsData.overview.occupancy.trend}
              </span>
              <span className="text-muted-foreground">vs. 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均房价</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.avgPrice.amount}</div>
            <div className="flex items-center space-x-2 text-sm">
              {analyticsData.overview.avgPrice.isUp ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={analyticsData.overview.avgPrice.isUp ? "text-green-500" : "text-red-500"}>
                {analyticsData.overview.avgPrice.trend}
              </span>
              <span className="text-muted-foreground">vs. 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总预订</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.bookings.count}</div>
            <div className="flex items-center space-x-2 text-sm">
              {analyticsData.overview.bookings.isUp ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={analyticsData.overview.bookings.isUp ? "text-green-500" : "text-red-500"}>
                {analyticsData.overview.bookings.trend}
              </span>
              <span className="text-muted-foreground">vs. 上期</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 房源表现 */}
      <Card>
        <CardHeader>
          <CardTitle>房源表现</CardTitle>
          <CardDescription>各房源的运营数据对比</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">{property.name}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{property.rating}</span>
                    </div>
                    <div>收入 {property.revenue}</div>
                    <div>入住率 {property.occupancy}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${
                    property.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {property.trend}
                  </span>
                  {property.trend.startsWith('+') ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 市场洞察 */}
      <Card>
        <CardHeader>
          <CardTitle>市场洞察</CardTitle>
          <CardDescription>基于市场数据的分析和建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">市场均价</span>
                <span className="font-medium">{analyticsData.marketInsights.avgMarketPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">竞品入住率</span>
                <span className="font-medium">{analyticsData.marketInsights.competitorOccupancy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">需求水平</span>
                <Badge variant="secondary">{analyticsData.marketInsights.demandLevel}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">价格定位</span>
                <span className="font-medium">市场均价的 {analyticsData.marketInsights.pricePosition}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">优化建议</div>
              <ul className="space-y-2">
                {analyticsData.marketInsights.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 