import Link from "next/link";
import '../../app/globals.css';

const Cardiogram = () => {
  return (
    <div className="min-h-screen p-14 bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-12">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-blue-900 drop-shadow-sm">
          Cardiogram Services
        </h1>
        <p className="mb-8 text-gray-800 text-lg leading-relaxed">
          Our cardiogram services offer precise heart rhythm and rate analysis to detect and prevent cardiovascular complications early.
        </p>

        <ul className="space-y-5 mb-12 text-gray-900 text-lg font-semibold list-disc list-inside">
          <li>Electrocardiogram (ECG) testing for heart rhythm and rate.</li>
          <li>Detecting arrhythmias and cardiac abnormalities.</li>
          <li>Stress testing and exercise ECG evaluations.</li>
          <li>Holter monitoring for continuous heart activity tracking.</li>
          <li>Personalized cardiology consultations based on your test results.</li>
        </ul>

        <p className="mb-14 text-gray-700 text-lg leading-relaxed">
          Leverage advanced diagnostics and expert care to protect your heart health. Our team is committed to delivering the highest standards of cardiac wellness.
        </p>

        <Link
          href="/services/all"
          className="rounded-full px-12 py-4 bg-blue-900 text-white font-semibold hover:bg-blue-800 shadow-lg hover:shadow-xl transition ease-in-out duration-300"
          aria-label="Back to all services"
        >
          ← Back to All Services
        </Link>
      </div>
    </div>
  );
};

export default Cardiogram;
