
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { projectsData } from '../data/projectsData';
import { getImageUrl } from '../constants';
import type { ProjectCategory } from '../types';

const Projects: React.FC = () => {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const categories: { key: ProjectCategory | 'all', label: string }[] = [
    { key: 'all', label: t.projects_filter_all },
    { key: 'windows', label: t.projects_filter_windows },
    { key: 'doors', label: t.projects_filter_doors },
    { key: 'facades', label: t.projects_filter_facades },
    { key: 'modernization', label: t.projects_filter_modernization },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">{t.projects_page_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.projects_page_subtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === cat.key
                  ? 'bg-brand-gold text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => {
            const title = t[`project_${project.id}_title` as keyof typeof t] || `Project ${project.id}`;
            const categoryLabel = t[`projects_filter_${project.category}` as keyof typeof t];

            return (
              <Link to={`/projects/${project.id}`} key={project.id} className="relative block group bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                <div className="relative h-64">
                  <img
                    src={getImageUrl(project.imageKeys[0], 600, 400)}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full">{categoryLabel}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-gold transition-colors">{title}</h3>
                  <p className="text-gray-500 text-sm">{t.project_details_title} &rarr;</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
