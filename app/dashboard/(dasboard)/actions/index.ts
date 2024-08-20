import { readUserSession } from "@/lib/actions";
import { createSupbaseServerClient } from "@/lib/supabase";


export async function getRecentEntries() {
  const { data: userSession } = await readUserSession();
  const supabase = await createSupbaseServerClient();

  // Check if the user is an admin
  const isAdmin = userSession.session?.user?.user_metadata.role === "admin";

  if (isAdmin) {
      // If the user is an admin, return all entries
      return await supabase
          .from('executive')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
  } else {
      // If the user is not an admin, return only entries related to their moderator_id
      return await supabase
          .from('executive')
          .select('*')
          .eq('moderator_id', userSession.session?.user.id)
          .order('created_at', { ascending: false })
          .limit(10);
  }
}

interface ExecutiveCount {
    type: string;
    total: number;
  }


  
  export async function getExecutiveCounts(): Promise<ExecutiveCount[]> {
    const supabase = await createSupbaseServerClient();
    
    const { data, error } = await supabase
      .rpc('get_executive_counts');
  
    if (error) {
      console.error(error);
      return []; 
    }
  
    return data as ExecutiveCount[]; 
  }

  export async function getModeratorStates() {
    const supabase = await createSupbaseServerClient();

    // Call the PostgreSQL function to get distinct states
    const { data, error } = await supabase
        .rpc('get_distinct_moderator_states');

    if (error) {
        console.error("Error fetching moderator states:", error);
        return [];
    }

    return data;
}