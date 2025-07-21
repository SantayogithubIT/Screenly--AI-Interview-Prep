
'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for contacting support! We will get back to you soon.');
    // Ideally, you'd call an API or backend here
  };

  return (
    <>
    <Navbar/>
     <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Support</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border rounded-lg p-3"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border rounded-lg p-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="How can we help you?"
          className="w-full border rounded-lg p-3"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
          Send Message
        </button>
      </form>
    </div></>
   
  );
};

export default SupportPage;
