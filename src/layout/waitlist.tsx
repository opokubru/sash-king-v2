import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

export default function Waitlist() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // ✅ added
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); //

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true); // Start loading

    const formData = { phone, email };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzmg394VrykHCUwfaxMD_MBSs1sJ9FIvUqrszt8dIBnjXSHXVTGxTeYehWluOlwinWA/exec',
        {
          method: 'POST',
          mode: 'no-cors', // prevents CORS error, but you won’t see response
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      setPhone('');
      setEmail('');
      setSubmitted(true);
      // setShowForm(false);
      setLoading(false); // Stop loading
      toast.success('🎉 You have joined the waitlist!');
    } catch (error) {
      alert('Error submitting form.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {!showForm && !submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Button
            radius="full"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 shadow-lg"
            onClick={() => setShowForm(true)}
          >
            Join the Waitlist
          </Button>
        </motion.div>
      )}

      {submitted && (
        <p className="text-green-400 text-center font-medium">
          🎉 Thanks for joining! We’ll notify you on WhatsApp (and email if
          provided).
        </p>
      )}

      {showForm && !submitted && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row w-full md:w-[70%] gap-2 items-center"
        >
          <Input
            type="tel"
            variant="bordered"
            placeholder="Enter your WhatsApp number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 text-white border-white/30 bg-black/20 placeholder-gray-300"
            required
          />
          <Input
            type="email"
            variant="bordered"
            placeholder="(Optional) Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-white border-white/30 bg-black/20 placeholder-gray-300"
          />
          <Button
            type="submit"
            isLoading={loading} // Show loading state
            radius="full"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6"
          >
            Join
          </Button>
        </motion.form>
      )}
    </div>
  );
}
