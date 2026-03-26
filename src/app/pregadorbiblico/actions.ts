"use server";

import { cookies } from 'next/headers';

export async function loginAction(password: string) {
  const correctPassword = process.env.APP_PASSWORD || 'shalom';

  if (password === correctPassword) {
    const cookieStore = await cookies();
    cookieStore.set('app_auth', 'true', {
      path: '/',
      maxAge: 86400, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { success: true };
  }

  return { success: false, error: 'Senha incorreta.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('app_auth');
}
