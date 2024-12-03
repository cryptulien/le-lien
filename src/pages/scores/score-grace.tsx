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

  const NumberInput: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
  }> = ({ label, value, onChange, min = 0, max = 999, step = 1 }) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value === 0 ? '' : value}
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, '');
          const numValue = newValue === '' ? 0 : parseInt(newValue, 10);
          if (numValue >= min && numValue <= max) {
            onChange(numValue);
          }
        }}
        className="w-full p-2 text-sm sm:text-base border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const Checkbox: React.FC<{
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ label, checked, onChange }) => (
    <div className="mb-3 sm:mb-4">
      <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        {label}
      </label>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Score GRACE</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <NumberInput
          label="Âge"
          value={age}
          onChange={setAge}
          min={0}
          max={120}
        />
        
        <NumberInput
          label="Fréquence cardiaque (bpm)"
          value={heartRate}
          onChange={setHeartRate}
          min={0}
          max={300}
        />

        <NumberInput
          label="Pression artérielle systolique (mmHg)"
          value={systolicBP}
          onChange={setSystolicBP}
          min={0}
          max={300}
        />

        <NumberInput
          label="Créatinine (mg/dL)"
          value={creatinine}
          onChange={setCreatinine}
          min={0}
          max={10}
          step={0.1}
        />

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Classe Killip
          </label>
          <select
            value={killipClass}
            onChange={(e) => setKillipClass(Number(e.target.value))}
            className="w-full p-2 text-sm sm:text-base border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>Classe I - Pas d'insuffisance cardiaque</option>
            <option value={2}>Classe II - Râles crépitants, B3, HTAP</option>
            <option value={3}>Classe III - Œdème pulmonaire franc</option>
            <option value={4}>Classe IV - Choc cardiogénique</option>
          </select>
        </div>

        <Checkbox
          label="Arrêt cardiaque à l'admission"
          checked={cardiacArrest}
          onChange={setCardiacArrest}
        />

        <Checkbox
          label="Déviation du segment ST"
          checked={stSegmentDeviation}
          onChange={setStSegmentDeviation}
        />

        <Checkbox
          label="Élévation des marqueurs cardiaques"
          checked={cardiacMarkers}
          onChange={setCardiacMarkers}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <div className="text-lg sm:text-xl font-semibold mb-2">
          Score GRACE : {totalScore}
        </div>
        <div className="text-base sm:text-lg">
          Risque : {getRisk(totalScore)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
        <h2 className="font-semibold mb-2">Interprétation :</h2>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1">
        <li>Score &le; 108 : Risque faible (mortalité hospitalière &lt;1%)</li>
        <li>Score 109-140 : Risque intermédiaire (mortalité hospitalière 1-3%)</li>
        <li>Score &gt; 140 : Risque élevé (mortalité hospitalière &gt;3%)</li>
        </ul>
      </div>
    </div>
  );
};

export default GraceScore;
