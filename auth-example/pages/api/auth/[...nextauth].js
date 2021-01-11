import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
    Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
]

const callbacks = {}

callbacks.signIn = async function signIn(user, account, metadata) {
  // This should be done only for github, because they don't return user's email.
  if (account && account.accessToken) {
    try {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `token ${account.accessToken}`
        }
      })
      const emails = await emailRes.json()
      const primaryEmail = emails.find(e => e.primary).email;
    
      user.email = primaryEmail;
  
      console.log('user during signin: ', user);
    } catch (e) {
      console.log(e);
    }
  }
    
}

const options = {
  providers,
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks,  
}

export default (req, res) => NextAuth(req, res, options)