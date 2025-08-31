import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from '@nextui-org/react';

export default function Waitlist() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    // 👉 Hook this into Supabase, Firebase, Formspree, etc.
    console.log('Waitlist phone (WhatsApp):', phone);

    setSubmitted(true);
    setPhone('');
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Button to reveal form */}
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

      {/* Thank you message */}
      {submitted && (
        <p className="text-green-400 text-center font-medium">
          🎉 Thanks for joining! We’ll notify you on WhatsApp when we launch.
        </p>
      )}

      {/* Phone form */}
      {showForm && !submitted && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full md-w-[70%] gap-2 items-center"
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
          <Button
            type="submit"
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
