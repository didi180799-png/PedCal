import React from 'react';
import { MedicationCardProps } from '../types';

const MedicationCard: React.FC<MedicationCardProps> = ({ 
  label, 
  dose, 
  practicalResult, 
  volume, 
  notes, 
  highlightColor 
}) => {
  const colors = {
    emerald: 'border-emerald-500',
    blue: 'border-blue-500',
    red: 'border-rose-500'
  };

  return (
    <div className={`bg-white border-l-4 ${colors[highlightColor]} p-4 rounded-xl shadow-sm mb-3 transition-transform active:scale-[0.99]`}>
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-wider">
        {label}
      </h3>
      <div className="text-slate-900 text-sm font-medium">
        Aplicar <strong className="font-bold">{practicalResult || volume}</strong>
      </div>
      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
        <span className="font-semibold">Dose:</span> {dose}
        {notes && (
          <>
            <span className="mx-1 opacity-50">|</span>
            <span className="italic">{notes}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicationCard;