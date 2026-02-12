"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "vecino" | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isVecino: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const MOCK_USERS = {
  admin: {
    id: "admin-1",
    name: "Administrador Principal",
    email: "admin@udgvirtual.mx",
    password: "admin123",
    role: "admin" as UserRole,
  },
  vecino: {
    id: "vecino-1",
    name: "Juan Pérez",
    email: "vecino@ejemplo.mx",
    password: "vecino123",
    role: "vecino" as UserRole,
    phone: "+52 33 1234 5678",
    address: "Calle Principal 123, Guadalajara",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check mock users
    if (role === "admin") {
      if (
        email === MOCK_USERS.admin.email &&
        password === MOCK_USERS.admin.password
      ) {
        const userData: User = {
          id: MOCK_USERS.admin.id,
          name: MOCK_USERS.admin.name,
          email: MOCK_USERS.admin.email,
          role: MOCK_USERS.admin.role,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
    } else if (role === "vecino") {
      if (
        email === MOCK_USERS.vecino.email &&
        password === MOCK_USERS.vecino.password
      ) {
        const userData: User = {
          id: MOCK_USERS.vecino.id,
          name: MOCK_USERS.vecino.name,
          email: MOCK_USERS.vecino.email,
          role: MOCK_USERS.vecino.role,
          phone: MOCK_USERS.vecino.phone,
          address: MOCK_USERS.vecino.address,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isVecino: user?.role === "vecino",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
