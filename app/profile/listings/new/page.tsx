'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Building2, 
  Home, 
  Hotel, 
  Warehouse,
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Upload,
  Users,
  MapPin,
  Plus,
  X,
  Info
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

// 房源类型选项
const propertyTypes = [
  {
    value: "apartment",
    label: "公寓",
    description: "位于多单元建筑中的住宅",
    icon: Building2,
  },
  {
    value: "house",
    label: "独栋别墅",
    description: "独立的住宅建筑",
    icon: Home,
  },
  {
    value: "hotel",
    label: "酒店套房",
    description: "专业酒店管理的房间",
    icon: Hotel,
  },
  {
    value: "room",
    label: "独立房间",
    description: "独立卧室带独立卫生间",
    icon: Warehouse,
  },
]

// 配套设施选项
const amenities = [
  { id: "wifi", label: "无线网络", icon: Wifi },
  { id: "kitchen", label: "厨房", icon: Utensils },
  { id: "parking", label: "停车位", icon: Car },
  // ... 可以添加更多设施
]

// 房源特色标签
const features = [
  "超赞房东",
  "海景房",
  "可做饭",
  "地铁周边",
  "商圈",
  "亲子友好",
  "宠物友好",
  "智能门锁",
]

// 添加入住规则选项
const houseRules = [
  { id: "no_smoking", label: "禁止吸烟" },
  { id: "no_pets", label: "不允许携带宠物" },
  { id: "no_party", label: "不允许举办派对" },
  { id: "no_cooking", label: "不允许做饭" },
  { id: "quiet_hours", label: "夜间安静" },
]

// 添加取消政策选项
const cancellationPolicies = [
  {
    value: "flexible",
    label: "灵活",
    description: "入住前24小时可免费取消"
  },
  {
    value: "moderate",
    label: "中等",
    description: "入住前5天可免费取消"
  },
  {
    value: "strict",
    label: "严格",
    description: "入住前7天可获得50%退款"
  }
]

// 添加周边设施类型
const surroundingTypes = [
  {
    category: "交通",
    icon: "🚇",
    items: [
      { id: "subway", label: "地铁站" },
      { id: "bus", label: "公交站" },
      { id: "train", label: "火车站" },
      { id: "airport", label: "机场" },
    ]
  },
  {
    category: "购物",
    icon: "🛍️",
    items: [
      { id: "mall", label: "商场" },
      { id: "supermarket", label: "超市" },
      { id: "market", label: "市场" },
      { id: "shop", label: "便利店" },
    ]
  },
  {
    category: "餐饮",
    icon: "🍽️",
    items: [
      { id: "restaurant", label: "餐厅" },
      { id: "cafe", label: "咖啡厅" },
      { id: "bar", label: "酒吧" },
      { id: "food_street", label: "美食街" },
    ]
  },
  {
    category: "休闲",
    icon: "🎉",
    items: [
      { id: "park", label: "公园" },
      { id: "gym", label: "健身房" },
      { id: "cinema", label: "电影院" },
      { id: "entertainment", label: "娱乐场所" },
    ]
  }
]

