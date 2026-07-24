import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني للتأكيد.');
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MedborgarPro</h2>
        <p style={styles.subtitle}>
          {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
        </p>

        <form onSubmit={handleAuth} style={styles.form}>
          <input
            type="email"
            placeholder="البريد الإلكتروني / E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="كلمة المرور / Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'جاري المعالجة...' : isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </button>
        </form>

        {message && <p style={styles.successMsg}>{message}</p>}
        {error && <p style={styles.errorMsg}>{error}</p>}

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={styles.switchBtn}
        >
          {isSignUp ? 'لديك حساب بالفعل؟ سجل الدخول' : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '450px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '30px 20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    color: '#1e40af',
    margin: '0 0 5px 0',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
  },
  btn: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  switchBtn: {
    marginTop: '20px',
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  successMsg: {
    color: '#16a34a',
    fontSize: '13px',
    marginTop: '15px',
  },
  errorMsg: {
    color: '#dc2626',
    fontSize: '13px',
    marginTop: '15px',
  },
};
