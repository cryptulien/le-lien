import React from 'react';
import { categories } from '../data/categories';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={() => onClick(category)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
    >
      <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${category.color} mb-2 sm:mb-3`} />
      <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
        {category.name}
      </h3>
    </div>
  );
};

interface CategoryGridProps {
  onCategoryClick: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;