'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Heart, 
  Share,
  MapPin,
  Users,
  Bed,
  Bath,
  Star,
  Calendar as CalendarIcon,
  ChevronLeft,
  MessageSquare,
  Info,
  Wifi,
  Car,
  Utensils,
  User as UserIcon,
  Minus,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// 模拟图片数据
const mockImages = [
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
  'https://a0.muscache.com/im/pictures/miso/Hosting-826726918494647682/original/457337ee-af64-45d2-9ec3-7e5ded32e5c5.jpeg?im_w=720',
  'https://a0.muscache.com/im/pictures/miso/Hosting-826726918494647682/original/53b475a3-104f-462e-8faf-85a7ea674e0d.jpeg?im_w=720',
  'https://a0.muscache.com/im/pictures/miso/Hosting-826726918494647682/original/e59eb2c5-549a-4b5b-9933-5a32c5ef5477.jpeg?im_w=720',
  'https://a0.muscache.com/im/pictures/miso/Hosting-826726918494647682/original/da951b25-8519-4d91-b373-b7b74c785e00.jpeg?im_w=720',
]

// 模拟房源数据
const mockProperty = {
  id: '1',
  title: '东京湾希尔顿酒店豪华海景房',
  type: '整套公寓',
  location: '东京·涩谷区',
  price: '¥2,888',
  rating: 4.9,
  reviews: 208,
  features: ['超赞房东', '海景房', '可做饭'],
  amenities: [
    { icon: Wifi, label: '高速WiFi' },
    { icon: Car, label: '免费停车' },
    { icon: Utensils, label: '厨房' },
  ],
  capacity: {
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
  },
  host: {
    name: '张三',
    avatar: '/avatars/01.png',
    isSuperHost: true,
    responseRate: '98%',
    responseTime: '1小时内',
  },
  description: '位于东京湾区的豪华公寓，拥有无敌海景，距离地铁站步行5分钟。配备高速WiFi、厨房和停车位。',
}

// 添加评价数据
const mockReviews = [
  {
    id: '1',
    user: {
      name: '李四',
      avatar: '/avatars/01.png',
      date: '2024-02'
    },
    rating: 5,
    comment: '房间非常干净整洁，位置很好，靠近地铁站，房东服务也很周到。下次来东京还会选择这里。',
  },
  {
    id: '2',
    user: {
      name: '王五',
      avatar: '/avatars/02.png',
      date: '2024-01'
    },
    rating: 4,
    comment: '位置很好，周边设施齐全，房东回复很及时。就是价格稍微有点贵。',
  }
]

// 更新位置信息数据结构
const mockLocation = {
  address: '东京都涩谷区代代木1-1-1',
  description: '位于东京市中心的黄金地段，毗邻代代木公园，交通便利，生活设施齐全。',
  transportation: [
    { type: '地铁', items: ['代代木站步行5分钟', '涩谷站步行15分钟'] },
    { type: '电车', items: ['JR山手线代代木站', '东京Metro银座线'] },
    { type: '机场', items: ['羽田机场45分钟', '成田机场90分钟'] },
  ],
  surroundings: [
    {
      category: '购物',
      icon: '🛍️',
      places: [
        { name: '涩谷109', distance: '800m' },
        { name: '代代木商业街', distance: '300m' },
        { name: '明治神宫前商圈', distance: '1km' },
      ]
    },
    {
      category: '餐饮',
      icon: '🍽️',
      places: [
        { name: '日式拉面店', distance: '100m' },
        { name: '寿司店', distance: '200m' },
        { name: '居酒屋', distance: '150m' },
      ]
    },
    {
      category: '景点',
      icon: '🏛️',
      places: [
        { name: '明治神宫', distance: '1.2km' },
        { name: '代代木公园', distance: '500m' },
        { name: '竹下通', distance: '1.5km' },
      ]
    }
  ]
}

