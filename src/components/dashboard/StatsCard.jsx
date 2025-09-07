"use client";
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatsCard = ({
    title,
    description,
    isLoading,
    value,
    delta,
    deltaColor = "text-green-400",
    badgeText,
    icon: Icon,
    iconColor = "text-purple-400",
    glowColor = "bg-purple-600/20",
}) => {
    return (
        <Card className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 gap-1">
            <div
                className={`absolute -top-8 -right-8 w-32 h-32 ${glowColor} rounded-full blur-2xl`}
            />

            <CardHeader className="">
                <CardTitle className="flex justify-between items-center text-gray-200 text-lg font-semibold">
                    {title}
                    {Icon && (
                        <span
                            className={`p-2 rounded-lg bg-opacity-20 ${iconColor}`}
                        >
                            <Icon size={22} />
                        </span>
                    )}
                </CardTitle>
                {description && (
                    <CardDescription className="text-sm text-gray-400">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <p className="text-xl font-extrabold text-white tracking-tight">
                        Loading...
                    </p>
                ) : (
                    <div className="text-5xl font-extrabold text-white tracking-tight">
                        {value}
                    </div>
                )}
                {delta && (
                    <p className={`mt-2 text-sm font-medium ${deltaColor}`}>
                        {delta}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-between items-center mt-3">
                {badgeText && (
                    <Badge className="bg-purple-600/20 text-purple-300 border border-purple-500/30">
                        {isLoading ? "Loading..." : badgeText}
                    </Badge>
                )}
            </CardFooter>
        </Card>
    );
};

export default StatsCard;
