import React, { useState, useEffect } from 'react';

interface ScoreOption {
  value: number;
  label: string;
}

const SofaScore: React.FC = () => {
  const [respiratoryScore, setRespiratoryScore] = useState<number>(0);
  const [coagulationScore, setCoagulationScore] = useState<number>(0);
  const [liverScore, setLiverScore] = useState<number>(0);
  const [cardiovascularScore, setCardiovascularScore] = useState<number>(0);
  const [cnsScore, setCnsScore] = useState<number>(0);
  const [renalScore, setRenalScore] = useState<number>(0);

  const [totalScore, setTotalScore] = useState<number>(0);

  const respiratoryOptions: ScoreOption[] = [
    { value: 0, label: "PaO2/FiO2 ≥ 400" },
    { value: 1, label: "PaO2/FiO2 &lt; 400" },
    { value: 2, label: "PaO2/FiO2 &lt; 300" },
    { value: 3, label: "PaO2/FiO2 &lt; 200 avec support ventilatoire" },
    { value: 4, label: "PaO2/FiO2 &lt; 100 avec support ventilatoire" }
  ];

  const coagulationOptions: ScoreOption[] = [
    { value: 0, label: "Plaquettes ≥ 150" },
    { value: 1, label: "Plaquettes &lt; 150" },
    { value: 2, label: "Plaquettes &lt; 100" },
    { value: 3, label: "Plaquettes &lt; 50" },
    { value: 4, label: "Plaquettes &lt; 20" }
  ];

  const liverOptions: ScoreOption[] = [
    { value: 0, label: "Bilirubine &lt; 20" },
    { value: 1, label: "Bilirubine 20-32" },
    { value: 2, label: "Bilirubine 33-101" },
    { value: 3, label: "Bilirubine 102-204" },
    { value: 4, label: "Bilirubine &gt; 204" }
  ];

  const cardiovascularOptions: ScoreOption[] = [
    { value: 0, label: "PAM ≥ 70 mmHg" },
    { value: 1, label: "PAM &lt; 70 mmHg" },
    { value: 2, label: "Dopamine ≤ 5 ou Dobutamine" },
    { value: 3, label: "Dopamine &gt; 5 ou Adrénaline ≤ 0.1" },
    { value: 4, label: "Dopamine &gt; 15 ou Adrénaline &gt; 0.1" }
  ];

  const cnsOptions: ScoreOption[] = [
    { value: 0, label: "Score de Glasgow 15" },
    { value: 1, label: "Score de Glasgow 13-14" },
    { value: 2, label: "Score de Glasgow 10-12" },
    { value: 3, label: "Score de Glasgow 6-9" },
    { value: 4, label: "Score de Glasgow &lt; 6" }
  ];

  const renalOptions: ScoreOption[] = [
    { value: 0, label: "Créatinine &lt; 110" },
    { value: 1, label: "Créatinine 110-170" },
    { value: 2, label: "Créatinine 171-299" },
    { value: 3, label: "Créatinine 300-440 ou diurèse &lt; 500" },
    { value: 4, label: "Créatinine &gt; 440 ou diurèse &lt; 200" }
  ];

  useEffect(() => {
    const score = 
      respiratoryScore +
      coagulationScore +
      liverScore +
      cardiovascularScore +
      cnsScore +
      renalScore;
    setTotalScore(score);
  }, [respiratoryScore, coagulationScore, liverScore, cardiovascularScore, cnsScore, renalScore]);

  const getMortality = (score: number): string => {
    if (score <= 6) return "< 10%";
    if (score <= 9) return "15-20%";
    if (score <= 12) return "40-50%";
    if (score <= 14) return "50-60%";
    return "> 80%";
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
            {option.label} ({option.value} points)
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Score SOFA</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <ScoreSelector
          options={respiratoryOptions}
          value={respiratoryScore}
          onChange={setRespiratoryScore}
          label="Respiration (PaO2/FiO2)"
        />
        
        <ScoreSelector
          options={coagulationOptions}
          value={coagulationScore}
          onChange={setCoagulationScore}
          label="Coagulation (Plaquettes x10³/µL)"
        />

        <ScoreSelector
          options={liverOptions}
          value={liverScore}
          onChange={setLiverScore}
          label="Foie (Bilirubine µmol/L)"
        />

        <ScoreSelector
          options={cardiovascularOptions}
          value={cardiovascularScore}
          onChange={setCardiovascularScore}
          label="Cardiovasculaire"
        />

        <ScoreSelector
          options={cnsOptions}
          value={cnsScore}
          onChange={setCnsScore}
          label="Système nerveux central"
        />

        <ScoreSelector
          options={renalOptions}
          value={renalScore}
          onChange={setRenalScore}
          label="Rénal (Créatinine µmol/L ou diurèse)"
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <div className="text-lg sm:text-xl font-semibold mb-2">
          Score SOFA : {totalScore}/24
        </div>
        <div className="text-base sm:text-lg">
          Mortalité estimée : {getMortality(totalScore)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
        <h2 className="font-semibold mb-2">Interprétation :</h2>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1">
          <li>Score 0-6 : Mortalité &lt; 10%</li>
          <li>Score 7-9 : Mortalité 15-20%</li>
          <li>Score 10-12 : Mortalité 40-50%</li>
          <li>Score 13-14 : Mortalité 50-60%</li>
          <li>Score 15-24 : Mortalité &gt; 80%</li>
        </ul>
        <p className="mt-2">
          Note : Le score SOFA évalue la défaillance d'organes multiples et aide à 
          prédire la mortalité en soins intensifs.
        </p>
      </div>
    </div>
  );
};

export default SofaScore;
