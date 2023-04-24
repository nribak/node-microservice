import {Session} from "next-auth";
import {useSession} from "next-auth/react";

export interface AppSession extends Session {
    id?: string
}

export function useAppSession(): [AppSession, "authenticated" | "unauthenticated" | "loading"] {
    const {status, data} = useSession()
    return [data as AppSession, status];
}

