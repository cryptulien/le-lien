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
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Score de Wells (Embolie Pulmonaire)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="mb-3 sm:mb-4">
            <label className="flex items-start text-xs sm:text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectedCriteria.has(criterion.id)}
                onChange={() => toggleCriterion(criterion.id)}
                className="mt-1 mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="flex-1">
                {criterion.text}
                <span className="ml-1 text-gray-500">
                  ({criterion.points} {criterion.points === 1 ? 'point' : 'points'})
                </span>
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <div className="text-lg sm:text-xl font-semibold mb-2">
          Score total : {totalScore.toFixed(1)}
        </div>
        <div className="text-base sm:text-lg">
          Probabilité clinique : {getRisk(totalScore)}
        </div>
        <div className="mt-2 text-sm sm:text-base text-gray-700">
          Recommandation : {getRecommendation(totalScore)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
        <h2 className="font-semibold mb-2">Interprétation :</h2>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1">
          <li>Score ≤ 2 : Probabilité faible</li>
          <li>Score 2-6 : Probabilité intermédiaire</li>
          <li>Score &gt; 6 : Probabilité forte</li>
        </ul>
        <p className="mt-2">
          Note : Ce score aide à évaluer la probabilité clinique d'embolie pulmonaire 
          et guide la stratégie diagnostique.
        </p>
      </div>
    </div>
  );
};

export default WellsScore;
