import React from 'react';

const LegalContent = () => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mentions Légales</h2>
    <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3>Éditeur</h3>
      <p>
        Le LIEN (Livret d'Intervention Extra-hospitalier Normand)<br />
        Association loi 1901 à but non lucratif<br />
        Siège social : CHU de Caen
      </p>

      <h3>Directeur de la publication</h3>
      <p>
        Dr CLANET Romain<br />
        Contact : le.lien.contact.information@gmail.com
      </p>

      <h3>Protection des données personnelles</h3>
      <p>
        Cette application ne collecte aucune donnée personnelle. Les préférences utilisateur
        (comme les favoris) sont stockées localement sur votre appareil.
      </p>

      <h3>Propriété intellectuelle</h3>
      <p>
        Toute représentation ou reproduction intégrale ou partielle faite sans le consentement
        du Dr Clanet Romain est illicite et constitue une contrefaçon sanctionnée par les
        articles L. 335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h3>Crédits</h3>
      <p>
        Les icônes et illustrations utilisées dans cette application sont la propriété de
        leurs auteurs respectifs et sont utilisées avec leur autorisation.
      </p>
    </div>
  </section>
);

export default LegalContent;