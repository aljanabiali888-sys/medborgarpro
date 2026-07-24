import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  // حالات تجريبية للمستخدم (سيتم ربطها بقاعدة البيانات لاحقاً)
  const [user, setUser] = useState({
    name: 'المستخدم',
    email: 'user@example.com',
    isSubscribed: false, // هل هو مشترك؟
    subscriptionEndDate: null // تاريخ انتهاء الـ 30 يوماً
  })

  // التحقق مما إذا كان الاشتراك قد انتهى
  const isExpired = user.subscriptionEndDate && new Date() > new Date(user.subscriptionEndDate)

  return (
    <>
      <Head>
        <title>لوحة التحكم | MedborgarPro</title>
      </Head>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', direction: 'rtl' }}>
        
        {/* Header Control */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>لوحة التحكم</h1>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ← الصفحة الرئيسية
          </button>
        </div>

        {/* User Info Card */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#2d3748', marginBottom: '10px' }}>معلومات الحساب</h2>
          <p style={{ color: '#4a5568', margin: '5px 0' }}><strong>البريد الإلكتروني:</strong> {user.email}</p>
          
          <div style={{ marginTop: '15px', padding: '15px', borderRadius: '10px', background: user.isSubscribed && !isExpired ? '#e6fffa' : '#fff5f5', border: user.isSubscribed && !isExpired ? '1px solid #38b2ac' : '1px solid #feb2b2' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: user.isSubscribed && !isExpired ? '#234e52' : '#9b2c2c' }}>
              حالة الاشتراك: {user.isSubscribed && !isExpired ? '✅ نشط (وصول كامل لمدة شهر)' : '❌ غير نشط / منتهي'}
            </p>
            {user.subscriptionEndDate && (
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#4a5568' }}>
                ينتهي الاشتراك بتاريخ: {new Date(user.subscriptionEndDate).toLocaleDateString('ar-EG')}
              </p>
            )}
          </div>
        </div>

        {/* Action / Content Area */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
          {!user.isSubscribed || isExpired ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ color: '#2b6cb0', marginBottom: '10px' }}>اشترك الآن للحصول على وصول كامل لمدة شهر (30 يوماً)</h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>احصل على كافة الأسئلة والدروس واختبارات المحاكاة للتحضير لاختبار المواطنة السويدية.</p>
              <button 
                onClick={() => alert('سيتم التوجيه لصفحة الدفع Stripe')}
                style={{ padding: '14px 28px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                تفعيل الاشتراك لمدة شهر 💳
              </button>
            </div>
          ) : (
            <div>
              <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>محتوى الدورة والاختبارات الشاملة</h3>
              <p style={{ color: '#4a5568' }}>مرحباً بك! جميع الفصول والاختبارات المتقدمة متاحة لك الآن بالكامل.</p>
              <button 
                onClick={() => window.location.href = '/'}
                style={{ padding: '12px 20px', background: '#38a169', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                البدء بالدراسة الآن 📚
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  )
}
