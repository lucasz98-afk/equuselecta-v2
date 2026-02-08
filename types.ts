import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  action?: () => void;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  icon: React.ReactNode;
}

// Updated Categories for the new luxury direction
export type HorseCategory = 'all' | 'doma' | 'salto';

export type HorseLevel = 'basico' | 'medio' | 'alto';

export interface Horse {
  id: string;
  name: string;
  category: HorseCategory;
  level?: HorseLevel; 
  age: number;
  gender: 'Stallion' | 'Mare' | 'Gelding'; 
  breed: string; 
  country: string; 
  height: string; 
  coat: string; 
  price: number | 'Consultar' | 'Privado';
  description: string;
  lineage: string; 
  image: string;
  gallery: string[];
  video?: string; // Video Horizontal (YouTube 16:9)
  videoVertical?: string; // Video Vertical (IG/Shorts 9:16)
  features: string[]; 
}