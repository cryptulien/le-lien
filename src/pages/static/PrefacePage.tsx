import StaticPageLayout from '../../components/layouts/StaticPageLayout';

const PrefacePage = () => {
  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Préface</h1>
          <p className="font-bold mb-6">PRÉFACE DU Dr MACREZ – MCU-PH</p>
          <p>
            De nombreux ouvrages traitant de médecine d'urgence sont publiés, mais peu d'entre eux répondent
            aux besoins concrets des professionnels sur le terrain. De plus, peu de ces ouvrages sont facilement
            transportables et consultables en cas d'urgence. C'est pourquoi, en <strong>2017</strong>, le <strong>Livret d'Intervention Extra-
            hospitalier Normand</strong>, "<strong>Le LIEN</strong>", a été créé et coordonné par le Dr. Clanet.
          </p>
          
          <p>
            Au fil des différentes versions, le LIEN s'est enrichi et étoffé, intégrant les dernières recommandations
            en la matière et incluant désormais, dans cette <strong>troisième version</strong>, l'<strong>échographie clinique</strong>, une compétence
            indispensable pour tout urgentiste.
          </p>
          
          <p>
            Le nom et le logo du LIEN illustrent parfaitement notre vision pour l'avenir de notre spécialité : une
            collaboration totale et une complémentarité entre l'extra et l'intra-hospitalier, ainsi qu'une étroite
            coopération entre les différents professionnels impliqués.
          </p>
          
          <p>
            Je suis convaincu que le LIEN continuera d'évoluer et intégrera l'utilisation de technologies de pointe
            telles que l'IA et la télémédecine, notamment en régulation dans nos SAMU.
          </p>
          
          <div className="mt-8">
            <p className="font-bold">Dr. Richard MACREZ</p>
            <p>
              Responsable du service hospitalo-universitaire de médecine d'urgence du CHU de Caen Normandie et
              coordonnateur du DES MU subdivision « Caen ».
            </p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default PrefacePage;
