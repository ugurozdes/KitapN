import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageNavProps {
  crumbs: Crumb[];
  /** If omitted, falls back to history.back() → '/' */
  backHref?: string;
}

export default function PageNav({ crumbs, backHref }: PageNavProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backHref) {
      navigate(backHref);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
      {/* ← Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group w-fit"
      >
        <span className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-x-0.5 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </span>
        <span className="group-hover:-translate-x-0.5 transition-transform">Geri</span>
      </button>

      {/* Divider */}
      <span className="hidden sm:block text-slate-200 dark:text-slate-700 font-black text-lg select-none px-1">·</span>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Ana Sayfa</span>
        </button>

        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
            {crumb.href && i < crumbs.length - 1 ? (
              <button
                onClick={() => navigate(crumb.href!)}
                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-xs font-black text-slate-900 dark:text-white">
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
