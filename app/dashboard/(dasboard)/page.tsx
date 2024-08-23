import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getRecentEntries, getExecutiveCounts, getModeratorStates } from "./actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/badge";
import { usePermissionsStore } from "@/lib/store/permissions";
import { readUserSession } from "@/lib/actions";
import { readModerators } from "../moderators/actions";

interface ExecutiveCount {
  type: string;
  total: number;
}

export default async function Dashboard() {
  const { data: entries } = await getRecentEntries();
  const executiveCounts = await getExecutiveCounts();
  const { data: userSession } = await readUserSession();
  const moderatorStates = await getModeratorStates();

  const isAdmin = userSession.session?.user?.user_metadata.role === "admin";
  const { data: mod } = await readModerators();

  const stateExecutives = executiveCounts?.find(item => item.type === 'State')?.total || 0;
  const lgaExecutives = executiveCounts?.find(item => item.type === 'LGA')?.total || 0;
  const wardExecutives = executiveCounts?.find(item => item.type === 'Ward')?.total || 0;

  const totalExecutives = stateExecutives + lgaExecutives + wardExecutives;
  const permissions = usePermissionsStore.getState().permissions;
  
  console.log(permissions)
  console.log(userSession.session?.user)
	return (
		<main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
        <div className="">
          <div className="">
            <h2 className="text-3xl font-medium text-gray-700 uppercase ">{isAdmin ? "National Director" : permissions?.moderators.state} </h2>
            <p className="text-gray-600 ">  </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {
            isAdmin ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total States</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{moderatorStates.length}</div>
                </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Executives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalExecutives}</div>
                  </CardContent>
              </Card>
            </>
            ):(
              <>              
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Executives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalExecutives}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">State Executives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stateExecutives}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">LGA Executives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{lgaExecutives}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Ward Executives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{wardExecutives}</div>
                  </CardContent>
                </Card>
              </>
            )
          }
		    </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card
                className="" x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Executives</CardTitle>
                    <CardDescription>
                      Recent added Executives.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="gap-1 ml-auto">
                    <Link href="/dashboard/excos">
                      View All
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {entries && entries.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Full Name</TableHead>
                          <TableHead className="hidden xl:table-column">Type</TableHead>
                          <TableHead className="hidden xl:table-column">Status</TableHead>
                          <TableHead className="hidden xl:table-column">Date</TableHead>
                          <TableHead className="text-right">Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entries.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="font-medium">{item.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {item.position}
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">Sale</TableCell>
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
                                {item.type} Level
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex items-center justify-center w-full text-xl font-medium text-center text-gray-700 capitalize h-44">No executive added</div>
                  )}
                </CardContent>

          </Card>
          {
            isAdmin && (
              <Card
                    className="" x-chunk="dashboard-01-chunk-4"
                  >
                    <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-2">
                        <CardTitle>States Moderators</CardTitle>
                        <CardDescription>
                          Recent added Moderators.
                        </CardDescription>
                      </div>
                      <Button asChild size="sm" className="gap-1 ml-auto">
                        <Link href="/dashboard/moderators">
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
                                  <TableHead className="text-right">State</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                        {
                          mod?.map((item)=>(
                            <TableRow key={item.id}>
                              <TableCell>
                              <div className="font-medium">{item.moderators.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {item.status}
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
                                <Badge variant={'default'} className="uppercase">
                                  {item.moderators.state}
                                  {" "}
                                  State
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        }
                              </TableBody>
                      </Table>
                    </CardContent>
              </Card>
            )
          }
        </div>
		</main>
	);
}
