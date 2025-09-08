import Link from "next/link";
import '../../app/globals.css';

const allServices = [
  {
    title: 'Free Checkup',
    description: 'Comprehensive wellness and vital health screenings designed to keep you healthy.',
    icon: '❤️',
    bgColor: 'from-purple-100 to-purple-300',
    href: '/services/free-checkup',
  },
  {
    title: 'Cardiogram',
    description: 'Advanced heart monitoring and diagnostics for cardiac care.',
    icon: '📈',
    bgColor: 'from-blue-100 to-blue-300',
    href: '/services/cardiogram',
  },
  {
    title: 'DNA Testing',
    description: 'In-depth genetic analysis to understand your unique health profile.',
    icon: '🧬',
    bgColor: 'from-green-100 to-green-300',
    href: '/services/dna-testing',
  },
  {
    title: 'Blood Bank',
    description: 'Reliable blood donation, testing, and transfusion services.',
    icon: '🩸',
    bgColor: 'from-red-100 to-red-300',
    href: '/services/blood-bank',
  },
];

const AllServices = () => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-tr from-gray-50 to-gray-100 flex flex-col items-center">
      <h1 className="mb-16 text-5xl font-extrabold tracking-tight text-gray-900">Explore Our Services</h1>
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {allServices.map(({ title, description, icon, bgColor, href }) => (
          <Link
            key={title}
            href={href}
            className={`rounded-2xl cursor-pointer p-10 shadow-lg bg-gradient-to-br ${bgColor} hover:shadow-2xl transform transition duration-300 hover:-translate-y-1`}
            aria-label={`Learn more about ${title}`}
          >
            <div className="text-6xl mb-6">{icon}</div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
            <span className="mt-6 inline-block text-xl font-bold text-gray-900">Learn More →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllServices;

