"use client"
/* import { useRouter } from 'next/router'; */
import { useRouter } from  "next/navigation"; 
import Cookies from 'js-cookie';
const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Eliminar el token de autenticación 
    Cookies.set("token", '');
    // Redirigir al usuario a la página de inicio ("/")

    router.push('/'); // Redirección a la página de inicio
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;