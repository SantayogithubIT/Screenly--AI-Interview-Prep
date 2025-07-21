'use client';
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
<div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      
      {/* Main content */}
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        {/* Left side - Welcome section */}
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <img className='transition-transform hover:scale-105' src="/logo.svg" alt="" />
            <h1 className="my-3 font-semibold text-4xl">Welcome back to Screenly</h1>
            <p className="pr-3 text-sm opacity-75">
             Continue your AI-powered interview prep with Screenly.
              Let’s get you closer to your dream job.
            </p>
          </div>
        </div>

        {/* Right side - Clerk Sign in */}
        <div className="flex justify-center self-center z-10">
          <div>
            <SignIn 
               path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            afterSignInUrl="/"
                appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "font-semibold text-2xl text-gray-800",
                  headerSubtitle: "text-gray-400",
                  socialButtonsBlockButton: "w-full flex items-center justify-center border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 hover:text-white p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500",
                  formFieldInput: "w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400",
                  formButtonPrimary: "w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500",
                  footerActionLink: "text-purple-700 hover:text-purple-600",
                  dividerLine: "bg-gray-100",
                  dividerText: "text-gray-300 font-normal"
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
        <div className="container p-5 mx-auto flex items-center justify-between">
          <div className="flex mr-auto">
          
          </div>
        </div>
      </footer>
       <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
    
  )
}