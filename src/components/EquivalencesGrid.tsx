import React from 'react';
import { Scale, Baby, Pill, Calculator, Beaker } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const equivalences = [
  {
    id: 'pediatric-doses',
    name: 'Doses pédiatriques',
    icon: Baby,
    color: 'text-green-500',
    description: 'Calcul des doses selon le poids',
  },
  {
    id: 'drug-equivalences',
    name: 'Équivalences médicamenteuses',
    icon: Pill,
    color: 'text-blue-500',
    description: 'Conversions entre molécules similaires',
  },
  {
    id: 'dilutions',
    name: 'Dilutions',
    icon: Beaker,
    color: 'text-purple-500',
    description: 'Calcul des dilutions et concentrations',
  },
  {
    id: 'unit-converter',
    name: 'Convertisseur d\'unités',
    icon: Calculator,
    color: 'text-orange-500',
    description: 'Conversion entre différentes unités',
  },
  {
    id: 'weight-based',
    name: 'Doses selon le poids',
    icon: Scale,
    color: 'text-red-500',
    description: 'Calcul des posologies selon le poids',
  },
];

const EquivalencesGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {equivalences.map((equiv) => (
        <div
          key={equiv.id}
          onClick={() => navigate(`/equivalences/${equiv.id}`)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
        >
          <equiv.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${equiv.color} mb-2 sm:mb-3`} />
          <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-1">
            {equiv.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {equiv.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EquivalencesGrid;