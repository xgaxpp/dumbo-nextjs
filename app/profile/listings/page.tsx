'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Eye, 
  Settings, 
  Power,
  Star,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// 房源状态类型
type ListingStatus = 'active' | 'inactive' | 'draft';

const listingStatuses: Record<ListingStatus, { label: string; color: string }> = {
  active: { label: '上线中', color: 'bg-green-500/10 text-green-500' },
  inactive: { label: '已下线', color: 'bg-red-500/10 text-red-500' },
  draft: { label: '草稿', color: 'bg-yellow-500/10 text-yellow-500' }
}

// 模拟房源数据
const listings = [
  {
    id: '1',
    title: '东京湾希尔顿酒店',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    status: 'active' as ListingStatus,
    location: '东京·涩谷区',
    price: '¥2,888',
    stats: {
      bookings: 208,
      rating: 4.9,
      reviews: 156,
      occupancyRate: '85%',
    },
    lastUpdated: '2024-02-20',
  },
  {
    id: '2',
    title: '大阪城景观套房',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    status: 'inactive' as ListingStatus,
    location: '大阪·中央区',
    price: '¥1,888',
    stats: {
      bookings: 156,
      rating: 4.8,
      reviews: 98,
      occupancyRate: '75%',
    },
    lastUpdated: '2024-02-19',
  }
]

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">房源管理</h3>
          <p className="text-sm text-muted-foreground">
            管理您的所有房源信息
          </p>
        </div>
        <Link href="/profile/listings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            发布新房源
          </Button>
        </Link>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="搜索房源" 
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="房源状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">上线中</SelectItem>
            <SelectItem value="inactive">已下线</SelectItem>
            <SelectItem value="draft">草稿</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 房源列表 */}
      <div className="grid gap-6">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* 房源图片 */}
                <div className="relative h-40 w-60 flex-shrink-0">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* 房源信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg">{listing.title}</h4>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{listing.location}</span>
                        <span>•</span>
                        <span>{listing.price}/晚</span>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={listingStatuses[listing.status].color}
                    >
                      {listingStatuses[listing.status].label}
                    </Badge>
                  </div>

                  {/* 统计数据 */}
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>预订数</span>
                      </div>
                      <div className="font-medium">{listing.stats.bookings}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>评分</span>
                      </div>
                      <div className="font-medium">{listing.stats.rating}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>入住率</span>
                      </div>
                      <div className="font-medium">{listing.stats.occupancyRate}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>评价数</span>
                      </div>
                      <div className="font-medium">{listing.stats.reviews}</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      最后更新：{listing.lastUpdated}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/property/${listing.id}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          预览
                        </Button>
                      </Link>
                      <Link href={`/profile/listings/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          管理
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={listing.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        <Power className="mr-2 h-4 w-4" />
                        {listing.status === 'active' ? '下线' : '上线'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 