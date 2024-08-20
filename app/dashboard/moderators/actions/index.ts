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
            role: 'moderator',
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

	const data =  await supabase.from('permissions_mod').select('*,moderators(*)')
    return data;
}

export async function updateStatus(moderatorId: string, newStatus: "active" | "resigned") {
    const supabase = await createSupbaseServerClient();

        // Log to ensure the client was created
        if (!supabase) {
            return JSON.stringify({
                error: {
                    message: "Failed to initialize Supabase client",
                },
            });
        }
    
        // Log the inputs
        console.log("Moderator ID:", moderatorId);
        console.log("New Status:", newStatus);

    // Update the status in the permissions_mod table
    const { data, error } = await supabase
        .from('permissions_mod')
        .update({ status: newStatus })
        .eq('moderator_id', moderatorId);

        // Log the result and errors
        console.log("Data:", data);
        console.log("Error:", error);

    if (error) {
        return JSON.stringify({
            error: {
                message: error.message,
            },
        });
    }

    // Check if the update was successful
    if (data && data.length === 0) {
        return JSON.stringify({
            error: {
                message: "No record found with the given moderator_id",
            },
        });
    }


    return JSON.stringify({
        message: "Status updated successfully",
        data,
    });
}

export async function deleteModerator(user_id: string) {
    const supabase = await createSupbaseServerClient();

    const { error } = await supabase
        .from('moderators') 
        .delete()
        .eq('id', user_id);

    if (error) {
        console.error('Error deleting moderator:', error.message);
        return null;
    }

    return { success: true };
}
