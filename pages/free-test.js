import Head from 'next/head'

export default function FreeTest() {
  return (
    <>
      <Head>
        <title>التحقق المجاني | MedborgarPro</title>
      </Head>
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2563eb' }}>📝 الاختبار المجاني (20 سؤال)</h1>
        <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>مرحباً بك! هنا يمكنك إضافة أسئلة الاختبار المجاني.</p>
        
        <button 
          onClick={() => window.location.href = '/'}
          style={{ marginTop: '30px', padding: '10px 20px', background: '#2d3748', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          ← العودة للرئيسية
        </button>
      </div>
    </>
  )
}
