import React, { useState } from "react";
import {
  UserPlus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import AddUserForm from "./manager-setting-form";
import Popup from "../../../../commonpopup/popup";  
// ✅ adjust path to Popup.jsx if needed

export default function UsersRolesTab({ openPopup }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Karthik",
      email: "karthik@company.com",
      password: "password123",
      role: "Sales Executive",
      status: "active",
      avatar: "K",
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@company.com",
      password: "password123",
      role: "Sales Executive",
      status: "active",
      avatar: "P",
    },
    {
      id: 3,
      name: "Arun",
      email: "arun@company.com",
      password: "password123",
      role: "Team Lead",
      status: "active",
      avatar: "A",
    },
    {
      id: 4,
      name: "Meena",
      email: "meena@company.com",
      password: "password123",
      role: "Team Lead",
      status: "active",
      avatar: "M",
    },
    {
      id: 5,
      name: "Rajesh",
      email: "rajesh@company.com",
      password: "password123",
      role: "Manager",
      status: "active",
      avatar: "R",
    },
  ]);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // ✅ Local popup fallback if parent openPopup not passed
  const [localPopup, setLocalPopup] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
    showRetry: false,
    onRetry: null,
  });

  const safePopup = (type, title, message, extra = {}) => {
    if (openPopup) openPopup(type, title, message);
    else
      setLocalPopup({
        open: true,
        type,
        title,
        message,
        ...extra,
      });
  };

  const closeLocalPopup = () =>
    setLocalPopup((p) => ({
      ...p,
      open: false,
      showRetry: false,
      onRetry: null,
    }));

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case "Sales Executive":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Team Lead":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "Manager":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusBadgeStyle = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-gray-100 text-gray-700 border border-gray-200";
  };

  const handleAddUser = (newUser) => {
    try {
      if (!newUser?.name || !newUser?.email || !newUser?.password) {
        safePopup(
          "failure",
          "Validation Error",
          "Name, Email, and Password are required."
        );
        return;
      }

      // (Optional) If you ever allow custom emails, avoid duplicates:
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
      );
      if (emailExists) {
        safePopup(
          "failure",
          "Duplicate Email",
          "A user with this email already exists."
        );
        return;
      }

      const userWithId = {
        ...newUser,
        id: Math.max(...users.map((u) => u.id)) + 1,
        avatar: newUser.name.charAt(0).toUpperCase(),
      };

      setUsers((prev) => [...prev, userWithId]);
      setShowAddUserForm(false);

      safePopup(
        "success",
        "User Added!",
        `${userWithId.name} was added successfully.`
      );
    } catch (err) {
      console.error(err);
      safePopup(
        "failure",
        "Add Failed",
        "Could not add user. Please try again."
      );
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    if (!editingUser.name.trim() || !editingUser.password.trim()) {
      safePopup(
        "failure",
        "Validation Error",
        "Name and Password cannot be empty."
      );
      return;
    }

    try {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? editingUser : user
        )
      );

      safePopup(
        "success",
        "User Updated!",
        `${editingUser.name} updated successfully.`
      );

      setEditingUser(null);
    } catch (err) {
      console.error(err);
      safePopup(
        "failure",
        "Update Failed",
        "Could not update user. Try again."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteClick = (user) => {
    setDeleteConfirm(user);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;

    try {
      setUsers((prev) =>
        prev.filter((user) => user.id !== deleteConfirm.id)
      );

      safePopup(
        "success",
        "User Deleted",
        `${deleteConfirm.name} was deleted successfully.`
      );

      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      safePopup(
        "failure",
        "Delete Failed",
        "Could not delete user. Try again."
      );
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const togglePasswordVisibility = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <>
      {/* ✅ Local popup if global not passed */}
      {!openPopup && (
        <Popup
          open={localPopup.open}
          type={localPopup.type}
          title={localPopup.title}
          message={localPopup.message}
          onClose={closeLocalPopup}
          showRetry={localPopup.showRetry}
          onRetry={localPopup.onRetry}
        />
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Team Management
            </h3>
            <p className="text-gray-600 mt-2">
              Manage team members and their roles
            </p>
          </div>
          <button
            onClick={() => setShowAddUserForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Password
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        {editingUser?.id === user.id ? (
                          <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                name: e.target.value,
                              })
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Name"
                          />
                        ) : (
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {editingUser?.id === user.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            value={editingUser.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                            placeholder="Email"
                          />
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            (Cannot change)
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-600">{user.email}</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {editingUser?.id === user.id ? (
                          <input
                            type="text"
                            value={editingUser.password}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                password: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                          />
                        ) : (
                          <>
                            <span className="text-gray-600 font-mono">
                              {showPasswords[user.id]
                                ? user.password
                                : "••••••••"}
                            </span>
                            <button
                              onClick={() =>
                                togglePasswordVisibility(user.id)
                              }
                              className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors duration-200"
                            >
                              {showPasswords[user.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {editingUser?.id === user.id ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              role: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Sales Executive">
                            Sales Executive
                          </option>
                          <option value="Team Lead">Team Lead</option>
                          <option value="Manager">Manager</option>
                          <option value="Admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      {editingUser?.id === user.id ? (
                        <select
                          value={editingUser.status}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              status: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                            user.status
                          )}`}
                        >
                          {user.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {editingUser?.id === user.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddUserForm && (
          <AddUserForm
            onClose={() => setShowAddUserForm(false)}
            onAddUser={handleAddUser}
            openPopup={safePopup} // ✅ Give AddUserForm popup access too
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete User
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete this user?
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                    {deleteConfirm.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {deleteConfirm.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {deleteConfirm.email}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleBadgeStyle(
                        deleteConfirm.role
                      )}`}
                    >
                      {deleteConfirm.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}