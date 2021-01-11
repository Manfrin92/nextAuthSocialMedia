import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'


export default function Header () {
  const [session] = useSession()

  const handleLogout = (e) => {
    e.preventDefault()
    signOut()
  }

  if (session && session.user) {
      console.log(session.user)
  }

  return (
    <div className='header'>
      
      <div className="user-info">
        {session? (
          <>
            <img style={{height: '60px', width: '60px', borderRadius: 30}} src={session.user.image} className="user"/>
            <a href="#" onClick={handleLogout} className="logout">Logout</a>
          </>
        ) : (
          <Link  href='/api/auth/signin'>
            <a>
              <div>Login</div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}