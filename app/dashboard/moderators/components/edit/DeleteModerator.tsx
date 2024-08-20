import { Button } from '@/components/ui/button'
import { Trash, TrashIcon } from 'lucide-react'
import React from 'react'
import Alert from '../../../../../components/Alert'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function DeleteModerator({ user_id }:{ user_id:string}){
  
    const onSubmit = () =>{
        
    }

return (

    <Alert 
      id=''
      title=''
      description=''
      form={
        <form action={onSubmit}>
          <Button variant="outline">
            <TrashIcon />
            Delete
          </Button>
        </form>
      }
      Trigger={
        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
            <Trash size={14}/>
            Delete
        </DropdownMenuItem>
      }
    />
  )
}

