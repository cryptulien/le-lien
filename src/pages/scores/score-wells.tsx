import React, { useState, useEffect } from 'react';

interface CriteriaItem {
  id: string;
  text: string;
  points: number;
}

const WellsScore: React.FC = () => {
  const criteria: CriteriaItem[] = [
    { 
      id: 'dvt_symptoms',
      text: 'Signes cliniques et symptômes de TVP',
      points: 3
    },
    {
      id: 'pe_likely',
      text: 'EP est le diagnostic le plus probable',
      points: 3
    },
    {
      id: 'tachycardia',
      text: 'Fréquence cardiaque > 100/min',
      points: 1.5
    },
    {
      id: 'immobilization',
      text: 'Immobilisation ou chirurgie dans les 4 semaines précédentes',
      points: 1.5
    },
    {
      id: 'dvt_history',
      text: 'Antécédent de TVP ou EP',
      points: 1.5
    },
    {
      id: 'hemoptysis',
      text: 'Hémoptysie',
      points: 1
    },
    {
      id: 'malignancy',
      text: 'Cancer actif ou en rémission < 6 mois',
      points: 1
    }
  ];

  const [selectedCriteria, setSelectedCriteria] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const score = Array.from(selectedCriteria).reduce((total, criteriaId) => {
      const criterion = criteria.find(c => c.id === criteriaId);
      return total + (criterion?.points || 0);
    }, 0);
    setTotalScore(score);
  }, [selectedCriteria]);

  const toggleCriterion = (criterionId: string) => {
    const newSelected = new Set(selectedCriteria);
    if (newSelected.has(criterionId)) {
      newSelected.delete(criterionId);
    } else {
      newSelected.add(criterionId);
    }
    setSelectedCriteria(newSelected);
  };

  const getRisk = (score: number): string => {
    if (score <= 2) return "Faible (EP peu probable)";
    if (score <= 6) return "Intermédiaire";
    return "Élevé (EP probable)";
  };

  const getRecommendation = (score: number): string => {
    if (score <= 2) {
      return "Dosage des D-dimères recommandé";
    }
    return "Angioscanner thoracique à envisager d'emblée";
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Score de Wells (TVP/EP)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {criterion.text}
              </h2>
              <div className="space-y-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedCriteria.has(criterion.id)}
                    onChange={() => toggleCriterion(criterion.id)}
                    className="form-checkbox text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>
                    {criterion.text}
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      ({criterion.points} points)
                    </span>
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Résultat</h2>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Score Total : {totalScore.toFixed(1)}
          </div>
          <div className="mt-2 text-lg text-blue-800 dark:text-blue-200">
            Probabilité clinique : {getRisk(totalScore)}
          </div>
          <div className="mt-2 text-lg text-blue-800 dark:text-blue-200">
            Recommandation : {getRecommendation(totalScore)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellsScore;
