import React from 'react';

const HelpContent = () => (
  <section className="space-y-6 h-full">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Aide</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-[calc(100vh-12rem)]">
      <iframe 
        className="airtable-embed w-full h-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg"
        src="https://airtable.com/embed/appyRGrdIa4QC7J5x/pagO9fqauxliremxS/form"
        frameBorder="0"
      />
    </div>
  </section>
);

export default HelpContent;