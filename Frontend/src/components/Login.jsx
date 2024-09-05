import React, { useState, useContext } from 'react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../utils/firebase';
import InputField from './InputField';
import Button from './Button';
import AuthContext from './AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    marketingAccept: false,
  });
  const { user } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // AuthContext will handle the redirect
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, firstName, lastName } = formData;
  
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        // AuthContext will handle the redirect
      } else {
        if (password !== passwordConfirmation) {
          console.error("Passwords do not match");
          return;
        }
        await signUpWithEmail(email, password, { firstName, lastName });
        // AuthContext will handle the redirect
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        console.error("Invalid email address.");
      } else if (error.code === 'auth/user-not-found') {
        console.error("User not found.");
      } else if (error.code === 'auth/wrong-password') {
        console.error("Incorrect password.");
      } else {
        console.error("An error occurred: ", error.message);
      }
    }
  };
  
  React.useEffect(() => {
    if (user) {
      window.location.href = '/feed';
    }
  }, [user]);

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left section */}
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative p-6 lg:p-12">
              <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                Welcome to Squid 🦑
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </section>

          {/* Right Section - Form */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="text-3xl font-bold text-gray-900">{isLogin ? "Log In" : "Sign Up"}</h1>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                {!isLogin && (
                  <>
                    <InputField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      colSpan="3"
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      colSpan="3"
                    />
                  </>
                )}
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  colSpan="6"
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  colSpan="3"
                />
                {!isLogin && (
                  <InputField
                    label="Password Confirmation"
                    type="password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                    colSpan="3"
                  />
                )}
                <div className="col-span-6">
                  {!isLogin && (
                    <label className="flex gap-4">
                      <input
                        type="checkbox"
                        name="marketingAccept"
                        checked={formData.marketingAccept}
                        onChange={handleInputChange}
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />
                      <span className="text-sm text-gray-700">
                        I want to receive updates.
                      </span>
                    </label>
                  )}
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button text={isLogin ? "Log In" : "Create Account"} type="submit" className="w-full sm:w-auto" />
                  <Button
                    text="Sign in with Google"
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full sm:w-auto"
                  />
                </div>

                {/* Already have an account section */}
                <div className="col-span-6 mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(false)}
                          className="text-gray-700 underline"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(true)}
                          className="text-gray-700 underline"
                        >
                          Log in
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
