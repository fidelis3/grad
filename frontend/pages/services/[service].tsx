// frontend/pages/services/[service].tsx
import { useRouter } from 'next/router';
//import Navbar from '../../components/Navbar';
import Link from 'next/link';

const serviceInfo: Record<string, { title: string; grids: { desc: string; learnMore: string }[] }> = {
  'free-checkup': {
    title: 'Free Checkup Services',
    grids: [
      { desc: 'Basic health screening including vital signs.', learnMore: 'Learn about vital checks' },
      { desc: 'General wellness examination.', learnMore: 'Wellness tips' },
      { desc: 'Preventive care consultation.', learnMore: 'Prevention strategies' },
      { desc: 'Blood pressure and heart rate monitoring.', learnMore: 'Cardio basics' },
      { desc: 'Weight and BMI assessment.', learnMore: 'Nutrition guide' },
      { desc: 'Initial symptom review.', learnMore: 'Symptom FAQ' },
    ],
  },
  'cardiogram': {
    title: 'Cardiogram Services',
    grids: [
        { desc: 'Electrocardiogram (ECG) testing.', learnMore: 'What is ECG?' },
      { desc: 'Heart rhythm and rate analysis.', learnMore: 'Heartbeat monitoring' },
      { desc: 'Detecting arrhythmias and cardiac abnormalities.', learnMore: 'Common heart issues' },
      { desc: 'Stress testing and exercise ECG.', learnMore: 'Stress test details' },
      { desc: 'Holter monitoring for continuous heart tracking.', learnMore: 'Holter monitors' },
      { desc: 'Consultation with cardiologists based on results.', learnMore: 'Cardiology consult' },
    ],
  },
  'Dna Testing': {
    title: 'Dna Testing',
    grids:[
        { desc: 'Genetic screening for hereditary conditions.', learnMore: 'More on genetic risks' },
      { desc: 'Ancestry and genealogy tracing.', learnMore: 'Discover your roots' },
      { desc: 'Pharmacogenomic testing for personalized medicine.', learnMore: 'Medication insights' },
      { desc: 'Carrier screening to assess inherited disorders.', learnMore: 'Carrier status info' },
      { desc: 'Non-invasive prenatal DNA testing.', learnMore: 'Prenatal testing details' },
      { desc: 'DNA sample collection guidance.', learnMore: 'How to provide samples' },
    ],
  },
    'Blood Bank': {
        title: 'Blood Bank Services',
        grids:[
            { desc: 'Safe and timely blood donation.', learnMore: 'How to donate blood' },
            { desc: 'Blood type and compatibility testing.', learnMore: 'Understanding blood types' },
            { desc: 'Storage and management of blood supplies.', learnMore: 'Storage protocols' },
            { desc: 'Screening for infectious diseases in donors.', learnMore: 'Safety measures' },
            { desc: 'Emergency blood transfusion support.', learnMore: 'Transfusion info' },
            { desc: 'Volunteering opportunities and campaigns.', learnMore: 'Get involved' },
        ],
    },
  // Add 
};

const ServiceInfo: React.FC = () => {
  const { query } = useRouter();
  const service = query.service as string;
  const data = serviceInfo[service] || { title: 'Service Not Found', grids: [] };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">{data.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.grids.map((grid, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border">
              <p className="mb-4 text-gray-700">{grid.desc}</p>
              <Link href={`/info/${service}-${index}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;