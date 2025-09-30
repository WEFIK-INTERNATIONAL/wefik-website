"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

import { useWorksList } from "@/queries/clientQueries";

export default function Page() {
    const router = useRouter();
    const { data, isLoading } = useWorksList();

    return (
        <div className="font-neue w-screen h-screen grid grid-cols-3 gap-8 p-10">
            {data?.map((work) => (
                <Card
                    key={work._id}
                    onClick={() => router.push(`/work/${work._id}`)}
                    className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                    {/* Cover Image */}
                    {work?.images && work?.images?.length > 0 && (
                        <div className="relative w-full h-52">
                            <Image
                                src={work.images[0].url}
                                alt={work.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {work?.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {work?.category}
                        </p>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm line-clamp-3 mb-3">
                            {work?.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {work?.techStack?.map((tech, idx) => (
                                <Badge key={idx} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                            {work?.tags?.map((tag, idx) => (
                                <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <div className="flex gap-2">
                            {work?.githubLink && (
                                <Button asChild size="sm" variant="outline">
                                    <Link
                                        href={work?.githubLink}
                                        target="_blank"
                                    >
                                        <Github className="h-4 w-4 mr-1" /> Code
                                    </Link>
                                </Button>
                            )}
                            {work?.projectLink && (
                                <Button asChild size="sm">
                                    <Link
                                        href={work?.projectLink}
                                        target="_blank"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-1" />{" "}
                                        Live
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
