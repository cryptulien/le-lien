import React from 'react';
import { Calculator, Heart, Brain, Droplets, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const scores = [
  {
    id: 'score-glasgow',
    name: 'Score de Glasgow',
    icon: Brain,
    color: 'text-purple-500',
  },
  {
    id: 'score-grace',
    name: 'Score GRACE',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    id: 'score-wells',
    name: 'Score de Wells',
    icon: Droplets,
    color: 'text-blue-500',
  },
  {
    id: 'score-sofa',
    name: 'Score SOFA',
    icon: Calculator,
    color: 'text-green-500',
  },
  {
    id: 'score-fine',
    name: 'Score FINE',
    icon: Thermometer,
    color: 'text-orange-500',
  },
];

const ScoresGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {scores.map((score) => (
        <div
          key={score.id}
          onClick={() => navigate(`/scores/${score.id}`)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
        >
          <score.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${score.color} mb-2 sm:mb-3`} />
          <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
            {score.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ScoresGrid;