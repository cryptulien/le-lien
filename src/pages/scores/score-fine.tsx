import React, { useState, useEffect } from 'react';

interface CriteriaItem {
  id: string;
  text: string;
  points: number | ((value: number) => number);
  type: 'checkbox' | 'number';
  unit?: string;
}

const FineScore: React.FC = () => {
  const [age, setAge] = useState<number>(0);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [selectedCriteria, setSelectedCriteria] = useState<Set<string>>(new Set());
  const [numberValues, setNumberValues] = useState<Record<string, number>>({
    'systolic_bp': 120,
    'heart_rate': 80,
    'respiratory_rate': 16,
    'temperature': 37,
    'ph': 7.4,
    'bun': 20,
    'sodium': 140,
    'glucose': 100,
    'hematocrit': 40,
    'pao2': 90
  });

  const [totalScore, setTotalScore] = useState<number>(0);

  const criteria: CriteriaItem[] = [
    {
      id: 'nursing_home',
      text: 'Vie en institution',
      points: 10,
      type: 'checkbox'
    },
    {
      id: 'neoplasia',
      text: 'Maladie néoplasique',
      points: 30,
      type: 'checkbox'
    },
    {
      id: 'liver_disease',
      text: 'Maladie hépatique',
      points: 20,
      type: 'checkbox'
    },
    {
      id: 'chf',
      text: 'Insuffisance cardiaque congestive',
      points: 10,
      type: 'checkbox'
    },
    {
      id: 'cerebrovascular',
      text: 'Maladie cérébrovasculaire',
      points: 10,
      type: 'checkbox'
    },
    {
      id: 'kidney_disease',
      text: 'Maladie rénale',
      points: 10,
      type: 'checkbox'
    },
    {
      id: 'mental_status',
      text: "Altération de l'état mental",
      points: 20,
      type: 'checkbox'
    },
    {
      id: 'systolic_bp',
      text: 'Pression artérielle systolique',
      points: (value: number) => value < 90 ? 20 : 0,
      type: 'number',
      unit: 'mmHg'
    },
    {
      id: 'heart_rate',
      text: 'Fréquence cardiaque',
      points: (value: number) => value >= 125 ? 10 : 0,
      type: 'number',
      unit: 'bpm'
    },
    {
      id: 'respiratory_rate',
      text: 'Fréquence respiratoire',
      points: (value: number) => value >= 30 ? 20 : 0,
      type: 'number',
      unit: '/min'
    },
    {
      id: 'temperature',
      text: 'Température',
      points: (value: number) => (value < 35 || value > 40) ? 15 : 0,
      type: 'number',
      unit: '°C'
    },
    {
      id: 'ph',
      text: 'pH artériel',
      points: (value: number) => value < 7.35 ? 30 : 0,
      type: 'number',
      unit: ''
    },
    {
      id: 'bun',
      text: 'Urée',
      points: (value: number) => value >= 11 ? 20 : 0,
      type: 'number',
      unit: 'mmol/L'
    },
    {
      id: 'sodium',
      text: 'Sodium',
      points: (value: number) => value < 130 ? 20 : 0,
      type: 'number',
      unit: 'mmol/L'
    },
    {
      id: 'glucose',
      text: 'Glucose',
      points: (value: number) => value >= 14 ? 10 : 0,
      type: 'number',
      unit: 'mmol/L'
    },
    {
      id: 'hematocrit',
      text: 'Hématocrite',
      points: (value: number) => value < 30 ? 10 : 0,
      type: 'number',
      unit: '%'
    },
    {
      id: 'pao2',
      text: 'PaO2',
      points: (value: number) => value < 60 ? 10 : 0,
      type: 'number',
      unit: 'mmHg'
    }
  ];

  useEffect(() => {
    let score = isMale ? age : age - 10;

    // Add points for checkboxes
    selectedCriteria.forEach(criteriaId => {
      const criterion = criteria.find(c => c.id === criteriaId);
      if (criterion && typeof criterion.points === 'number') {
        score += criterion.points;
      }
    });

    // Add points for number values
    Object.entries(numberValues).forEach(([id, value]) => {
      const criterion = criteria.find(c => c.id === id);
      if (criterion && typeof criterion.points === 'function') {
        score += criterion.points(value);
      }
    });

    setTotalScore(score);
  }, [age, isMale, selectedCriteria, numberValues]);

  const getClass = (score: number): string => {
    if (score <= 50) return "I";
    if (score <= 70) return "II";
    if (score <= 90) return "III";
    if (score <= 130) return "IV";
    return "V";
  };

  const getMortality = (score: number): string => {
    if (score <= 50) return "0.1%";
    if (score <= 70) return "0.6%";
    if (score <= 90) return "2.8%";
    if (score <= 130) return "8.2%";
    return "29.2%";
  };

  const toggleCriterion = (criterionId: string) => {
    const newSelected = new Set(selectedCriteria);
    if (newSelected.has(criterionId)) {
      newSelected.delete(criterionId);
    } else {
      newSelected.add(criterionId);
    }
    setSelectedCriteria(newSelected);
  };

  const handleNumberChange = (id: string, value: number) => {
    setNumberValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Score FINE</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Informations Démographiques</h2>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Âge</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Sexe</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    checked={isMale}
                    onChange={() => setIsMale(true)}
                    className="form-radio text-blue-600 dark:text-blue-500"
                  />
                  <span className="ml-2">Homme</span>
                </label>
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    checked={!isMale}
                    onChange={() => setIsMale(false)}
                    className="form-radio text-blue-600 dark:text-blue-500"
                  />
                  <span className="ml-2">Femme</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Critères</h2>
            {criteria.filter(c => c.type === 'checkbox').map((criterion) => (
              <div key={criterion.id} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedCriteria.has(criterion.id)}
                    onChange={() => toggleCriterion(criterion.id)}
                    className="form-checkbox text-blue-600 dark:text-blue-500"
                  />
                  <span className="ml-2">{criterion.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Valeurs Numériques</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(numberValues).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">{key}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleNumberChange(key, Number(e.target.value))}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Résultat</h2>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">Score Total : {totalScore}</p>
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100">Classe : {getClass(totalScore)}</p>
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100">Mortalité à 30 jours : {getMortality(totalScore)}</p>
        </div>
      </div>
    </div>
  );
};

export default FineScore;
