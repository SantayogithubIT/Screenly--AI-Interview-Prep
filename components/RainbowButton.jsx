'use client';
import React from 'react';

const RainbowButton = ({ children, onClick, className = '' }) => {
  return (
    <>
      <style jsx>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 30%;
          filter: blur(6px);
          background-image: linear-gradient(#FF0A7F, #780EFF);
          animation: rotate 4s linear infinite;
        }
      `}</style>

      <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
        <button
          className={`px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-800 ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export default RainbowButton;
