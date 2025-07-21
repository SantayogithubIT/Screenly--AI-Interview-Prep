"use client"
import { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function MiddleSections() {
    const [activeTab, setActiveTab] = useState(0);
    const [activePricing, setActivePricing] = useState('monthly');

    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "AI-Powered Questions",
            description: "Get intelligently generated questions tailored to your resume, experience level, and job role."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Real-Time Feedback",
            description: "Get instant feedback after each answer to help you improve and build confidence before the real interview."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Beginner Friendly",
            description: "Designed for freshers and professionals alike — no technical setup or coding required to start practicing."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Performance Analytics",
            description: "Track your improvement over time with detailed insights on strengths, weaknesses, and interview readiness."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            title: "Multiple Interview Modes",
            description: "Practice in text, voice, or video mode — just like real interviews — to prepare in the way that suits you best."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "24/7 Smart Practice",
            description: "No scheduling required. Practice anytime with our AI interviewer ready around the clock."
        }
    ];


    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager at TechCorp",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "This platform has revolutionized how we build and deploy our applications. The components are incredibly well-designed and save us hours of development time.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Lead Developer at StartupXYZ",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            content: "Outstanding quality and performance. The documentation is excellent and the support team is always responsive. Highly recommended!",
            rating: 5
        },
        {
            name: "Emma Davis",
            role: "UI/UX Designer at Creative Agency",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            content: "The design system is beautiful and consistent. It has helped us maintain brand consistency across all our projects while speeding up our workflow.",
            rating: 5
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Sign Up",
            description: "Create your account in less than 30 seconds. No credit card required to get started."
        },
        {
            step: "02",
            title: "Choose your Tech Stack",
            description: "Go to dashboard and choose your tech stack & get question by AI"
        },
        {
            step: "03",
            title: "Interview",
            description: "Easily give interview with your Webcam & mic and answers the questions."
        },
        {
            step: "04",
            title: "Feedback",
            description: "Get feedback of your answers with rating."
        }
    ];

    const pricingPlans = [
        {
            name: 'Basic',
            description: 'For individuals exploring the platform.',
            price: { monthly: 0, annually: 0 },
            features: ['5 Interviews per day', 'Basic analytics', 'Email support'],
            buttonText: 'Start Free Trial',
            popular: false,
        },
        {
            name: 'Pro',
            description: 'For regular job seekers and students.',
            price: { monthly: 149, annually: 699 },
            features: [
                '20 Interviews per day',
                'Advanced analytics',
                'Priority email support',
                'Resume feedback',
            ],
            buttonText: 'Choose Plan',
            popular: true,
        },
        {
            name: 'Premium',
            description: 'For placement cells and institutions.',
            price: { monthly: 1299, annually: 9999 },
            features: [
                'Unlimited interviews',
                'Team management',
                'Dedicated support',
                'Dedicated Feedback',
            ],
            buttonText: 'Choose Plan',
            popular: false,
        },
    ];

    const stats = [
        { number: "3,200+", label: "Mock Interviews Completed" },
        { number: "120,000+", label: "AI-Generated Questions" },
        { number: "88%", label: "Positive Feedback Score" },
        { number: "100+", label: "Colleges & Bootcamps Onboarded" }
    ];

    return (
        <div className={`${inter.className}`}>
            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to build amazing applications faster and more efficiently than ever before.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-purple-100 group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                                    <div className="text-purple-600 group-hover:text-white transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get started in minutes with our simple 4-step process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 bg-white border-4 border-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold text-purple-600">{step.step}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-purple-200 transform -translate-y-1/2 translate-x-10"></div>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-purple-600">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-purple-200 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Our Customers Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Don't just take our word for it. Here's what real customers have to say about our platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
                        </p>

                        {/* Pricing Toggle */}
                        <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
                            <button
                                onClick={() => setActivePricing('monthly')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activePricing === 'monthly'
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setActivePricing('annually')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activePricing === 'annually'
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                Annually
                                <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 ${plan.popular
                                        ? 'border-2 border-purple-500 transform scale-105'
                                        : 'border border-gray-100'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        ₹{plan.price[activePricing].toLocaleString('en-IN')}
                                        <span className="text-lg font-normal text-gray-500">
                                            /{activePricing === 'monthly' ? 'mo' : 'yr'}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/upgrade">
                                    <button
                                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${plan.popular
                                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 bg-purple-600">
                <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Practice with AI-powered mock interviews and real-time feedback. Get interview-ready — anytime, anywhere.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href='/dashboard'>
                            <button className="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
                                Try a Free Mock Interview
                            </button>
                        </Link>
                        <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors">
                            Watch How It Works
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}