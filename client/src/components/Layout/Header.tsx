"use client"

import type React from "react"
import { NavLink, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook"
import { logout } from "@/store/slices/authSlice"
import { Search, Upload, User, LogOut } from "lucide-react"

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MediaVault</span>
          </NavLink>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/search"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </NavLink>
              <NavLink
                to="/upload"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </NavLink>
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </NavLink>
                <NavLink to="/register" className="btn-primary">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
