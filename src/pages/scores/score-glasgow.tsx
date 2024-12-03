import React, { useState } from 'react';

interface ScoreOption {
  value: number;
  label: string;
}

const GlasgowScore: React.FC = () => {
  const [eyeScore, setEyeScore] = useState<number>(4);
  const [verbalScore, setVerbalScore] = useState<number>(5);
  const [motorScore, setMotorScore] = useState<number>(6);

  const eyeOptions: ScoreOption[] = [
    { value: 4, label: "Ouverture spontanée" },
    { value: 3, label: "Ouverture à la demande" },
    { value: 2, label: "Ouverture à la douleur" },
    { value: 1, label: "Aucune ouverture" }
  ];

  const verbalOptions: ScoreOption[] = [
    { value: 5, label: "Orienté" },
    { value: 4, label: "Confus" },
    { value: 3, label: "Mots inappropriés" },
    { value: 2, label: "Sons incompréhensibles" },
    { value: 1, label: "Aucune réponse verbale" }
  ];

  const motorOptions: ScoreOption[] = [
    { value: 6, label: "Obéit aux ordres" },
    { value: 5, label: "Localise la douleur" },
    { value: 4, label: "Évitement non adapté" },
    { value: 3, label: "Flexion à la douleur" },
    { value: 2, label: "Extension à la douleur" },
    { value: 1, label: "Aucune réponse motrice" }
  ];

  const totalScore = eyeScore + verbalScore + motorScore;

  const getScoreSeverity = (score: number): string => {
    if (score >= 13) return "Traumatisme crânien léger";
    if (score >= 9) return "Traumatisme crânien modéré";
    return "Traumatisme crânien sévère";
  };

  const ScoreSelector: React.FC<{
    options: ScoreOption[];
    value: number;
    onChange: (value: number) => void;
    label: string;
  }> = ({ options, value, onChange, label }) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 text-sm sm:text-base border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.value})
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Score de Glasgow</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Réponse oculaire (Y)
            </h2>
            {eyeOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="eye"
                    value={option.value}
                    checked={eyeScore === option.value}
                    onChange={() => setEyeScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Réponse verbale (V)
            </h2>
            {verbalOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="verbal"
                    value={option.value}
                    checked={verbalScore === option.value}
                    onChange={() => setVerbalScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Réponse motrice (M)
            </h2>
            {motorOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="motor"
                    value={option.value}
                    checked={motorScore === option.value}
                    onChange={() => setMotorScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Résultat</h2>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Score Total : {totalScore}
          </div>
          <div className="mt-2 text-lg text-blue-800 dark:text-blue-200">
            Interprétation : {getScoreSeverity(totalScore)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlasgowScore;
