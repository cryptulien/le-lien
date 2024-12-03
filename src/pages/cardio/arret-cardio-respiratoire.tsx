import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArretCardioRespiratoire = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/cardio"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Arrêt cardio-respiratoire adulte
        </h1>
      </div>

      <div className="space-y-6">
        {/* En-tête Rouge */}
        <div className="bg-red-600 text-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">ARRÊT CARDIO-RESPIRATOIRE DE L'ADULTE</h2>
            <span className="bg-yellow-300 text-black px-3 py-1 rounded font-medium text-sm">
              Mise à jour le 01/10/23
            </span>
          </div>
        </div>

        {/* Mise en condition */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
          <h2 className="text-center font-bold mb-4">MISE EN CONDITION</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>DÉFIBRILLATEUR + PATCH SMUR (si DEA en cours d'analyse, le laisser finir et choquer au besoin)</li>
            <li>RCP 30/2, pendant le technique du malade, relais MCE toutes les 2 min</li>
            <li>IOT sans arrêter le MCE puis MCE 100-120/min continu, EtCO₂</li>
            <li>ABORD : VVP en 1<sup>er</sup>, si échec/difficile IO</li>
          </ol>
        </div>

        {/* Diagramme central */}
        <div className="space-y-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 p-4 rounded-lg text-center">
            <p className="font-bold">ANALYSE DE RYTHME<br />TOUTES LES 2 MINUTES</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Choc indiqué */}
            <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 p-4 rounded-lg">
              <h3 className="font-bold text-center mb-2">CHOC INDIQUÉ</h3>
              <p className="text-center mb-2">FV/TV sans-pouls</p>
              <ul className="list-disc list-inside space-y-2">
                <li>1 CEE : 150-200J<br />Reprendre la RCP immédiatement après Pour 2'</li>
                <li>À partir du 3<sup>ème</sup> CEE : ADRENALINE ttes les 4'</li>
                <li>Au 3<sup>ème</sup> & 5<sup>ème</sup> CEE : CORDARONE</li>
              </ul>
            </div>

            {/* RACS */}
            <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 p-4 rounded-lg">
              <h3 className="font-bold text-center">RACS</h3>
              <p className="text-center">Reprise d'une Activité Cardiaque Spontanée</p>
            </div>

            {/* Choc non indiqué */}
            <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 p-4 rounded-lg">
              <h3 className="font-bold text-center mb-2">CHOC NON INDIQUÉ</h3>
              <p className="text-center">Asystolie / AESP</p>
              <p className="text-center font-bold mt-2">ADRENALINE ttes les 4'</p>
            </div>
          </div>
        </div>

        {/* Recherche des causes réversibles */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
          <h2 className="text-center font-bold mb-4">
            EN PARALLÈLE RECHERCHE ET TRAITEMENT D'UNE CAUSE RÉVERSIBLE « 4H/4T »
          </h2>
          <p className="text-center font-bold mb-4">
            Aucune action systématique : Au cas par cas
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>HYPOXIE : IOT, FiO₂ 100%</li>
            <li>HYPOTHERMIE : Réchauffage</li>
            <li>PNEUMOTHORAX : Exsufflation</li>
            <li>TAMOPNADE : Cf. Fast Écho étendue</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArretCardioRespiratoire;