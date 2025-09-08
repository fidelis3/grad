import Link from "next/link";
import '../../app/globals.css';
const FreeCheckup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-16 px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-16">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-10 drop-shadow-md">
          Free Checkup Services
        </h1>
        <p className="text-lg text-gray-800 mb-10 max-w-4xl leading-relaxed">
          Take control of your health with our comprehensive free checkup services — early detection and prevention tailored just for you. We combine expert diagnostics with personalized care to empower your wellness journey.
        </p>

        <div className="columns-2 gap-8 list-disc text-gray-900 font-semibold text-lg mb-12">
          <ul>
            <li>Basic health screening including vital signs.</li>
            <li>General wellness examination.</li>
            <li>Preventive care consultation.</li>
          </ul>
          <ul>
            <li>Blood pressure and heart rate monitoring.</li>
            <li>Weight and BMI assessment.</li>
            <li>Initial symptom review.</li>
          </ul>
        </div>

        <p className="text-gray-700 text-lg mb-16 max-w-3xl">
          Our dedicated team passionately serves every patient with dignity and compassion. Stay ahead of health issues with regular, trusted checkups.
        </p>

        <Link
          href="/services/all"
          className="inline-block bg-purple-700 text-white font-bold px-12 py-5 rounded-3xl shadow-lg hover:bg-purple-800 transition-transform hover:-translate-y-1"
          aria-label="Back to all services"
        >
          Back to all services
        </Link>
      </div>
    </div>
  );
};

export default FreeCheckup;
