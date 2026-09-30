import React from "react";
import { Code2, Sparkles } from "lucide-react";
import { handleGoogleSignIn } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, user } = await handleGoogleSignIn();

      // Redux
      dispatch(setUserData(data));

      console.log("Logged in:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };



  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="h-11 w-11 rounded-xl bg-white text-black flex items-center justify-center">
            <Code2 size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Dcode
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Your AI-powered development workspace.
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          {/* Google */}
          <button
            onClick={handleLogin}
            className="w-full h-11 rounded-lg bg-white text-black flex items-center justify-center gap-3 text-sm font-medium hover:bg-zinc-200 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.19Z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.34l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.51A9.74 9.74 0 0 0 12 21.5Z"
              />
              <path
                fill="#FBBC05"
                d="M6.51 13.62A5.86 5.86 0 0 1 6.2 12c0-.56.1-1.1.31-1.62V7.87H3.27A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.13l3.24-2.51Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.35c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.45 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.73 5.37l3.24 2.51c.78-2.31 2.94-4.03 5.49-4.03Z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-zinc-800 flex-1" />

            <span className="text-xs text-zinc-600">
              SECURE LOGIN
            </span>

            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          {/* GitHub placeholder */}
          {/* <button
            disabled
            className="w-full h-11 rounded-lg border border-zinc-800 text-zinc-600 flex items-center justify-center gap-3 text-sm cursor-not-allowed"
          >
            <Github size={18} />
            Continue with GitHub
            <span className="text-[10px] ml-1 border border-zinc-800 px-1.5 py-0.5 rounded">
              SOON
            </span>
          </button> */}

          {/* AI note */}
          <div className="mt-6 flex gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-4">
            <Sparkles
              size={16}
              className="text-zinc-400 mt-0.5 shrink-0"
            />

            <p className="text-xs leading-5 text-zinc-500">
              Sign in to create projects, save your workspace,
              and use Dcode's AI coding tools.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          By continuing, you agree to Dcode's Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
