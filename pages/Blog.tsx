
import React from 'react';
import { Link } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { blogPostsData } from '../data/blogData';
import { getImageUrl } from '../constants';
import { CalendarIcon } from '../components/icons';

const Blog: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">{t.blog_page_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.blog_page_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => {
            const title = t[`blog_${post.id}_title` as keyof typeof t] || 'Blog Post Title';
            const summary = t[`blog_${post.id}_summary` as keyof typeof t] || 'Summary not available.';

            return (
              <div key={post.id} className="relative group overflow-hidden bg-white rounded-lg shadow-lg flex flex-col transition-shadow duration-300 hover:shadow-2xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56">
                    <img src={getImageUrl(post.imageKey, 800, 500)} alt={title} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString(t.nav_home === 'Home' ? 'en-GB' : 'nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:text-brand-gold transition-colors">{title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow">{summary}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-block text-brand-gold font-semibold hover:underline"
                    >
                      {t.blog_read_more} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
