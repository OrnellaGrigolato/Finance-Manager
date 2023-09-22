import Link from "next/link";
const Login = () => {
  return (
    <main className="h-[100vh]">
      <div className="h-full w-full relative flex justify-center items-center">
        <img
          src="/login-bg.jpg"
          alt=""
          className="w-full h-full absolute top-0 left-0 -z-10"
        />
        <div className="w-3/12 bg-white px-20 py-14 bg-opacity-70 rounded-[20px] ">
          <h1 className="text-3xl font-extrabold">Welcome Back!</h1>
          <p className="mt-2 mb-6">Please login to acces to your account</p>
          <form action="">
            <label className="block " htmlFor="gmail">
              Email
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#fafafa]"
              id="gmail"
              type="email"
              required
              placeholder="example@gmail.com"
            />
            <label className="block " htmlFor="password">
              Password
            </label>
            <input
              className="block mb-4 p-2 rounded-[30px] bg-[#f5f5f5]"
              id="password"
              type="password"
              required
            />
            <p className="text-primary -mt-3">Forgot Password?</p>
            <button className="px-7 py-3 text-base mt-8 bg-black text-white rounded-[40px] block">
              Log In
            </button>
          </form>
          <p>
            Dont have an account?{" "}
            <Link href="/sing-up" className="text-primary">
              Sing up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
