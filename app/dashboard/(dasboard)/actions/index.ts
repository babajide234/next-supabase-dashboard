import { readUserSession } from "@/lib/actions";
import { createSupbaseServerClient } from "@/lib/supabase";


export async function getRecentEntries() {
    
    const {data:userSession} = await readUserSession();

    // if(userSession.session?.user.user_metadata.role !== "admin"){
    //     return JSON.stringify({
    //         error:{
    //             message: "you are not allowed too make this request"
    //         }
    //     })
    // }
    
    const supabase = await createSupbaseServerClient();

    return await supabase
        .from('executive')
        .select('*')
        .eq('moderator_id', userSession.session?.user.id) 
        .order('created_at', { ascending: false }) 
        .limit(10); 
    
}