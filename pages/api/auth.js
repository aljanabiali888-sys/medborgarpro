// بدلاً من فحص الدفع، نكتفي بالتحقق من تسجيل الدخول فقط
export function checkUserAccess(user) {
  if (!user) {
    // إذا لم يسجل الدخول، يتم توجيهه لتسجيل الدخول
    return { allowed: false, redirectTo: '/login' };
  }
  
  // السماح بالوصول لجميع الأسئلة مجاناً
  return { allowed: true };
}
