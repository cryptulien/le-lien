import StaticPageLayout from '../../components/layouts/StaticPageLayout';

const PreambulePage = () => {
  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Préambule</h1>
          
          <p>
            <strong>L'histoire du LIEN</strong> (Livret d'Intervention Extrahospitalier Normand) débute en <strong>2017</strong>. 
            Le Pr ROUPIE†, malheureusement décédé en 2022, m'avait alors demandé de créer un livret de protocole 
            pour le SAMU 14 à partir de mes aides cognitives.
          </p>

          <p>
            Ne concevant pas ce projet sans <strong>Collaborateurs</strong>, j'ai rassemblé un groupe de travail 
            composé d'<strong>Urgentistes issus de l'ensemble des Hôpitaux du Calvados</strong>. Notre but était alors 
            d'établir des protocoles communs de prise en charge, pragmatiques et concis, adaptés aux équipages SMUR 
            de notre territoire.
          </p>

          <p>
            <strong>Le LIEN s'intègre désormais dans un projet plus large</strong> de promotion de la Médecine d'Urgence pour 
            la Normandie Occidentale. Nous nous sommes ainsi constitués en association loi 1901 à but non lucratif.
          </p>

          <p>
            Ce document ne saurait être tenu pour responsable <strong>d'erreurs ou d'événements indésirables</strong> 
            survenant à l'occasion d'une prise en charge médicale. Chaque patient étant unique, il apparait illusoire 
            d'imaginer utiliser aveuglément les aides cognitives que nous vous proposons.
          </p>

          <div className="mt-8">
            <p className="font-bold">Dr. Romain CLANET</p>
            <p>Coordonnateur du LIEN</p>
            <p>Praticien Hospitalier</p>
            <p>Service des Urgences – SAMU – SMUR</p>
            <p>CHU de Caen Normandie</p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default PreambulePage;
