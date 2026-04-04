import { ReactNode } from 'react';

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="glass rounded-[2rem] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
