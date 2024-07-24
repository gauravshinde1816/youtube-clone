import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppContext} from './context/AppContext'
import { SignUp } from '../api/auth';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {data } = useAppContext()
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    try {
      const res = await SignUp(data , otpValue)
      if(res?.status == 200) {
        navigate("/login")
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-100">
        <h2 className="text-2xl font-semibold mb-4">Enter Verification Code</h2>
        <p className="text-gray-600 mb-4">We sent a verification code to your email.</p>

        <div className="flex space-x-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded text-center focus:outline-none focus:border-blue-500"
              ref={(ref) => inputRefs.current[index] = ref}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
