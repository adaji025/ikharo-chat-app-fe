'use client';

import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-[#0b141a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-[#00a884] mb-2">
            WhatsApp Clone
          </h1>
          <p className="text-[#8696a0] text-sm">
            Connect with your friends and family
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111b21] rounded-lg shadow-xl p-8 border border-[#2a3942]">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-[#2a3942]">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'login'
                  ? 'text-[#00a884] border-b-2 border-[#00a884]'
                  : 'text-[#8696a0] hover:text-[#e9edef]'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'register'
                  ? 'text-[#00a884] border-b-2 border-[#00a884]'
                  : 'text-[#8696a0] hover:text-[#e9edef]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="mt-6">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#8696a0] text-xs mt-6">
          This is a demo application. No real authentication is performed.
        </p>
      </div>
    </div>
  );
}
