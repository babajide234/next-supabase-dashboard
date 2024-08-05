import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getRecentEntries } from "./actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/badge";

export default async function Dashboard() {
    const { data: entries, error } = await getRecentEntries();
    const totalExecutives = entries ? entries.length : 0;

	return (
		<main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Executives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalExecutives}</div>
            </CardContent>
          </Card>
		</div>
		<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
			<CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Executives</CardTitle>
                <CardDescription>
                  Recent added Executives.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="gap-1 ml-auto">
                <Link href="#">
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
				<CardContent>
				<Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
					{
						entries?.map((item)=>(
							<TableRow key={item.id}>
								<TableCell>
								<div className="font-medium">{item.name}</div>
								<div className="hidden text-sm text-muted-foreground md:inline">
									{item.position}
								</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">
								Sale
								</TableCell>
								<TableCell className="hidden xl:table-column">
								<Badge className="text-xs" variant="outline">
									Approved
								</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
								2023-06-23
								</TableCell>
								<TableCell className="text-right">
									<Badge>
										{item.type}
										{" "}
										Level
									</Badge>
								</TableCell>
							</TableRow>
						))
					}
                </TableBody>
              </Table>
				</CardContent>
		  </Card>
		</div>
		</main>
	);
}
