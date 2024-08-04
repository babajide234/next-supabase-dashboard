"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";


export async function createModerators(data:{
    name: string;
    state: string;
    email: string;
    phone: string;
}) {

const {data:userSession} = await readUserSession();
if(userSession.session?.user.user_metadata.role !== "admin"){
    return JSON.stringify({
        error:{
            message: "you are not allowed too make this request"
        }
    })
}
const supabase = await createSupbaseAdmin()

// create account 
const result = await supabase.auth.admin.createUser({
    email: data.email,
    password: '123456',
    email_confirm: true,
    user_metadata:{
        role: 'moderator'
    }
})


if(result.error?.message){
    return JSON.stringify(result);
}else{
    const moderatorsResult =  await supabase.from('moderators').insert({
        id:result.data.user?.id,
        name:data.name,
        state:data.state,
    })
    if(moderatorsResult.error?.message){
        return JSON.stringify(moderatorsResult);
    }else{
    
        const permissionResult =  await supabase.from('permissions_mod').insert({
            role: 'moderators',
            moderator_id: result.data.user?.id,
            status: 'active'
        })

        return JSON.stringify(permissionResult)
    }

}
}

export async function readModerators() {

	unstable_noStore();
	
	const supabase = await createSupbaseServerClient();

	return await supabase.from('permissions_mod').select('*,moderators(*)')
}

