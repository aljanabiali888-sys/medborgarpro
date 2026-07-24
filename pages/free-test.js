import Head from 'next/head'
import { useState } from 'react'

export default function FreeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: 'ما هو نظام الحكم في السويد؟',
      options: ['جمهوري', 'ملكية دستورية ديمقراطية', 'دكتاتوري', 'فدرالي'],
      answer: 'ملكية دستورية ديمقراطية'
    },
    {
      question: 'كم عدد الأعضاء في البرلمان السويدي (Riksdagen)؟',
      options: ['100', '349', '250', '500'],
      answer: '349'
    },
    {
      question: 'ما هي عاصمة السويد؟',
      options: ['يوتبوري', 'مالمو', 'ستوكهولم', 'أوبسالا'],
      answer: 'ستوكهولم'
    }
  ]

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
    
    setSelectedOption(null)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <>
      <Head>
        <title>الاختبار المجاني | MedborgarPro</title>
      </Head>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{ padding: '8px 16px', background: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← العودة للرئيسية
        </button>

        {!showResult ? (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#718096', fontSize: '0.9rem', marginBottom: '15px' }}>
              <span>السؤال {currentQuestion + 1} من {questions.length}</span>
              <span>اختبار تجريبي</span>
            </div>

            <h2 style={{ fontSize: '1.3rem', color: '#1a202c', marginBottom: '20px' }}>
              {questions[currentQuestion].question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {questions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  style={{
                    padding: '12px 20px',
                    textAlign: 'right',
                    borderRadius: '8px',
                    border: selectedOption === opt ? '2px solid #2563eb' : '1px solid #cbd5e0',
                    background: selectedOption === opt ? '#ebf8ff' : '#fff',
                    color: '#2d3748',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s'
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
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: selectedOption ? 'pointer' : 'not-allowed'
              }}
            >
              {currentQuestion + 1 === questions.length ? 'إنهاء الاختبار' : 'السؤال التالي →'}
            </button>
          </div>
        ) : (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>🎉 أحسنت! أكملت الاختبار</h2>
            <p style={{ fontSize: '1.2rem', color: '#2d3748', marginBottom: '20px' }}>
              نتيجتك هي: <strong>{score}</strong> من <strong>{questions.length}</strong>
            </p>
            <button
              onClick={() => { setCurrentQuestion(0); setScore(0); setShowResult(false); }}
              style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              إعادة الاختبار 🔄
            </button>
          </div>
        )}
      </div>
    </>
  )
}