export default function NewListingPage() {
  const [images, setImages] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedRules, setSelectedRules] = useState<string[]>([])
  const [surroundings, setSurroundings] = useState<Record<string, string>>({})

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 这里应该实现实际的图片上传逻辑
      // 现在只是模拟添加本地URL
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">发布新房源</h1>
          <p className="text-sm text-muted-foreground mt-1">
            填写房源信息，让更多房客了解您的房源
          </p>
        </div>

        <form className="space-y-8">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 房源类型 */}
              <div className="space-y-4">
                <Label>房源类型</Label>
                <div className="grid grid-cols-2 gap-4">
                  {propertyTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <div key={type.value} className="relative">
                        <input
                          type="radio"
                          name="propertyType"
                          value={type.value}
                          id={type.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.value}
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Icon className="mb-3 h-6 w-6" />
                          <div className="text-center">
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 房源标题 */}
              <div className="space-y-2">
                <Label htmlFor="title">房源标题</Label>
                <Input id="title" placeholder="为您的房源起个吸引人的标题" />
              </div>

              {/* 房源容量 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guests">可住人数</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="guests" 
                      type="number" 
                      min="1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">卧室数量</Label>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="bedrooms" 
                      type="number" 
                      min="1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beds">床位数量</Label>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="beds" 
                      type="number" 
                      min="1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baths">卫生间数量</Label>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="baths" 
                      type="number" 
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 价格设置 */}
          <Card>
            <CardHeader>
              <CardTitle>价格设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基础价格 */}
              <div className="space-y-2">
                <Label>基础价格（每晚）</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">¥</span>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="设置每晚价格"
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              {/* 清洁费 */}
              <div className="space-y-2">
                <Label>清洁费</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">¥</span>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="设置清洁费"
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              {/* 押金 */}
              <div className="space-y-2">
                <Label>押金</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">¥</span>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="设置押金"
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              {/* 长期住宿折扣 */}
              <div className="space-y-4">
                <Label>长期住宿折扣</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>周租折扣（%）</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      placeholder="7天以上折扣"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>月租折扣（%）</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      placeholder="30天以上折扣"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 房源位置 */}
          <Card>
            <CardHeader>
              <CardTitle>房源位置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="address">详细地址</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="address" placeholder="输入房源的详细地址" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location-desc">位置描述</Label>
                <Textarea 
                  id="location-desc"
                  placeholder="描述房源周边的交通、商圈等信息"
                  rows={4}
                />
              </div>

              <div className="space-y-6">
                <h3 className="font-medium">周边设施</h3>
                <div className="space-y-8">
                  {surroundingTypes.map((type) => (
                    <div key={type.category} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{type.icon}</span>
                        <span className="font-medium">{type.category}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {type.items.map((item) => (
                          <div key={item.id} className="space-y-2">
                            <Label htmlFor={item.id} className="text-sm">
                              {item.label}
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={item.id}
                                placeholder="设施名称"
                                value={surroundings[`${item.id}_name`] || ''}
                                onChange={(e) => setSurroundings(prev => ({
                                  ...prev,
                                  [`${item.id}_name`]: e.target.value
                                }))}
                                className="flex-1"
                              />
                              <Input
                                placeholder="距离"
                                value={surroundings[`${item.id}_distance`] || ''}
                                onChange={(e) => setSurroundings(prev => ({
                                  ...prev,
                                  [`${item.id}_distance`]: e.target.value
                                }))}
                                className="w-24"
                              />
                              <span className="text-sm text-muted-foreground">米</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">交通说明</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>地铁信息</Label>
                    <Textarea 
                      placeholder="例如：距离地铁1号线XX站步行5分钟"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>公交信息</Label>
                    <Textarea 
                      placeholder="例如：附近有123路、456路公交车"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>其他交通</Label>
                    <Textarea 
                      placeholder="其他交通方式说明"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      请尽可能详细地描述周边设施和交通情况，这将帮助房客更好地了解您的房源位置。
                      距离请尽量精确，可以使用地图测量或实地测量。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 配套设施 */}
          <Card>
            <CardHeader>
              <CardTitle>配套设施</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {amenities.map(({ id, label, icon: Icon }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={id}
                      checked={selectedAmenities.includes(id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities(prev => [...prev, id])
                        } else {
                          setSelectedAmenities(prev => 
                            prev.filter(item => item !== id)
                          )
                        }
                      }}
                    />
                    <Label 
                      htmlFor={id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 房源特色 */}
          <Card>
            <CardHeader>
              <CardTitle>房源特色</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className={`
                      px-3 py-1.5 rounded-full border-2 cursor-pointer
                      ${selectedFeatures.includes(feature)
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'}
                    `}
                    onClick={() => {
                      if (selectedFeatures.includes(feature)) {
                        setSelectedFeatures(prev => 
                          prev.filter(item => item !== feature)
                        )
                      } else {
                        setSelectedFeatures(prev => [...prev, feature])
                      }
                    }}
                  >
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 房源描述 */}
          <Card>
            <CardHeader>
              <CardTitle>房源描述</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="详细描述您的房源，包括特色、周边设施等信息"
                rows={6}
              />
            </CardContent>
          </Card>

          {/* 房源图片 */}
          <Card>
            <CardHeader>
              <CardTitle>房源图片</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`房源图片 ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <label className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">上传图片</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* 入住规则 */}
          <Card>
            <CardHeader>
              <CardTitle>入住规则</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 入住退房时间 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>入住时间</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择入住时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">14:00后</SelectItem>
                      <SelectItem value="15">15:00后</SelectItem>
                      <SelectItem value="16">16:00后</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>退房时间</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择退房时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11">11:00前</SelectItem>
                      <SelectItem value="12">12:00前</SelectItem>
                      <SelectItem value="13">13:00前</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 最短最长入住 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>最短入住</Label>
                  <Input type="number" min="1" placeholder="最少入住晚数" />
                </div>
                <div className="space-y-2">
                  <Label>最长入住</Label>
                  <Input type="number" min="1" placeholder="最多入住晚数" />
                </div>
              </div>

              {/* 房屋守则 */}
              <div className="space-y-4">
                <Label>房屋守则</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {houseRules.map((rule) => (
                    <div key={rule.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={rule.id}
                        checked={selectedRules.includes(rule.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRules(prev => [...prev, rule.id])
                          } else {
                            setSelectedRules(prev => 
                              prev.filter(item => item !== rule.id)
                            )
                          }
                        }}
                      />
                      <Label htmlFor={rule.id}>{rule.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 取消政策 */}
              <div className="space-y-4">
                <Label>取消政策</Label>
                <div className="grid gap-4">
                  {cancellationPolicies.map((policy) => (
                    <div key={policy.value} className="relative">
                      <input
                        type="radio"
                        name="cancellationPolicy"
                        value={policy.value}
                        id={policy.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={policy.value}
                        className="flex flex-col gap-1 rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-medium">{policy.label}</span>
                        <span className="text-sm text-muted-foreground">
                          {policy.description}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">保存草稿</Button>
            <Button>发布房源</Button>
          </div>
        </form>
      </div>
    </div>
  )
} 