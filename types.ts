// FIX: Import React types to resolve 'Cannot find namespace' error.
import type * as React from 'react';

export type LanguageCode = 'nl' | 'en' | 'tr' | 'pl' | 'bg' | 'ar' | 'de' | 'hu' | 'fr';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type ProjectCategory = 'windows' | 'doors' | 'facades' | 'modernization';
export type Profession = 'window_fitter' | 'carpenter' | 'mason' | 'facade_fitter' | 'concrete_specialist' | 'joint_sealer' | 'other';


export interface Project {
  id: number;
  category: ProjectCategory;
  // The 'title' and 'description' properties will be retrieved from the translations file
  // using a key like `project_1_title`. This avoids hardcoding text here.
  imageKeys: string[]; // e.g., ['project1_1', 'project1_2'] to look up image URLs
  location: {
    lat: number;
    lng: number;
  };
  mapZoom: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  imageKey: string;
  date: string; // YYYY-MM-DD
}