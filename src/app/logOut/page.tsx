"use client";
/* import { useRouter } from 'next/router'; */
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Eliminar el token de autenticación
    Cookies.set("token", "");
    // Redirigir al usuario a la página de inicio ("/")

    router.push("/"); // Redirección a la página de inicio
  };

  return (
    <div className="flex items-center justify-center h-screen gap-32">
      <Image src={"/womanWaving.png"} width={400} height={400} alt=""></Image>
      <div>
        <h1 className="font-bold text-5xl leading-tight mb-4">Goodbye!</h1>
        <p className="text-lg">
          We hope you had a good experience using our finance manager! Come back
          soon!
        </p>
        <button
          className="px-4 py-2 mt-6 bg-red-500 text-white rounded-lg"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Logout;
