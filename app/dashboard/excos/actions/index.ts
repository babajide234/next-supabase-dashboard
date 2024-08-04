"use server";

import { readUserSession } from "@/lib/actions";
import { usePermissionsStore } from "@/lib/store/permissions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";
import { z } from "zod";

export async function createExecutiveEntry(data: {
    name: string;
    gender: string;
    phone: string;
    lga: string;
    ward: string;
    type: string;
    position: string;
	state: string;  
}) {
    // Create Supabase client
    const supabase = await createSupbaseServerClient();

	// Fetch user session to get member_id (this example assumes you have a function to get the user session)
    const { data: userSession, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !userSession?.session?.user?.id) {
        return JSON.stringify({
            error: {
                message: sessionError?.message || "Failed to get user session",
            },
        });
    }
    const _id = userSession.session.user.id;

    // Insert data into the executive table
    const { data: executiveResult, error } = await supabase.from('executive').insert({
        moderator_id: _id ,
        state: data.state,
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        lga: data.lga,
        ward: data.ward,
        type: data.type,
        position: data.position,
    });

    if (error) {
        return JSON.stringify({
            error: {
                message: error.message,
            },
        });
    }

    return JSON.stringify({
        data: executiveResult,
    });
}


export async function updateMemberById(id: string) {
	console.log("update member");
}

export async function deleteMemberById(id: string) {}

export async function readExcos() {

	unstable_noStore();
	
	const supabase = await createSupbaseServerClient();

	return await supabase.from('executive').select("*,moderators(*)")
}


