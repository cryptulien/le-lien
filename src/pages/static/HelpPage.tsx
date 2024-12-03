import React, { useState } from 'react';
import StaticPageLayout from '../../components/layouts/StaticPageLayout';
import { Mail } from 'lucide-react';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici nous pourrions ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Aide</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">À propos de l'application</h2>
            <p>
              Le LIEN (Livret d'Intervention Extra-hospitalier Normand) est une application web conçue 
              pour faciliter l'accès aux protocoles et scores médicaux pour les professionnels de santé.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Fonctionnalités principales</h2>
            <ul className="space-y-4">
              <li>
                <strong>Recherche rapide</strong> : Utilisez la barre de recherche en haut de l'écran 
                pour trouver rapidement une fiche ou un protocole.
              </li>
              <li>
                <strong>Favoris</strong> : Marquez les fiches que vous consultez fréquemment comme 
                favorites pour y accéder plus rapidement.
              </li>
              <li>
                <strong>Mode sombre</strong> : Activez le mode "Je suis de garde" pour une interface 
                adaptée aux conditions de faible luminosité.
              </li>
              <li>
                <strong>Scores médicaux</strong> : Accédez rapidement aux calculateurs de scores 
                médicaux les plus utilisés.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
            <p>
              Utilisez le menu latéral pour accéder aux différentes sections de l'application. 
              Les catégories sont organisées de manière logique pour faciliter la recherche 
              d'informations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact et Support</h2>
            <div className="space-y-4">
              
              <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Mentions légales</h2>
            <p>
              Cette application est destinée à un usage professionnel uniquement. Les informations 
              fournies ne remplacent pas le jugement clinique et doivent être utilisées en 
              complément de la formation médicale et de l'expérience professionnelle.
            </p>
          </section>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default HelpPage;
