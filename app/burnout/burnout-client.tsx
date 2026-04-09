'use client';

import { useMemo } from 'react';
import { MoonStar, Smartphone } from 'lucide-react';
import { SectionCard } from '@/components/section-card';
import { useLocalStorageState } from '@/lib/storage';

const tipsMap: Record<string, string[]> = {
  low: ['Silencie notificações por 30 min.', 'Beba água e afaste-se da tela.', 'Escolha só 1 prioridade para agora.'],
  mid: ['Faça pausas de 5 min a cada 45 min.', 'Reduza brilho e abas abertas.', 'Evite multitarefa por 1 bloco.'],
  high: ['Você está bem hoje: proteja isso.', 'Use foco profundo com celular longe.', 'Finalize pendências pequenas primeiro.']
};

export default function BurnoutClient() {
  const { state: airplaneMode, setState: setAirplaneMode } = useLocalStorageState<boolean>('sob-medida-burnout-airplane', false);
  const { state: energyLevel, setState: setEnergyLevel } = useLocalStorageState<number>('sob-medida-burnout-energy', 5);

  const tips = useMemo(() => {
    if (energyLevel <= 3) return tipsMap.low;
    if (energyLevel <= 7) return tipsMap.mid;
    return tipsMap.high;
  }, [energyLevel]);

  return (
    <div className="space-y-4">
      <SectionCard title="Burnout digital" subtitle="Crie micro barreiras contra o excesso de tela.">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/20 p-3">
              {airplaneMode ? <MoonStar size={20} /> : <Smartphone size={20} />}
            </div>
            <div>
              <p className="font-medium text-white">Modo avião mental</p>
              <p className="text-sm text-slate-300">{airplaneMode ? 'Ligado: menos estímulos' : 'Desligado: rotina normal'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAirplaneMode(!airplaneMode)}
            className={`relative h-8 w-14 rounded-full transition ${airplaneMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
            aria-label="Ativar modo avião"
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${airplaneMode ? 'left-7' : 'left-1'}`}
            />
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Escala de energia" subtitle={`Nível atual: ${energyLevel}/10`}>
        <input
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          className="range-thumb w-full"
        />
        <div className="mt-3 flex justify-between text-xs text-slate-400">
          <span>Exausto</span>
          <span>Equilibrado</span>
          <span>Cheio de energia</span>
        </div>
      </SectionCard>

      <SectionCard title="Dicas sob medida" subtitle="Recomendações rápidas baseadas no seu nível de energia.">
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
              {tip}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}