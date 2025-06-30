import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // For development - accept any email/password combo
        if (credentials?.email) {
          return {
            id: '1',
            email: credentials.email,
            name: 'Coach User',
          }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production',
  callbacks: {
    async session({ session, token }) {
      return session
    },
  },
})

export { handler as GET, handler as POST } 