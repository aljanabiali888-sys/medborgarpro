export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, action } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'يرجى كتابة البريد وكلمة المرور' })
  }

  // نجاح العملية وسحب بيانات الحساب
  return res.status(200).json({
    success: true,
    user: {
      email: email.toLowerCase(),
      isSubscribed: false
    }
  })
}
