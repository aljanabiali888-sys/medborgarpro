import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [lang, setLang] = useState('ar')

  const content = {
    ar: {
      title: 'MedborgarPro | اختبار المواطنة السويدية',
      header: 'استعد لاختبار المواطنة السويدية بثقة!',
      subHeader: 'افتح جميع الفصول المقفلة للوصول إلى كافة الأسئلة والتدريبات.',
      freeTest: 'التحقق المجاني (20 سؤال)',
      chaptersHeader: 'الفصول الدراسية',
      proTag: 'PRO ⭐',
      proBtn: '🔒 اشترك الآن لفتح الفصل',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00',
      chapters: [
        { id: 1, title: '1. الديمقراطية والسياسة', questions: '45 سؤال' },
        { id: 2, title: '2. الحقوق والواجبات', questions: '40 سؤال' },
        { id: 3, title: '3. الرعاية الصحية', questions: '35 سؤال' },
        { id: 4, title: '4. سوق العمل والاقتصاد', questions: '50 سؤال' },
        { id: 5, title: '5. التاريخ والجغرافيا', questions: '30 سؤال' },
      ]
    },
    sv: {
      title: 'MedborgarPro | Medborgarskapstest Sverige',
      header: 'Förbered dig för det svenska medborgarskapstestet!',
      subHeader: 'Lås upp alla kapitel för att få tillgång till alla frågor och övningar.',
      freeTest: 'Gratis test (20 frågor)',
      chaptersHeader: 'Kapitel',
      proTag: 'PRO ⭐',
      proBtn: '🔒 Prenumerera nu för att låsa upp',
      stripeUrl: 'https://buy.stripe.com/aFacN66ULdH782da405Rm00',
      chapters: [
        { id: 1, title: '1. Demokrati & Politik', questions: '45 frågor' },
        { id: 2, title: '2. Rättigheter & Skyldigheter', questions: '40 frågor' },
        { id: 3, title: '3. Hälso- och sjukvård', questions: '35 frågor' },
        { id: 4, title: '4. Arbetsmarknad & Ekonomi', questions: '50 frågor' },
        { id: 5, title: '5. Historia & Geografi', questions: '30 frågor' },
      ]
    }
  }

  const { title, header, subHeader, freeTest, chaptersHeader, proTag, proBtn, stripeUrl, chapters } = content[lang]

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <style jsx global>{`
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f7f9fc; color: #1a202c; -webkit-font-smoothing: antialiased; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '40px', padding: '40px 20px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>{header}</h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '20px' }}>{subHeader}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setLang(lang === 'ar' ? 'sv' : 'ar')}>
              {lang === 'ar' ? 'Svenska' : 'العربية'}
            </button>
            <button style={{ padding: '10px 20px', background: '#FFD700', color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => window.location.href = stripeUrl}>
              Köp PRO ⭐
            </button>
          </div>
        </header>

        {/* Free Test Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button 
  style={{ padding: '15px 30px', background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)' }}
  onClick={() => alert('سيتم فتح الاختبار المجاني المكون من 20 سؤالاً الآن!')}
>
  ✓ {freeTest}
</button>

        </div>

        {/* Chapters Section */}
        <section>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #2563eb', display: 'inline-block', paddingBottom: '5px' }}>{chaptersHeader}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {chapters.map(ch => (
              <div key={ch.id} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1a1a1a', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem' }}>{proTag}</span>
                    <span style={{ fontSize: '0.85rem', color: '#718096' }}>{ch.questions}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#2d3748' }}>{ch.title}</h3>
                </div>
                <button 
                  style={{ width: '100%', padding: '12px', background: '#2d3748', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }} 
                  onClick={() => window.location.href = stripeUrl}
                  onMouseOver={(e) => e.target.style.background = '#4a5568'}
                  onMouseOut={(e) => e.target.style.background = '#2d3748'}
                >
                  {proBtn}
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <footer style={{ marginTop: '50px', textAlign: 'center', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#718096' }}>
          &copy; 2023 MedborgarPro. All rights reserved.
        </footer>

      </div>
    </>
  )
}