// 日期选择器组件
function DatePicker({
  value,
  onChange,
  disabled = false,
  minDate,
  label,
}: {
  value?: Date
  onChange?: (date?: Date) => void
  disabled?: boolean
  minDate?: Date
  label: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? value.toLocaleDateString() : "选择日期"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            disabled={(date) => {
              if (minDate) {
                return date < minDate
              }
              return false
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// 添加人数选择器组件
function GuestCounter({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="font-medium">{label}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value)
            if (!isNaN(newValue)) {
              onChange(Math.min(Math.max(min, newValue), max))
            }
          }}
          className="h-8 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function PropertyPage() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  // 计算住宿天数
  const getNights = () => {
    if (checkIn && checkOut) {
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  return (
    <div className="min-h-screen pt-[64px]">
      {/* 房源图片展示区 */}
      <div className="relative h-[480px] grid grid-cols-4 grid-rows-2 gap-2 bg-muted">
        {/* 主图 */}
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={mockImages[0]}
            alt={mockProperty.title}
            fill
            className="object-cover"
          />
        </div>
        {/* 右侧四张小图 */}
        {mockImages.slice(1, 5).map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`${mockProperty.title} - ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        
        {/* 导航按钮 */}
        <div className="absolute top-4 left-4">
          <Link href="/home">
            <Button variant="secondary" size="sm" className="rounded-full">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
          </Link>
        </div>
        
        {/* 操作按钮 */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Share className="mr-2 h-4 w-4" />
            分享
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            <Heart className="mr-2 h-4 w-4" />
            收藏
          </Button>
        </div>

        {/* 查看全部图片按钮 */}
        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute bottom-4 right-4 rounded-full"
        >
          查看全部图片
        </Button>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* 左侧主要内容 */}
          <div className="col-span-2 space-y-8">
            {/* 房源标题和基本信息 */}
            <div>
              <h1 className="text-2xl font-semibold mb-4">{mockProperty.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockProperty.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockProperty.reviews}条评价)
                    </span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{mockProperty.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {mockProperty.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 房源详情 */}
            <Card>
              <CardHeader>
                <CardTitle>房源详情</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 基本配置 */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>可住 {mockProperty.capacity.guests} 人</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{mockProperty.capacity.bedrooms} 间卧室</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{mockProperty.capacity.beds} 张床</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{mockProperty.capacity.baths} 间卫生间</span>
                  </div>
                </div>

                {/* 房源描述 */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {mockProperty.description}
                  </p>
                </div>

                {/* 配套设施 */}
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">配套设施</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {mockProperty.amenities.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 位置信息卡片 */}
            <Card>
              <CardHeader>
                <CardTitle>位置信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* 地图和地址 */}
                <div className="aspect-video relative bg-muted rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    地图占位
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-medium mb-2">详细地址</h4>
                    <p className="text-sm text-muted-foreground">{mockLocation.address}</p>
                  </div>
                </div>

                {/* 位置描述 */}
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{mockLocation.description}</p>
                </div>

                {/* 交通和周边信息 - 新布局 */}
                <div className="grid gap-6">
                  {/* 交通信息 */}
                  <div>
                    <h4 className="font-medium mb-4">交通方式</h4>
                    <div className="grid gap-2">
                      {mockLocation.transportation.map((transport) => (
                        <div 
                          key={transport.type}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10">
                            <span className="text-sm font-medium">{transport.type[0]}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{transport.type}</div>
                            <div className="space-y-1">
                              {transport.items.map((item, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 周边设施 */}
                  <div>
                    <h4 className="font-medium mb-4">周边设施</h4>
                    <div className="grid gap-6">
                      {mockLocation.surroundings.map((category) => (
                        <div key={category.category}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium">{category.category}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {category.places.map((place) => (
                              <div 
                                key={place.name}
                                className="flex items-center justify-between p-2 rounded-lg bg-accent/30"
                              >
                                <span className="text-sm">{place.name}</span>
                                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-background">
                                  {place.distance}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 温馨提示 */}
                <div className="flex gap-3 p-4 rounded-lg bg-primary/5">
                  <Info className="h-5 w-5 text-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">温馨提示</p>
                    <p className="text-sm text-muted-foreground">
                      地图上显示的位置为大致位置，实际位置将在预订确认后提供。如有特殊需求，请提前与房东沟通。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 评价信息 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>房客评价</CardTitle>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockProperty.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({mockProperty.reviews}条评价)
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <UserIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{review.user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {review.user.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧预订卡片 */}
          <aside className="h-fit">
            <div className="sticky top-[104px]">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-baseline mb-6">
                    <div className="text-2xl font-semibold">
                      {mockProperty.price}
                      <span className="text-sm text-muted-foreground font-normal">/晚</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{mockProperty.rating}</span>
                      <span className="text-muted-foreground">
                        ({mockProperty.reviews}条评价)
                      </span>
                    </div>
                  </div>

                  {/* 预订表单 */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <DatePicker
                        label="入住日期"
                        value={checkIn}
                        onChange={setCheckIn}
                        minDate={new Date()}
                      />
                      <DatePicker
                        label="退房日期"
                        value={checkOut}
                        onChange={setCheckOut}
                        disabled={!checkIn}
                        minDate={checkIn}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>入住人数</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            {adults + children > 0
                              ? `${adults + children} 位房客${infants > 0 ? `, ${infants} 名婴儿` : ''}`
                              : "选择人数"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="start">
                          <div className="space-y-4">
                            <GuestCounter
                              label="成人"
                              value={adults}
                              onChange={setAdults}
                              min={1}
                            />
                            <Separator />
                            <GuestCounter
                              label="儿童"
                              value={children}
                              onChange={setChildren}
                            />
                            <Separator />
                            <GuestCounter
                              label="婴儿"
                              value={infants}
                              onChange={setInfants}
                            />
                            <div className="pt-4 text-xs text-muted-foreground">
                              此房源最多可住 {mockProperty.capacity.guests} 人，不包括婴儿
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Button className="w-full">立即预订</Button>

                    <p className="text-center text-sm text-muted-foreground">
                      暂时不会收取费用
                    </p>
                  </div>

                  {/* 费用明细 */}
                  <div className="mt-6 space-y-2">
                    {checkIn && checkOut && (
                      <div className="flex justify-between text-sm">
                        <span className="underline">
                          {mockProperty.price} × {getNights()}晚
                        </span>
                        <span>¥{parseInt(mockProperty.price.replace('¥', '')) * getNights()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="underline">清洁费</span>
                      <span>¥300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="underline">服务费</span>
                      <span>¥200</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between font-medium">
                      <span>总价</span>
                      <span>
                        {checkIn && checkOut 
                          ? `¥${parseInt(mockProperty.price.replace('¥', '')) * getNights() + 500}`
                          : '-'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 房东信息 */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">{mockProperty.host.name}</div>
                      <div className="text-sm text-muted-foreground">
                        房东
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {mockProperty.host.isSuperHost && (
                        <Badge variant="secondary">超赞房东</Badge>
                      )}
                      <Badge variant="secondary">
                        响应率：{mockProperty.host.responseRate}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>通常{mockProperty.host.responseTime}回复</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      联系房东
                    </Button>

                    <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 mt-0.5" />
                        <p>为了保护您的账号隐私和付款安全，请不要与房东在站外交流或付款</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 