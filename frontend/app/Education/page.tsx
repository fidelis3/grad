'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const NutritionIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
  </svg>
);

const ExerciseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const MedicineIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const BackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const EducationalSlider = ({ slides, title }: { slides: Array<{ title: string; content: string; tips: string[] }>, title: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
      <div className="relative">
        <div className="bg-blue-50 rounded-lg p-6 min-h-[300px]">
          <h4 className="text-xl font-semibold text-blue-800 mb-4">
            {slides[currentSlide].title}
          </h4>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {slides[currentSlide].content}
          </p>
          <div className="mt-4">
            <h5 className="font-medium text-blue-700 mb-2">Key Points:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {slides[currentSlide].tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
        
      
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevSlide}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Previous
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Next
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </button>
        </div>
        
        <div className="text-center mt-2 text-sm text-gray-500">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
};

export default function EducationPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

 
  const heartHealthSlides = [
    {
      title: "Understanding Your Heart",
      content: "Your heart is a muscular organ that pumps blood throughout your body. It beats about 100,000 times per day, delivering oxygen and nutrients to every cell. A healthy heart is essential for overall well-being and longevity.",
      tips: [
        "Your heart has four chambers: two atria and two ventricles",
        "It pumps about 5 liters of blood per minute",
        "Heart disease is the leading cause of death worldwide",
        "Many heart conditions are preventable through lifestyle changes"
      ]
    },
    {
      title: "Risk Factors",
      content: "Several factors can increase your risk of heart disease. Some are controllable through lifestyle changes, while others like age and genetics cannot be changed. Understanding these risks helps you make informed decisions about your health.",
      tips: [
        "High blood pressure and high cholesterol",
        "Smoking and excessive alcohol consumption",
        "Diabetes and obesity",
        "Family history and age (men 45+, women 55+)",
        "Sedentary lifestyle and poor diet"
      ]
    },
    {
      title: "Prevention Strategies",
      content: "The good news is that most heart disease can be prevented through healthy lifestyle choices. Small changes in your daily routine can have a significant impact on your heart health over time.",
      tips: [
        "Exercise regularly - at least 150 minutes per week",
        "Eat a balanced diet rich in fruits, vegetables, and whole grains",
        "Maintain a healthy weight (BMI 18.5-24.9)",
        "Don't smoke and limit alcohol consumption",
        "Manage stress through relaxation techniques",
        "Get regular health screenings"
      ]
    }
  ];

 
  const mentalHealthSlides = [
    {
      title: "Understanding Mental Health",
      content: "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. Mental health is important at every stage of life, from childhood through adulthood.",
      tips: [
        "1 in 4 people experience mental health issues annually",
        "Mental health affects physical health and vice versa",
        "Early intervention leads to better outcomes",
        "Mental health conditions are treatable"
      ]
    },
    {
      title: "Common Mental Health Conditions",
      content: "Mental health conditions are common and treatable. Depression, anxiety, and stress disorders are among the most prevalent. Understanding symptoms helps in seeking appropriate care.",
      tips: [
        "Depression: persistent sadness, loss of interest, fatigue",
        "Anxiety: excessive worry, restlessness, panic attacks",
        "PTSD: flashbacks, nightmares, severe anxiety",
        "Bipolar disorder: extreme mood swings",
        "Eating disorders: unhealthy eating patterns"
      ]
    },
    {
      title: "Maintaining Mental Wellness",
      content: "Good mental health isn't just the absence of mental illness. It's about having positive characteristics like the ability to cope with stress, maintain relationships, and feel good about yourself.",
      tips: [
        "Practice mindfulness and meditation",
        "Maintain social connections and relationships",
        "Get adequate sleep (7-9 hours nightly)",
        "Exercise regularly to boost mood",
        "Seek professional help when needed",
        "Practice gratitude and positive thinking"
      ]
    }
  ];


  const nutritionSlides = [
    {
      title: "Fundamentals of Healthy Eating",
      content: "Good nutrition provides your body with the nutrients it needs to function properly. A balanced diet includes a variety of foods from all food groups in the right proportions.",
      tips: [
        "Fill half your plate with fruits and vegetables",
        "Choose whole grains over refined grains",
        "Include lean proteins in every meal",
        "Limit processed foods and added sugars",
        "Stay hydrated with 8-10 glasses of water daily"
      ]
    },
    {
      title: "Essential Nutrients",
      content: "Your body needs various nutrients to function optimally. These include macronutrients (carbohydrates, proteins, fats) and micronutrients (vitamins and minerals).",
      tips: [
        "Carbohydrates: primary energy source (45-65% of calories)",
        "Proteins: building blocks for muscles and tissues (10-35%)",
        "Fats: essential for hormone production (20-35%)",
        "Vitamins: support immune system and body functions",
        "Minerals: important for bone health and metabolism"
      ]
    },
    {
      title: "Meal Planning Tips",
      content: "Planning your meals helps ensure you get proper nutrition while managing time and budget. Preparation is key to maintaining healthy eating habits long-term.",
      tips: [
        "Plan meals for the week ahead",
        "Prepare healthy snacks in advance",
        "Read nutrition labels carefully",
        "Control portion sizes using smaller plates",
        "Cook at home more often than eating out",
        "Keep healthy emergency snacks available"
      ]
    }
  ];

  const educationSections = [
    { id: 'overview', name: 'Overview', icon: HeartIcon },
    { id: 'heart-health', name: 'Heart Health', icon: HeartIcon },
    { id: 'mental-health', name: 'Mental Health', icon: BrainIcon },
    { id: 'nutrition', name: 'Nutrition', icon: NutritionIcon },
    { id: 'exercise', name: 'Exercise', icon: ExerciseIcon },
    { id: 'preventive-care', name: 'Preventive Care', icon: ShieldIcon },
    { id: 'medications', name: 'Medications', icon: MedicineIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/PatientPortal')}
                className="flex items-center text-blue-900 hover:text-blue-700 transition-colors mr-4"
              >
                <BackIcon className="w-6 h-6 mr-2" />
                Back to Portal
              </button>
              <h1 className="text-3xl font-bold text-blue-900">Patient Education</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Topics</h2>
              <nav className="space-y-2">
                {educationSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-900 text-white'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="font-medium">{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

        
          <div className="lg:w-3/4">
        
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-6">Welcome to Patient Education</h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    This comprehensive guide provides essential health information to help you make informed decisions about your care. 
                    Knowledge is power when it comes to your health, and understanding these topics can help you live a healthier, happier life.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <HeartIcon className="w-12 h-12 text-blue-900 mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Heart Health</h3>
                      <p className="text-gray-700">Learn about cardiovascular health, risk factors, and prevention strategies.</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <BrainIcon className="w-12 h-12 text-blue-900 mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Mental Health</h3>
                      <p className="text-gray-700">Understand mental wellness, common conditions, and coping strategies.</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <NutritionIcon className="w-12 h-12 text-blue-900 mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Nutrition</h3>
                      <p className="text-gray-700">Discover the fundamentals of healthy eating and meal planning.</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <ExerciseIcon className="w-12 h-12 text-blue-900 mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Exercise</h3>
                      <p className="text-gray-700">Learn about physical activity benefits and safe exercise practices.</p>
                    </div>
                  </div>
                </div>

              
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-md p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Daily Health Tips</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">🥗 Eat Well</h4>
                      <p className="text-blue-100">Choose nutritious foods and stay hydrated throughout the day.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">🏃‍♀️ Stay Active</h4>
                      <p className="text-blue-100">Aim for at least 30 minutes of physical activity daily.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">😴 Rest Well</h4>
                      <p className="text-blue-100">Get 7-9 hours of quality sleep each night.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

        
            {activeSection === 'heart-health' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <HeartIcon className="w-10 h-10 text-red-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Heart Health</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Your heart is one of the most important organs in your body. Taking care of your cardiovascular health 
                    is essential for a long and healthy life. Heart disease remains the leading cause of death globally, 
                    but the good news is that most heart disease is preventable.
                  </p>
                </div>

                <EducationalSlider slides={heartHealthSlides} title="Heart Health Education" />

                
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Heart-Healthy Foods</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🥗</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Leafy Greens</h4>
                      <p className="text-sm text-gray-600">Spinach, kale, and arugula are rich in vitamins and antioxidants.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🐟</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Fatty Fish</h4>
                      <p className="text-sm text-gray-600">Salmon and mackerel provide omega-3 fatty acids.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🫐</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Berries</h4>
                      <p className="text-sm text-gray-600">Blueberries and strawberries are packed with antioxidants.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-brown-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🥜</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Nuts</h4>
                      <p className="text-sm text-gray-600">Almonds and walnuts provide healthy fats and protein.</p>
                    </div>
                  </div>
                </div>

              
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Heart Attack Warning Signs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-red-700">
                      <li>• Chest pain or discomfort</li>
                      <li>• Shortness of breath</li>
                      <li>• Pain in arms, back, neck, jaw</li>
                    </ul>
                    <ul className="space-y-2 text-red-700">
                      <li>• Nausea or vomiting</li>
                      <li>• Cold sweat</li>
                      <li>• Lightheadedness</li>
                    </ul>
                  </div>
                  <p className="mt-4 font-semibold text-red-800">
                    🚨 If you experience these symptoms, call emergency services immediately!
                  </p>
                </div>
              </div>
            )}

       
            {activeSection === 'mental-health' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <BrainIcon className="w-10 h-10 text-purple-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Mental Health</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Mental health is just as important as physical health. It affects how we think, feel, and act. 
                    Taking care of your mental health is essential for overall well-being and quality of life.
                  </p>
                </div>

                <EducationalSlider slides={mentalHealthSlides} title="Mental Health Education" />

             
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Stress Management Techniques</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <span className="text-4xl mb-4 block">🧘‍♀️</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Meditation</h4>
                      <p className="text-gray-600">Practice mindfulness meditation for 10-15 minutes daily to reduce stress and anxiety.</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <span className="text-4xl mb-4 block">🏃‍♂️</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Exercise</h4>
                      <p className="text-gray-600">Regular physical activity releases endorphins and improves mood naturally.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <span className="text-4xl mb-4 block">😴</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Quality Sleep</h4>
                      <p className="text-gray-600">Maintain a consistent sleep schedule and create a relaxing bedtime routine.</p>
                    </div>
                  </div>
                </div>

            
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">🆘 Mental Health Resources</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="font-semibold text-blue-700">Crisis Hotline:</span>
                      <span className="text-blue-600">988 (Suicide & Crisis Lifeline)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-semibold text-blue-700">Text Support:</span>
                      <span className="text-blue-600">Text HOME to 741741</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-semibold text-blue-700">Remember:</span>
                      <span className="text-blue-600">Seeking help is a sign of strength, not weakness</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

    
            {activeSection === 'nutrition' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <NutritionIcon className="w-10 h-10 text-green-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Nutrition</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Good nutrition is the foundation of good health. What you eat directly affects how you feel, 
                    your energy levels, and your risk of developing chronic diseases. A balanced diet provides 
                    all the nutrients your body needs to function optimally.
                  </p>
                </div>

                <EducationalSlider slides={nutritionSlides} title="Nutrition Education" />

             
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Essential Food Groups</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="bg-red-100 rounded-lg p-4 mb-3">
                        <span className="text-3xl">🍎</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Fruits</h4>
                      <p className="text-sm text-gray-600">2-4 servings daily</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-lg p-4 mb-3">
                        <span className="text-3xl">🥬</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Vegetables</h4>
                      <p className="text-sm text-gray-600">3-5 servings daily</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-yellow-100 rounded-lg p-4 mb-3">
                        <span className="text-3xl">🌾</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Grains</h4>
                      <p className="text-sm text-gray-600">6-8 servings daily</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-lg p-4 mb-3">
                        <span className="text-3xl">🥩</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Protein</h4>
                      <p className="text-sm text-gray-600">2-3 servings daily</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-lg p-4 mb-3">
                        <span className="text-3xl">🥛</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Dairy</h4>
                      <p className="text-sm text-gray-600">2-3 servings daily</p>
                    </div>
                  </div>
                </div>

             
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">💧 Stay Hydrated</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Daily Water Intake:</h4>
                      <ul className="space-y-1 text-blue-600">
                        <li>• Men: 3.7 liters (15 cups)</li>
                        <li>• Women: 2.7 liters (11 cups)</li>
                        <li>• Increase with exercise and hot weather</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Signs of Dehydration:</h4>
                      <ul className="space-y-1 text-blue-600">
                        <li>• Dark yellow urine</li>
                        <li>• Dry mouth and fatigue</li>
                        <li>• Headache and dizziness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

           
            {activeSection === 'exercise' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <ExerciseIcon className="w-10 h-10 text-orange-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Exercise & Physical Activity</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Regular physical activity is one of the most important things you can do for your health. 
                    It can help control your weight, reduce your risk of heart disease, strengthen bones and muscles, 
                    and improve your mental health and mood.
                  </p>
                </div>

              
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Weekly Exercise Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-green-800 mb-4">Aerobic Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🏃‍♀️</span>
                          <div>
                            <p className="font-medium text-gray-800">Moderate Intensity</p>
                            <p className="text-sm text-gray-600">150 minutes per week</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Examples: Brisk walking, swimming, cycling</p>
                        <div className="border-t pt-3">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">💨</span>
                            <div>
                              <p className="font-medium text-gray-800">Vigorous Intensity</p>
                              <p className="text-sm text-gray-600">75 minutes per week</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">Examples: Running, high-intensity interval training</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-blue-800 mb-4">Strength Training</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">💪</span>
                          <div>
                            <p className="font-medium text-gray-800">Muscle Strengthening</p>
                            <p className="text-sm text-gray-600">2 or more days per week</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Work all major muscle groups</p>
                        <div className="border-t pt-3">
                          <p className="text-sm text-gray-600">
                            Examples: Weight lifting, resistance bands, push-ups, squats
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Benefits of Regular Exercise</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <HeartIcon className="w-8 h-8 text-red-500" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Heart Health</h4>
                      <p className="text-sm text-gray-600">Strengthens heart muscle and improves circulation</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <BrainIcon className="w-8 h-8 text-purple-500" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mental Health</h4>
                      <p className="text-sm text-gray-600">Reduces stress, anxiety, and depression</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚖️</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Weight Control</h4>
                      <p className="text-sm text-gray-600">Helps maintain healthy body weight</p>
                    </div>
                  </div>
                </div>

              
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">⚠️ Exercise Safety Tips</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Start slowly and gradually increase intensity</li>
                      <li>• Warm up before and cool down after exercise</li>
                      <li>• Stay hydrated during workouts</li>
                    </ul>
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Listen to your body and rest when needed</li>
                      <li>• Wear appropriate footwear and clothing</li>
                      <li>• Consult your doctor before starting new programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

           
            {activeSection === 'preventive-care' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <ShieldIcon className="w-10 h-10 text-blue-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Preventive Care</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Preventive care helps detect health problems early when they&apos;re easier to treat. 
                    Regular check-ups and screenings can help prevent diseases or catch them in their early stages.
                  </p>
                </div>

             
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Recommended Screening Schedule</h3>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Annual Screenings</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-gray-600">
                          <li>• Blood pressure check</li>
                          <li>• Cholesterol levels</li>
                          <li>• Blood sugar (diabetes screening)</li>
                          <li>• Body mass index (BMI)</li>
                        </ul>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Vision and hearing tests</li>
                          <li>• Dental examination</li>
                          <li>• Skin cancer screening</li>
                          <li>• Immunization updates</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Age-Specific Screenings</h4>
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-800 mb-2">Women</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Mammography (40+ years, annually)</li>
                            <li>• Pap smear (21-65 years, every 3 years)</li>
                            <li>• Bone density (65+ years)</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h5 className="font-semibold text-green-800 mb-2">Men</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Prostate screening (50+ years)</li>
                            <li>• Testicular self-examination (monthly)</li>
                            <li>• Abdominal aortic aneurysm (65-75 years)</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-800 mb-2">Both Sexes</h5>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Colorectal cancer screening (45-75 years)</li>
                            <li>• Lung cancer screening (smokers 50-80 years)</li>
                            <li>• Osteoporosis screening (65+ years)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

               
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Important Vaccinations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-3">Annual Vaccines</h4>
                      <ul className="space-y-2 text-green-700">
                        <li>• Influenza (flu) vaccine</li>
                        <li>• COVID-19 vaccine updates</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Periodic Vaccines</h4>
                      <ul className="space-y-2 text-blue-700">
                        <li>• Tdap (tetanus, diphtheria, pertussis) - every 10 years</li>
                        <li>• Shingles vaccine - 50+ years</li>
                        <li>• Pneumococcal vaccine - 65+ years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

       
            {activeSection === 'medications' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <MedicineIcon className="w-10 h-10 text-indigo-500 mr-4" />
                    <h2 className="text-3xl font-bold text-blue-900">Medication Safety</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Taking medications safely is crucial for your health. Understanding how to properly use, 
                    store, and manage your medications can prevent serious side effects and ensure they work effectively.
                  </p>
                </div>

              
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Medication Safety Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Taking Medications</h4>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Follow prescription instructions exactly
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Take medications at the same time daily
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Complete the full course, even if feeling better
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Use measuring tools provided with liquid medications
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Storage & Organization</h4>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Store in original containers with labels
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Keep in cool, dry places (not bathroom)
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Use pill organizers for multiple medications
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Keep medications away from children and pets
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

             
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Drug Interactions to Avoid</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Common Interactions:</h4>
                      <ul className="space-y-1 text-red-600 text-sm">
                        <li>• Blood thinners + NSAIDs (ibuprofen, aspirin)</li>
                        <li>• Diabetes medications + alcohol</li>
                        <li>• Blood pressure medications + decongestants</li>
                        <li>• Antidepressants + certain pain medications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Food Interactions:</h4>
                      <ul className="space-y-1 text-red-600 text-sm">
                        <li>• Grapefruit + certain heart medications</li>
                        <li>• Dairy products + antibiotics</li>
                        <li>• High vitamin K foods + blood thinners</li>
                        <li>• Alcohol + various medications</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 font-semibold text-red-800">
                    Always inform your healthcare providers about ALL medications and supplements you take!
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Medication Management Tools</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <span className="text-4xl mb-4 block">📱</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Apps</h4>
                      <p className="text-sm text-gray-600">Set reminders and track medications</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6 text-center">
                      <span className="text-4xl mb-4 block">💊</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Pill Organizers</h4>
                      <p className="text-sm text-gray-600">Weekly or monthly organizing systems</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                      <span className="text-4xl mb-4 block">📋</span>
                      <h4 className="font-semibold text-gray-800 mb-2">Medication List</h4>
                      <p className="text-sm text-gray-600">Keep updated list for healthcare visits</p>
                    </div>
                  </div>
                </div>

               
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">🔔 When to Contact Your Healthcare Provider</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Experiencing side effects</li>
                      <li>• Medication not working as expected</li>
                      <li>• Missed doses or medication errors</li>
                    </ul>
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Starting new medications or supplements</li>
                      <li>• Questions about drug interactions</li>
                      <li>• Difficulty affording medications</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
