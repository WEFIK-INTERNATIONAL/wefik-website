"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function FeaturedBlogCard({ title, subtitle, image, link, readTime }) {
  return (
    <Link href={link}>
      <Card className="grid md:grid-cols-2 gap-6 overflow-hidden rounded-xl bg-black text-white hover:shadow-xl transition">
        {/* Left Side Image */}
        <div className="relative h-80 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>

        {/* Right Side Text */}
        <div className="flex flex-col justify-center p-6">
          {subtitle && (
            <p className="text-sm text-gray-400 mb-2">{subtitle}</p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
            {title}
          </h2>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock size={16} />
            <span>{readTime}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
