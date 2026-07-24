import Head from 'next/head'
import { useState } from 'react'

export default function FreeTest() {
  const [lang, setLang] = useState('ar') // 'ar' or 'sv'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // الأسئلة باللغتين العربية والسويدية
  const questionsData = {
    ar: [
      { question: '1. ما هو نظام الحكم في السويد؟', options: ['جمهوري', 'ملكية دستورية ديمقراطية', 'دكتاتوري', 'فدرالي'], answer: 'ملكية دستورية ديمقراطية' },
      { question: '2. كم عدد الأعضاء في البرلمان السويدي (Riksdagen)؟', options: ['100', '349', '250', '500'], answer: '349' },
      { question: '3. ما هي عاصمة السويد؟', options: ['يوتبوري', 'مالمو', 'ستوكهولم', 'أوبسالا'], answer: 'ستوكهولم' },
      { question: '4. كم عدد البلديات (Kommuner) في السويد؟', options: ['290', '150', '300', '210'], answer: '290' },
      { question: '5. ما هو الحد الأدنى لسن الاقتراع في الانتخابات العامة بالسويد؟', options: ['16 سنة', '18 سنة', '20 سنة', '21 سنة'], answer: '18 سنة' },
      { question: '6. كم مرة تُقام الانتخابات العامة في السويد؟', options: ['كل 3 سنوات', 'كل 4 سنوات', 'كل 5 سنوات', 'كل سنتين'], answer: 'كل 4 سنوات' },
      { question: '7. من هو رئيس الدولة في السويد؟', options: ['رئيس الوزراء', 'الملك', 'رئيس البرلمان', 'وزير الخارجية'], answer: 'الملك' },
      { question: '8. ما اسم أطول نهر في السويد؟', options: ['Klarälven', 'Göta älv', 'Torne älv', 'Ume älv'], answer: 'Klarälven' },
      { question: '9. أي من التالي يعتبر حقاً من حقوق "Allemansrätten"؟', options: ['الصيد بدون رخصة', 'التجول والتخييم في الطبيعة بحرية', 'قطع الأشجار', 'قيادة السيارة في الغابات'], answer: 'التجول والتخييم في الطبيعة بحرية' },
      { question: '10. ما هي العملة الرسمية في السويد؟', options: ['اليورو', 'الكرونة السويدية', 'الدولار', 'الباوند'], answer: 'الكرونة السويدية' }
    ],
    sv: [
      { question: '1. Vad är Sveriges statsskick?', options: ['Republik', 'Demokratisk konstitutionell monarki', 'Diktatur', 'Federation'], answer: 'Demokratisk konstitutionell monarki' },
      { question: '2. Hur många ledamöter har Sveriges riksdag?', options: ['100', '349', '250', '500'], answer: '349' },
      { question: '3. Vad heter Sveriges huvudstad?', options: ['Göteborg', 'Malmö', 'Stockholm', 'Uppsala'], answer: 'Stockholm' },
      { question: '4. Hur många kommuner finns det i Sverige?', options: ['290', '150', '300', '210'], answer: '290' },
      { question: '5. Vad är åldersgränsen för att rösta i riksdagsvalet?', options: ['16 år', '18 år', '20 år', '21 år'], answer: '18 år' },
      { question: '6. Hur ofta hålls ordinarie val i Sverige?', options: ['Var 3:e år', 'Var 4:e år', 'Var 5:e år', 'Var 2:a år'], answer: 'Var 4:e år' },
      { question: '7. Vem är Sveriges statschef?', options: ['Statsministern', 'Kungen', 'Talmannen', 'Utrikesministern'], answer: 'Kungen' },
      { question: '8. Vad heter Sveriges längsta flod/älv?', options: ['Klarälven', 'Göta älv', 'Torne älv', 'Ume älv'], answer: 'Klarälven' },
      { question: '9. Vad innebär Allemansrätten?', options: ['Fiska utan tillstånd', 'Rätt att röra sig fritt i naturen', 'Fälla träd', 'Köra bil i skogen'], answer: 'Rätt att röra sig fritt i naturen' },
      { question: '10. Vad heter Sveriges officiella valuta?', options: ['Euro', 'Svenska kronor (SEK)', 'Dollar', 'Pund'], answer: 'Svenska kronor (SEK)' }
    ]
  }

  const currentQuestions = questionsData[lang]

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedOption(null)
    setShowResult(false)
  }

  const handleLanguageChange = (newLang) => {
    setLang(newLang)
    resetQuiz()
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption === currentQuestions[currentQuestion].answer) {
      setScore(score + 1)
    }
    setSelectedOption(null)
    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <>
      <Head>
        <title>{lang === 'ar' ? 'الاختبار المجاني | MedborgarPro' : 'Gratis Test | MedborgarPro'}</title>
      </Head>

      <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* Top Controls: Back Button & Language Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '8px 16px', background: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {lang === 'ar' ? '← العودة للرئيسية' : '← Tillbaka'}
          </button>

          <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => handleLanguageChange('ar')}
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
              onClick={() => handleLanguageChange('sv')}
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

        {!showResult ? (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#718096', fontSize: '0.9rem', marginBottom: '15px' }}>
              <span>{lang === 'ar' ? `السؤال ${currentQuestion + 1} من ${currentQuestions.length}` : `Fråga ${currentQuestion + 1} av ${currentQuestions.length}`}</span>
              <span>{lang === 'ar' ? 'اختبار مجاني' : 'Gratis test'}</span>
            </div>

            <h2 style={{ fontSize: '1.25rem', color: '#1a202c', marginBottom: '20px', lineHeight: '1.5' }}>
              {currentQuestions[currentQuestion].question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  style={{
                    padding: '14px 20px',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    borderRadius: '10px',
                    border: selectedOption === opt ? '2px solid #2563eb' : '1px solid #cbd5e0',
                    background: selectedOption === opt ? '#ebf8ff' : '#fff',
                    color: '#2d3748',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: selectedOption === opt ? 'bold' : 'normal',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              style={{
                width: '100%',
                marginTop: '25px',
                padding: '12px',
                background: selectedOption ? '#2563eb' : '#cbd5e0',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: selectedOption ? 'pointer' : 'not-allowed'
              }}
            >
              {currentQuestion + 1 === currentQuestions.length 
                ? (lang === 'ar' ? 'إنهاء الاختبار' : 'Avsluta testet')
                : (lang === 'ar' ? 'السؤال التالي →' : 'Nästa fråga →')}
            </button>
          </div>
        ) : (
          <div style={{ background: '#fff', padding: '40px 20px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#2563eb', marginBottom: '15px' }}>
              {lang === 'ar' ? '🎉 أحسنت! أكملت الاختبار' : '🎉 Bra jobbat! Du har slutfört testet'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#2d3748', marginBottom: '25px' }}>
              {lang === 'ar' ? 'نتيجتك هي:' : 'Ditt resultat:'} <strong>{score}</strong> {lang === 'ar' ? 'من' : 'av'} <strong>{currentQuestions.length}</strong>
            </p>
            <button
              onClick={resetQuiz}
              style={{ padding: '12px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
              {lang === 'ar' ? 'إعادة الاختبار 🔄' : 'Gör om testet 🔄'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
