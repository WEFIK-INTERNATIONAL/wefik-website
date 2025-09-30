"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

const blogs = [
  {
    id: "migros-mobile",
    title: "ESE Agency: Migros und Swisscom begrüssen Migros Mobile",
    subtitle: "Migros Mobile",
    image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg",
    content: "Full content of Migros Mobile blog goes here...",
    readTime: "3 min",
  },
  {
    id: "news-aber-deep",
    title: "«News, aber deep»: watson lanciert neue Imagekampagne mit ESE Agency",
    subtitle: "watson Imagekampagne",
    image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg",
    content: "Full content of News aber deep blog goes here...",
    readTime: "6 min",
  },
  {
    id: "ese-party-2025",
    title: "ESE Agency: Verwandelt Office in einen Club",
    subtitle: "ESE-Party 2025",
    image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg",
    content: "Full content of ESE Party 2025 blog goes here...",
    readTime: "3 min",
  },
  {
    id: "denner-jackpot",
    title: "Denner verlost in neuer Kampagne einzigartige Mega-Gewinne",
    subtitle: "Denner Jackpot",
    image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg",
    content: "Full content of Denner Jackpot blog goes here...",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="text-2xl mb-4">Blog not found 😢</p>
        <Link href="/" className="text-blue-500 underline">Go Back</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 max-w-4xl mx-auto">
      <div className="relative w-full h-96 mb-6">
        <Image src={blog.image} alt={blog.title} fill className="object-cover rounded-lg" />
      </div>

      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      {blog.subtitle && <p className="text-gray-400 mb-6">{blog.subtitle}</p>}


      <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
        <Clock size={16} />
        <span>{blog.readTime}</span>
      </div>

      <div className="prose prose-invert max-w-none">
        {blog.content}
      </div>
    </main>
  );
}
