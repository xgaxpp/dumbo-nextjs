'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Building2, FileCheck, Shield, Star } from "lucide-react"
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: Shield,
    title: "身份认证保障",
    description: "严格的实名认证体系，保障房东和租客的安全",
  },
  {
    icon: Star,
    title: "专业房东支持",
    description: "提供房源上架指导、定价建议等专业支持",
  },
  {
    icon: Building2,
    title: "房源曝光推广",
    description: "多渠道推广您的房源，提高入住率",
  },
  {
    icon: FileCheck,
    title: "保险保障",
    description: "提供房屋保险和意外保险等多重保障",
  },
]

export default function BecomeHostPage() {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      router.push('/profile/listings')
    } catch (error) {
      console.error('认证失败:', error)
    }
  }

  return (
    <main className="min-h-screen pt-[84px] pb-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* 标题区域 */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">成为房东</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              加入我们的房东社区，开启您的房东之旅
            </p>
          </div>

          {/* 特色功能区域 */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <Separator className="my-12" />

          {/* 认证表单 */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">房东认证</CardTitle>
              <CardDescription>
                请填写您的基本信息，我们将在1-3个工作日内完成审核
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* 基本信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">基本信息</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">真实姓名</Label>
                      <Input id="name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="idNumber">身份证号</Label>
                      <Input id="idNumber" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">联系电话</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">所在城市</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择城市" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beijing">北京</SelectItem>
                          <SelectItem value="shanghai">上海</SelectItem>
                          <SelectItem value="guangzhou">广州</SelectItem>
                          <SelectItem value="shenzhen">深圳</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 房源信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">房源信息</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="propertyType">房源类型</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择房源类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">公寓</SelectItem>
                          <SelectItem value="house">独栋别墅</SelectItem>
                          <SelectItem value="room">独立房间</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="propertyCount">房源数量</Label>
                      <Input id="propertyCount" type="number" min="1" required />
                    </div>
                  </div>
                </div>

                {/* 协议同意 */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        同意房东服务协议
                      </label>
                      <p className="text-sm text-muted-foreground">
                        我已阅读并同意遵守平台的房东服务协议和相关政策
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    提交认证
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 