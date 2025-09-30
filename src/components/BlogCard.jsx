"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function BlogCard({ title, subtitle, image, link, readTime, className }) {
    return (
        <Link href={`/blog/${title}`} className={className}>
            <Card className="overflow-hidden group hover:shadow-xl transition rounded-xl bg-black text-white h-full">
                <div className="relative h-52 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                    />
                </div>
                <CardContent className="p-4">
                    {subtitle && (
                        <p className="text-xs text-gray-400 mb-1">{subtitle}</p>
                    )}
                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
                        <Clock size={14} />
                        <span>{readTime}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
