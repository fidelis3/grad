import Link from "next/link";
import '../../app/globals.css';

const BloodBank = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 via-red-100 to-red-200 py-16 px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-12">
        <h1 className="text-5xl font-extrabold text-red-700 mb-8 drop-shadow-lg">Blood Bank Services</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Join us in the life-saving mission of providing safe, timely blood transfusions and donations. Our Blood Bank services prioritize your safety with advanced screening and compassionate care.
        </p>

        <ul className="space-y-4 mb-12">
          {[
            'Safe blood donation drives.',
            'Blood type and compatibility testing.',
            'Proper storage and management of blood supplies.',
            'Screening for infectious diseases in donors.',
            'Emergency blood transfusion support.'
          ].map((item) => (
            <li key={item} className="flex items-center text-gray-800 text-lg font-semibold">
              <span className="inline-block w-6 h-6 mr-3 bg-red-500 rounded-full animate-pulse"></span>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-lg text-gray-600 mb-12">
          Every drop counts. Whether you are a donor or a recipient, our team ensures highest standards of safety and care. Become a hero today.
        </p>

        <Link
          href="/services/all"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          aria-label="Back to all services"
        >
          Back to all services
        </Link>
      </div>
    </div>
  );
};

export default BloodBank;
