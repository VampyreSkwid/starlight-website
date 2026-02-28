import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { supabase, isSupabaseConfigured } from '../../utils/supabaseClient';

interface FormData {
  companyName: string;
  contactName: string;
  title: string;
  email: string;
  assetType: string;
  estimatedValue: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    assetType: 'Net Smelter Royalty', // Default to first option in new dropdown
    estimatedValue: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
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
    if (!formData.estimatedValue.trim()) newErrors.estimatedValue = 'Estimated value is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setSubmitting(true);

      try {
        let isSuccess = false;

        if (isSupabaseConfigured) {
          let { error } = await supabase
            .from('registrations')
            .insert([
              {
                company_name: formData.companyName,
                contact_name: formData.contactName,
                title: formData.title,
                email: formData.email,
                asset_type: formData.assetType,
                estimated_value: formData.estimatedValue,
              }
            ]);

          // If the database complains about the missing 'estimated_value' column (error 42703),
          // fallback to the original schema to ensure submission completes.
          if (error && error.code === '42703') {
            console.warn('estimated_value column missing in DB. Falling back to old schema.');
            const retry = await supabase
              .from('registrations')
              .insert([
                {
                  company_name: formData.companyName,
                  contact_name: formData.contactName,
                  title: formData.title,
                  email: formData.email,
                  asset_type: formData.assetType,
                }
              ]);
            error = retry.error;
          }

          if (error) throw error;
          isSuccess = true;
          console.log('Form submitted successfully to assigned Supabase');
        } else {
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
                estimatedValue: formData.estimatedValue,
              }),
            }
          );

          if (response.ok) {
            isSuccess = true;
            console.log('Form submitted successfully to default endpoint');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit form');
          }
        }

        if (isSuccess) {
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ email: 'Submission failed. Please try again or check your connection.' });
        setSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <section id="reserve" className="relative py-32 px-6 md:px-12 lg:px-24 bg-brand-bg text-brand-primary rounded-t-[4rem] -mt-10 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FFFFFF] rounded-[2rem] p-12 text-center border border-brand-primary/10 shadow-2xl">
            <CheckCircle2 className="size-16 text-brand-primary mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl mb-4 font-playfair italic font-bold">You're on the List</h2>
            <p className="text-lg text-brand-primary/70 leading-relaxed font-mono uppercase tracking-wider">
              Thank you for your interest. We'll be in touch as the Starlight platform prepares for
              launch. Your company is now in our priority pipeline.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="relative py-32 px-6 md:px-12 lg:px-24 bg-brand-bg text-brand-primary rounded-t-[4rem] -mt-10 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair italic font-bold mb-4">Access Alternative Capital.</h2>
          <p className="font-mono text-brand-primary/60 text-lg uppercase tracking-wider">
            Phase 1 Commercialization Pipeline: Accepting applications for our cohort of mining partners.
          </p>
        </div>

        <form className="bg-[#FFFFFF] rounded-[2rem] p-10 md:p-16 shadow-2xl border border-black/5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className={`bg-brand-bg/50 border ${errors.contactName ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg`}
                placeholder="Your Name"
              />
              {errors.contactName && <p className="text-red-500 text-xs font-mono">{errors.contactName}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Title / Role</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`bg-brand-bg/50 border ${errors.title ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg`}
                placeholder="Your Title"
              />
              {errors.title && <p className="text-red-500 text-xs font-mono">{errors.title}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Company</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={`bg-brand-bg/50 border ${errors.companyName ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg`}
                placeholder="Your Company"
              />
              {errors.companyName && <p className="text-red-500 text-xs font-mono">{errors.companyName}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Contact Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`bg-brand-bg/50 border ${errors.email ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs font-mono">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Estimated Asset Value</label>
              <div className="relative">
                <select
                  name="estimatedValue"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  required
                  className={`w-full bg-brand-bg/50 border ${errors.estimatedValue ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Select estimated value...</option>
                  <option value="Under $10M">Under $10M</option>
                  <option value="$10M - $50M">$10M - $50M</option>
                  <option value="$50M - $100M">$50M - $100M</option>
                  <option value="$100M+">$100M+</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-brand-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {errors.estimatedValue && <p className="text-red-500 text-xs font-mono">{errors.estimatedValue}</p>}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-mono text-sm uppercase tracking-wider text-brand-primary/70">Asset Type</label>
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                required
                className={`bg-brand-bg/50 border ${errors.assetType ? 'border-red-500' : 'border-brand-primary/20'} rounded-xl px-4 py-4 outline-none focus:border-brand-primary transition-colors text-lg appearance-none cursor-pointer`}
              >
                <option value="Net Smelter Royalty">Net Smelter Royalty</option>
                <option value="Mineral Rights">Mineral Rights</option>
                <option value="Exploration Stage">Exploration Stage</option>
                <option value="Corporate Debt">Corporate Debt</option>
                <option value="Other">Other</option>
              </select>
              {errors.assetType && <p className="text-red-500 text-xs font-mono">{errors.assetType}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="interactive-button relative overflow-hidden w-full py-5 rounded-xl bg-brand-primary text-brand-bg font-semibold text-xl mt-4 hover:text-brand-primary cursor-pointer disabled:opacity-70"
          >
            <span className="relative z-10">{submitting ? 'Submitting...' : 'Submit Application'}</span>
            <span className="hover-layer"></span>
          </button>
        </form>
      </div>
    </section>
  );
}