export enum MedicationCategory {
  ORAL = 'ORAL',
  INJECTABLE = 'INJETÁVEL',
  INTUBATION = 'INTUBAÇÃO'
}

export type HighlightColor = 'emerald' | 'blue' | 'red';

export interface MedicationItem {
  label: string;
  dose: string;
  practicalResult?: string;
  volume?: string;
  notes?: string;
}

export interface MedicationCardProps extends MedicationItem {
  highlightColor: HighlightColor;
}