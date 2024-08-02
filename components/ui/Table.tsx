import React, { ReactNode } from "react";

export default function Table({
	children,
	headers,
}: {
	children: ReactNode;
	headers: string[];
}) {
	return (
		<div className="w-full overflow-y-auto border rounded-md border-zinc-200 dark:border-zinc-800 dark:bg-graident-dark">
			<div className="w-[900px] lg:w-full bg-white dark:bg-inherit rounded-md space-y-5 py-5">
				<div className="grid grid-cols-5 px-5 py-2 pb-5 border-b  dark:border-zinc-600">
					{headers.map((header, index) => {
						return (
							<h1
								key={index}
								className="text-sm font-medium dark:text-gray-500"
							>
								{header}
							</h1>
						);
					})}
				</div>

				{children}
			</div>
		</div>
	);
}