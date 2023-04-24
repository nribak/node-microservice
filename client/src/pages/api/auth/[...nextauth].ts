import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {AppSession} from "@/data/app.session";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET_ID!
        })
    ],
    callbacks: {
        session: ({session, token}) => {
            const appSession: AppSession = {...session, id: token.sub};
            return appSession;
        }
    }
}

export default NextAuth(authOptions);
