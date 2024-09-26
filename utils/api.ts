import Cookies from 'js-cookie';

export async function login(correo: string, password: string) {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, password }),
  });

  const data = await response.json();

  // Verificamos que la respuesta tenga el usuario y el correo
  if (response.ok && data.user && data.user.correo) {
    Cookies.set('usuario', JSON.stringify(data.user.correo)); // Guardamos el correo del usuario
    return { success: true, correo: data.user.correo };
  } else {
    return { success: false, message: data.message || 'Login failed' };
  }
}


export async function register(correo: string, password: string) {
  const response = await fetch('http://localhost:4000/api/auth/register', { // Asegúrate de usar el puerto correcto aquí
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, password }),
  });
  return response.json();
}

export function getUserFromCookie() {
  const userCookie = Cookies.get('usuario');
  return userCookie ? JSON.parse(userCookie) : null;
}

export function logout() {
  Cookies.remove('usuario');
}
