import { Input } from "@/components/ui/input";

 export default function SearchModerators(){
    return (
        <Input
			placeholder="search by state, name or email"
			className="bg-white  ring-zinc-300 dark:bg-inherit focus:dark:ring-zinc-700 focus:ring-zinc-300"
		/>
    );
}

