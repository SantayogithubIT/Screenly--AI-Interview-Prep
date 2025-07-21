'use client';

import React, { useEffect, useState } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';
import Navbar from '@/components/Navbar';

const pricingPlans = [
  {
    title: 'Basic',
    description: 'For individuals exploring the platform.',
    price: { monthly: 0, annually: 0 },
    features: ['5 Interviews per day', 'Basic analytics', 'Email support'],
  },
  {
    title: 'Pro',
    description: 'For regular job seekers and students.',
    price: { monthly: 149, annually: 699 },
    features: [
      '20 Interviews per day',
      'Advanced analytics',
      'Priority email support',
      'Resume feedback',
    ],
    popular: true,
  },
  {
    title: 'Premium',
    description: 'For placement cells and institutions.',
    price: { monthly: 1299, annually: 9999 },
    features: [
      'Unlimited interviews',
      'Team management',
      'Dedicated support',
      'Dedicated Feedback',
    ],
  },
];

  const UpgradePage = () => {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = (amount, plan) => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Razorpay SDK not loaded yet. Please try again.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'AI Interview App',
      description: `${plan} Subscription (${billingCycle})`,
      image: '/logo.svg',
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
      },
      theme: {
        color: '#7e22ce',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
    <Navbar />
      {/* Navbar */}
      
      {/* Billing Toggle */}
      <div className="flex justify-center mt-12 mb-6">
        <div className="inline-flex border rounded-lg overflow-hidden">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-sm font-medium transition ${billingCycle === 'monthly' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-5 py-2 text-sm font-medium transition ${billingCycle === 'annually' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
              }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">
          Upgrade Your Interview Game
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const currentPrice = plan.price[billingCycle];

            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 border ${plan.popular ? 'border-purple-500 scale-105' : 'border-gray-200'
                  }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </span>
                )}
                <h2 className="text-2xl font-semibold mb-2 text-center text-purple-700">{plan.title}</h2>
                <p className="text-gray-500 text-center mb-4">{plan.description}</p>
                <p className="text-3xl font-bold text-center text-gray-800 mb-6">
                  ₹{currentPrice}{' '}
                  <span className="text-sm font-normal text-gray-500">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">• {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (currentPrice > 0) {
                      handleRazorpayPayment(currentPrice, plan.title);
                    } else {
                      alert('You are already on the Basic Plan!');
                    }
                  }}
                  className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${currentPrice > 0
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  {currentPrice > 0 ? 'Upgrade Now' : 'Current Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UpgradePage;
