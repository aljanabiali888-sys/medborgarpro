import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [lang, setLang] = useState('ar')
  const [isSignup, setIsSignup] = useState(false)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // نصوص اللغتين
  const t = {
    ar: {
      title: isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول',
      backHome: '← الرئيسية',
      emailLabel: 'البريد الإلكتروني',
      passLabel: 'كلمة المرور',
      loginBtn: 'تسجيل الدخول',
      signupBtn: 'إنشاء الحساب',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      createOne: 'أنشئ حساباً الآن',
      loginHere: 'سجل الدخول هنا',
      emptyError: 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
    },
    sv: {
      title: isSignup ? 'Skapa ett nytt konto' : 'Logga in på ditt konto',
      backHome: '← Hem',
      emailLabel: 'E-postadress',
      passLabel: 'Lösenord',
      loginBtn: 'Logga in',
      signupBtn: 'Skapa konto',
      noAccount: 'Har du inget konto?',
      hasAccount: 'Har du redan ett konto?',
      createOne: 'Skapa konto nu',
      loginHere: 'Logga in här',
      emptyError: 'Vänligen ange e-post och lösenord'
    }
  }[lang]

  const handleSubmit = (e) => {
    e.preventDefault() // منع إعادة تحميل الصفحة
    setErrorMsg('')

    if (!email || !password) {
      setErrorMsg(t.emptyError)
      return
    }

    // حفظ بيانات المستخدم في الجلسة المحلية
    const user = { email: email.toLowerCase() }
    localStorage.setItem('user_session', JSON.stringify(user))

    // التوجيه المباشر إلى لوحة التحكم
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>{t.title} | MedborgarPro</title>
      </Head>

      <div style={{ maxWidth: '450px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* أزرار التحكم باللغة والعودة */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button 
            type="button"
            onClick={() => router.push('/')}
            style={{ padding: '8px 14px', background: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {t.backHome}
          </button>

          <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => setLang('ar')}
              style={{
                padding: '6px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                background: lang === 'ar' ? '#2563eb' : 'transparent', color: lang === 'ar' ? '#fff' : '#4a5568'
              }}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('sv')}
              style={{
                padding: '6px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                background: lang === 'sv' ? '#2563eb' : 'transparent', color: lang === 'sv' ? '#fff' : '#4a5568'
              }}
            >
              Svenska
            </button>
          </div>
        </div>

        {/* كارت التسجيل */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', border: '1px solid #edf2f7' }}>
          <h1 style={{ fontSize: '1.4rem', color: '#1a202c', marginBottom: '20px', textAlign: 'center' }}>
            {t.title}
          </h1>

          {errorMsg && (
            <div style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontWeight: 'bold', fontSize: '0.9rem' }}>{t.emailLabel}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontWeight: 'bold', fontSize: '0.9rem' }}>{t.passLabel}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit"
              style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
            >
              {isSignup ? t.signupBtn : t.loginBtn}
            </button>
          </form>

          {/* التبديل بين إنشاء حساب وتخلي الدخول */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.95rem', color: '#718096' }}>
            {!isSignup ? (
              <div>
                {t.noAccount}{' '}
                <button 
                  type="button" 
                  onClick={() => { setIsSignup(true); setErrorMsg(''); }}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {t.createOne}
                </button>
              </div>
            ) : (
              <div>
                {t.hasAccount}{' '}
                <button 
                  type="button" 
                  onClick={() => { setIsSignup(false); setErrorMsg(''); }}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {t.loginHere}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
