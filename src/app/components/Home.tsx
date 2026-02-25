import { Hero } from './Hero';
import { ValueProps } from './ValueProps';
import { RegistrationForm } from './RegistrationForm';

export function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      
      {/* Subtle divider */}
      <div className="container mx-auto px-4 my-12">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
      </div>
      
      <RegistrationForm />
    </>
  );
}