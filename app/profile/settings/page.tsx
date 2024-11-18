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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">账号设置</h3>
        <p className="text-sm text-muted-foreground">
          管理您的账号设置和偏好
        </p>
      </div>
      <Separator />

      <div className="grid gap-6">
        {/* 安全设置 */}
        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>
              管理您的密码和登录安全选项
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">当前密码</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">新密码</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">确认新密码</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button>更新密码</Button>
            </div>
          </CardContent>
        </Card>

        {/* 通知设置 */}
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
            <CardDescription>
              配置您想要接收的通知类型
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing">营销通知</Label>
              <Switch id="marketing" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="order">订单通知</Label>
              <Switch id="order" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="system">系统通知</Label>
              <Switch id="system" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* 偏好设置 */}
        <Card>
          <CardHeader>
            <CardTitle>偏好设置</CardTitle>
            <CardDescription>
              自定义您的使用体验
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="language">语言</Label>
              <Select defaultValue="zh">
                <SelectTrigger id="language">
                  <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">货币</Label>
              <Select defaultValue="cny">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="选择货币" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cny">人民币 (CNY)</SelectItem>
                  <SelectItem value="usd">美元 (USD)</SelectItem>
                  <SelectItem value="jpy">日元 (JPY)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 账号注销 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">危险区域</CardTitle>
            <CardDescription>
              注销账号的操作不可逆，请谨慎操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">注销账号</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 