"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, User, Tag } from "lucide-react";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

const BlogDetails = ({ blog }) => {
    if (!blog) {
        return (
            <p className="text-center text-gray-400 dark:text-gray-500">
                No blog found.
            </p>
        );
    }

    const {
        title,
        content,
        category,
        author,
        status,
        createdAt,
    } = blog;

    return (
        <div className="space-y-6 overflow-y-scroll h-[78vh] p-2">
            {/* Top Summary Card */}
            <Card className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-lg border border-white/20">
                <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />

                <CardContent className="relative p-6 text-gray-900 dark:text-gray-100">
                    <h1 className="text-2xl font-bold drop-shadow-sm">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm flex items-center gap-2 opacity-90">
                        <User className="w-4 h-4" /> {author}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                            {category}
                        </Badge>
                        <Badge
                            className={`px-5 py-1 rounded-full ${getStatusBadgeClasses(
                                status
                            )}`}
                        >
                            {status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Blog Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Content
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {content ? (
                        <div
                            className="prose dark:prose-invert max-w-none leading-relaxed text-gray-300"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No content available.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                Posted on{" "}
                {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
            </div>
        </div>
    );
};

export default BlogDetails;
