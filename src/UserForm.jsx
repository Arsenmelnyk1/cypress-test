// UserForm.jsx
import React, { useState, useEffect } from "react";
import "./UserForm.css";

// Simulated API service
const UserService = {
  saveUser: (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user.email.endsWith(".co")) {
          reject({ message: "Server error. Please try again." });
          return;
        }

        resolve({ ...user, id: user.id || Date.now() });
      }, 300);
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },
};

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Load sample data on initial render
  useEffect(() => {
    // Simulate initial data load
    const initialUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        status: "active",
      },
    ];
    setUsers(initialUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear any API errors when user starts typing again
    if (apiError) setApiError("");

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    const isDuplicateEmail = users.some(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase() &&
        (!editingId || user.id !== editingId)
    );

    if (isDuplicateEmail) {
      newErrors.email = "Email already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      if (editingId !== null) {
        // Update existing user via API
        const updatedUser = await UserService.saveUser({
          ...formData,
          id: editingId,
        });

        setUsers(
          users.map((user) => (user.id === editingId ? updatedUser : user))
        );
        setEditingId(null);
      } else {
        // Add new user via API
        const newUser = await UserService.saveUser(formData);
        setUsers([...users, newUser]);
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "user",
        status: "active",
      });
    } catch (error) {
      setApiError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({ ...user });
    setEditingId(user.id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      role: "user",
      status: "active",
    });
  };

  const handleDelete = async (id) => {
    try {
      await UserService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "active" ? "inactive" : "active",
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="user-management">
      <h2>{editingId !== null ? "Edit User" : "Add User"}</h2>

      {apiError && (
        <div className="api-error" data-cy="api-error">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} data-cy="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            data-cy="input-name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="form-control"
          />
          {errors.name && (
            <span className="error" data-cy="error-name">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            data-cy="input-email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="form-control"
          />
          {errors.email && (
            <span className="error" data-cy="error-email">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            data-cy="select-role"
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
            className="form-control"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="active"
                data-cy="radio-active"
                checked={formData.status === "active"}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              Active
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="inactive"
                data-cy="radio-inactive"
                checked={formData.status === "inactive"}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              Inactive
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            data-cy="btn-submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting
              ? "Processing..."
              : editingId !== null
              ? "Update"
              : "Add"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancel}
              data-cy="btn-cancel"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Users</h2>
      {users.length === 0 ? (
        <p data-cy="no-users">No users found</p>
      ) : (
        <div className="table-container">
          <table className="user-table" data-cy="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  data-cy={`user-row-${user.id}`}
                  className={user.status === "inactive" ? "inactive-user" : ""}
                >
                  <td data-cy={`user-name-${user.id}`}>{user.name}</td>
                  <td data-cy={`user-email-${user.id}`}>{user.email}</td>
                  <td data-cy={`user-role-${user.id}`}>{user.role}</td>
                  <td data-cy={`user-status-${user.id}`}>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                    <button
                      className="btn-toggle"
                      onClick={() => toggleStatus(user.id)}
                      data-cy={`btn-toggle-${user.id}`}
                      aria-label={`Toggle ${user.name}'s status`}
                    >
                      Toggle
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(user)}
                        data-cy={`btn-edit-${user.id}`}
                        disabled={isSubmitting}
                        className="btn btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        data-cy={`btn-delete-${user.id}`}
                        disabled={isSubmitting}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserForm;
