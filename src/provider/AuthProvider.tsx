import React, { useEffect, useMemo, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Role } from "../model/shared-types"
import { User } from "../model/User"

interface AuthContextType {
  user: Partial<User> | undefined
  role: Role | undefined
  signIn: (user: Partial<User>, role: Role, callback: VoidFunction) => void
  signOut: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<Partial<User> | undefined>(undefined)
  const [role, setRole] = React.useState<Role | undefined>(undefined)

  const signIn = (
    newUser: Partial<User>,
    newRole: Role,
    callback: VoidFunction
  ) => {
    setUser(newUser)
    setRole(newRole)
    callback()
  }

  const signOut = (callback: VoidFunction) => {
    sessionStorage.removeItem("jwt")
    setUser(undefined)
    setRole(undefined)
    callback()
  }

  const value = useMemo(() => ({ user, role, signIn, signOut }), [user, role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  return React.useContext(AuthContext)
}

const RequireAuth = ({
  children,
  role = Role.User,
}: {
  children: JSX.Element
  role?: Role
}) => {
  let auth = useAuth()
  let location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if (jwt) {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8000/auth/getUserData", {
          method: "GET",
          headers: { authorization: `Bearer ${jwt}` },
        })
        if (response.status === 403) {
          sessionStorage.removeItem("jwt")
          setIsLoading(false)
        } else {
          const data = await response.json()
          auth.signIn(data.user, data.user.role, () => {
            setIsLoading(false)
          })
        }
      }

      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [])

  if (!isLoading) {
    if (!auth.user) {
      return <Navigate to="/auth/signin" state={{ from: location }} replace />
    }

    if (!auth.role || auth.role !== role) {
      return <Navigate to="/not-authorized" />
    }

    return children
  } else {
    return <h1>Welcome...</h1>
  }
}

const AuthStatus = () => {
  let auth = useAuth()
  let navigate = useNavigate()

  if (!auth.user || !auth.role) {
    return <p>You are not logged in</p>
  }

  return (
    <p>
      Welcome {auth.user.firstName} in role: {Role[auth.role]}!{" "}
      <button
        onClick={() => {
          auth.signOut(() => navigate("/"))
        }}
      >
        Sign out
      </button>
      <button onClick={() => navigate("/second")}>To second page</button>
      <button onClick={() => navigate("/protected")}>To protected</button>
      <button onClick={() => navigate("/protected/me")}>To protected me</button>
    </p>
  )
}

export { useAuth, AuthStatus, RequireAuth, AuthProvider }
