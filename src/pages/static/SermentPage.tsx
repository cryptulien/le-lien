import StaticPageLayout from '../../components/layouts/StaticPageLayout';

const SermentPage = () => {
  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Serment d'Hippocrate</h1>
        
          <p className="font-bold mb-6">Version du Conseil National de l'Ordre des Médecins (2012)</p>

          <p>
            Au moment d'être admis(e) à exercer la médecine, je promets et je jure d'être fidèle aux lois de l'honneur et de la probité.
          </p>

          <p>
            Mon premier souci sera de rétablir, de préserver ou de promouvoir la santé dans tous ses éléments, physiques et mentaux, individuels et sociaux.
          </p>

          <p>
            Je respecterai toutes les personnes, leur autonomie et leur volonté, sans aucune discrimination selon leur état ou leurs convictions.
            J'interviendrai pour les protéger si elles sont affaiblies, vulnérables ou menacées dans leur intégrité ou leur dignité.
            Même sous la contrainte, je ne ferai pas usage de mes connaissances contre les lois de l'humanité.
          </p>

          <p>
            J'informerai les patients des décisions envisagées, de leurs raisons et de leurs conséquences.
            Je ne tromperai jamais leur confiance et n'exploiterai pas le pouvoir hérité des circonstances pour forcer les consciences.
          </p>

          <p>
            Je donnerai mes soins à l'indigent et à quiconque me les demandera.
            Je ne me laisserai pas influencer par la soif du gain ou la recherche de la gloire.
          </p>

          <p>
            Admis(e) dans l'intimité des personnes, je tairai les secrets qui me seront confiés.
            Reçu(e) à l'intérieur des maisons, je respecterai les secrets des foyers et ma conduite ne servira pas à corrompre les mœurs.
          </p>

          <p>
            Je ferai tout pour soulager les souffrances. Je ne prolongerai pas abusivement les agonies.
            Je ne provoquerai jamais la mort délibérément.
          </p>

          <p>
            Je préserverai l'indépendance nécessaire à l'accomplissement de ma mission.
            Je n'entreprendrai rien qui dépasse mes compétences. Je les entretiendrai et les perfectionnerai pour assurer au mieux les services qui me seront demandés.
          </p>

          <p>
            J'apporterai mon aide à mes confrères ainsi qu'à leurs familles dans l'adversité.
          </p>

          <p>
            Que les hommes et mes confrères m'accordent leur estime si je suis fidèle à mes promesses ;
            que je sois déshonoré(e) et méprisé(e) si j'y manque.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default SermentPage;
