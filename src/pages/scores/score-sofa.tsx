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
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 text-sm sm:text-base border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Score SOFA</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Respiration (PaO2/FiO2)
            </h2>
            {respiratoryOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="respiratory"
                    value={option.value}
                    checked={respiratoryScore === option.value}
                    onChange={() => setRespiratoryScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Coagulation (Plaquettes x10³/µL)
            </h2>
            {coagulationOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="coagulation"
                    value={option.value}
                    checked={coagulationScore === option.value}
                    onChange={() => setCoagulationScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Foie (Bilirubine µmol/L)
            </h2>
            {liverOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="liver"
                    value={option.value}
                    checked={liverScore === option.value}
                    onChange={() => setLiverScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Cardiovasculaire
            </h2>
            {cardiovascularOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="cardiovascular"
                    value={option.value}
                    checked={cardiovascularScore === option.value}
                    onChange={() => setCardiovascularScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Système nerveux central
            </h2>
            {cnsOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="cns"
                    value={option.value}
                    checked={cnsScore === option.value}
                    onChange={() => setCnsScore(option.value)}
                    className="form-radio text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Rénal (Créatinine µmol/L ou diurèse)
            </h2>
            {renalOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="renal"
                    value={option.value}
                    checked={renalScore === option.value}
                    onChange={() => setRenalScore(option.value)}
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
            Mortalité estimée : {getMortality(totalScore)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SofaScore;
