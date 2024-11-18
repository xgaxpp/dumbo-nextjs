import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  关于我们: [
    { label: '公司介绍', href: '/about' },
    { label: '加入我们', href: '/jobs' },
    { label: '新闻中心', href: '/news' },
    { label: '隐私政策', href: '/privacy' }
  ],
  房东服务: [
    { label: '成为房东', href: '/host' },
    { label: '房东指南', href: '/host-guide' },
    { label: '房源发布', href: '/list-property' },
    { label: '房东社区', href: '/host-community' }
  ],
  旅行服务: [
    { label: '旅游攻略', href: '/guides' },
    { label: '旅行保险', href: '/insurance' },
    { label: '礼品卡', href: '/gift-cards' },
    { label: '商务差旅', href: '/business' }
  ],
  帮助中心: [
    { label: '联系客服', href: '/support' },
    { label: '常见问题', href: '/faq' },
    { label: '紧急支援', href: '/emergency' },
    { label: '退订政策', href: '/cancellation' }
  ]
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' }
]

const contactInfo = [
  { icon: Phone, info: '400-888-8888', href: 'tel:4008888888' },
  { icon: Mail, info: 'support@example.com', href: 'mailto:support@example.com' },
  { icon: MapPin, info: '中国 北京市朝阳区', href: '#' }
]

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* 主要链接区域 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-medium mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t mb-8" />

        {/* 底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 联系方式 */}
          <div className="flex flex-col space-y-2">
            {contactInfo.map(({ icon: Icon, info, href }) => (
              <Link 
                key={info}
                href={href}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-4 w-4 mr-2" />
                <span>{info}</span>
              </Link>
            ))}
          </div>

          {/* 社交媒体图标 */}
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* 版权信息 */}
          <div className="text-sm text-muted-foreground">
            © 2024 Dumbo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 