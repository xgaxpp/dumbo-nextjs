import { Metadata } from "next"

export const metadata: Metadata = {
  title: "个人中心",
  description: "管理您的个人信息和订单",
}

export default function ProfileTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 