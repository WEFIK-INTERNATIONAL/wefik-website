import BlogCard from "@/components/BlogCard";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";

export default function HomePage() {
  const blogs = [
    {
      title: "ESE Agency: Migros und Swisscom begrüssen Migros Mobile",
      subtitle: "Migros Mobile",
      image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg?updatedAt=1758552466115",
      link: "/blog/migros-mobile",
      readTime: "3 min",
    },
    {
      title: "«News, aber deep»: watson lanciert neue Imagekampagne mit ESE Agency",
      subtitle: "watson Imagekampagne",
      image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg?updatedAt=1758552466115",
      link: "/blog/news-aber-deep",
      readTime: "6 min",
    },
    {
      title: "ESE Agency: Verwandelt Office in einen Club",
      subtitle: "ESE-Party 2025",
      image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg?updatedAt=1758552466115",
      link: "/blog/ese-party-2025",
      readTime: "3 min",
    },
    {
      title: "Denner verlost in neuer Kampagne einzigartige Mega-Gewinne",
      subtitle: "Denner Jackpot",
      image: "https://ik.imagekit.io/wefikkit/Wefik/works/img_R_JdjVL88.jpeg?updatedAt=1758552466115",
      link: "/blog/denner-jackpot",
      readTime: "4 min",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      {/* First Featured Card */}
      <FeaturedBlogCard {...blogs[0]} />

      {/* Rest as Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {blogs.slice(1).map((blog, i) => (
          <BlogCard key={i} {...blog} />
        ))}
      </div>
    </main>
  );
}
