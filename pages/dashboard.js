import React from 'react';
import { useNavigate } from 'react-router-dom'; // أو المكتبة التي تستخدمها للتوجيه

function FreeAccessSection() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>منصة اختبار المعرفة المجتمعية (Sverige i fokus)</h1>
      <p style={{ color: '#666', margin: '15px 0' }}>
        جميع الفصول والأسئلة متاحة لك الآن مجاناً للتدريب والاستعداد التام.
      </p>
      
      {/* زر الانتقال المباشر للأسئلة بدون دفع */}
      <button 
        onClick={() => navigate('/questions')}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ابدأ التدرب الآن مجاناً 🚀
      </button>
    </div>
  );
}

export default FreeAccessSection;
