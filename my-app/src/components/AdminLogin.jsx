import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        alert('✅ Login berhasil! Selamat datang Admin.');
        // You can navigate to admin dashboard later
        // navigate('/admin-dashboard');
      } else {
        alert('❌ Username atau password salah!');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-login-container">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>🔐 Admin Login</h2>
            <p>Masuk ke panel administrasi</p>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Masukkan username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? '⏳ Memproses...' : '🚀 Masuk'}
          </button>

          <div className="login-info">
            <p>Demo Credentials:</p>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleBackToHome}
            disabled={isLoading}
          >
            ← Kembali ke Beranda
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;