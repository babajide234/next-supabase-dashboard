import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React from 'react'

export default function DeleteMember({ user_id }:{ user_id:string}){
  
    const onSubmit = () =>{
        
    }

return (
    <form action={onSubmit}>

    <Button variant="outline">
		<TrashIcon />
		Delete
	</Button>
    </form>
  )
}

