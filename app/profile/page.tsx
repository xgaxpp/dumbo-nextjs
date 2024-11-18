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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">个人信息</h3>
        <p className="text-sm text-muted-foreground">
          管理您的个人信息和偏好设置
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>
              更新您的个人信息和联系方式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/avatars/01.png" alt="头像" />
                <AvatarFallback>头像</AvatarFallback>
              </Avatar>
              <Button variant="outline">更换头像</Button>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">用户名</Label>
                <Input id="name" name="name" defaultValue="张三" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" name="email" type="email" defaultValue="example@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">手机号</Label>
                <Input id="phone" name="phone" type="tel" defaultValue="13800138000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea id="bio" name="bio" defaultValue="热爱旅行，喜欢探索新的地方。" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">保存更改</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 