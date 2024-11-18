'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, MapPin, Calendar, Users, User } from "lucide-react"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "@/components/ui/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isHost, setIsHost] = useState(false)
  const [searchHistory] = useState([
    { type: 'location', text: '东京旅游攻略', icon: MapPin },
    { type: 'location', text: '北海道温泉', icon: MapPin },
    { type: 'date', text: '春节旅行计划', icon: Calendar },
    { type: 'group', text: '家庭游套餐', icon: Users },
  ])

  const handleBecomeHost = () => {
    if (isLoggedIn) {
      router.push('/become-host')
    } else {
      setIsLoggedIn(true)
    }
  }

  const handleMessageClick = () => {
    router.push('/messages')
  }

  return (
    <>
      <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b fixed top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/home" className="flex items-center space-x-2">
                <Logo />
                <span className="text-xl font-bold">Dumbo</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Command className="rounded-lg border shadow-sm">
                      <div className="flex items-center px-4">
                        <Search className="h-4 w-4 shrink-0 opacity-50" />
                        <input 
                          placeholder="搜索目的地、攻略、行程..." 
                          className="flex-1 h-11 px-2 bg-transparent focus:outline-none"
                        />
                      </div>
                    </Command>
                  </div>
                </PopoverTrigger>
                <PopoverContent 
                  className="p-0" 
                  align="start"
                  sideOffset={8}
                  style={{ width: 'var(--radix-popover-trigger-width)' }}
                >
                  <Command>
                    <CommandList>
                      <CommandGroup heading="搜索历史">
                        {searchHistory.map((item) => (
                          <CommandItem 
                            key={item.text}
                            className="flex items-center py-3 px-4 hover:bg-accent cursor-pointer"
                          >
                            <item.icon className="mr-2 h-4 w-4 opacity-50" />
                            <span>{item.text}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup heading="热门推荐">
                        <CommandItem className="py-3 px-4">
                          <MapPin className="mr-2 h-4 w-4 opacity-50" />
                          <span>日本赏樱胜地推荐</span>
                        </CommandItem>
                        <CommandItem className="py-3 px-4">
                          <Calendar className="mr-2 h-4 w-4 opacity-50" />
                          <span>寒假亲子游行程</span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {isLoggedIn && !isHost && (
                <Button 
                  variant="outline" 
                  onClick={handleBecomeHost}
                  className="hidden md:flex"
                >
                  成为房东
                </Button>
              )}

              {isLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={handleMessageClick}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                  <span className="sr-only">消息</span>
                </Button>
              )}

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@username" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48" 
                  align="end" 
                  alignOffset={8}
                  sideOffset={8}
                >
                  {isLoggedIn ? (
                    <>
                      <div className="flex flex-col px-1 py-2">
                        <p className="text-sm font-medium px-2">用户名</p>
                        <p className="text-xs text-muted-foreground px-2">user@example.com</p>
                      </div>
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          个人资料
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/orders" className="cursor-pointer">
                          我的订单
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/favorites" className="cursor-pointer">
                          我的收藏
                        </Link>
                      </DropdownMenuItem>
                      {isHost ? (
                        <>
                          <DropdownMenuSeparator className="my-2" />
                          <DropdownMenuItem asChild>
                            <Link href="/profile/listings" className="cursor-pointer">
                              房源管理
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/profile/host-orders" className="cursor-pointer">
                              房东订单
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/profile/earnings" className="cursor-pointer">
                              收入统计
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href="/become-host" className="cursor-pointer">
                            成为房东
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem asChild>
                        <Link href="/profile/settings" className="cursor-pointer">
                          账号设置
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem 
                        className="text-red-600 cursor-pointer"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        退出登录
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col px-1 py-2">
                        <p className="text-sm font-medium px-2">欢迎使用 Dumbo</p>
                        <p className="text-xs text-muted-foreground px-2">登录后享受更多功能</p>
                      </div>
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => setIsLoggedIn(true)}
                      >
                        登录
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        注册新账号
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
