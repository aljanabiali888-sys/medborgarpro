import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'chapters'
  const [lang, setLang] = useState('sv');
  const [loading, setLoading] = useState(false);

  // قائمة الفصول الدراسية للكتاب
  const chapters = [
    { id: 1, title_sv: '1. Demokrati & Politik', title_ar: '1. الديمقراطية والنظام السياسي', icon: '🏛️', count: 45 },
    { id: 2, title_sv: '2. Rättigheter & Skyldigheter', title_ar: '2. الحقوق والواجبات والحريات', icon: '⚖️', count: 40 },
    { id: 3, title_sv: '3. Hälso- och sjukvård', title_ar: '3. الرعاية الصحية والنظام الاجتماعي', icon: '🏥', count: 35 },
    { id: 4, title_sv: '4. Arbetsmarknad & Ekonomi', title_ar: '4. سوق العمل والاقتصاد', icon: '💼', count: 50 },
    { id: 5, title_sv: '5. Historia & Geografi', title_ar: '5. التاريخ والجغرافيا السويدية', icon: '📚', count: 30 },
  ];

  useEffect(() => {
    // التحقق من حالة تسجيل الدخول
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchDemoQuestions();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchDemoQuestions() {
    setLoading(true);
    const { data } = await supabase
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
    if (index === currentQ.correct_option_index) {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={styles.container} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Navbar */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>MedborgarPro</h1>
          <p style={styles.subtitle}>
            {getText('دليلك لاجتياز اختبار المواطنة', 'Din väg till medborgarskapsprovet', 'Your guide to citizenship test')}
          </p>
        </div>

        <div style={styles.topActions}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={styles.langSelect}>
            <option value="sv">🇸🇪 SV</option>
            <option value="ar">🇸🇦 AR</option>
            <option value="en">🇬🇧 EN</option>
          </select>

          {user ? (
            <button onClick={handleLogout} style={styles.authBtnSecondary}>
              {getText('خروج', 'Logga ut', 'Logout')}
            </button>
          ) : (
            <button onClick={() => window.location.href = '/login'} style={styles.authBtnPrimary}>
              {getText('دخول', 'Logga in', 'Login')}
            </button>
          )}
        </div>
      </header>

      {/* Tabs Switcher */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('demo')}
          style={activeTab === 'demo' ? styles.activeTab : styles.tab}
        >
          🧪 {getText('الاختبار المجاني (20 سؤال)', 'Gratis test (20 frågor)', 'Free Test (20 Qs)')}
        </button>
        <button
          onClick={() => setActiveTab('chapters')}
          style={activeTab === 'chapters' ? styles.activeTab : styles.tab}
        >
          📚 {getText('فصول الكتاب (PRO)', 'Kapitelprov (PRO)', 'Chapters (PRO)')}
        </button>
      </div>

      {/* TAB 1: DEMO QUIZ */}
      {activeTab === 'demo' && (
        <>
          {loading ? (
            <div style={styles.card}><p style={{textAlign:'center'}}>جاري تحميل الأسئلة...</p></div>
          ) : !showResult ? (
            <main style={styles.card}>
              {currentQ && (
                <>
                  <div style={styles.progressHeader}>
                    <span>
                      {getText('السؤال', 'Fråga', 'Question')} {currentIndex + 1} {getText('من', 'av', 'of')} {questions.length}
                    </span>
                    <span style={styles.badgeFree}>DEMO</span>
                  </div>

                  <div style={styles.progressBarBg}>
                    <div style={{ ...styles.progressBarFill, width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
                  </div>

                  <h2 style={styles.questionText}>
                    {getText(currentQ.question_ar, currentQ.question_sv, currentQ.question_en)}
                  </h2>

                  <div style={styles.optionsList}>
                    {getOptions(currentQ).map((opt, idx) => {
                      let btnStyle = { ...styles.optionBtn };
                      if (selectedOption !== null) {
                        if (idx === currentQ.correct_option_index) btnStyle = { ...btnStyle, ...styles.correctBtn };
                        else if (idx === selectedOption) btnStyle = { ...btnStyle, ...styles.wrongBtn };
                      }
                      return (
                        <button key={idx} onClick={() => handleSelectOption(idx)} disabled={selectedOption !== null} style={btnStyle}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div style={styles.explanationBox}>
                      <strong>{getText('الشرح التعليمي:', 'Förklaring:', 'Explanation:')}</strong>
                      <p style={{ marginTop: '5px', marginBottom: 0 }}>
                        {getText(currentQ.explanation_ar, currentQ.explanation_sv, currentQ.explanation_en)}
                      </p>
                    </div>
                  )}

                  {selectedOption !== null && (
                    <button onClick={handleNext} style={styles.nextBtn}>
                      {currentIndex + 1 === questions.length
                        ? getText('عرض النتيجة النهاية', 'Visa resultat', 'Show Result')
                        : getText('السؤال التالي ←', 'Nästa fråga →', 'Next Question →')}
                    </button>
                  )}
                </>
              )}
            </main>
          ) : (
            /* Result Screen */
            <main style={styles.card}>
              <div style={{ textAlign: 'center' }}>
                <h2>🎉 {getText('النتيجة النهائية', 'Provresultat', 'Test Result')}</h2>
                <div style={styles.scoreCircle}>
                  <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{score} / {questions.length}</span>
                </div>
                <div style={styles.proBox}>
                  <h3 style={{ color: '#92400e', margin: 0 }}>🚀 {getText('تريد فتح جميع الفصول والاختبارات؟', 'Vill du låsa upp alla kapitel?', 'Want to unlock all chapters?')}</h3>
                  <p style={{ color: '#b45309', fontSize: '13px' }}>
                    {getText('اشترك في MedborgarPro وافتح مئات الأسئلة المقسمة حسب الفصول الرسمية.', 'Lås upp hundratals frågor och kapitelprov.', 'Unlock hundreds of questions and chapters.')}
                  </p>
                  <button onClick={() => setActiveTab('chapters')} style={styles.upgradeBtn}>
                    ⭐ {getText('استكشف فصول الـ PRO الان', 'Lås upp MedborgarPro', 'Explore PRO Chapters')}
                  </button>
                </div>
                <button onClick={restartQuiz} style={styles.restartBtn}>🔄 {getText('إعادة الاختبار المجاني', 'Gör om provet', 'Retake Demo')}</button>
              </div>
            </main>
          )}
        </>
      )}

      {/* TAB 2: CHAPTERS (PRO) */}
      {activeTab === 'chapters' && (
        <div style={styles.chaptersGrid}>
          {chapters.map((ch) => (
            <div key={ch.id} style={styles.chapterCard}>
              <div style={styles.chapterHeader}>
                <span style={{ fontSize: '28px' }}>{ch.icon}</span>
                <span style={styles.proTag}>PRO ⭐</span>
              </div>
              <h3 style={styles.chapterTitle}>{getText(ch.title_ar, ch.title_sv, ch.title_sv)}</h3>
              <p style={styles.chapterMeta}>{ch.count} {getText('سؤال تعليمي مع الشرح', 'frågor med förklaring', 'questions with explanations')}</p>
              
              <button 
                onClick={() => alert(getText('قم بالاشتراك في باقة PRO لفتح هذا الفصل!', 'Lås upp med PRO-prenumeration!', 'Subscribe to PRO to unlock!'))}
                style={styles.chapterBtn}
              >
                🔒 {getText('ابدأ دراسة الفصل', 'Starta kapitel', 'Start Chapter')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '15px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' },
  logo: { margin: 0, color: '#1e40af', fontSize: '22px' },
  subtitle: { margin: 0, fontSize: '11px', color: '#64748b' },
  topActions: { display: 'flex', gap: '8px', alignItems: 'center' },
  langSelect: { padding: '5px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' },
  authBtnPrimary: { padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  authBtnSecondary: { padding: '6px 12px', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
  tabContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tab: { flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#64748b', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' },
  activeTab: { flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' },
  card: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  progressHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '8px' },
  badgeFree: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' },
  progressBarBg: { height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', marginBottom: '15px' },
  progressBarFill: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s ease' },
  questionText: { fontSize: '17px', color: '#0f172a', marginBottom: '15px', lineHeight: '1.4' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  optionBtn: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '14px', textAlign: 'start', cursor: 'pointer', color: '#334155' },
  correctBtn: { backgroundColor: '#dcfce7', borderColor: '#22c55e', color: '#15803d', fontWeight: 'bold' },
  wrongBtn: { backgroundColor: '#fee2e2', borderColor: '#ef4444', color: '#b91c1c' },
  explanationBox: { marginTop: '12px', padding: '10px', backgroundColor: '#f0f9ff', borderRight: '4px solid #0284c7', borderRadius: '6px', fontSize: '12px', color: '#0369a1' },
  nextBtn: { marginTop: '15px', width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  scoreCircle: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px auto', width: '100px', height: '100px', borderRadius: '50px', backgroundColor: '#eff6ff', border: '3px solid #2563eb' },
  proBox: { backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '15px', marginBottom: '15px', textAlign: 'start' },
  upgradeBtn: { width: '100%', padding: '10px', backgroundColor: '#d97706', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  restartBtn: { width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' },
  chaptersGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  chapterCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
  chapterHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  proTag: { backgroundColor: '#fef3c7', color: '#d97706', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px' },
  chapterTitle: { margin: '0 0 5px 0', fontSize: '16px', color: '#1e293b' },
  chapterMeta: { margin: '0 0 12px 0', fontSize: '12px', color: '#64748b' },
  chapterBtn: { width: '100%', padding: '10px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }
};
