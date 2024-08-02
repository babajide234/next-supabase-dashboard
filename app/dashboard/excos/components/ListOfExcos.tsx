import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditMember";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";
import { readMembers } from "../actions";
import { IPermission } from "@/lib/types";

 
export default async function ListOfExcos() {
	const {data: permissions} = await readMembers()

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"

	return (
		<div className="mx-2 bg-white rounded-sm dark:bg-inherit">
			{(permissions as IPermission[])?.map((permission, index) => {
				return (
					<div
						className="grid grid-cols-5 p-3 font-normal align-middle rounded-sm "
						key={index}
					>
						<h1>{permission.member.name}</h1>

						<div>
							<span
								className={cn(
									" dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
									{
										"border-green-500 text-green-600 bg-green-200":
										permission.role === "admin",
										"border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
										permission.role === "user",
									}
								)}
							>
								{permission.role}
							</span>
						</div>
						<h1>{ new Date(permission.created_at).toDateString() }</h1>
						<div>
							<span
								className={cn(
									" dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
									{
										"text-green-600 px-4 dark:border-green-400 bg-green-200":
										permission.status === "active",
										"text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
										permission.status === "resigned",
									}
								)}
							>
								{permission.status}
							</span>
						</div>

						<div className="flex items-center gap-2">
							{
								isAdmin &&
								<Button variant="outline">
									<TrashIcon />
									Delete
								</Button>
							}
			
							<EditMember isAdmin={isAdmin} />
						</div>
								
					</div>
				);
			})}
		</div>
	);
}
