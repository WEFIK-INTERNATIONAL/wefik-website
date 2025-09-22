import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { getStatusBadgeClasses } from "@/utils/statusBadge";

const WorkCard = ({ work }) => (
    <Card className="max-h-96 group border border-slate-700 rounded-xl bg-slate-950 text-white hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">
                    {work.title}
                </span>
                <div className="flex gap-2">
                    {work.isFeatured && (
                        <Badge className="px-3 py-1 font-semibold rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 backdrop-blur-md border border-yellow-500/30 shadow-sm">
                            Featured
                        </Badge>
                    )}
                    <Badge
                        className={`px-3 py-1 font-semibold rounded-full ${getStatusBadgeClasses(work.status)}`}
                    >
                        {work.status}
                    </Badge>
                </div>
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 px-4">
            <Image
                src={
                    work.images[0]?.url ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={work.title}
                width={400}
                height={200}
                className="w-full max-h-52 object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
            />
        </CardContent>

        <CardFooter>
            {work.techStack?.length > 0 && (
                <div className="bottom-3 left-3 bg-white/80 text-black text-xs font-medium rounded px-2 py-1 backdrop-blur-sm">
                    {work.techStack.join(", ")}
                </div>
            )}
        </CardFooter>
    </Card>
);

export default WorkCard;
