'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"

interface Review {
  id: string
  guest: {
    name: string
    avatar: string
    date: string
  }
  property: {
    id: string
    name: string
    image: string
  }
  rating: number
  comment: string
  response?: {
    content: string
    date: string
  }
}

// 添加评价统计类型
interface ReviewStats {
  total: number
  average: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  categories: {
    cleanliness: number
    communication: number
    checkin: number
    accuracy: number
    location: number
    value: number
  }
  recent: {
    total: number
    average: number
    responseRate: string
  }
}

// 模拟评价统计数据
const reviewStats: ReviewStats = {
  total: 208,
  average: 4.9,
  distribution: {
    5: 180,
    4: 20,
    3: 5,
    2: 2,
    1: 1,
  },
  categories: {
    cleanliness: 4.9,
    communication: 5.0,
    checkin: 4.8,
    accuracy: 4.9,
    location: 4.7,
    value: 4.8,
  },
  recent: {
    total: 28,
    average: 4.9,
    responseRate: "98%",
  }
}

// 模拟评价数据
const reviews: Review[] = [
  {
    id: '1',
    guest: {
      name: '张三',
      avatar: '/avatars/01.png',
      date: '2024-02-20',
    },
    property: {
      id: '1',
      name: '东京湾希尔顿酒店',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    },
    rating: 5,
    comment: '房间非常干净整洁，位置很好，靠近地铁站，房东服务也很周到。下次来东京还会选择这里。',
  },
  {
    id: '2',
    guest: {
      name: '李四',
      avatar: '/avatars/02.png',
      date: '2024-02-19',
    },
    property: {
      id: '2',
      name: '大阪城景观套房',
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    },
    rating: 4,
    comment: '位置很好，周边设施齐全，房东回复很及时。就是价格稍微有点贵。',
    response: {
      content: '感谢您的评价！我们会继续保持服务质量，也会考虑您对价格的建议。期待您的再次入住！',
      date: '2024-02-19',
    }
  }
]

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [response, setResponse] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleResponse = () => {
    // 这里应该调用API保存回复
    console.log('Response saved:', response)
    setResponse('')
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">房客评价</h3>
        <p className="text-sm text-muted-foreground">
          查看和回复房客的评价
        </p>
      </div>

      {/* 评价统计卡片 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 总体评分 */}
        <Card>
          <CardHeader>
            <CardTitle>总体评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{reviewStats.average}</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  共 {reviewStats.total} 条评价
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {Object.entries(reviewStats.distribution).reverse().map(([rating, count]) => {
                const percentage = (count / reviewStats.total) * 100
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{rating} 星</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{count}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 分类评分 */}
        <Card>
          <CardHeader>
            <CardTitle>分类评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(reviewStats.categories).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="text-sm capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm font-medium text-right">
                      {score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 近期数据 */}
        <Card>
          <CardHeader>
            <CardTitle>近30天数据</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {reviewStats.recent.total}
                </div>
                <div className="text-sm text-muted-foreground">
                  新增评价
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {reviewStats.recent.average}
                </div>
                <div className="text-sm text-muted-foreground">
                  平均评分
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {reviewStats.recent.responseRate}
                </div>
                <div className="text-sm text-muted-foreground">
                  回复率
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* 房源图片 */}
                <div className="relative h-32 w-48 flex-shrink-0">
                  <Image
                    src={review.property.image}
                    alt={review.property.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* 评价信息 */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{review.property.name}</h4>
                      <div className="mt-1 flex items-center gap-4">
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
                        <div className="text-sm text-muted-foreground">
                          {review.guest.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{review.guest.name}</span>
                    </div>
                  </div>

                  {/* 评价内容 */}
                  <div className="mt-4">
                    <p className="text-sm">{review.comment}</p>
                  </div>

                  {/* 回复内容 */}
                  {review.response ? (
                    <div className="mt-4 bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="font-medium text-sm">房东回复</div>
                      <p className="text-sm text-muted-foreground">
                        {review.response.content}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {review.response.date}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Dialog open={isDialogOpen && selectedReview?.id === review.id}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedReview(review)
                              setIsDialogOpen(true)
                            }}
                          >
                            回复评价
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>回复房客评价</DialogTitle>
                            <DialogDescription>
                              您的回复将显示在评价下方，所有用户都可以看到
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <div className="text-sm font-medium">房客评价</div>
                              <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                                {review.comment}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium">您的回复</div>
                              <Textarea
                                placeholder="输入您的回复内容..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                rows={4}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-4">
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setResponse('')
                                setIsDialogOpen(false)
                              }}
                            >
                              取消
                            </Button>
                            <Button onClick={handleResponse}>
                              发布回复
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 