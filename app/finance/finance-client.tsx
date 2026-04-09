'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SectionCard } from '@/components/section-card';
import { useLocalStorageState } from '@/lib/storage';

type Expense = {
  id: string;
  value: number;
  category: string;
};

export default function FinanceClient() {
  const { state: expenses, setState: setExpenses } = useLocalStorageState<Expense[]>('sob-medida-finance', []);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const total = useMemo(() => expenses.reduce((sum, item) => sum + item.value, 0), [expenses]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsedValue = Number(value.replace(',', '.'));
    if (!parsedValue || !category.trim()) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      value: parsedValue,
      category: category.trim()
    };

    setExpenses([newExpense, ...expenses]);
    setValue('');
    setCategory('');
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Minimalismo financeiro" subtitle="Registre gastos e veja o total em tempo real.">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor gasto"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoria"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-3 font-semibold"
          >
            <Plus size={18} />
            Adicionar gasto
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Resumo" subtitle="Seus dados ficam salvos no aparelho.">
        <div className="rounded-[1.5rem] bg-gradient-to-r from-blue-500/20 to-emerald-500/20 px-4 py-5">
          <p className="text-sm text-slate-300">Total registrado</p>
          <p className="mt-1 text-3xl font-black text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {expenses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-300">
              Nenhum gasto lançado ainda.
            </div>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{expense.category}</p>
                  <p className="text-sm text-slate-300">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expense.value)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeExpense(expense.id)}
                  className="rounded-full border border-white/10 p-2 text-slate-300"
                  aria-label="Remover gasto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}