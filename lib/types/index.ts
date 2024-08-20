
export type IPermission = {
    id: string;
    created_at: string;
    role:"user"| "admin";
    status: "active" | "resigned";
    member_id: string;
    member:{
        id: string;
        created_at: string;
        name: string
    }
}

interface ModeratorDetails {
    id: string;
    name: string;
    state: string;
    created_at: string;
}

export type ModeratorRecord = {
    role: "admin" | "user" | "moderator";
    status: "active" | "resigned";
    moderator_id: string;
    created_at: string;
    id: string;
    moderators: ModeratorDetails;
}

export type ExcoRecord = {
    
}