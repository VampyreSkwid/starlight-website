import { useState } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { supabase, isSupabaseConfigured } from '../../utils/supabaseClient';
import { CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.contact_name || !formData.contact_email || !formData.contact_message) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      let isSuccess = false;

      // Map our new form keys to the Supabase expected keys
      const payload = {
        name: formData.contact_name,
        email: formData.contact_email,
        message: formData.contact_message,
      };

      if (isSupabaseConfigured) {
        const { error: dbError } = await supabase
          .from('contacts')
          .insert([payload]);

        if (dbError) throw dbError;
        isSuccess = true;
      } else {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-1da2e686/submit-contact`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          isSuccess = true;
        } else {
          const errorData = await response.json();
          console.error('Failed to submit contact form:', errorData);
          throw new Error('Failed to send message');
        }
      }

      if (isSuccess) {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Error submitting contact form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#050508] font-inter">
      {/* Contact Hero Section */}
      <section className="relative h-[60dvh] w-full flex items-end pb-24 px-8 md:px-16 lg:px-24">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contact_hero_vancouver.png"
            alt="Global communication network centered on Vancouver"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full">
          <h1 className="hero-text text-xl md:text-2xl font-semibold tracking-tight uppercase text-brand-bg/80 mb-2">Global Connectivity</h1>
          <h2 className="hero-text text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-4">
            <span className="block font-bold mb-2 text-white">Initial Contact.</span>
          </h2>
          <p className="hero-text text-lg md:text-xl text-brand-bg/70 max-w-2xl font-mono leading-relaxed text-white">
            For general inquiries, strategic partnerships, and press.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact" className="relative w-full py-16 px-6 md:px-12 lg:px-24 z-20">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="bg-brand-dark/30 backdrop-blur-md rounded-[2rem] p-12 text-center border border-brand-accent/50 shadow-2xl">
              <CheckCircle2 className="size-16 text-brand-accent mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="text-3xl mb-4 font-playfair italic font-bold text-white">Message Received</h2>
              <p className="text-lg text-brand-bg/70 leading-relaxed font-mono uppercase tracking-wider">
                We will be in touch shortly.
              </p>
            </div>
          ) : (
            <form className="bg-brand-dark/30 backdrop-blur-md rounded-[2rem] p-6 md:p-16 shadow-2xl border border-brand-dark" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-sm uppercase tracking-wider text-brand-bg/70 text-white">Name</label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="bg-[#050508]/50 border border-brand-dark rounded-xl px-4 py-4 outline-none focus:border-brand-accent transition-colors text-lg text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-sm uppercase tracking-wider text-brand-bg/70 text-white">Contact Email</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                    className="bg-[#050508]/50 border border-brand-dark rounded-xl px-4 py-4 outline-none focus:border-brand-accent transition-colors text-lg text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-sm uppercase tracking-wider text-brand-bg/70 text-white">Message</label>
                  <textarea
                    name="contact_message"
                    value={formData.contact_message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-[#050508]/50 border border-brand-dark rounded-xl px-4 py-4 outline-none focus:border-brand-accent transition-colors text-lg text-white resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4 font-mono">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="interactive-button relative overflow-hidden w-full py-5 rounded-xl bg-brand-accent text-brand-primary font-semibold text-xl mt-4 hover:text-brand-bg cursor-pointer disabled:opacity-70"
              >
                <span className="relative z-10">{submitting ? 'Sending...' : 'Send Message'}</span>
                <span className="hover-layer"></span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}