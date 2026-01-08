import React, { useState, useEffect } from 'react';

// --- VERSÃO 2.4 CLINICAL (PREMIUM UI REFACTOR) ---
// Autor: Dr. Diego Melo | Design: Premium Safety View

// 1. Componente Interno do Cartão (Refatorado para Premium UI)
const MedicationCard = ({ label, dose, practicalResult, volume, notes, highlightColor, actionVerb = "Aplicar" }: any) => {
  // Configuração de Temas com Gradientes Sutis
  const themes: any = {
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-white',
      border: 'border-emerald-100',
      text: 'text-emerald-800',
      accent: 'bg-emerald-100 text-emerald-700',
      highlight: 'text-emerald-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-white',
      border: 'border-blue-100',
      text: 'text-blue-800',
      accent: 'bg-blue-100 text-blue-700',
      highlight: 'text-blue-600'
    },
    red: {
      bg: 'bg-gradient-to-br from-rose-50 to-white',
      border: 'border-rose-100',
      text: 'text-rose-800',
      accent: 'bg-rose-100 text-rose-700',
      highlight: 'text-rose-600'
    }
  };
  
  const t = themes[highlightColor] || themes.emerald;

  // Extração inteligente da unidade para o Badge
  const mainValue = practicalResult || volume;
  const splitValue = mainValue.split(' ');
  const numberVal = splitValue[0];
  const unitVal = splitValue.slice(1).join(' ');

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-5 mb-3
      border ${t.border} ${t.bg} shadow-sm hover:shadow-md
      transition-all duration-300 transform active:scale-[0.99]
    `}>
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
          {label}
        </h3>
        {/* Indicador de cor sutil */}
        <div className={`w-1.5 h-1.5 rounded-full ${t.highlight.replace('text-', 'bg-')} opacity-40`}></div>
      </div>
      
      {/* Corpo Principal */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2 text-slate-900/80 text-sm font-medium">
          <span>{actionVerb}</span>
        </div>
        
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className={`text-4xl font-black tracking-tighter ${t.text} drop-shadow-sm`}>
            {numberVal}
          </span>
          {unitVal && (
            <span className={`
              text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-lg
              ${t.accent} mix-blend-multiply
            `}>
              {unitVal}
            </span>
          )}
        </div>

        {/* Rodapé com Detalhes */}
        <div className="mt-4 pt-3 border-t border-slate-100/60 flex flex-col sm:flex-row sm:items-center gap-2">
           <div className="flex items-center gap-1.5">
             <div className={`w-1 h-3 rounded-full ${t.highlight.replace('text-', 'bg-')} opacity-30`}></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
               Dose: {dose}
             </span>
           </div>
           
           {notes && (
             <span className="text-[10px] text-slate-400 font-medium italic leading-tight pl-0 sm:pl-2 sm:border-l sm:border-slate-200">
               {notes}
             </span>
           )}
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

  const stitchImageUrl = "https://upload.wikimedia.org/wikipedia/en/d/d2/Stitch_%28Lilo_%26_Stitch%29.svg";

  // Efeito de Scroll Otimizado
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      if (scrollY < 0) { ticking = false; return; }

      const direction = scrollY > lastScrollY ? "down" : "up";
      const distance = Math.abs(scrollY - lastScrollY);

      if (distance < 10) { ticking = false; return; }

      if (scrollY < 80) {
        setIsCompact(false);
      } else if (direction === "down" && scrollY > 120) {
        setIsCompact(true);
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

  // --- LOGIC CORE (PRESERVED FROM V2.5) ---
  
  // 1. Paracetamol (Gts): 10mg/kg (1 gta/kg) | Teto: 55 gotas
  const paracetamolDrops = Math.round(Math.min(calcWeight, 55));

  // 2. Dipirona (Gts): 20mg/kg (aprox 0.8 gta/kg) | Teto: 40 gotas
  const dipironaDrops = Math.round(Math.min((calcWeight * 20) / 25, 40));

  // 3. Bromoprida (Gts): 1 gta/kg | Teto: 40 gotas
  const bromopridaDrops = Math.round(Math.min(calcWeight, 40));

  // 4. Dramin B6 Oral (Gts): 1 gta/kg | Teto: 40 gotas
  const draminOralDrops = Math.round(Math.min(calcWeight, 40));

  // 5. Ondansetrona (EV): 0.15mg/kg | Teto: 4mg (2mL)
  const ondansetronaVol = Math.min(calcWeight * 0.075, 2.00).toFixed(2);

  // 6. Dexametasona (EV): 0.6mg/kg | Teto: 10mg (2.5mL)
  const dexametasonaVol = Math.min(calcWeight * 0.15, 2.50).toFixed(2);

  // 7. Diazepam (IM): 0.3mg/kg | Teto: 10mg (2mL)
  const diazepamVol = Math.min(calcWeight * 0.06, 2.00).toFixed(2);

  // 8. Dramin B6 DL (EV): 0.04 ml/kg | Teto: 1mL (50mg)
  const draminInjVol = Math.min(calcWeight * 0.04, 1.00).toFixed(2);

  // 9. Buscopan (Oral): 1 gta/kg (Dose cautelosa) | Teto: 20 gotas
  const buscopanOralDrops = Math.min(Math.round(calcWeight), 20);

  // 10. Buscopan (EV): 0.4mg/kg | Teto: 1 Ampola (1mL)
  const buscopanInjVol = Math.min(Number((calcWeight * 0.02).toFixed(2)), 1).toFixed(2);


  // --- ARRAYS DE MEDICAMENTOS ---
  const orals = [
    { label: "Dipirona (Gts 500mg/mL)", dose: `${(calcWeight * 20).toFixed(1)}mg`, practicalResult: `${dipironaDrops} Gotas`, color: 'emerald', notes: "Teto máx: 40 gotas" },
    { label: "Paracetamol (Gts 200mg/mL)", dose: `${(calcWeight * 10).toFixed(1)}mg`, practicalResult: `${paracetamolDrops} Gotas`, color: 'emerald', notes: "Teto máx: 55 gotas" },
    { label: "Bromoprida (Gts 4mg/mL)", dose: `${(calcWeight * 0.15).toFixed(2)}mg`, practicalResult: `${bromopridaDrops} Gotas`, color: 'emerald', notes: "Dose: 0,15mg/kg/dose (1 gota/kg). Máximo 40 gotas." },
    { label: "Dramin B6 (Gts)", dose: `${(calcWeight * 1.25).toFixed(2)}mg`, practicalResult: `${draminOralDrops} Gotas`, color: 'emerald', notes: "Dose: 1,25mg/kg (1 gta/kg). Administrar a cada 6h ou 8h." },
    { label: "Amoxicilina (250mg/5mL)", dose: `${(calcWeight * 50).toFixed(1)}mg/dia`, practicalResult: `${((calcWeight * 50) / 50 / 3).toFixed(1)} mL (8/8h)`, color: 'emerald' },
    { label: "Amoxicilina (400mg/5mL)", dose: `${(calcWeight * 50).toFixed(1)}mg/dia`, practicalResult: `${((calcWeight * 50) / 80 / 2).toFixed(1)} mL (12/12h)`, color: 'emerald' },
    { label: "Prednisolona (3mg/mL)", dose: `${(calcWeight * 1).toFixed(1)}mg`, practicalResult: `${(calcWeight / 3).toFixed(1)} mL`, color: 'emerald' },
    { label: "Buscopan Simples (Gts 10mg/mL)", dose: `${(calcWeight * 0.5).toFixed(1)} mg`, practicalResult: `${buscopanOralDrops} Gotas`, color: 'emerald', notes: "Dose: 0,3-0,5mg/kg. Máximo 20 gts." },
    { label: "Ondansetrona (VO) - Diluído 1mg/1mL", dose: `${(calcWeight * 0.15).toFixed(2)}mg`, practicalResult: `${Math.min(Number((calcWeight * 0.15).toFixed(1)), 4)} mL`, color: 'emerald', notes: "Diluir 1cp (4mg) em 4mL de água e aspirar o volume acima." }
  ];

  const injectables = [
    { label: "1. ONDANSETRONA (EV) - (4mg/2mL)", dose: `${(calcWeight * 0.15).toFixed(2)} mg`, volume: `${ondansetronaVol} mL`, color: 'blue', notes: "Teto máx: 4mg (2mL)" },
    { label: "2. PLASIL (IM/EV) - (10mg/2mL)", dose: `${(calcWeight * 0.1).toFixed(2)} mg`, volume: `${(calcWeight * 0.02).toFixed(2)} mL`, color: 'blue' },
    { label: "3. DIPIRONA (EV/IM) - (500mg/mL)", dose: `${(calcWeight * 25).toFixed(1)} mg`, volume: `${(calcWeight * 0.05).toFixed(2)} mL`, color: 'blue' },
    { label: "4. DEXAMETASONA (EV/IM) - (4mg/mL)", dose: `${(calcWeight * 0.6).toFixed(2)} mg`, volume: `${dexametasonaVol} mL`, color: 'blue', notes: "Teto máx: 10mg (2.5mL)" },
    { label: "5. DIAZEPAM (IM) - (10mg/2mL)", dose: `${(calcWeight * 0.3).toFixed(2)} mg`, volume: `${diazepamVol} mL`, color: 'blue', notes: "Dose: 0,3mg/kg. Aplicar via Intramuscular profunda." },
    { label: "6. DRAMIN B6 (DL) (EV)", dose: `${(calcWeight * 1.25).toFixed(2)} mg`, volume: `${draminInjVol} mL`, color: 'blue', notes: "Dose: 1,25mg/kg. DILUIR 1mL da ampola em 9mL de SF 0,9% e aplicar lento." },
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
      <header className="sticky top-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              PedCal
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mt-0.5">
              Safety Dual View
            </span>
            <span className="text-[9px] font-medium text-slate-400 tracking-wide mt-0.5 opacity-80">
              Dr. Diego Melo
            </span>
          </div>
          <div className="bg-slate-900 shadow-lg shadow-slate-900/20 px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wide">
            V2.4 CLINICAL
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (INPUT PESO) --- */}
      <section className="bg-slate-900 pt-12 pb-20 px-4 rounded-b-[3rem] shadow-[0_20px_40px_-12px_rgba(15,23,42,0.4)] relative z-0 mb-[-3rem] overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-2xl relative">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/10">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] block mb-4 text-center">
              Peso do Paciente
            </label>
            <div className="flex justify-center items-baseline gap-2 relative">
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={handleWeightInput}
                className="w-full text-center text-7xl sm:text-8xl font-black text-white focus:outline-none placeholder:text-slate-800 bg-transparent tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
                placeholder="0"
                autoFocus
              />
              <span className="text-2xl font-black text-slate-600 absolute right-4 bottom-6 pointer-events-none">KG</span>
            </div>
          </div>
          
          {/* Alerta de Teto */}
          {isAdultCeiling && (
            <div className="mt-6 flex items-center justify-center gap-3 text-rose-200 bg-rose-900/40 border border-rose-500/30 px-4 py-3 rounded-xl backdrop-blur-md animate-in slide-in-from-top-2">
              <span className="text-xl filter drop-shadow-md">⚠️</span>
              <p className="font-bold text-[11px] uppercase tracking-widest text-shadow">Teto de adulto atingido ({'>'}50kg)</p>
            </div>
          )}
        </div>
      </section>

      {/* --- NAVEGAÇÃO INTERATIVA (SCROLL AWARE) --- */}
      <div 
        className={`
          sticky top-[80px] z-40 mx-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isCompact ? 'w-16 mt-6' : 'w-full max-w-2xl px-4 pt-12 pb-6'}
        `}
      >
         <div 
          className={`
            flex items-center justify-between backdrop-blur-xl border border-white/60 
            transition-all duration-500 overflow-hidden relative
            ${isCompact 
              ? 'w-16 h-16 rounded-full bg-white p-0 justify-center shadow-[0_8px_30px_-6px_rgba(99,102,241,0.4)] ring-4 ring-white/50' // Modo Bolinha Premium
              : 'w-full rounded-2xl bg-white/80 p-1.5 gap-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] ring-1 ring-white' // Modo Barra Premium
            }
          `}
         >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
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
                  transition-all duration-300 flex items-center justify-center relative
                  ${isCompact
                    ? 'w-full h-full animate-in fade-in zoom-in duration-300 rounded-full overflow-hidden' 
                    : `
                      flex-1 gap-2 rounded-xl py-3.5 text-[10px] sm:text-xs font-black uppercase tracking-wide
                      ${isActive 
                        ? 'bg-slate-900 text-white shadow-md scale-[1.02]' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}
                    `
                  }
                `}
              >
                {/* LÓGICA DE EXIBIÇÃO: IMAGEM STITCH vs ÍCONES PADRÃO */}
                {isCompact ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-white group cursor-pointer">
                    <img 
                      src={stitchImageUrl} 
                      alt="Stitch" 
                      className="w-[85%] h-[85%] object-contain drop-shadow-md filter saturate-110 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-sm opacity-80">{tab.icon}</span>
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
      <main className="mx-auto w-full max-w-2xl px-4 mt-2 mb-10">
        {weight === '' ? (
          <div className="text-center mt-12 opacity-40 animate-pulse">
            <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
              <span className="text-4xl grayscale opacity-50">⚖️</span>
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Insira o peso para calcular</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
            {activeTab === 'ORAL' && orals.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Ofertar" />)}
            {activeTab === 'INJETÁVEL' && injectables.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Aplicar" />)}
            {activeTab === 'INTUBAÇÃO' && intubation.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Aplicar" />)}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-2xl p-8 text-center border-t border-slate-100">
        <p className="text-[10px] font-bold uppercase text-slate-300 tracking-[0.3em] mb-2">Decisão Clínica Assistida</p>
        <p className="text-[9px] text-slate-300 font-medium">PedCal v2.4 • Safety First System</p>
      </footer>
    </div>
  );
}