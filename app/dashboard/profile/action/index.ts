"use server";

import { createSupbaseServerClient } from "@/lib/supabase";


export async function editprofile(data:any){
    const supabase = await createSupbaseServerClient()

    // Get the current session (the logged-in user's information)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        return {
            success: false,
            error: {
                message: "Session not found. Please log in again.",
            },
        };
    }

    // Replace the following section with your logic to update the profile in the database
    const { error: updateError } = await supabase
    .from("moderators") 
    .update({
        name: data.name
    })
    .eq("id", session.user.id);

    if (updateError) {
        return {
            success: false,
            error: {
                message: updateError.message || "Failed to update profile.",
            },
        };
    }

    return {
        success: true,
        message: "Profile changed successfully",
    };
}


export async function changePassword(previousPassword: string, newPassword: string) {

    const supabase = await createSupbaseServerClient()

     // Get the current session (the logged-in user's information)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        return {
            success: false,
            error: {
                message: "Session not found. Please log in again.",
            },
        };
    }

    const { user } = session;


    // Reauthenticate the user by signing them in again with the previous password
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email as string,
        password: previousPassword,
    });

    if (signInError) {
        return {
            success: false,
            error: {
                message: "Previous password is incorrect.",
            },
        };
    }

    // Now update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        return {
            success: false,
            error: {
                message: updateError.message,
            },
        };
    }
    
    return {
        success: true,
        message: "Password changed successfully",
    };

        
}
