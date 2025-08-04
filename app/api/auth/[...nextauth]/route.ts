import connectDB from "@/lib/mongo";
import Users from "@/models/users.model";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async function (credentials: any) {
                await connectDB()
                try {
                    const user = await Users.findOne({ email: credentials?.email, password: credentials?.password});
                    if(!user) throw new Error("User not found.");
                    return user;
                } catch (error: any) {
                    console.log(error);
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                const userdata = {
                    userid: user._id,
                    email: user.email,
                    name: user.name
                }
                token.user = userdata;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.user.userid;
            session.user.email = token.user.email;
            session.user.name = token.user.name;
            return session;
        }
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";