// ═══════════════════════════════════════════════════════════════════
// 📌 PURPOSE: Frontend-only Auth System using localStorage
// ═══════════════════════════════════════════════════════════════════

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "frontend_users";
const CURRENT_USER_KEY = "frontend_current_user";

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const getStoredCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
  } catch {
    return null;
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setUsers(getStoredUsers());
    setCurrentUser(getStoredCurrentUser());
  }, []);

  // Register
  const register = ({ fullName, email, password }) => {
    const trimmedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === trimmedEmail,
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      email: trimmedEmail,
      password: password,
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      avatar: "",
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    setCurrentUser(newUser);
    saveCurrentUser(newUser);

    return {
      success: true,
      message: "Account created successfully.",
      user: newUser,
    };
  };

  // Login
  const login = ({ email, password }) => {
    const trimmedEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === trimmedEmail && item.password === password,
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setCurrentUser(user);
    saveCurrentUser(user);

    return {
      success: true,
      message: "Login successful.",
      user,
    };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    removeCurrentUser();
  };

  // Update Account
  const updateProfile = (updatedData) => {
    if (!currentUser) return { success: false, message: "No user logged in." };

    const updatedUser = {
      ...currentUser,
      ...updatedData,
    };

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user,
    );

    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    setCurrentUser(updatedUser);
    saveCurrentUser(updatedUser);

    return {
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    };
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated: !!currentUser,
      register,
      login,
      logout,
      updateProfile,
    }),
    [users, currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─────────────────────────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────────────────────────

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
