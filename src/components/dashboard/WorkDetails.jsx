"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Tag, FilePenLine, File, Github, Radio } from "lucide-react";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

const WorkDetails = ({ work, onEdit, onDelete, onStatusToggle }) => {
    if (!work) return <p className="text-center mt-10">Work not found</p>;

    return (
        <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl border border-slate-800/50 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-slate-800/60">
                {/* Header */}
                <CardHeader className="flex flex-col gap-3">
                    <CardTitle className="flex justify-between items-center gap-5">
                        <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {work.title}
                        </span>
                        <div className="flex gap-2">
                            {work.isFeatured && (
                                <Badge className="px-3 py-1 font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-sm hover:scale-105 transition-transform">
                                    ⭐ Featured
                                </Badge>
                            )}
                            <Badge
                                className={`${getStatusBadgeClasses(
                                    work.status
                                )} capitalize shadow-sm`}
                            >
                                {work.status}
                            </Badge>
                        </div>
                    </CardTitle>
                    <p className="text-gray-400 leading-relaxed">
                        {work.description}
                    </p>
                </CardHeader>

                <Separator className="bg-slate-800/70" />

                {/* Content */}
                <CardContent className="space-y-8 p-6">
                    {/* Images */}
                    {work.images?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {work.images.map((img, i) => (
                                <div
                                    key={i}
                                    className="group overflow-hidden rounded-xl shadow-md border border-slate-800/50"
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.filename || "Work image"}
                                        width={600}
                                        height={400}
                                        className="rounded-xl object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500 ease-out"
                                        placeholder="blur"
                                        blurDataURL="/placeholder.png"
                                        loading={i === 0 ? "eager" : "lazy"}
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="space-y-4 text-gray-300">
                        <p className="flex gap-2 items-center">
                            <strong className="flex gap-2 items-center text-white">
                                <File className="w-5 h-5" /> Category:
                            </strong>{" "}
                            {work.category}
                        </p>
                        <p>
                            <strong className="flex gap-2 items-center text-white">
                                <Tag className="w-5 h-5" /> Tags:
                            </strong>{" "}
                            {work.tags?.length > 0 ? (
                                <span className="flex flex-wrap gap-2 mt-1">
                                    {work.tags.map((tag, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="outline"
                                            className="px-3 py-1 bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700/50"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </span>
                            ) : (
                                "None"
                            )}
                        </p>
                        <p>
                            <strong className="text-white">
                                ⚙️ Tech Stack:
                            </strong>{" "}
                            {work.techStack?.length > 0 ? (
                                <span className="flex flex-wrap gap-2 mt-1">
                                    {work.techStack.map((tech, idx) => (
                                        <Badge
                                            key={idx}
                                            className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </span>
                            ) : (
                                "None"
                            )}
                        </p>
                        <p>
                            {work.projectLink ? (
                                <Link
                                    href={work.projectLink}
                                    target="_blank"
                                    className="flex items-center gap-2 text-white text-md font-bold hover:text-blue-300 hover:underline transition-colors"
                                >
                                    <Radio className="w-5 h-5" /> Live Demo
                                </Link>
                            ) : (
                                "N/A"
                            )}
                        </p>
                        <p>
                            {work.githubLink ? (
                                <Link
                                    href={work.githubLink}
                                    target="_blank"
                                    className="flex items-center gap-2 text-white text-md font-bold hover:text-blue-300 hover:underline transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    Github
                                </Link>
                            ) : (
                                "N/A"
                            )}
                        </p>
                    </div>
                </CardContent>

                <Separator className="bg-slate-800/70" />

                {/* Actions */}
                <CardFooter className="flex justify-end gap-4 p-6 bg-slate-950/40 backdrop-blur-sm border-t border-slate-800/50">
                    <Button
                        variant="outline"
                        onClick={onEdit}
                        className="text-white"
                    >
                        <FilePenLine className="w-5 h-5" /> Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        className=""
                    >
                        🗑️ Delete
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onStatusToggle}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-lg hover:scale-105 transition-transform"
                    >
                        🔄 Update Status
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default WorkDetails;
