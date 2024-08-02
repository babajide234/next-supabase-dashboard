import { useUserStore } from '@/lib/store/user';
import React from 'react'
import { readModerators } from '../actions';

export default async function ListOfModerators() {
  const {data} = await readModerators()

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"

  console.log("data",data);

  return (
    <div className="mx-2 bg-white rounded-sm dark:bg-inherit">
      
	  </div>
  )
}
