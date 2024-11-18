'use client'

import CategoryNav from "@/components/section/category-nav";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/section/footer";
import Link from 'next/link'

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState("all");

  return (
    <main className="flex min-h-screen flex-col pt-[64px]">
      <CategoryNav onCategoryChange={setCurrentCategory} />

      {/* 主要内容区域 */}
      <div className="container mx-auto flex-1 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Link key={i} href={`/property/${i + 1}`}>
              <div className="cursor-pointer group w-full">
                <div className="aspect-[4/3] relative bg-muted rounded-lg overflow-hidden">
                  <Image
                    src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720"
                    alt="房源图片"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-primary">超赞房东</span>
                    <span>•</span>
                    <span>新房源</span>
                  </div>
                  <h3 className="font-medium text-sm mt-1.5 line-clamp-1">豪华海景别墅</h3>
                  <div className="flex items-center text-[11px] text-muted-foreground space-x-1.5 mt-1">
                    <span>东京·涩谷区</span>
                    <span>•</span>
                    <span>可住4人</span>
                    <span>•</span>
                    <span>4.9分</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-medium">¥2,888</span>
                      <span className="text-[11px] text-muted-foreground">/晚</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">已有208次预订</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
