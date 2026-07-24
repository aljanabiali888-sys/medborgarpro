import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [lang, setLang] = useState('ar')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('user_session')
    if (!saved) {
      router.push('/login') // إذا لم يسجل، يتجه مباشرة لصفحة الدخول
    } else {
      setUser(JSON.parse(saved))
    }
  }, [])

  const t = {
    ar: {
      title: 'لوحة التحكم | MedborgarPro',
      header: 'لوحة التحكم',
      backHome: '← الرئيسية',
      accountInfo: 'معلومات الحساب',
      emailLabel: 'البريد الإلكتروني:',
      statusLabel: 'حالة الاشتراك:',
      activeStatus: '✅ نشط (وصول كامل لمدة شهر)',
      inactiveStatus: '❌ غير نشط / منتهي',
      subPrompt: 'اشترك الآن للحصول على وصول كامل لمدة شهر (30 يوماً)',
      subDesc: 'احصل على كافة الأسئلة والدروس واختبارات المحاكاة للتحضير لاختبار المواطنة السويدية.',
      payBtn: 'تفعيل الاشتراك لمدة شهر 💳',
      logout: 'تسجيل الخروج 🚪',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00'
    },
    sv: {
      title: 'Instrumentpanel | MedborgarPro',
      header: 'Instrumentpanel',
      backHome: '← Hem',
      accountInfo: 'Konto-information',
      emailLabel: 'E-postadress:',
      statusLabel: 'Prenumerationsstatus:',
      activeStatus: '✅ Aktiv (Full tillgång i 1 månad)',
      inactiveStatus: '❌ Inaktiv / Utgången',
      subPrompt: 'Prenumerera nu för full tillgång i 1 månad (30 dagar)',
      subDesc: 'Få tillgång till alla frågor, lektioner och övningsprov för det svenska medborgarskapstestet.',
      payBtn: 'Aktivera prenumeration (1 månad) 💳',
      logout: 'Logga ut 🚪',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00'
    }
  }[lang]

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    router.push('/login')
  }

  if (!user) return null

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button 
            type="button"
            onClick={() => router.push('/')}
            style={{ padding: '8px 16px', background: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {t.backHome}
          </button>

          <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => setLang('ar')}
              style={{
                padding: '6px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                background: lang === 'ar' ? '#2563eb' : 'transparent', color: lang === 'ar' ? '#fff' : '#4a5568'
              }}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('sv')}
              style={{
                padding: '6px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                background: lang === 'sv' ? '#2563eb' : 'transparent', color: lang === 'sv' ? '#fff' : '#4a5568'
              }}
            >
              Svenska
            </button>
          </div>
        </div>

        <h1 style={{ marginBottom: '25px', color: '#1a202c', textAlign: 'center' }}>{t.header}</h1>

        <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#2d3748', margin: 0 }}>{t.accountInfo}</h2>
            <button 
              type="button"
              onClick={handleLogout}
              style={{ padding: '6px 12px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {t.logout}
            </button>
          </div>

          <p style={{ color: '#4a5568', margin: '8px 0' }}><strong>{t.emailLabel}</strong> {user.email}</p>
          
          <div style={{ marginTop: '15px', padding: '15px', borderRadius: '10px', background: '#fff5f5', border: '1px solid #feb2b2' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#9b2c2c' }}>
              {t.statusLabel} {t.inactiveStatus}
            </p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', textAlign: 'center' }}>
          <h3 style={{ color: '#2b6cb0', marginBottom: '10px' }}>{t.subPrompt}</h3>
          <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.5' }}>{t.subDesc}</p>
          
          <button 
            type="button"
            onClick={() => window.location.href = t.stripeUrl}
            style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {t.payBtn}
          </button>
        </div>

      </div>
    </>
  )
}
