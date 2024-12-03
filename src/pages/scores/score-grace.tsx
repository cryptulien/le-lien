import React, { useState, useEffect } from 'react';

interface ScoreOption {
  value: number;
  label: string;
  min?: number;
  max?: number;
}

const GraceScore: React.FC = () => {
  const [age, setAge] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [systolicBP, setSystolicBP] = useState<number>(0);
  const [creatinine, setCreatinine] = useState<number>(0);
  const [killipClass, setKillipClass] = useState<number>(1);
  const [cardiacArrest, setCardiacArrest] = useState<boolean>(false);
  const [stSegmentDeviation, setStSegmentDeviation] = useState<boolean>(false);
  const [cardiacMarkers, setCardiacMarkers] = useState<boolean>(false);

  const [totalScore, setTotalScore] = useState<number>(0);

  const ageScoring = (age: number): number => {
    if (age < 30) return 0;
    if (age < 40) return 8;
    if (age < 50) return 25;
    if (age < 60) return 41;
    if (age < 70) return 58;
    if (age < 80) return 75;
    return 91;
  };

  const heartRateScoring = (hr: number): number => {
    if (hr < 50) return 0;
    if (hr < 70) return 3;
    if (hr < 90) return 9;
    if (hr < 110) return 15;
    if (hr < 150) return 24;
    if (hr < 200) return 38;
    return 46;
  };

  const systolicBPScoring = (sbp: number): number => {
    if (sbp < 80) return 58;
    if (sbp < 100) return 53;
    if (sbp < 120) return 43;
    if (sbp < 140) return 34;
    if (sbp < 160) return 24;
    if (sbp < 200) return 10;
    return 0;
  };

  const creatinineScoring = (cr: number): number => {
    if (cr < 0.39) return 1;
    if (cr < 0.80) return 3;
    if (cr < 1.20) return 5;
    if (cr < 1.60) return 7;
    if (cr < 2.00) return 9;
    if (cr < 4.00) return 15;
    return 20;
  };

  const killipClassScoring = (kc: number): number => {
    switch(kc) {
      case 1: return 0;
      case 2: return 20;
      case 3: return 39;
      case 4: return 59;
      default: return 0;
    }
  };

  useEffect(() => {
    const score = 
      ageScoring(age) +
      heartRateScoring(heartRate) +
      systolicBPScoring(systolicBP) +
      creatinineScoring(creatinine) +
      killipClassScoring(killipClass) +
      (cardiacArrest ? 39 : 0) +
      (stSegmentDeviation ? 28 : 0) +
      (cardiacMarkers ? 14 : 0);
    
    setTotalScore(score);
  }, [age, heartRate, systolicBP, creatinine, killipClass, cardiacArrest, stSegmentDeviation, cardiacMarkers]);

  const getRisk = (score: number): string => {
    if (score <= 108) return "Risque : Faible (mortalité hospitalière < 1%)";
    if (score <= 140) return "Risque : Intermédiaire (mortalité hospitalière 1-3%)";
    return "Risque : Élevé (mortalité hospitalière > 3%)";
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Score GRACE</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Âge</h2>
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Âge (années)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Signes vitaux</h2>
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Fréquence cardiaque</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Pression artérielle systolique</label>
              <input
                type="number"
                value={systolicBP}
                onChange={(e) => setSystolicBP(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Autres paramètres</h2>
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Créatinine sérique</label>
              <input
                type="number"
                value={creatinine}
                onChange={(e) => setCreatinine(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Classe Killip</label>
              <select
                value={killipClass}
                onChange={(e) => setKillipClass(Number(e.target.value))}
                className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                <option value={1}>Classe I</option>
                <option value={2}>Classe II</option>
                <option value={3}>Classe III</option>
                <option value={4}>Classe IV</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Antécédents</h2>
            <div className="space-y-2">
              {[
                { label: 'Arrêt cardiaque à l\'admission', state: cardiacArrest, setState: setCardiacArrest },
                { label: 'Élévation des marqueurs cardiaques', state: cardiacMarkers, setState: setCardiacMarkers },
                { label: 'Déviation du segment ST', state: stSegmentDeviation, setState: setStSegmentDeviation }
              ].map(({ label, state, setState }) => (
                <label key={label} className="inline-flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={() => setState(!state)}
                    className="form-checkbox text-blue-600 dark:text-blue-500 mr-2"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Interventions</h2>
            <div className="space-y-2">
              {/* Section interventions vide pour le moment */}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Résultat</h2>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Score Total : {totalScore}
          </div>
          <div className="mt-2 text-lg text-blue-800 dark:text-blue-200">
            Risque de mortalité hospitalière : {getRisk(totalScore)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraceScore;
