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
        className="w-full p-2 text-sm sm:text-base border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Score de Glasgow</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <ScoreSelector
          options={eyeOptions}
          value={eyeScore}
          onChange={setEyeScore}
          label="Réponse oculaire (Y)"
        />
        
        <ScoreSelector
          options={verbalOptions}
          value={verbalScore}
          onChange={setVerbalScore}
          label="Réponse verbale (V)"
        />
        
        <ScoreSelector
          options={motorOptions}
          value={motorScore}
          onChange={setMotorScore}
          label="Réponse motrice (M)"
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <div className="text-lg sm:text-xl font-semibold mb-2">
          Score total : {totalScore}/15
        </div>
        <div className="text-base sm:text-lg">
          Interprétation : {getScoreSeverity(totalScore)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
        <h2 className="font-semibold mb-2">Note :</h2>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1">
          <li>Score de 13 à 15 : Traumatisme crânien léger</li>
          <li>Score de 9 à 12 : Traumatisme crânien modéré</li>
          <li>Score de 3 à 8 : Traumatisme crânien sévère</li>
        </ul>
      </div>
    </div>
  );
};

export default GlasgowScore;
