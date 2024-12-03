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
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Score FINE (PSI)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        {/* Données démographiques */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Données démographiques</h2>
          
          <div className="mb-3">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Âge
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 text-sm sm:text-base border rounded-md"
              min="0"
              max="120"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Sexe
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isMale}
                  onChange={() => setIsMale(true)}
                  className="mr-2"
                />
                Homme
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isMale}
                  onChange={() => setIsMale(false)}
                  className="mr-2"
                />
                Femme
              </label>
            </div>
          </div>
        </div>

        {/* Comorbidités */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Comorbidités</h2>
          {criteria.filter(c => c.type === 'checkbox').map((criterion) => (
            <div key={criterion.id} className="mb-2">
              <label className="flex items-start text-xs sm:text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedCriteria.has(criterion.id)}
                  onChange={() => toggleCriterion(criterion.id)}
                  className="mt-1 mr-2 h-4 w-4 text-blue-600"
                />
                <span className="flex-1">
                  {criterion.text}
                  <span className="ml-1 text-gray-500">
                    ({typeof criterion.points === 'number' ? criterion.points : '?'} points)
                  </span>
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Paramètres cliniques et biologiques */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Paramètres cliniques et biologiques</h2>
          {criteria.filter(c => c.type === 'number').map((criterion) => (
            <div key={criterion.id} className="mb-3">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                {criterion.text} {criterion.unit && `(${criterion.unit})`}
              </label>
              <input
                type="number"
                value={numberValues[criterion.id]}
                onChange={(e) => handleNumberChange(criterion.id, Number(e.target.value))}
                className="w-full p-2 text-sm sm:text-base border rounded-md"
                step="0.1"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <div className="text-lg sm:text-xl font-semibold mb-2">
          Score total : {totalScore}
        </div>
        <div className="text-base sm:text-lg">
          Classe : {getClass(totalScore)}
        </div>
        <div className="text-base sm:text-lg">
          Mortalité à 30 jours : {getMortality(totalScore)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
        <h2 className="font-semibold mb-2">Interprétation :</h2>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1">
          <li>Classe I (≤ 50 points) : Mortalité 0.1% - Traitement ambulatoire</li>
          <li>Classe II (51-70 points) : Mortalité 0.6% - Traitement ambulatoire</li>
          <li>Classe III (71-90 points) : Mortalité 2.8% - Hospitalisation courte</li>
          <li>Classe IV (91-130 points) : Mortalité 8.2% - Hospitalisation</li>
          <li>Classe V (&gt; 130 points) : Mortalité 29.2% - Hospitalisation</li>
        </ul>
      </div>
    </div>
  );
};

export default FineScore;
