import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl sm:text-5xl mb-6 text-slate-50"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Get in Touch
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Interested in learning more about Starlight's tokenization platform? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-lg">
            <h2 
              className="text-2xl mb-6 text-slate-50"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Contact Information
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="size-6 text-amber-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-slate-200 mb-1">Email</h3>
                  <a 
                    href="mailto:info@starlightrwa.com" 
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    info@starlightrwa.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="size-6 text-amber-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-slate-200 mb-1">Phone</h3>
                  <a 
                    href="tel:+16045180642" 
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    +1 (604) 518-0642
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="size-6 text-amber-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-slate-200 mb-1">Location</h3>
                  <p className="text-slate-400">
                    Vancouver, BC<br />
                    Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/60 backdrop-blur-xl border-t-2 border-t-amber-700 border border-slate-800 p-8 rounded-lg">
            <h2 
              className="text-2xl mb-6 text-slate-50"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Send a Message
            </h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-transparent border-2 border-amber-600 text-amber-400 py-3 px-6 rounded hover:bg-amber-600 hover:text-slate-950 transition-all duration-300 tracking-wide"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}