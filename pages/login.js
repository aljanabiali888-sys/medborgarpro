import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [lang, setLang] = useState('ar')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return

    const cleanEmail = email.toLowerCase().trim()

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .single()

    if (!existingUser) {
      await supabase.from('users').insert([
        { email: cleanEmail, is_subscribed: false }
      ])
    }

    const user = { email: cleanEmail }
    localStorage.setItem('user_session', JSON.stringify(user))
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>تسجيل الدخول | MedborgarPro</title>
      </Head>

      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {lang === 'ar' ? 'تسجيل الدخول / إنشاء حساب' : 'Logga in / Skapa konto'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'E-post'}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={lang === 'ar' ? 'كلمة المرور' : 'Lösenord'}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <button 
            type="submit"
            style={{ padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {lang === 'ar' ? 'دخول / إنشاء حساب' : 'Logga in'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button 
            type="button"
            onClick={() => setLang(lang === 'ar' ? 'sv' : 'ar')}
            style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {lang === 'ar' ? 'Svenska' : 'العربية'}
          </button>
        </div>
      </div>
    </>
  )
}
