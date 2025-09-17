
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { blogPostsData } from '../data/blogData';
import { getImageUrl } from '../constants';
import { CalendarIcon } from '../components/icons';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations();

  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" />;
  }

  const title = t[`blog_${post.id}_title` as keyof typeof t] || 'Titel niet gevonden';
  const content = t[`blog_${post.id}_content` as keyof typeof t] || 'Inhoud niet beschikbaar.';

  const renderContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl lg:text-3xl font-bold mt-8 mb-4 text-brand-dark">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.trim() === '') {
        return null;
      }
      return <p key={index} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>;
    });
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4">{title}</h1>
            <div className="flex items-center text-md text-gray-500">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date(post.date).toLocaleDateString(t.nav_home === 'Home' ? 'en-GB' : 'nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          <div className="w-full h-64 md:h-96 rounded-lg shadow-2xl overflow-hidden mb-12">
            <img src={getImageUrl(post.imageKey, 1200, 600)} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            {renderContent(content)}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
