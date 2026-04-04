'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SectionCard } from '@/components/section-card';
import { useLocalStorageState } from '@/lib/storage';

type Task = {
  id: string;
  task: string;
  reward: string;
  done: boolean;
};

export default function TDAHPage() {
  const { state: tasks, setState: setTasks } = useLocalStorageState<Task[]>('sob-medida-tdah', []);
  const [task, setTask] = useState('');
  const [reward, setReward] = useState('');

  const completed = useMemo(() => tasks.filter((item) => item.done).length, [tasks]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!task.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      task: task.trim(),
      reward: reward.trim(),
      done: false
    };

    setTasks([newTask, ...tasks]);
    setTask('');
    setReward('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const clearWeek = () => setTasks([]);

  return (
    <div className="space-y-4">
      <SectionCard title="Blocos de dopamina" subtitle="Quebre tarefas em 5–15 minutos com uma recompensa simples.">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Tarefa 5–15 min"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <input
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder="Recompensa"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-3 font-semibold"
          >
            <Plus size={18} />
            Adicionar bloco
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Sua semana" subtitle={`${completed}/${tasks.length} blocos concluídos`}>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-300">
              Nenhuma tarefa ainda. Crie seu primeiro bloco acima.
            </div>
          ) : (
            tasks.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTask(item.id)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent"
                />
                <div className="flex-1">
                  <p className={`font-medium ${item.done ? 'text-slate-400 line-through' : 'text-white'}`}>{item.task}</p>
                  {item.reward ? <p className="mt-1 text-sm text-emerald-200">🎯 Recompensa: {item.reward}</p> : null}
                </div>
              </label>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={clearWeek}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm text-slate-200"
        >
          <Trash2 size={16} />
          Limpar Semana
        </button>
      </SectionCard>
    </div>
  );
}
