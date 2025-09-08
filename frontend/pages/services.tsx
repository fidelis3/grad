// frontend/pages/services.tsx
import Image from 'next/image';
import Link from "next/link";
import '../app/globals.css';

interface Service {
  title: string;
  icon: string; // Emoji for simplicity; 
  link: string;
}

const services: Service[] = [
  { title: 'Free Checkup', icon: '❤️', link: '/services/free-checkup' },
  { title: 'Cardiogram', icon: '📈', link: '/services/cardiogram' },
  { title: 'Dna Testing', icon: '🧬', link: '/services/dna-testing' },
  { title: 'Blood Bank', icon: '🩸', link: '/services/blood-bank' },
];

const Services: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-wide text-gray-600">Care you can believe in </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-blue-900">Our Services</h1>
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Clickable Service Cards (Navy Blue) */}
        <div className="lg:w-1/4 space-y-4">
          {services.map((service) => (
            <Link key={service.title} href={service.link}>
              <div className="flex items-center bg-blue-900 text-white p-4 rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                <span className="text-2xl mr-3">{service.icon}</span>
                <span className="font-semibold">{service.title}</span>
              </div>
            </Link>
          ))}
          <Link href="/services/all">
            <button className="w-full bg-blue-900 text-white p-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors">View All</button>
          </Link>
        </div>
        {/* Middle: Text with Bullets */}
        <div className="lg:w-2/5">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">A passion for putting patients first.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ul className="space-y-2">
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> A Passion for Healing</li>
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> All our best</li>
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> A Legacy of Excellence</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> 5-Star Care</li>
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Believe in Us</li>
              <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Always Caring</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            At our clinic, we go beyond treatment. We provide care that touches lives. Every patient is treated with dignity, compassion, and the highest medical standards. Our dedicated team combines advanced technology with personalized attention, ensuring you receive not just healthcare, but genuine support at every step. From routine checkups to specialized services, we are here to keep you and your loved ones healthy, safe, and cared for.
          </p>
        </div>
        {/* Right: Stacked Images */}
        <div className="lg:w-2/5 space-y-4">
          <div className="relative h-48 lg:h-64 w-full">
            <Image src="/images/OurServices1.jpg" alt="Doctor examining patient" fill className="object-cover rounded-lg" />
          </div>
          <div className="relative h-48 lg:h-64 w-full">
            <Image src="/images/OurServices2.jpg" alt="Medical staff team" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Services;