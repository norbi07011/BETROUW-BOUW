import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import useTranslations from '../hooks/useTranslations';
import ImageCarousel from '../components/ImageCarousel';
import { getImageUrl } from '../constants';
import { CalendarIcon, ClockIcon, WrenchScrewdriverIcon, ChevronLeftIcon } from '../components/icons';

// Informs TypeScript about the global 'L' variable from the Leaflet CDN library
declare const L: any;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const project = projectsData.find(p => p.id.toString() === id);

  useEffect(() => {
    if (!project || !mapContainerRef.current) return;

    // Initialize the map only once and avoid re-creation
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [project.location.lat, project.location.lng],
        project.mapZoom
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }
    
    // Always set view and marker in case the component is reused
    mapRef.current.setView([project.location.lat, project.location.lng], project.mapZoom);
    
    // Clear previous markers before adding a new one
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });
    L.marker([project.location.lat, project.location.lng]).addTo(mapRef.current);
    
    // Cleanup function to remove map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [project]);

  if (!project) {
    // Redirect to projects list if project is not found
    return <Navigate to="/projects" replace />;
  }

  // Helper function to safely get translation keys
  const getTranslation = (key: string) => t[key as keyof typeof t] || '';

  const title = getTranslation(`project_${project.id}_title`);
  const description = getTranslation(`project_${project.id}_desc`);
  const year = getTranslation(`project_${project.id}_year`);
  const duration = getTranslation(`project_${project.id}_duration`);
  const materials = getTranslation(`project_${project.id}_materials`);
  const clientGoal = getTranslation(`project_${project.id}_client_goal`);
  const ourSolution = getTranslation(`project_${project.id}_our_solution`);
  const carouselDescriptions = project.imageKeys.map((_, index) => 
    getTranslation(`project_${project.id}_img_${index + 1}_desc`)
  );

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${getImageUrl(project.imageKeys[0], 1920, 1080)})` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h1>
          <p className="mt-2 text-lg text-gray-200 max-w-3xl">{description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-brand-gold font-semibold hover:underline mb-8">
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            <span>{t.nav_projects}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-4">{t.project_client_goal_title}</h2>
                <p className="text-gray-700 leading-relaxed">{clientGoal}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4">{t.project_our_solution_title}</h2>
                <p className="text-gray-700 leading-relaxed">{ourSolution}</p>
              </div>
            </div>

            {/* Sidebar with details */}
            <div className="lg:col-span-1">
              <div className="bg-brand-light p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">{t.project_details_title}</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-3 text-brand-gold" />
                    <strong>{t.project_detail_year}:</strong><span className="ml-2 rtl:mr-2 rtl:ml-0">{year}</span>
                  </li>
                  <li className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-3 text-brand-gold" />
                    <strong>{t.project_detail_duration}:</strong><span className="ml-2 rtl:mr-2 rtl:ml-0">{duration}</span>
                  </li>
                  <li className="flex items-center">
                    <WrenchScrewdriverIcon className="h-5 w-5 mr-3 text-brand-gold" />
                    <strong>{t.project_detail_materials}:</strong><span className="ml-2 rtl:mr-2 rtl:ml-0">{materials}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">{t.project_gallery_title}</h2>
            <ImageCarousel imageKeys={project.imageKeys} descriptions={carouselDescriptions} />
          </div>
          
          {/* Map Section */}
          <div className="mt-20">
              <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">{t.project_location_title}</h2>
              <div ref={mapContainerRef} className="h-96 w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
