import Alert from '@/components/Alert'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash, TrashIcon } from 'lucide-react'
import React, { useTransition } from 'react'
import { deleteExcoById } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

export default function DeleteExco({ user_id }:{ user_id:number}){
  
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteExcoById(user_id);
  
      if (result?.success) {
        // Handle success, e.g., refresh the page or show a success message
        toast({
          title: "Executive deleted successfully",
          description: "The executive has been removed.",
        });
        router.refresh()
      } else {
        // Handle error, e.g., show an error message
        toast({
          title: "Failed to delete Executive",
          description: "An error occurred while trying to delete the executive.",
        });
      }
    });
  };
  

return (
  <Alert
    title='Confirm Deletion'
    description='Are you sure you want to delete this executive? This action cannot be undone.'
    form={
      <form>
          <Button variant="outline" onClick={onSubmit} disabled={isPending}>
            <TrashIcon />
            Delete
            {isPending && (
              <AiOutlineLoading3Quarters className={cn("animate-spin ml-2")} />
            )}
          </Button>
      </form>
    }
    Trigger={
      <Button variant={'ghost'} size={'full'} className="flex items-center gap-2 text-red-600">
          <Trash size={14}/>
          Delete
      </Button>
    }
  />
  )
}

