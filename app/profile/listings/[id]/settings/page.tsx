'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronLeft,
  Building2,
  MapPin,
  Upload,
  Plus,
  X,
  Wifi,
  Car,
  Utensils,
  Bath,
  Bed,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Property } from '@/types'

// 房源类型选项
const propertyTypes = [
  {
    value: "apartment",
    label: "公寓",
    description: "位于多单元建筑中的住宅",
    icon: Building2,
  },
  // ... 其他类型
]

// 配套设施选项
const amenities = [
  { id: "wifi", label: "无线网络", icon: Wifi },
  { id: "kitchen", label: "厨房", icon: Utensils },
  { id: "parking", label: "停车位", icon: Car },
  // ... 其他设施
]

export default function PropertySettingsPage() {
  const [images, setImages] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 这里应该实现实际的图片上传逻辑
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      {/* 头部 */}
      <div className="flex items-center gap-4">
        <Link href="/profile/listings/1">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            返回房源
          </Button>
        </Link>
        <div>
          <h3 className="text-lg font-medium">房源设置</h3>
          <p className="text-sm text-muted-foreground">
            管理房源信息和设置
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 房源标题 */}
            <div className="space-y-2">
              <Label htmlFor="title">房源标题</Label>
              <Input id="title" placeholder="为您的房源起个吸引人的标题" />
            </div>

            {/* 房源类型 */}
            <div className="space-y-2">
              <Label>房源类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择房源类型" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 房源描述 */}
            <div className="space-y-2">
              <Label htmlFor="description">房源描述</Label>
              <Textarea 
                id="description" 
                placeholder="详细描述您的房源特色"
                rows={6}
              />
            </div>

            {/* 房源容量 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guests">可住人数</Label>
                <Input id="guests" type="number" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">卧室数量</Label>
                <Input id="bedrooms" type="number" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beds">床位数量</Label>
                <Input id="beds" type="number" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baths">卫生间数量</Label>
                <Input id="baths" type="number" min="1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 位置信息 */}
        <Card>
          <CardHeader>
            <CardTitle>位置信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">详细地址</Label>
              <Input id="address" placeholder="输入房源的详细地址" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-desc">位置描述</Label>
              <Textarea 
                id="location-desc"
                placeholder="描述房源周边的交通、商圈等信息"
                rows={4}
              />
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

        {/* 房源图片 */}
        <Card>
          <CardHeader>
            <CardTitle>房源图片</CardTitle>
            <CardDescription>
              上传清晰的房源照片，展示房源的各个角度
            </CardDescription>
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

        {/* 提交按钮 */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">取消</Button>
          <Button>保存更改</Button>
        </div>
      </div>
    </div>
  )
} 