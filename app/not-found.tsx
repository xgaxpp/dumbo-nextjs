import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto pt-[84px] pb-8">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">页面不存在</h2>
        <p className="text-muted-foreground">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  )
} 