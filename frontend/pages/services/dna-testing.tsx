import Link from "next/link";
import '../../app/globals.css';
const DnaTesting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-teal-100 to-green-150 py-16 px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-14">
        <h1 className="text-5xl font-extrabold text-green-700 mb-8 drop-shadow-lg">
          DNA Testing Services
        </h1>
        <p className="text-lg text-gray-800 mb-10 leading-relaxed max-w-3xl">
          Unlock the secrets of your genetics with our comprehensive DNA testing services. Gain insights into your health risks, ancestry, and personalized medicine options with privacy and accuracy.
        </p>

        <ul className="list-inside list-disc space-y-5 mb-10 text-gray-900 font-semibold text-lg">
          {[
            'Genetic screening for hereditary conditions.',
            'Ancestry and genealogy tracing.',
            'Pharmacogenomic testing for personalized medicine guidance.',
            'Carrier screening to assess inherited disorders.',
            'Non-invasive prenatal DNA testing for expecting mothers.',
            'Confidential sample collection and professional counseling.'
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="text-gray-700 text-lg mb-12">
          Make empowered choices about your health. Our expert teams ensure ethical handling and provide thorough explanations to help you interpret your results.
        </p>

        <Link
          href="/services/all"
          className="bg-green-700 hover:bg-green-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition hover:-translate-y-1 inline-block"
          aria-label="Back to all services"
        >
          Back to all services
        </Link>
      </div>
    </div>
  );
};

export default DnaTesting;
