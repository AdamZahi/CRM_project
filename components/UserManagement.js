"use client"

import { useState, useEffect } from "react"
import { Users, Plus, Edit, Trash2 } from "lucide-react"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{user.name || "Unnamed User"}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">{user.role}</div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
