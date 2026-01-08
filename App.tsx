import React, { useState, useEffect } from 'react';

// --- VERSÃO 1.9 ULTRA-SMOOTH (PERFORMANCE TUNED) ---
// Autor: Dr. Diego Melo | Design: Premium Safety View

// 1. Componente Interno do Cartão (Embutido para evitar erros de importação)
const MedicationCard = ({ label, dose, practicalResult, volume, notes, highlightColor }: any) => {
  const colors: any = {
    emerald: 'border-emerald-500 text-emerald-700 bg-emerald-50',
    blue: 'border-blue-500 text-blue-700 bg-blue-50',
    red: 'border-rose-500 text-rose-700 bg-rose-50'
  };
  
  // Fallback seguro de cor
  const theme = colors[highlightColor] || colors.emerald;
  const borderColor = theme.split(' ')[0];
  const textColor = theme.split(' ')[1];

  return (
    <div className={`
      relative overflow-hidden bg-white border-l-[6px] ${borderColor}
      rounded-xl p-5 shadow-sm border border-slate-100 mb-3 
      transition-all duration-200 active:scale-[0.98]
    `}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h3>
        <div className={`w-2 h-2 rounded-full opacity-20 ${borderColor.replace('border-', 'bg-')}`}></div>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="text-slate-900 text-lg font-medium leading-tight">
          Aplicar <strong className={`font-black ${textColor} text-xl`}>{practicalResult || volume}</strong>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t border-slate-50">
           <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wide bg-opacity-50 ${theme.split(' ')[2]} ${textColor}`}>
             Dose: {dose}
           </span>
           {notes && <span className="text-[10px] text-slate-400 italic flex-1 min-w-0 truncate">{notes}</span>}
        </div>
      </div>
    </div>
  );
};

// 2. Componente Principal (App)
export default function App() {
  const [weight, setWeight] = useState<string>('');
  const [activeTab, setActiveTab] = useState('ORAL');
  
  // Estado para controle da animação de scroll
  const [isCompact, setIsCompact] = useState(false);

  // Efeito de Scroll Otimizado (RAF + Hysteresis)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // Proteção para scroll negativo (iOS bounce)
      if (scrollY < 0) {
        ticking = false;
        return;
      }

      const direction = scrollY > lastScrollY ? "down" : "up";
      const distance = Math.abs(scrollY - lastScrollY);

      // Histerese: ignora movimentos menores que 10px para evitar 'jitter'
      if (distance < 10) {
        ticking = false;
        return;
      }

      // Lógica de Decisão
      if (scrollY < 60) {
        // Zona de Segurança Superior: Sempre expandido perto do topo
        setIsCompact(false);
      } else if (direction === "down" && scrollY > 100) {
        // Rolando para baixo: Compacta
        setIsCompact(true);
      } else if (direction === "up") {
        // Rolando para cima: Expande
        setIsCompact(false);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Conversão segura de peso
  const numWeight = parseFloat(weight);
  const calcWeight = !isNaN(numWeight) ? numWeight : 0;
  const isAdultCeiling = calcWeight > 50;

  // --- CALCULADORA DE SEGURANÇA (TRAVAS CLÍNICAS) ---
  
  // 1. Paracetamol (Gts): 10mg/kg (1 gta/kg) | Teto: 55 gotas
  const paracetamolDrops = Math.round(Math.min(calcWeight, 55));

  // 2. Dipirona (Gts): 20mg/kg (aprox 0.8 gta/kg) | Teto: 40 gotas
  // Cálculo base: (Peso * 20mg) / 25mg/gota
  const dipironaDrops = Math.round(Math.min((calcWeight * 20) / 25, 40));

  // 3. Ondansetrona (EV): 0.15mg/kg | Teto: 4mg (2mL)
  // Cálculo base: Peso * 0.075 mL/kg
  const ondansetronaVol = Math.min(calcWeight * 0.075, 2.00).toFixed(2);

  // 4. Dexametasona (EV): 0.6mg/kg | Teto: 10mg (2.5mL)
  // Cálculo base: Peso * 0.15 mL/kg
  const dexametasonaVol = Math.min(calcWeight * 0.15, 2.50).toFixed(2);

  // 5. Diazepam (EV): 0.3mg/kg | Teto: 10mg (2mL)
  // Cálculo base: Peso * 0.06 mL/kg
  const diazepamVol = Math.min(calcWeight * 0.06, 2.00).toFixed(2);

  // 6. Buscopan (Oral): 1 gta/kg (Dose cautelosa) | Teto: 20 gotas
  const buscopanOralDrops = Math.min(Math.round(calcWeight), 20);

  // 7. Buscopan (EV): 0.4mg/kg | Teto: 1 Ampola (1mL)
  const buscopanInjVol = Math.min(Number((calcWeight * 0.02).toFixed(2)), 1).toFixed(2);


  // --- ARRAYS DE MEDICAMENTOS ---
  const orals = [
    { label: "Dipirona (Gts 500mg/mL)", dose: `${(calcWeight * 20).toFixed(1)}mg`, practicalResult: `${dipironaDrops} Gotas`, color: 'emerald', notes: "Teto máx: 40 gotas" },
    { label: "Paracetamol (Gts 200mg/mL)", dose: `${(calcWeight * 10).toFixed(1)}mg`, practicalResult: `${paracetamolDrops} Gotas`, color: 'emerald', notes: "Teto máx: 55 gotas" },
    { label: "Amoxicilina (250mg/5mL)", dose: `${(calcWeight * 50).toFixed(1)}mg/dia`, practicalResult: `${((calcWeight * 50) / 50 / 3).toFixed(1)} mL (8/8h)`, color: 'emerald' },
    { label: "Amoxicilina (400mg/5mL)", dose: `${(calcWeight * 50).toFixed(1)}mg/dia`, practicalResult: `${((calcWeight * 50) / 80 / 2).toFixed(1)} mL (12/12h)`, color: 'emerald' },
    { label: "Prednisolona (3mg/mL)", dose: `${(calcWeight * 1).toFixed(1)}mg`, practicalResult: `${(calcWeight / 3).toFixed(1)} mL`, color: 'emerald' },
    { label: "Buscopan Simples (Gts 10mg/mL)", dose: `${(calcWeight * 0.5).toFixed(1)} mg`, practicalResult: `${buscopanOralDrops} Gotas`, color: 'emerald', notes: "Dose: 0,3-0,5mg/kg. Máximo 20 gts." }
  ];

  const injectables = [
    { label: "1. ONDANSETRONA (EV) - (4mg/2mL)", dose: `${(calcWeight * 0.15).toFixed(2)} mg`, volume: `${ondansetronaVol} mL`, color: 'blue', notes: "Teto máx: 4mg (2mL)" },
    { label: "2. PLASIL (IM/EV) - (10mg/2mL)", dose: `${(calcWeight * 0.1).toFixed(2)} mg`, volume: `${(calcWeight * 0.02).toFixed(2)} mL`, color: 'blue' },
    { label: "3. DIPIRONA (EV/IM) - (500mg/mL)", dose: `${(calcWeight * 25).toFixed(1)} mg`, volume: `${(calcWeight * 0.05).toFixed(2)} mL`, color: 'blue' },
    { label: "4. DEXAMETASONA (EV/IM) - (4mg/mL)", dose: `${(calcWeight * 0.6).toFixed(2)} mg`, volume: `${dexametasonaVol} mL`, color: 'blue', notes: "Teto máx: 10mg (2.5mL)" },
    { label: "5. DIAZEPAM (EV) - (10mg/2mL)", dose: `${(calcWeight * 0.3).toFixed(2)} mg`, volume: `${diazepamVol} mL`, color: 'blue', notes: "Teto máx: 10mg (2mL)" },
    { label: "6. DRAMIN B6 DL (IM)", dose: "Dose Padrão", volume: `${(calcWeight * 0.03).toFixed(2)} mL`, color: 'blue', notes: "Volumétrico conforme protocolo." },
    { label: "Buscopan Simples (EV/IM) (20mg/mL)", dose: `${(calcWeight * 0.4).toFixed(1)} mg`, volume: `${buscopanInjVol} mL`, color: 'blue', notes: "Dose: 0,4mg/kg. Teto: 1 ampola." }
  ];

  const intubation = [
    { label: "Fentanil (50mcg/mL)", dose: `${(calcWeight * 2).toFixed(1)} mcg`, volume: `${((calcWeight * 2) / 50).toFixed(2)} mL`, color: 'red' },
    { label: "Ketamina (50mg/mL)", dose: `${(calcWeight * 1.5).toFixed(1)} mg`, volume: `${((calcWeight * 1.5) / 50).toFixed(2)} mL`, color: 'red' },
    { label: "Rocurônio (10mg/mL)", dose: `${(calcWeight * 1.2).toFixed(1)} mg`, volume: `${((calcWeight * 1.2) / 10).toFixed(2)} mL`, color: 'red' },
    { label: "Succinilcolina (100mg/10mL)", dose: `${(calcWeight * 1.5).toFixed(1)} mg`, volume: `${((calcWeight * 1.5) / 10).toFixed(2)} mL`, color: 'red' },
    { label: "Tubo (TOT)", dose: "Diâmetro", volume: `${((calcWeight / 4) + 4).toFixed(1)}`, notes: "Cálculo: (Peso / 4) + 4.", color: 'red' }
  ];

  const handleWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setWeight('');
    } else {
      const numVal = parseFloat(val);
      if (!isNaN(numVal) && numVal >= 0 && numVal <= 200) {
        setWeight(val.toString());
      }
    }
  };

  const tabs = [
    { id: 'ORAL', label: 'Oral', icon: '🍬' },
    { id: 'INJETÁVEL', label: 'Injetável', icon: '💉' },
    { id: 'INTUBAÇÃO', label: 'Intubação', icon: '🌬️' }
  ];

  return (
    <div className="min-h-screen pb-20 font-sans bg-slate-50 selection:bg-indigo-500/30">
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              PedCal
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mt-0.5">
              Safety Dual View
            </span>
            <span className="text-[9px] font-medium text-slate-400 tracking-wide mt-0.5 opacity-80">
              Dr. Diego Melo
            </span>
          </div>
          <div className="bg-slate-900 shadow-lg shadow-slate-900/20 px-3 py-1 rounded-full text-white text-[10px] font-bold">
            V1.9 SMOOTH
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (INPUT PESO) --- */}
      <section className="bg-slate-900 pt-10 pb-16 px-4 rounded-b-[2.5rem] shadow-xl relative z-0 mb-[-2rem]">
        <div className="mx-auto max-w-2xl bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest block mb-2">
            Peso do Paciente
          </label>
          <div className="flex items-baseline gap-2 relative">
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={handleWeightInput}
              className="w-full text-6xl sm:text-7xl font-extrabold text-white focus:outline-none placeholder:text-slate-700 bg-transparent tracking-tighter drop-shadow-md"
              placeholder="0"
              autoFocus
            />
            <span className="text-2xl sm:text-3xl font-black text-slate-500 absolute right-0 bottom-4 pointer-events-none">KG</span>
          </div>
          
          {/* Alerta de Teto */}
          {isAdultCeiling && (
            <div className="mt-4 flex items-center gap-2 text-rose-300 bg-rose-500/20 border border-rose-500/30 px-3 py-2 rounded-lg backdrop-blur-md animate-pulse">
              <span className="text-lg">⚠️</span>
              <p className="font-bold text-[10px] uppercase tracking-wide">Teto de adulto atingido ({'>'}50kg)</p>
            </div>
          )}
        </div>
      </section>

      {/* --- NAVEGAÇÃO INTERATIVA (SCROLL AWARE) --- */}
      <div 
        className={`
          sticky top-[70px] z-40 mx-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isCompact ? 'w-14 mt-4' : 'w-full max-w-2xl px-4 pt-10 pb-4'}
        `}
      >
         <div 
          className={`
            flex items-center justify-between backdrop-blur-xl shadow-lg border border-white/50 
            transition-all duration-500 overflow-hidden relative
            ${isCompact 
              ? 'w-14 h-14 rounded-full bg-white p-0 justify-center shadow-xl ring-2 ring-indigo-500/10' // Modo Bolinha
              : 'w-full rounded-2xl bg-white/70 p-1.5 gap-1 ring-1 ring-black/5' // Modo Barra
            }
          `}
         >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            // Se estiver compacto, só renderiza o ativo
            if (isCompact && !isActive) return null;

            return (
              <button
                key={tab.id}
                onClick={() => {
                   if (isCompact) {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                   } else {
                     setActiveTab(tab.id);
                   }
                }}
                className={`
                  transition-all duration-300 flex items-center justify-center
                  ${isCompact
                    ? 'w-full h-full text-2xl animate-in fade-in zoom-in duration-300' // Ícone grande na bolinha
                    : `
                      flex-1 gap-2 rounded-xl py-3 text-[10px] sm:text-xs font-extrabold uppercase
                      ${isActive 
                        ? 'bg-white text-slate-900 shadow-md scale-[1.02] ring-1 ring-black/5' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
                    `
                  }
                `}
              >
                <span className={isCompact ? "" : "text-sm"}>{tab.icon}</span>
                {!isCompact && (
                  <>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.substring(0, 3)}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- GRID DE RESULTADOS --- */}
      <main className="mx-auto w-full max-w-2xl px-4 mt-2">
        {weight === '' ? (
          <div className="text-center mt-12 opacity-50">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
              <span className="text-3xl grayscale">⚖️</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Insira o peso para calcular</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10">
            {activeTab === 'ORAL' && orals.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} />)}
            {activeTab === 'INJETÁVEL' && injectables.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} />)}
            {activeTab === 'INTUBAÇÃO' && intubation.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} />)}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-2xl p-8 text-center">
        <p className="text-[10px] font-bold uppercase text-slate-300 tracking-widest mb-2">Decisão Clínica Assistida</p>
        <p className="text-[9px] text-slate-300 font-medium">PedCal v1.9 • Safety First</p>
      </footer>
    </div>
  );
}