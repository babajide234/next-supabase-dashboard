"use server";
import { createSupbaseServerClient, createSupbaseServerClientReadOnly } from "../supabase";

export async function readUserSession() {
	const supabase = await createSupbaseServerClientReadOnly();

	return supabase.auth.getSession();
}

export async function readPermissions() {
        const supabase = await createSupbaseServerClient();
        
            // Get the current user's session
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        const userId = session?.user?.id;

        if (!userId) {
            throw new Error("User is not authenticated.");
        }

        // Fetch permissions for the current user
        const { data, error } = await supabase
        .from('permissions_mod')
        .select('*, moderators(*)')
        .eq('moderator_id', userId); 

        if (error) {
            throw error;
        }
        
        return data;
}
