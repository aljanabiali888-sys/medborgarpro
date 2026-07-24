import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [lang, setLang] = useState('ar')

  const content = {
    ar: {
      title: 'MedborgarPro | اختبار المواطنة السويدية',
      header: 'استعد لاختبار المواطنة السويدية بثقة!',
      subHeader: 'افتح جميع الفصول المقفلة للوصول إلى كافة الأسئلة والتدريبات.',
      freeTest: 'الاختبار المجاني (20 سؤال)',
      myAccount: 'حسابي 👤',
      chaptersHeader: 'الفصول الدراسية',
      proTag: 'PRO ⭐️',
      proBtn: '🔒 اشترك الآن لفتح الفصل',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00',
      chapters: [
        { id: 1, title: '1. الديمقراطية والسياسة', questions: '45 سؤال' },
        { id: 2, title: '2. الحقوق والواجبات', questions: '40 سؤال' },
        { id: 3, title: '3. الرعاية والمجتمع', questions: '35 سؤال' },
        { id: 4, title: '4. تاريخ السويد والجغرافيا', questions: '50 سؤال' }
      ]
    },
    sv: {
      title: 'MedborgarPro | Svenska Medborgarskapstestet',
      header: 'Förbered dig för medborgarskapstestet med själsförtroende!',
      subHeader: 'Lås upp alla kapitel för att få tillgång till alla frågor och övningar.',
      freeTest: 'Gratis Test (20 frågor)',
      myAccount: 'Mitt Konto 👤',
      chaptersHeader: 'Studiekapitel',
      proTag: 'PRO ⭐️',
      proBtn: '🔒 Prenumerera för att låsa upp',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00',
      chapters: [
        { id: 1, title: '1. Demokrati och Politik', questions: '45 frågor' },
        { id: 2, title: '2. Rättigheter och Skyldigheter', questions: '40 frågor' },
        { id: 3, title: '3. Vård och Samhälle', questions: '35 frågor' },
        { id: 4, title: '4. Sveriges Historia och Geografi', questions: '50 frågor' }
      ]
    }
  }

  const t = content[lang]

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#2563eb', margin: 0 }}>MedborgarPro</h2>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {t.myAccount}
            </button>

            <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '8px' }}>
              <button
                onClick={() => setLang('ar')}
                style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: lang === 'ar' ? '#fff' : 'transparent', fontWeight: lang === 'ar' ? 'bold' : 'normal' }}
              >
                العربية
              </button>
              <button
                onClick={() => setLang('sv')}
                style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: lang === 'sv' ? '#fff' : 'transparent', fontWeight: lang === 'sv' ? 'bold' : 'normal' }}
              >
                Svenska
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', background: '#f7fafc', padding: '40px 20px', borderRadius: '16px', marginBottom: '30px' }}>
          <h1 style={{ color: '#1a202c', fontSize: '2rem', marginBottom: '15px' }}>{t.header}</h1>
          <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '25px' }}>{t.subHeader}</p>
          
          <button 
            onClick={() => window.location.href = '/free-test'}
            style={{ padding: '12px 24px', background: '#319795', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            📝 {t.freeTest}
          </button>
        </div>

        {/* Chapters Section */}
        <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>{t.chaptersHeader}</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {t.chapters.map((chap) => (
            <div key={chap.id} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{chap.title}</h4>
                <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>{chap.questions}</span>
              </div>
              <button 
                onClick={() => window.location.href = t.stripeUrl}
                style={{ padding: '10px 18px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {t.proBtn}
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
