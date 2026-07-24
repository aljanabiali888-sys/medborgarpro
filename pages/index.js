import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lang, setLang] = useState('sv'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    setLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true })
      .limit(20);

    if (data && data.length > 0) {
      setQuestions(data);
    }
    setLoading(false);
  }

  const currentQ = questions[currentIndex];

  const getText = (ar, sv, en) => {
    if (lang === 'ar') return ar || sv;
    if (lang === 'en') return en || sv;
    return sv;
  };

  const getOptions = (q) => {
    if (!q) return [];
    if (lang === 'ar') return q.options_ar || q.options_sv;
    if (lang === 'en') return q.options_en || q.options_sv;
    return q.options_sv;
  };

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; 
    setSelectedOption(index);

    const isCorrect = index === currentQ.correct_option_index;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <h2>MedborgarPro</h2>
        <p>Laddar provet... / جاري تحميل الاختبار...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div style={styles.centerContainer}>
        <h2>MedborgarPro</h2>
        <p>Inga frågor hittades. / لم يتم العثور على أسئلة.</p>
      </div>
    );
  }

  return (
    <div style={styles.container} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>MedborgarPro</h1>
          <p style={styles.subtitle}>
            {getText(
              'اختبار المواطنة السويدية التجريبي',
              'Svenska medborgarskapsprovet (Demo)',
              'Swedish Citizenship Test (Demo)'
            )}
          </p>
        </div>

        {/* Language Selector */}
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          style={styles.langSelect}
        >
          <option value="sv">🇸🇪 Svenska</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </header>

      {/* Main Content */}
      {!showResult ? (
        <main style={styles.card}>
          {/* Progress Bar */}
          <div style={styles.progressHeader}>
            <span>
              {getText('السؤال', 'Fråga', 'Question')} {currentIndex + 1} {getText('من', 'av', 'of')} {questions.length}
            </span>
            <span style={styles.badgeFree}>DEMO</span>
          </div>
          
          <div style={styles.progressBarBg}>
            <div 
              style={{
                ...styles.progressBarFill,
                width: `${((currentIndex + 1) / questions.length) * 100}%`
              }} 
            />
          </div>

          {/* Question Title */}
          <h2 style={styles.questionText}>
            {getText(currentQ.question_ar, currentQ.question_sv, currentQ.question_en)}
          </h2>

          {/* Options */}
          <div style={styles.optionsList}>
            {getOptions(currentQ).map((opt, idx) => {
              let btnStyle = { ...styles.optionBtn };

              if (selectedOption !== null) {
                if (idx === currentQ.correct_option_index) {
                  btnStyle = { ...btnStyle, ...styles.correctBtn };
                } else if (idx === selectedOption) {
                  btnStyle = { ...btnStyle, ...styles.wrongBtn };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  style={btnStyle}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {selectedOption !== null && (
            <div style={styles.explanationBox}>
              <strong>{getText('الشرح التعليمي:', 'Förklaring:', 'Explanation:')}</strong>
              <p style={{ marginTop: '5px', marginBottom: 0 }}>
                {getText(currentQ.explanation_ar, currentQ.explanation_sv, currentQ.explanation_en)}
              </p>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button onClick={handleNext} style={styles.nextBtn}>
              {currentIndex + 1 === questions.length
                ? getText('عرض النتيجة النهاية', 'Visa resultat', 'Show Result')
                : getText('السؤال التالي ←', 'Nästa fråga →', 'Next Question →')}
            </button>
          )}
        </main>
      ) : (
        /* Result Screen */
        <main style={styles.card}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '10px' }}>
              🎉 {getText('النتيجة النهائية', 'Provresultat', 'Test Result')}
            </h2>
            
            <div style={styles.scoreCircle}>
              <span style={{ fontSize: '34px', fontWeight: 'bold', color: '#2563eb' }}>
                {score} / {questions.length}
              </span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                ({Math.round((score / questions.length) * 100)}%)
              </span>
            </div>

            <p style={{ fontSize: '15px', color: '#475569', marginBottom: '25px', lineHeight: '1.5' }}>
              {score >= 15
                ? getText('ممتاز جداً! لديك مستوى عالٍ يؤهلك لاجتياز الامتحان السويدي.', 'Utmärkt! Du har goda kunskaper för provet.', 'Excellent! You are well prepared.')
                : getText('نتيجة جيدة، ولكن ننصحك بزيادة التدريب لاجتياز الاختبار الحقيقي.', 'Bra försök, men du behöver öva mer.', 'Good effort, but you need more practice.')}
            </p>

            {/* PRO Banner */}
            <div style={styles.proBox}>
              <h3 style={{ color: '#92400e', marginTop: 0, fontSize: '16px' }}>
                🚀 {getText('تريد ضمان النجاح من المرة الأولى؟', 'Vill du säkerställa att du klarar provet?', 'Want to ensure passing on your first try?')}
              </h3>
              <p style={{ color: '#b45309', fontSize: '13px', lineHeight: '1.4' }}>
                {getText(
                  'اشترك في MedborgarPro وافتح مئات الأسئلة المتقدمة المقسمة حسب الفصول الرسمية مع الشرح الكامل.',
                  'Lås upp alla hundratals frågor, kapitelprov och detaljerade förklaringar.',
                  'Unlock hundreds of official chapter questions and full study materials.'
                )}
              </p>
              <button onClick={() => alert('قريباً: تفعيل بوابات الدفع')} style={styles.upgradeBtn}>
                ⭐ {getText('ترقية إلى PRO الان', 'Lås upp MedborgarPro (PRO)', 'Upgrade to PRO')}
              </button>
            </div>

            <button onClick={restartQuiz} style={styles.restartBtn}>
              🔄 {getText('إعادة الاختبار المجاني', 'Gör om provet', 'Retake Demo')}
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '15px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '10px',
  },
  logo: {
    margin: 0,
    color: '#1e40af',
    fontSize: '22px',
  },
  subtitle: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b',
  },
  langSelect: {
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '14px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '8px',
  },
  badgeFree: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: '6px',
    backgroundColor: '#f1f5f9',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    transition: 'width 0.3s ease',
  },
  questionText: {
    fontSize: '18px',
    color: '#0f172a',
    marginBottom: '20px',
    lineHeight: '1.4',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionBtn: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: '15px',
    textAlign: 'start',
    cursor: 'pointer',
    color: '#334155',
    transition: 'all 0.2s ease',
  },
  correctBtn: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
    color: '#15803d',
    fontWeight: 'bold',
  },
  wrongBtn: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
    color: '#b91c1c',
  },
  explanationBox: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f0f9ff',
    borderRight: '4px solid #0284c7',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#0369a1',
  },
  nextBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  scoreCircle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px auto',
    width: '120px',
    height: '120px',
    borderRadius: '60px',
    backgroundColor: '#eff6ff',
    border: '3px solid #2563eb',
  },
  proBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    textAlign: 'start',
  },
  upgradeBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d97706',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  restartBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};
