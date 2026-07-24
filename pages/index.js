import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ** إعداد الاتصال بقاعدة البيانات **
// سيتم أخذ القيم تلقائياً من إعدادات Vercel التي سنضيفها لاحقاً
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function MedborgarPro() {
  const [lang, setLang] = useState('ar'); // ar, sv, en
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isProUser, setIsProUser] = useState(false); // محاكاة اشتراك PRO للتجربة
  const [score, setScore] = useState(0);

  // النصوص باللغات الثلاث
  const uiText = {
    ar: {
      title: 'MedborgarPro',
      subtitle: 'منصتك الموثوقة للتحضير لاختبار المواطنة السويدية',
      freeMode: 'النسخة المجانية',
      proMode: 'حساب PRO مفعل',
      switchPro: 'تفعيل تجربة PRO',
      switchFree: 'العودة للمجاني',
      next: 'السؤال التالي',
      proLockTitle: '🔒 هذا السؤال مخصص لمشتركي PRO',
      proLockDesc: 'اشترك الآن للوصول لكافة الأسئلة والشروحات المتقدمة من كتاب UHR الرسمي.',
      upgradeBtn: 'الترقية إلى MedborgarPro',
      explanation: '💡 الشرح التعليمي (UHR):',
      correct: 'إجابة صحيحة!',
      wrong: 'إجابة خاطئة!',
    },
    sv: {
      title: 'MedborgarPro',
      subtitle: 'Din plattform för det svenska medborgarskapsprovet',
      freeMode: 'Gratisversion',
      proMode: 'PRO-konto aktiverat',
      switchPro: 'Testa PRO',
      switchFree: 'Gå till Gratis',
      next: 'Nästa fråga',
      proLockTitle: '🔒 Denna fråga kräver PRO',
      proLockDesc: 'Lås upp alla frågor och förklaringar från det officiella UHR-materialet.',
      upgradeBtn: 'Uppgradera till MedborgarPro',
      explanation: '💡 Förklaring (UHR):',
      correct: 'Rätt svar!',
      wrong: 'Fel svar!',
    },
    en: {
      title: 'MedborgarPro',
      subtitle: 'Your platform to master the Swedish Citizenship Test',
      freeMode: 'Free Mode',
      proMode: 'PRO Account Active',
      switchPro: 'Try PRO Mode',
      switchFree: 'Back to Free',
      next: 'Next Question',
      proLockTitle: '🔒 This question is for PRO members',
      proLockDesc: 'Unlock all practice questions and explanations from official UHR material.',
      upgradeBtn: 'Upgrade to MedborgarPro',
      explanation: '💡 Explanation (UHR):',
      correct: 'Correct answer!',
      wrong: 'Wrong answer!',
    }
  };

  const t = uiText[lang];

  useEffect(() => {
    if (supabaseUrl && supabaseAnonKey) {
      fetchQuestions();
    }
  }, []);

  async function fetchQuestions() {
    const { data, error } = await supabase.from('questions').select('*');
    if (data) {
      setQuestions(data);
    } else {
      console.error("Error fetching questions:", error);
    }
  }

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentQ.correct_option_index) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>جاري تحميل الأسئلة من MedborgarPro...</h2>
        <p>إذا طال الانتظار، تأكد من إعداد متغيرات بيئة Supabase على Vercel.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  // تحديد النصوص بناءً على اللغة المختارة، مع العودة للسويدية إذا لم تتوفر ترجمة
  const options = currentQ[`options_${lang}`] || currentQ.options_sv;
  const questionText = currentQ[`question_${lang}`] || currentQ.question_sv;
  const explanationText = currentQ[`explanation_${lang}`] || currentQ.explanation_sv;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={styles.container}>
      {/* الشريط العلوي */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>{t.title}</h1>
          <p style={styles.subLogo}>{t.subtitle}</p>
        </div>
        <div style={styles.controls}>
          {/* محول اللغات */}
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={styles.select}>
            <option value="ar">🇸🇦 العربية</option>
            <option value="sv">🇸🇪 Svenska</option>
            <option value="en">🇬🇧 English</option>
          </select>
          
          {/* زر محاكاة PRO للتجربة (سنقوم بإزالته في النسخة النهائية) */}
          <button 
            onClick={() => setIsProUser(!isProUser)} 
            style={{ ...styles.badge, backgroundColor: isProUser ? '#10b981' : '#6b7280' }}
          >
            {isProUser ? t.proMode : t.switchPro}
          </button>
        </div>
      </header>

      {/* منطقة السؤال */}
      <main style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.qIndex}>سؤال {currentIndex + 1} من {questions.length}</span>
          {currentQ.is_pro_only && <span style={styles.proTag}>PRO</span>}
        </div>

        {/* التحقق من صلاحيات PRO */}
        {currentQ.is_pro_only && !isProUser ? (
          <div style={styles.proLockBox}>
            <h2>{t.proLockTitle}</h2>
            <p>{t.proLockDesc}</p>
            <button style={styles.upgradeBtn}>{t.upgradeBtn}</button>
          </div>
        ) : (
          <div>
            <h2 style={styles.questionText}>{questionText}</h2>

            {/* شبكة الخيارات الأربعة */}
            <div style={styles.optionsGrid}>
              {options.map((option, idx) => {
                let btnStyle = { ...styles.optionBtn };
                if (selectedOption !== null) {
                  if (idx === currentQ.correct_option_index) {
                    btnStyle.backgroundColor = '#d1fae5'; // أخضر للإجابة الصحيحة
                    btnStyle.borderColor = '#10b981';
                  } else if (idx === selectedOption) {
                    btnStyle.backgroundColor = '#fee2e2'; // أحمر للإجابة الخاطئة
                    btnStyle.borderColor = '#ef4444';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    style={btnStyle}
                    disabled={selectedOption !== null} // منع تغيير الإجابة
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* الشرح التعليمي (UHR) */}
            {showExplanation && (
              <div style={styles.explanationBox}>
                <h4>{t.explanation}</h4>
                <p>{explanationText}</p>
                {selectedOption === currentQ.correct_option_index ? 
                  <p style={{color: '#10b981', fontWeight: 'bold'}}>{t.correct}</p> : 
                  <p style={{color: '#ef4444', fontWeight: 'bold'}}>{t.wrong}</p>
                }
              </div>
            )}

            {/* زر التالي */}
            {selectedOption !== null && (
              <button onClick={handleNext} style={styles.nextBtn}>
                {t.next} ←
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// التنسيقات (Styles) - CSS-in-JS
const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' },
  header: { maxWidth: '800px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  logo: { margin: 0, color: '#1e3a8a', fontSize: '28px', fontWeight: 'bold' },
  subLogo: { margin: 0, color: '#4b5563', fontSize: '14px' },
  controls: { display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' },
  select: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' },
  badge: { color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  card: { maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' },
  qIndex: { color: '#6b7280', fontSize: '14px', fontWeight: 'bold' },
  proTag: { backgroundColor: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  questionText: { color: '#1f2937', marginBottom: '25px', fontSize: '22px', fontWeight: '600', lineHeight: '1.4' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  optionBtn: { padding: '18px', borderRadius: '10px', border: '2px solid #e5e7eb', backgroundColor: '#fff', textAlign: 'inherit', fontSize: '17px', cursor: 'pointer', transition: 'all 0.2s ease', color: '#374151' },
  explanationBox: { marginTop: '25px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '10px', borderRight: '4px solid #3b82f6', color: '#1e40af', lineHeight: '1.6' },
  nextBtn: { marginTop: '25px', width: '100%', padding: '16px', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
  proLockBox: { textAlign: 'center', padding: '50px 30px', backgroundColor: '#fffbeb', borderRadius: '10px', border: '2px dashed #f59e0b' },
  upgradeBtn: { marginTop: '20px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }
};
