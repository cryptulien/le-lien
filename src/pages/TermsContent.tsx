import React from 'react';

const TermsContent = () => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Conditions Générales d'Utilisation</h2>
    <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3>1. Acceptation des conditions</h3>
      <p>
        En accédant et en utilisant cette application, vous acceptez d'être lié par ces conditions d'utilisation.
        Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
      </p>

      <h3>2. Utilisation de l'application</h3>
      <p>
        Cette application est destinée à un usage professionnel par des personnels de santé qualifiés.
        Les informations fournies ne remplacent pas le jugement clinique et ne constituent pas un avis médical.
      </p>

      <h3>3. Responsabilité</h3>
      <p>
        Les auteurs et contributeurs de l'application ne peuvent être tenus responsables des conséquences
        de l'utilisation des informations fournies. L'utilisateur reste seul responsable de ses décisions
        et actions médicales.
      </p>

      <h3>4. Propriété intellectuelle</h3>
      <p>
        Tout le contenu de l'application est protégé par le droit d'auteur. Toute reproduction ou
        distribution non autorisée est strictement interdite.
      </p>

      <h3>5. Modifications</h3>
      <p>
        Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
        entrent en vigueur dès leur publication dans l'application.
      </p>
    </div>
  </section>
);

export default TermsContent;