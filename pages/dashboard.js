import Head from 'next/head'
import { useState } from 'react'

export default function Dashboard() {
  const [lang, setLang] = useState('ar') // 'ar' or 'sv'
  
  // حالة حساب المستخدم
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  
  // بيانات النموذج
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  // نصوص اللغتين
  const t = {
    ar: {
      title: 'لوحة التحكم | MedborgarPro',
      header: 'لوحة التحكم',
      backHome: '← الرئيسية',
      welcome: 'مرحباً بك',
      accountInfo: 'معلومات الحساب',
      emailLabel: 'البريد الإلكتروني:',
      statusLabel: 'حالة الاشتراك:',
      activeStatus: '✅ نشط (وصول كامل لمدة شهر)',
      inactiveStatus: '❌ غير نشط / منتهي',
      expiresAt: 'ينتهي الاشتراك بتاريخ:',
      subPrompt: 'اشترك الآن للحصول على وصول كامل لمدة شهر (30 يوماً)',
      subDesc: 'احصل على كافة الأسئلة والدروس واختبارات المحاكاة للتحضير لاختبار المواطنة السويدية.',
      payBtn: 'تفعيل الاشتراك لمدة شهر 💳',
      logout: 'تسجيل الخروج 🚪',
      
      // Auth texts
      loginTitle: 'تسجيل الدخول إلى حسابك',
      signupTitle: 'إنشاء حساب جديد',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور',
      loginBtn: 'تسجيل الدخول',
      signupBtn: 'إنشاء الحساب',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      createOne: 'أنشئ حساباً الآن',
      loginHere: 'سجل الدخول هنا',
      
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00'
    },
    sv: {
      title: 'Instrumentpanel | MedborgarPro',
      header: 'Instrumentpanel',
      backHome: '← Hem',
      welcome: 'Välkommen',
      accountInfo: 'Konto-information',
      emailLabel: 'E-postadress:',
      statusLabel: 'Prenumerationsstatus:',
      activeStatus: '✅ Aktiv (Full tillgång i 1 månad)',
      inactiveStatus: '❌ Inaktiv / Utgången',
      expiresAt: 'Går ut den:',
      subPrompt: 'Prenumerera nu för full tillgång i 1 månad (30 dagar)',
      subDesc: 'Få tillgång till alla frågor, lektioner och övningsprov för det svenska medborgarskapstestet.',
      payBtn: 'Aktivera prenumeration (1 månad) 💳',
      logout: 'Logga ut 🚪',
      
      // Auth texts
      loginTitle: 'Logga in på ditt konto',
      signupTitle: 'Skapa ett nytt konto',
      emailPlaceholder: 'Ange din e-postadress',
      passwordPlaceholder: 'Ange ditt lösenord',
      loginBtn: 'Logga in',
      signupBtn: 'Skapa konto',
      noAccount: 'Har du inget konto?',
      hasAccount: 'Har du redan ett konto?',
      createOne: 'Skapa konto nu',
      loginHere: 'Logga in här',
      
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00'
    }
  }[lang]

  // التعامل مع تسجيل الدخول / التسجيل
  const handleAuthSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Vänligen ange e-post och lösenord')
      return
    }
    
    // تسجيل الدخول
    setCurrentUser({
      email: email,
      isSubscribed: false,
      subscriptionEndDate: null
    })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* Top Header & Language Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '8px 16px', background: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {t.backHome}
          </button>

          <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setLang('ar')}
              style={{
                padding: '6px 14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: lang === 'ar' ? '#2563eb' : 'transparent',
                color: lang === 'ar' ? '#fff' : '#4a5568'
              }}
            >
              العربية
            </button>
            <button
              onClick={() => setLang('sv')}
              style={{
                padding: '6px 14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: lang === 'sv' ? '#2563eb' : 'transparent',
                color: lang === 'sv' ? '#fff' : '#4a5568'
              }}
            >
              Svenska
            </button>
          </div>
        </div>

        <h1 style={{ marginBottom: '25px', color: '#1a202c', textAlign: 'center' }}>{t.header}</h1>

        {/* 1. إذا لم يكن المستخدم مسجلاً لدخوله -> إظهار نموذج التسجيل / الدخول */}
        {!isLoggedIn ? (
          <div style={{ background: '#fff', padding: '35px 25px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '20px', textAlign: 'center' }}>
              {authMode === 'login' ? t.loginTitle : t.signupTitle}
            </h2>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontWeight: 'bold' }}>{t.emailLabel}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontWeight: 'bold' }}>{lang === 'ar' ? 'كلمة المرور:' : 'Lösenord:'}</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit"
                style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
              >
                {authMode === 'login' ? t.loginBtn : t.signupBtn}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.95rem', color: '#718096' }}>
              {authMode === 'login' ? (
                <>
                  {t.noAccount}{' '}
                  <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                    {t.createOne}
                  </button>
                </>
              ) : (
                <>
                  {t.hasAccount}{' '}
                  <button onClick={() => setAuthMode('login')} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                    {t.loginHere}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* 2. إذا كان المستخدم مسجلاً لدخوله -> إظهار معلومات الحساب وحالة الاشتراك */
          <div>
            <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#2d3748', margin: 0 }}>{t.accountInfo}</h2>
                <button 
                  onClick={handleLogout}
                  style={{ padding: '6px 12px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {t.logout}
                </button>
              </div>

              <p style={{ color: '#4a5568', margin: '8px 0' }}><strong>{t.emailLabel}</strong> {currentUser.email}</p>
              
              <div style={{ marginTop: '15px', padding: '15px', borderRadius: '10px', background: currentUser.isSubscribed ? '#e6fffa' : '#fff5f5', border: currentUser.isSubscribed ? '1px solid #38b2ac' : '1px solid #feb2b2' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: currentUser.isSubscribed ? '#234e52' : '#9b2c2c' }}>
                  {t.statusLabel} {currentUser.isSubscribed ? t.activeStatus : t.inactiveStatus}
                </p>
              </div>
            </div>

            {/* قسم تفعيل الاشتراك Stripe */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', textAlign: 'center' }}>
              <h3 style={{ color: '#2b6cb0', marginBottom: '10px' }}>{t.subPrompt}</h3>
              <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.5' }}>{t.subDesc}</p>
              
              <button 
                onClick={() => window.location.href = t.stripeUrl}
                style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {t.payBtn}
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
