import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, Share2 } from "lucide-react"
import Image from "next/image"

const favorites = [
  {
    id: '1',
    title: '东京湾希尔顿酒店',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    location: '东京·涩谷区',
    price: '¥2,888',
    rating: 4.9,
    reviews: 208,
    type: '整套公寓',
    capacity: '可住4人',
    addedDate: '2024-02-20',
    features: ['超赞房东', '海景房', '可做饭'],
  },
  {
    id: '2',
    title: '大阪城景观套房',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720',
    location: '大阪·中央区',
    price: '¥1,888',
    rating: 4.8,
    reviews: 156,
    type: '独立房间',
    capacity: '可住2人',
    addedDate: '2024-02-19',
    features: ['地铁周边', '商圈'],
  }
] as const

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">我的收藏</h3>
        <p className="text-sm text-muted-foreground">
          管理您收藏的房源
        </p>
      </div>

      <div className="grid gap-6">
        {favorites.map((item) => (
          <Card key={item.id} className="group">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative h-40 w-60 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>{item.capacity}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.features.map((feature) => (
                          <span 
                            key={feature}
                            className="inline-flex items-center rounded-full bg-accent/50 px-2 py-0.5 text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                    <span className="text-muted-foreground">({item.reviews}条评价)</span>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-medium">{item.price}</span>
                      <span className="text-sm text-muted-foreground">/晚</span>
                    </div>
                    <Button>立即预订</Button>
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