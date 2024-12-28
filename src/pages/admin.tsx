import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Admin credentials (you can replace with an API check in a real app)
  const adminUsername = 'admin';
  const adminPassword = 'admin123';

  // Check if the user is logged in already on page load
  useEffect(() => {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === adminUsername && password === adminPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    history.push('/'); // Redirect to home page
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div>
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Log in</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <h1>Welcome to the Admin Dashboard</h1>
          <p>You are logged in as an admin.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
