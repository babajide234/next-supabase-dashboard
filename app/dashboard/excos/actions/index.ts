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

export async function deleteExcoById(id: string) {
    const supabase = await createSupbaseServerClient();

    const { error } = await supabase
        .from('executive') 
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting moderator:', error.message);
        return null;
    }

    return { success: true };
}

export async function readExcos() {
    // Disable client-side data fetching with React
    unstable_noStore();

    // Create a Supabase client
    const supabase = await createSupbaseServerClient();

    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();

    // Check if session exists
    if (!session) {
        throw new Error("No user session found");
    }

    // Get the user's role and ID from the session
    const userRole = session.user.user_metadata?.role;
    const moderatorId = session.user.id;

    // If the user is an admin, fetch all executive records
    if (userRole === 'admin') {
        return await supabase
            .from('executive')
            .select("*, moderators(*)");
    } 
    
    // If the user is a moderator, fetch only the records created by them
    return await supabase
        .from('executive')
        .select("*, moderators(*)")
        .eq('moderator_id', moderatorId);
}




