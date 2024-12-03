import { ReactNode } from 'react';

interface StaticPageLayoutProps {
  children: ReactNode;
}

const StaticPageLayout = ({ children }: StaticPageLayoutProps) => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8">
        {children}
      </div>
    </main>
  );
};

export default StaticPageLayout;
