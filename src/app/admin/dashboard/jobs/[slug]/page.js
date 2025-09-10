"use client";

import React from "react";
import JobsDetails from "@/components/dashboard/JobsDetails";           
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";


const Page = ({ params }) => {
	const resolvedParams = React.use(params);
	const slug = resolvedParams.slug;

	const { jobs } = [];

	const job = jobs.find((app) => app._id == slug);

	return (
		<div className="max-w-6xl mx-auto space-y-3 p-2">
			{/* Back Button */}
			<div className="w-20">
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
				>
					<Link href="/admin/dashboard/jobs">
						<CircleArrowLeft className="h-4 w-4" />
						Back
					</Link>
				</Button>
			</div>

			{/* JobsDetails Details */}
			<JobsDetails job={job} />
		</div>
	);
};

export default Page;
