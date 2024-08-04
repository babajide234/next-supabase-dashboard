"use server";
import { createSupbaseServerClient, createSupbaseServerClientReadOnly } from "../supabase";

export async function readUserSession() {
	const supabase = await createSupbaseServerClientReadOnly();

	return supabase.auth.getSession();
}
export async function readPermissions() {
        const supabase = await createSupbaseServerClient();
        
        const { data, error } = await supabase
            .from('permissions_mod')
            .select('*, moderators(*)');

        if (error) {
            throw error;
        }
        
        return data;
        
}
