
import type { Project } from '../types';

// The text for titles and descriptions is stored in `translations.ts`
// This file only contains the structural data.

export const projectsData: Project[] = [
  {
    id: 1,
    category: 'modernization',
    imageKeys: ['project1_1', 'project1_2', 'project1_3'],
    location: { lat: 52.379189, lng: 4.899431 }, // Amsterdam
    mapZoom: 14,
  },
  {
    id: 2,
    category: 'windows',
    imageKeys: ['project2_1', 'project2_2'],
    location: { lat: 51.9225, lng: 4.47917 }, // Rotterdam
    mapZoom: 13,
  },
  {
    id: 3,
    category: 'windows',
    imageKeys: ['project3_1', 'project3_2', 'project3_3', 'project3_4'],
    location: { lat: 52.0907, lng: 5.1214 }, // Utrecht
    mapZoom: 14,
  },
  {
    id: 4,
    category: 'facades',
    imageKeys: ['project4_1', 'project4_2'],
    location: { lat: 52.1601, lng: 4.4970 }, // Leiden
    mapZoom: 15,
  },
  {
    id: 5,
    category: 'doors',
    imageKeys: ['project5_1', 'project5_2', 'project5_3'],
    location: { lat: 51.4416, lng: 5.4697 }, // Eindhoven
    mapZoom: 13,
  },
];