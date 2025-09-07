'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="currentColor"/>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
);

interface NewsArticle {
  id: number;
  image: string;
  date: {
    day: string;
    date: string;
    month: string;
    year: string;
  };
  author: string;
  title: string;
  preview: string;
  fullText: string;
}

interface RecentPost {
  id: number;
  image: string;
  date: {
    day: string;
    date: string;
    month: string;
    year: string;
  };
  title: string;
}

const NewsPage: React.FC = () => {
  const [expandedArticles, setExpandedArticles] = useState<{ [key: number]: boolean }>({});


  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      image: '/Images/News1.jpg',
      date: { day: 'Monday', date: '15', month: 'January', year: '2025' },
      author: 'Dr. Sarah Johnson',
      title: 'Revolutionary Heart Surgery Technique Shows Promising Results',
      preview: 'Medical experts at our facility have successfully implemented a groundbreaking minimally invasive heart surgery technique that reduces recovery time by 50%. This innovative approach has been tested on over 200 patients with remarkable success rates.',
      fullText: 'Medical experts at our facility have successfully implemented a groundbreaking minimally invasive heart surgery technique that reduces recovery time by 50%. This innovative approach has been tested on over 200 patients with remarkable success rates. The new technique, developed over three years of research, utilizes advanced robotics and precision instruments to perform complex cardiac procedures through small incisions. Patients who underwent this procedure reported significantly less pain, faster healing, and shorter hospital stays. Dr. Sarah Johnson, lead cardiac surgeon, stated that this advancement represents a major milestone in cardiovascular medicine. The technique has been approved by medical authorities and is now being offered to eligible patients. Initial studies show a 98% success rate with minimal complications. The hospital plans to train more surgeons in this technique to make it widely available to patients across the region.'
    },
    {
      id: 2,
      image: '/Images/News2.jpg',
      date: { day: 'Wednesday', date: '10', month: 'January', year: '2025' },
      author: 'Dr. Michael Chen',
      title: 'New Cancer Treatment Protocol Achieves 95% Success Rate',
      preview: 'Our oncology department has developed a personalized cancer treatment protocol that combines immunotherapy with targeted radiation. Early trials show unprecedented success rates in treating various cancer types.',
      fullText: 'Our oncology department has developed a personalized cancer treatment protocol that combines immunotherapy with targeted radiation. Early trials show unprecedented success rates in treating various cancer types. The breakthrough treatment, led by Dr. Michael Chen and his research team, represents five years of intensive research and clinical trials. The protocol analyzes each patient\'s genetic makeup to create a customized treatment plan that maximizes effectiveness while minimizing side effects. This personalized approach has shown remarkable results across different cancer stages and types. Patients participating in the trial reported better quality of life during treatment, with significantly reduced nausea, fatigue, and other common side effects. The treatment protocol has been submitted for regulatory approval and could become standard practice within the next two years. The success of this program has attracted international attention from medical institutions worldwide.'
    },
    {
      id: 3,
      image: '/Images/News3.jpg',
      date: { day: 'Friday', date: '05', month: 'January', year: '2025' },
      author: 'Dr. Emily Rodriguez',
      title: 'Telemedicine Services Expand to Reach Rural Communities',
      preview: 'Our hospital has launched an ambitious telemedicine program to provide specialized medical care to underserved rural areas. The program includes 24/7 emergency consultations and regular health screenings.',
      fullText: 'Our hospital has launched an ambitious telemedicine program to provide specialized medical care to underserved rural areas. The program includes 24/7 emergency consultations and regular health screenings. Dr. Emily Rodriguez, director of the telemedicine initiative, explained that the program addresses critical healthcare gaps in remote communities where access to specialized medical care is limited. The comprehensive service includes virtual consultations with specialists, remote monitoring of chronic conditions, and emergency medical guidance. Advanced diagnostic equipment has been installed in partner clinics across rural areas, allowing for real-time medical assessments. The program has already served over 1,000 patients in its first month of operation. Healthcare outcomes in participating communities have improved dramatically, with early intervention preventing numerous emergency situations. The initiative represents a significant step toward healthcare equity and accessibility for all patients, regardless of their geographic location.'
    },
    {
      id: 4,
      image: '/Images/News4.jpg',
      date: { day: 'Sunday', date: '31', month: 'December', year: '2024' },
      author: 'Dr. James Wilson',
      title: 'Advanced AI Diagnostic System Reduces Diagnosis Time by 70%',
      preview: 'The implementation of our new AI-powered diagnostic system has revolutionized patient care by providing faster and more accurate diagnoses. The system analyzes medical imaging and lab results in minutes.',
      fullText: 'The implementation of our new AI-powered diagnostic system has revolutionized patient care by providing faster and more accurate diagnoses. The system analyzes medical imaging and lab results in minutes. Dr. James Wilson, head of diagnostic medicine, reported that the AI system has processed over 5,000 cases with 99.2% accuracy. The technology integrates seamlessly with existing hospital systems and provides real-time analysis of X-rays, CT scans, MRIs, and laboratory tests. This advancement has significantly reduced waiting times for patients and enabled earlier intervention for critical conditions. The AI system has been particularly effective in detecting early-stage cancers, cardiovascular abnormalities, and neurological conditions that might otherwise go unnoticed. Medical staff have undergone comprehensive training to work alongside the AI system, ensuring optimal patient care. The success of this implementation has positioned our hospital as a leader in medical technology adoption. Plans are underway to expand the AI system to include additional diagnostic capabilities and predictive health analytics.'
    }
  ];

  // Recent posts data
  const recentPosts: RecentPost[] = [
    {
      id: 1,
      image: '/Images/News1.jpg',
      date: { day: 'Mon', date: '15', month: 'Jan', year: '2025' },
      title: 'Revolutionary Heart Surgery Technique'
    },
    {
      id: 2,
      image: '/Images/News2.jpg',
      date: { day: 'Wed', date: '10', month: 'Jan', year: '2025' },
      title: 'New Cancer Treatment Protocol'
    },
    {
      id: 3,
      image: '/Images/News3.jpg',
      date: { day: 'Fri', date: '05', month: 'Jan', year: '2025' },
      title: 'Telemedicine Services Expand'
    },
    {
      id: 4,
      image: '/Images/News4.jpg',
      date: { day: 'Sun', date: '31', month: 'Dec', year: '2024' },
      title: 'Advanced AI Diagnostic System'
    }
  ];

  const toggleReadMore = (articleId: number) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  return (
    <div>
      <Header />
      
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
         
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              Latest Medical News
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Stay updated with the latest developments, breakthroughs, and insights from our medical professionals.
            </p>
          </div>

       
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
          
            <div className="lg:col-span-3 space-y-8">
              {newsArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            
                  <div className="w-full h-64 md:h-80 relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>

               
                  <div className="p-6 md:p-8">
              
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                 
                      <div className="flex items-center space-x-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">
                          {article.date.day}, {article.date.date} {article.date.month} {article.date.year}
                        </span>
                      </div>
                      
                
                      <div className="flex items-center space-x-2 text-gray-600">
                        <UserIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{article.author}</span>
                      </div>
                    </div>

                 
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                      {article.title}
                    </h2>

                 
                    <div className="text-black leading-relaxed mb-6">
                      <p className="mb-4">
                        {expandedArticles[article.id] ? article.fullText : article.preview}
                      </p>
                    </div>

                   
                    <button
                      onClick={() => toggleReadMore(article.id)}
                      className="px-6 py-3 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      {expandedArticles[article.id] ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </article>
              ))}
            </div>

           
            <div className="lg:col-span-1 space-y-8">
       
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                  Recent Posts
                </h3>
                
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                   
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      
                 
                      <div className="flex-1">
                      
                        <div className="text-xs text-blue-100 bg-blue-500 px-2 py-1 rounded inline-block mb-2">
                          {post.date.day} {post.date.date} {post.date.month} {post.date.year}
                        </div>
                        
                  
                        <h4 className="text-sm font-medium text-gray-900 leading-tight">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

        
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                  Categories
                </h3>
                
                <div className="space-y-3">
                  <button className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Surgery
                  </button>
                  <button className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    HealthCare
                  </button>
                  <button className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Professional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;