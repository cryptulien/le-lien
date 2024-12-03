import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TroublesConductionPage = () => {
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
          Troubles de la conduction
        </h1>
      </div>
      
      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2>Introduction</h2>
        <p>
          Les troubles de la conduction cardiaque sont des anomalies de la propagation de l'influx électrique dans le cœur.
          Cette fiche détaille les principaux types de troubles de la conduction et leur prise en charge.
        </p>

        <h2>Classification</h2>
        <ul>
          <li>Bloc sino-auriculaire</li>
          <li>Bloc auriculo-ventriculaire
            <ul>
              <li>BAV 1er degré</li>
              <li>BAV 2ème degré
                <ul>
                  <li>Mobitz I (Luciani-Wenckebach)</li>
                  <li>Mobitz II</li>
                </ul>
              </li>
              <li>BAV 3ème degré (complet)</li>
            </ul>
          </li>
          <li>Blocs de branches
            <ul>
              <li>Bloc de branche droit</li>
              <li>Bloc de branche gauche</li>
              <li>Hémiblocs</li>
            </ul>
          </li>
        </ul>

        <h2>Diagnostic ECG</h2>
        <p>
          Le diagnostic repose sur l'analyse systématique de l'ECG 12 dérivations :
        </p>
        <ul>
          <li>Analyse du rythme sinusal</li>
          <li>Mesure de l'espace PR</li>
          <li>Analyse de la relation P-QRS</li>
          <li>Analyse de la morphologie des QRS</li>
        </ul>

        <h2>Prise en charge</h2>
        <p>
          La prise en charge dépend du type de trouble de conduction et de la tolérance clinique :
        </p>
        <ul>
          <li>Surveillance simple pour les troubles bénins (BAV 1er degré)</li>
          <li>Traitement étiologique si possible</li>
          <li>Stimulation temporaire si nécessaire</li>
          <li>Indication de pacemaker définitif selon les recommandations</li>
        </ul>

        <h2>Indications de pacemaker</h2>
        <ul>
          <li>BAV 2ème degré Mobitz II symptomatique</li>
          <li>BAV 3ème degré</li>
          <li>Bloc bi ou trifasciculaire symptomatique</li>
          <li>Dysfonction sinusale symptomatique</li>
        </ul>

        <h2>Points clés</h2>
        <ul>
          <li>Évaluation clinique initiale primordiale</li>
          <li>ECG 12 dérivations systématique</li>
          <li>Recherche d'une cause réversible</li>
          <li>Évaluation du caractère aigu ou chronique</li>
          <li>Décision thérapeutique basée sur la symptomatologie et le risque vital</li>
        </ul>
      </div>
    </div>
  );
};

export default TroublesConductionPage;