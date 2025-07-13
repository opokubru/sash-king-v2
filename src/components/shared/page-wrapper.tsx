'use client';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper = ({ title, children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-[rgba(197,195,195,0.165)] text-black px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          {title}
        </h1>
        <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
