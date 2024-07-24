import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sendResetPasswordToken } from "../api/video";

const notify = () => toast.success("Email Sent Successfully.");

const EmailPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [linkSent, sendLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValid(false);
      setErrorMessage("Please enter a valid email address");
      return;
    }

    const res = await sendResetPasswordToken(email);

    if (res?.status === 200) {
      setIsValid(true);
      setErrorMessage("");
      sendLinkSent(true);
      notify();
      setEmail("")
    }
    console.log("Submitted email:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {linkSent && <Toaster  position="top-center"/>}
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
        <form data-testid="reset-password-email-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              data-testid="reset-password-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                isValid ? "focus:border-blue-500" : "border-red-500"
              }`}
              required
            />
            {!isValid && (
              <p  data-testid="reset-password-email-errorText" className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
             data-testid="reset-password-email-submit-btn"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailPage;
