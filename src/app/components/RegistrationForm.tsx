import { useState } from 'react';
import { CheckCircle2, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface FormData {
  companyName: string;
  contactName: string;
  title: string;
  email: string;
  assetType: string;
  consent: boolean;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    assetType: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.title.trim()) newErrors.title = 'Title/role is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.assetType) newErrors.assetType = 'Please select an asset type';
    if (!formData.consent) newErrors.consent = 'Please confirm your interest';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitting(true);
      
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-1da2e686/submit-registration`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              companyName: formData.companyName,
              contactName: formData.contactName,
              title: formData.title,
              email: formData.email,
              assetType: formData.assetType,
            }),
          }
        );
        
        if (response.ok) {
          const result = await response.json();
          console.log('Form submitted successfully:', result);
          setSubmitted(true);
        } else {
          const error = await response.json();
          console.error('Failed to submit form:', error);
          setErrors({ email: 'Failed to submit. Please try again.' });
          setSubmitting(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ email: 'Network error. Please check your connection.' });
        setSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <section id="reserve" className="w-full py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-amber-700/50 p-12 rounded-lg text-center">
            <CheckCircle2 className="size-16 text-amber-400 mx-auto mb-6" strokeWidth={1.5} />
            <h2 
              className="text-3xl mb-4 text-slate-50"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              You're on the List
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Thank you for your interest. We'll be in touch as the Starlight platform prepares for 
              launch. Your company is now in our priority pipeline.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="w-full py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl sm:text-4xl mb-4 text-slate-50"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Reserve Your Spot
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto"><span className="italic">Yes I am interested in tokenizing assets with Starlight -please add me to your waitlist!</span></p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border-t-2 border-t-amber-700 border border-slate-800 p-8 sm:p-10 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm mb-2 text-slate-300">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Company Name Here"
                className={`w-full bg-slate-950/50 border ${errors.companyName ? 'border-red-500' : 'border-slate-700'} rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors`}
              />
              {errors.companyName && (
                <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm mb-2 text-slate-300">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Full name"
                className={`w-full bg-slate-950/50 border ${errors.contactName ? 'border-red-500' : 'border-slate-700'} rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors`}
              />
              {errors.contactName && (
                <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm mb-2 text-slate-300">
                Title / Role
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. CEO, CFO, VP Exploration"
                className={`w-full bg-slate-950/50 border ${errors.title ? 'border-red-500' : 'border-slate-700'} rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors`}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={`w-full bg-slate-950/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="assetType" className="block text-sm mb-2 text-slate-300">
                Asset Type
              </label>
              <input
                type="text"
                id="assetType"
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                placeholder="e.g., NSRs, Mineral Rights, Exploration Assets..."
                className={`w-full bg-slate-950/50 border ${errors.assetType ? 'border-red-500' : 'border-slate-700'} rounded px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors`}
              />
              {errors.assetType && (
                <p className="text-red-400 text-sm mt-1">{errors.assetType}</p>
              )}
            </div>

            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 size-4 rounded border-slate-700 bg-slate-950/50 text-amber-600 focus:ring-amber-700 focus:ring-offset-slate-950"
                />
                <span className={`text-sm leading-relaxed ${errors.consent ? 'text-red-400' : 'text-slate-300'}`}>
                  Yes, I'm interested in exploring the digital future with Starlight. I'd like to learn 
                  more about tokenizing our mining assets and accessing new capital markets through 
                  Starlight's RWA platform when it launches.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-transparent border-2 border-amber-600 text-amber-400 py-4 px-6 rounded hover:bg-amber-600 hover:text-slate-950 transition-all duration-300 tracking-wide"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              {submitting ? 'Submitting...' : 'Register Now'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}