const valueProps = [
  {
    title: 'Tokenize NSRs & Resources',
    body: 'Capitalize on illiquid NSRs and mineral resources into digital securities that can be traded on a regulated secondary market.',
  },
  {
    title: 'Access Global Capital',
    body: 'Reach a new demographic of investors worldwide - an immense pool of untapped capital is looking for deployment in Real World Assets.',
  },
  {
    title: 'Built-In Compliance',
    body: 'Our patent-pending AI engine continuously verifies compliance with securities requirements — enabling secondary trading liquidity.',
  },
];

export function ValueProps() {
  return (
    <section className="w-full py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => {
            return (
              <div
                key={idx}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-lg hover:border-amber-700/50 transition-all duration-300"
              >
                <h3 className="text-xl mb-4 text-slate-50" style={{ fontFamily: 'Crimson Pro, serif' }}>
                  {prop.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {prop.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}