'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type Traveler = {
  id: string
  name: string
  idType: string
  idNumber: string
  phone: string
  isDefault: boolean
  type: 'adult' | 'child'
}

const travelers = [
  {
    id: '1',
    name: '张三',
    idType: '身份证',
    idNumber: '110101********0123',
    phone: '138****8888',
    isDefault: true,
    type: 'adult',
  },
  {
    id: '2',
    name: '小明',
    idType: '护照',
    idNumber: 'E123****89',
    phone: '139****9999',
    isDefault: false,
    type: 'child',
  }
] as const

export default function TravelersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTraveler, setEditingTraveler] = useState<Traveler | null>(null)

  const handleAddTraveler = () => {
    setEditingTraveler(null)
    setIsDialogOpen(true)
  }

  const handleEditTraveler = (traveler: Traveler) => {
    setEditingTraveler(traveler)
    setIsDialogOpen(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // 处理表单提交
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">出行人管理</h3>
          <p className="text-sm text-muted-foreground">
            管理您的常用出行人信息
          </p>
        </div>
        <Button onClick={handleAddTraveler}>
          <Plus className="mr-2 h-4 w-4" />
          添加出行人
        </Button>
      </div>

      <div className="grid gap-4">
        {travelers.map((traveler) => (
          <Card key={traveler.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{traveler.name}</h4>
                      {traveler.isDefault && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          默认出行人
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {traveler.type === 'adult' ? '成人' : '儿童'}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p>{traveler.idType}：{traveler.idNumber}</p>
                      <p>联系电话：{traveler.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditTraveler(traveler as Traveler)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingTraveler ? '编辑出行人' : '添加出行人'}</DialogTitle>
            <DialogDescription>
              请填写出行人的基本信息，用于预订和入住
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">姓名</Label>
              <Input 
                id="name" 
                defaultValue={editingTraveler?.name}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="idType">证件类型</Label>
              <Select defaultValue={editingTraveler?.idType || "身份证"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择证件类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="身份证">身份证</SelectItem>
                  <SelectItem value="护照">护照</SelectItem>
                  <SelectItem value="港澳通行证">港澳通行证</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="idNumber">证件号码</Label>
              <Input 
                id="idNumber" 
                defaultValue={editingTraveler?.idNumber}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input 
                id="phone" 
                type="tel"
                defaultValue={editingTraveler?.phone}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">出行人类型</Label>
              <Select defaultValue={editingTraveler?.type || "adult"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择出行人类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">成人</SelectItem>
                  <SelectItem value="child">儿童</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isDefault">设为默认出行人</Label>
              <Switch 
                id="isDefault" 
                defaultChecked={editingTraveler?.isDefault}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingTraveler ? '保存修改' : '添加出行人'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 