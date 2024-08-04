
import { useUserStore } from '@/lib/store/user';
import React from 'react'
import { readModerators } from '../actions';
import { ModeratorRecord } from '@/lib/types';
import { TableCell, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import EditModerator from './edit/EditModerator';


export default async function ListOfModerators() {
  const {data:permissions} = await readModerators()

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"

  console.log("moderators",permissions);

  return (
    <>
      	{(permissions as ModeratorRecord[])?.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell className="font-medium">{permission.moderators.name}</TableCell>
              <TableCell>{permission.moderators.state}</TableCell>
              <TableCell>{new Date(permission.created_at).toDateString()}</TableCell>
              <TableCell><Badge variant={'default'}>{permission.status}</Badge></TableCell>
              <TableCell className="">
                {
                  isAdmin &&
                  <Button variant="destructive">
                    <TrashIcon />
                  </Button>
                }
        
                <EditModerator isAdmin={isAdmin} />
              </TableCell>
            </TableRow>
          ))}
    </>
  )
}
