"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";
import { z } from "zod";

export async function createMember(data:{
		name: string;
		role: "user" | "admin";
		status: "active" | "resigned";
		email: string;
		password: string;
		confirm: string;
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
		password: data.password,
		email_confirm: true,
		user_metadata:{
			role: data.role
		}
	})
	

	if(result.error?.message){
		return JSON.stringify(result);
	}else{
		const memberResult =  await supabase.from('member').insert({
			name:data.name,
			id:result.data.user?.id
		})
		if(memberResult.error?.message){
			return JSON.stringify(memberResult);
		}else{
		
			const permissionResult =  await supabase.from('permissions').insert({
				role: data.role,
				member_id: result.data.user?.id,
				status: data.status
			})

			return JSON.stringify(permissionResult)
		}

	}

	// create member

	// create permission
}

export async function updateMemberById(id: string) {
	console.log("update member");
}

export async function deleteMemberById(id: string) {}
export async function readMembers() {

	unstable_noStore();
	
	const supabase = await createSupbaseServerClient();

	return await supabase.from('permissions').select("*,member(*)")
}
