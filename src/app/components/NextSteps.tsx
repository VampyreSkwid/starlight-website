const steps = [
  {
    number: '1',
    title: 'Register today',
    description: 'takes 30 seconds, no cost or commitment',
  },
  {
    number: '2',
    title: "We'll reach out",
    description: 'to understand your assets and tokenization goals',
  },
  {
    number: '3',
    title: 'Priority access',
    description: 'registered companies get first access when we go live',
  },
  {
    number: '4',
    title: 'Tokenize & trade',
    description: 'your assets, verified and liquid on the Starlight platform',
  },
];

export function NextSteps() {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 
          className="text-3xl text-center mb-12 text-slate-50"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          What Happens Next
        </h2>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-amber-700 via-amber-700/50 to-amber-700/20 hidden sm:block" />
          
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="relative flex items-start gap-6">
                <div className="flex-shrink-0 size-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-slate-950 border border-amber-500 z-10"
                  style={{ fontFamily: 'Crimson Pro, serif' }}
                >
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl mb-1 text-slate-100" style={{ fontFamily: 'Crimson Pro, serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
