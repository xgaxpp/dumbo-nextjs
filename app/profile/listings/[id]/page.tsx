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
  Eye, 
  Power,
  Star,
  Users,
  DollarSign,
  Building,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Property } from '@/types'

// 房源状态类型
type ListingStatus = 'active' | 'inactive' | 'draft'

const listingStatuses: Record<ListingStatus, { label: string; color: string }> = {
  active: { label: '上线中', color: 'bg-green-500/10 text-green-500' },
  inactive: { label: '已下线', color: 'bg-red-500/10 text-red-500' },
  draft: { label: '草稿', color: 'bg-yellow-500/10 text-yellow-500' }
}

// 模拟数据
const mockProperty = {
  id: '1',
  title: '东京湾希尔顿酒店',
  status: 'active' as ListingStatus,
  type: '整套公寓',
  location: '东京·涩谷区',
  price: '¥2,888',
  images: [
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
  ],
  stats: {
    rating: 4.9,
    reviews: 208,
    occupancyRate: '85%',
    monthlyRevenue: '¥58,888',
    totalBookings: 35,
    monthlyBookings: 8,
  }
}

export default function PropertyDetailPage() {
  return (
    <div className="space-y-8">
      {/* 头部 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Link href="/profile/listings">
            <Button variant="ghost">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回房源列表
            </Button>
          </Link>
          <Badge 
            variant="secondary"
            className={listingStatuses[mockProperty.status].color}
          >
            {listingStatuses[mockProperty.status].label}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/property/${mockProperty.id}`} target="_blank">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              预览房源
            </Button>
          </Link>
          <Button 
            variant="outline"
            className={mockProperty.status === 'active' ? 'text-red-600' : 'text-green-600'}
          >
            <Power className="mr-2 h-4 w-4" />
            {mockProperty.status === 'active' ? '下线房源' : '上线房源'}
          </Button>
        </div>
      </div>

      {/* 房源概览 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-8">
            <div className="relative h-48 w-72 flex-shrink-0">
              <Image
                src={mockProperty.images[0]}
                alt={mockProperty.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold mb-4">{mockProperty.title}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{mockProperty.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{mockProperty.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockProperty.stats.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockProperty.stats.reviews}条评价)
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-medium">{mockProperty.price}/晚</div>
                  <div className="text-sm text-muted-foreground">
                    最近30天入住率 {mockProperty.stats.occupancyRate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 运营数据 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">总预订</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mockProperty.stats.totalBookings}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">本月预订</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mockProperty.stats.monthlyBookings}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">月收入</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mockProperty.stats.monthlyRevenue}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">评分</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mockProperty.stats.rating}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 