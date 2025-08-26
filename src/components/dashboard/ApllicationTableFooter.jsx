import React from "react";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const ApllicationTableFooter = ({
	isLoading,
	currentPage,
	setCurrentPage,
	totalPages,
	totalItems,
	indexOfFirst,
	indexOfLast,
}) => {
	return (
		<div className="flex justify-between items-center pr-10 py-8">
			<div>
				{
					isLoading ? (
						<p className="text-gray-500 text-sm">Loading...</p>
					) : (
						<p className="text-gray-500 text-sm">
							Showing {indexOfFirst + 1} to{" "}
							{indexOfLast > totalItems ? totalItems : indexOfLast} of{" "}
							{totalItems} entries
						</p>
					)
				}
			</div>
			<div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
								className="cursor-pointer"
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }).map((_, i) => (
							<PaginationItem key={i}>
								<PaginationLink
									isActive={currentPage === i + 1}
									onClick={() => setCurrentPage(i + 1)}
									className="cursor-pointer"
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setCurrentPage((p) => Math.min(p + 1, totalPages))
								}
								className="cursor-pointer"
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default ApllicationTableFooter;
