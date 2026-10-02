import { createContext, useContext, useState } from 'react';
import { DUMMY_ACCOUNTS } from '../data/dummyAccounts';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Lazy state initialization from localStorage - avoids cascading render in useEffect
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cost_estimator_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading] = useState(false);

  function login(email, password) {
    const found = DUMMY_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
    );

    if (!found) {
      throw new Error('Invalid email or password. Use one of the demo accounts.');
    }

    const sessionUser = {
      id: found.id,
      email: found.email,
      name: found.name,
      role: found.role,
      title: found.title,
      avatar: found.avatar,
    };

    setUser(sessionUser);
    localStorage.setItem('cost_estimator_user', JSON.stringify(sessionUser));
    return sessionUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('cost_estimator_user');
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
