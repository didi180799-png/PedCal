import React, { useState, useEffect } from 'react';

// --- VERSÃO 2.4 CLINICAL (HYPER-REAL 3D) ---
// Autor: Dr. Diego Melo | Design: Premium Safety View

// 1. Componente Interno do Cartão (Refatorado para Hyper-Real 3D Glassmorphism)
const MedicationCard = ({ label, dose, practicalResult, volume, notes, highlightColor, actionVerb = "Aplicar" }: any) => {
  // Configuração de Temas com Gradientes Vibrantes
  const themes: any = {
    emerald: {
      gradient: 'from-emerald-400/20 via-emerald-50/10 to-transparent',
      badge: 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/40',
      text: 'text-emerald-950',
      border: 'border-l-emerald-500',
      dot: 'bg-emerald-500'
    },
    blue: {
      gradient: 'from-blue-400/20 via-blue-50/10 to-transparent',
      badge: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-blue-500/40',
      text: 'text-blue-950',
      border: 'border-l-blue-500',
      dot: 'bg-blue-500'
    },
    red: {
      gradient: 'from-rose-400/20 via-rose-50/10 to-transparent',
      badge: 'bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-rose-500/40',
      text: 'text-rose-950',
      border: 'border-l-rose-500',
      dot: 'bg-rose-500'
    }
  };
  
  const t = themes[highlightColor] || themes.emerald;

  const mainValue = practicalResult || volume;
  const splitValue = mainValue.split(' ');
  const numberVal = splitValue[0];
  const unitVal = splitValue.slice(1).join(' ');

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6 mb-4
      bg-white/80 backdrop-blur-xl border border-white/60
      shadow-xl hover:shadow-2xl
      transform transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]
      hover:-translate-y-[6px] active:scale-[0.96] cursor-pointer
      ${t.border} border-l-[6px] group
    `}
    style={{
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 10px 30px -10px rgba(0,0,0,0.2)'
    }}
    >
      {/* Gradiente Interno Superior */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${t.gradient} opacity-60 pointer-events-none transition-opacity group-hover:opacity-80`}></div>

      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start mb-3 relative z-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed user-select-none">
          {label}
        </h3>
        <div className={`w-2 h-2 rounded-full ${t.dot} shadow-[0_0_8px_currentColor] opacity-60`}></div>
      </div>
      
      {/* Corpo Principal */}
      <div className="flex flex-col gap-1 relative z-10">
        <div className="flex items-baseline gap-2 text-slate-500 text-xs font-bold uppercase tracking-wide user-select-none">
          <span>{actionVerb}</span>
        </div>
        
        <div className="flex items-baseline gap-3 mt-1 relative">
          <span className={`text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-900 drop-shadow-sm`}>
            {numberVal}
          </span>
          {/* Badge Flutuante 3D (Posição Absoluta Fixa) */}
          {unitVal && (
            <span className={`
              absolute top-4 right-4 sm:static sm:top-auto sm:right-auto sm:ml-auto
              text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full opacity-80
              shadow-lg backdrop-blur-md transform
              ${t.badge}
            `}>
              {unitVal}
            </span>
          )}
        </div>

        {/* Rodapé com Detalhes */}
        <div className="mt-5 pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center gap-3">
           <div className="flex items-center gap-2 px-2 py-1 bg-slate-100/50 rounded-md self-start sm:self-auto ring-1 ring-slate-200/50 user-select-none">
             <div className={`w-1 h-3 rounded-full ${t.dot} opacity-40`}></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
               Dose: {dose}
             </span>
           </div>
           
           {notes && (
             <span className="text-[10px] text-slate-400 font-medium italic leading-tight pl-1 select-text">
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
  
  // Estado para controle da animação de scroll e Cinemática de Morfose
  const [isCompact, setIsCompact] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const stitchImageUrl = "https://upload.wikimedia.org/wikipedia/en/d/d2/Stitch_%28Lilo_%26_Stitch%29.svg";

  // Efeito de Scroll Otimizado e Detecção de Movimento
  useEffect(() => {
    let scrollTimeout: any = null;

    const onScroll = () => {
      const scrollY = window.scrollY;
      
      // 1. Lógica de Detecção de Movimento (Ghost Effect - Debounce)
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // 2. Lógica de Morfose (Barra -> Bola)
      // O limite de 120px define o momento da transformação
      if (scrollY > 120) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Conversão segura de peso
  const numWeight = parseFloat(weight);
  const calcWeight = !isNaN(numWeight) ? numWeight : 0;
  const isAdultCeiling = calcWeight > 50;

  // --- LOGIC CORE (PRESERVED INVIOLABLE) ---
  
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
    <div className="min-h-screen pb-20 font-sans bg-gradient-to-br from-indigo-50/30 via-sky-50/30 to-slate-100/30 selection:bg-indigo-500/30">
      {/* Container Pai com Perspectiva para 3D Real */}
      <div className="perspective-[1500px] w-full max-w-full overflow-x-hidden">
        
        {/* --- HEADER --- */}
        <header className="sticky top-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-lg transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 select-none">
                PedCal
              </h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mt-0.5 drop-shadow-sm select-none">
                Safety Dual View
              </span>
              <span className="text-[9px] font-medium text-slate-500 tracking-wide mt-0.5 opacity-80 select-none">
                Dr. Diego Melo
              </span>
            </div>
            <div className="bg-slate-900 shadow-lg shadow-slate-900/30 px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wide border border-white/10 select-none">
              V2.4 CLINICAL
            </div>
          </div>
        </header>

        {/* --- HERO SECTION (INPUT PESO) --- */}
        <section className="bg-slate-950 pt-12 pb-20 px-4 rounded-b-[3rem] shadow-[inset_0_-80px_60px_rgba(0,0,0,0.3),_0_20px_50px_rgba(0,0,0,0.4)] relative z-0 mb-[-3rem] overflow-hidden">
          {/* Background glow effects - Enhanced 3D */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl pointer-events-none opacity-60">
              <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
          </div>

          <div className="mx-auto max-w-2xl relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 hover:shadow-indigo-500/20 transition-shadow duration-300">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] block mb-4 text-center select-none">
                Peso do Paciente
              </label>
              <div className="flex justify-center items-baseline gap-2 relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={weight}
                  onChange={handleWeightInput}
                  className="w-full text-center text-7xl sm:text-8xl font-black text-white focus:outline-none placeholder:text-slate-800 bg-transparent tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all cursor-text"
                  placeholder="0"
                  autoFocus
                />
                <span className="text-2xl font-black text-slate-600 absolute right-4 bottom-6 pointer-events-none select-none">KG</span>
              </div>
            </div>
            
            {/* Alerta de Teto */}
            {isAdultCeiling && (
              <div className="mt-6 flex items-center justify-center gap-3 text-rose-200 bg-rose-900/40 border border-rose-500/30 px-4 py-3 rounded-xl backdrop-blur-md animate-in slide-in-from-top-2 shadow-lg select-none">
                <span className="text-xl filter drop-shadow-md">⚠️</span>
                <p className="font-bold text-[11px] uppercase tracking-widest text-shadow">Teto de adulto atingido ({'>'}50kg)</p>
              </div>
            )}
          </div>
        </section>

        {/* --- NAVEGAÇÃO UNIFICADA COM MORFOSE (Sticky -> Fixed/Compact) --- */}
        {/* Container Wrapper: Garante o espaço e posicionamento */}
        <div className={`
           sticky top-4 z-[100] mx-auto w-full max-w-2xl px-4 pt-12 pb-6 flex justify-center pointer-events-none
           ${isCompact ? 'h-auto' : 'h-auto'}
        `}>
          {/* Elemento Morfo: A Barra que vira Bola */}
          <div 
            className={`
              pointer-events-auto relative flex items-center transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) will-change-[width,transform,opacity,background-color]
              ${isCompact 
                ? `w-16 h-16 rounded-full p-0 shadow-2xl shadow-indigo-500/50 justify-center
                   ${isScrolling 
                      ? 'bg-indigo-600/10 backdrop-blur-md border border-white/20' // Fantasma no movimento
                      : 'bg-gradient-to-br from-indigo-500 to-violet-600 border border-transparent' // Sólido parado
                   }`
                : 'w-full h-16 rounded-full bg-white/85 p-1.5 gap-2 shadow-lg hover:shadow-xl border border-white/70 backdrop-blur-xl justify-between'
              }
            `}
          >
            {/* CONTEÚDO 1: ABAS (Mostra apenas quando expandido) */}
            <div className={`flex w-full h-full items-center justify-between transition-opacity duration-300 ${isCompact ? 'opacity-0 absolute pointer-events-none' : 'opacity-100 relative'}`}>
               {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => !isCompact && setActiveTab(tab.id)}
                      className={`
                        transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 relative cursor-pointer select-none h-full
                        text-[10px] sm:text-xs font-black uppercase tracking-wide
                        ${isActive 
                          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/30 transform scale-[1.03]' 
                          : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}
                      `}
                    >
                        <span className="text-sm opacity-80">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.substring(0, 3)}</span>
                    </button>
                  );
               })}
            </div>

            {/* CONTEÚDO 2: STITCH (Mostra apenas quando compacto) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isCompact ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}`}>
               <img 
                 src={stitchImageUrl} 
                 alt="Stitch" 
                 className="w-[85%] h-[85%] object-contain drop-shadow-md filter saturate-110 opacity-100 transform scale-125"
               />
               {/* Botão invisível para scroll top */}
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="absolute inset-0 w-full h-full cursor-pointer z-10"
                 aria-label="Voltar ao topo"
               />
            </div>
          </div>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        <main className="mx-auto w-full max-w-2xl px-4 mt-2 mb-10">
          {weight === '' ? (
            <div className="text-center mt-12 opacity-40 animate-pulse">
              <div className="w-24 h-24 bg-white/80 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border border-slate-100 backdrop-blur-sm">
                <span className="text-4xl grayscale opacity-50">⚖️</span>
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] select-none">Insira o peso para calcular</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-12">
              {activeTab === 'ORAL' && orals.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Ofertar" />)}
              {activeTab === 'INJETÁVEL' && injectables.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Aplicar" />)}
              {activeTab === 'INTUBAÇÃO' && intubation.map((m, i) => <MedicationCard key={i} {...m} highlightColor={m.color} actionVerb="Aplicar" />)}
            </div>
          )}
        </main>

        <footer className="mx-auto max-w-2xl p-8 text-center border-t border-slate-200/50">
          <p className="text-[10px] font-bold uppercase text-slate-300 tracking-[0.3em] mb-2 drop-shadow-sm select-none">Decisão Clínica Assistida</p>
          <p className="text-[9px] text-slate-400 font-medium select-none">PedCal v2.4 • Safety First System</p>
        </footer>
      </div>
    </div>
  );
}