import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/prismaClient";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // If the user just logged in, fetch additional data
      if (account && user) {

        const dbUser = await prisma.user.findFirst({
          where: { email: user.email },
        });
        while(!dbUser){
          await prisma.user.create({
            data:{
              name:user?.name,
              email:user?.email,
              subscription_id:1
            }
          })
        }
        user.test = "dog";
        

        if (dbUser) {
          token.user_id = dbUser.id;
          token.subscription_id = dbUser.subscription_id;
        }
    
      }
 

      return token;
    },
    async session({ session, token }) {
      try {
        const { email, user_id, subscription_id} = token;
        
        const branch = await prisma.branch.findFirst({
          where:{
            branch_owner:Number(user_id)
          }
        })
        const user_subscription = await prisma.user_subscription.findUnique({
          where:{
            id:Number(subscription_id)
          }
        })
     
        // // Append additional data to the session
        if (token) {
          session.user.branch_id = branch?.id;
          session.user.branch_name = branch?.branch_name;
          session.user.subscription_title = user_subscription?.subscription_title;
          session.user.subscription_duration = user_subscription?.subscription_duration_per_month;
          session.user.subscription_started = user_subscription?.subscription_created_at;
          session.user.user_id = user_id;
        }
        return session;
      } catch (error) {
        console.log(error,'error')
      }
    },
  },
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }