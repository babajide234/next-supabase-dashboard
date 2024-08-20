import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import { cn } from "@/lib/utils";

export default function EditForm({ id, status, isAdmin }: { id: string; status: string; isAdmin: boolean }) {
	return (
		<Tabs defaultValue="basic" className="w-full space-y-5">
			<TabsList className={cn("grid w-full ", "grid-cols-3")}>
				<TabsTrigger value="basic">Basic</TabsTrigger>
			</TabsList>
			<TabsContent value="basic">
				<BasicForm  id={id} status={status}/>
			</TabsContent>
		</Tabs>
	);
}
