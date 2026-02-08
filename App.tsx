import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Marketplace } from './components/Marketplace';
import { CompanyIntro } from './components/CompanyIntro';
import { CategoryPage } from './components/CategoryPage';
import { SellHorsePage } from './components/SellHorsePage';
import { HorseDetailPage } from './components/HorseDetailPage';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HorseCategory, Horse } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<HorseCategory>('all');
  const [viewMode, setViewMode] = useState<'home' | 'category' | 'sell' | 'detail'>('home');
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  // Scroll to top when loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategorySelect = (category: HorseCategory) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setViewMode('home');
      setTimeout(() => {
        const element = document.getElementById('exemplars-list');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setViewMode('category');
      window.scrollTo(0, 0);
    }
  };

  const handleSellClick = () => {
    setViewMode('sell');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setSelectedCategory('all');
    setSelectedHorse(null);
    window.scrollTo(0, 0);
  };

  const handleHorseClick = (horse: Horse) => {
    setSelectedHorse(horse);
    setViewMode('detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans antialiased bg-stone-50 selection:bg-boutique-gold/30 selection:text-black min-h-screen relative">
      
      {/* Global Navbar */}
      <Navbar 
        activeCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect}
        onSellClick={handleSellClick}
        forceDark={viewMode !== 'home'}
      />

      {/* Render Homepage Content */}
      <div style={{ display: viewMode === 'home' ? 'block' : 'none' }}>
        <main>
          <Hero onSelectCategory={handleCategorySelect} />
          <CompanyIntro />
          {/* Pass click handler to Marketplace */}
          <Marketplace category={'all'} onHorseClick={handleHorseClick} />
          <Services />
        </main>
        <Footer />
      </div>

      {/* Render Internal Category Page (Overlay) */}
      <AnimatePresence>
        {viewMode === 'category' && selectedCategory !== 'all' && (
          <CategoryPage 
            category={selectedCategory} 
            onBack={handleBackToHome}
            onHorseClick={handleHorseClick}
          />
        )}
      </AnimatePresence>

      {/* Render Horse Detail Page (Overlay) */}
      <AnimatePresence>
        {viewMode === 'detail' && selectedHorse && (
          <HorseDetailPage 
            horse={selectedHorse}
            onBack={() => {
              // If we were in a specific category, go back there, else home
              if (selectedCategory !== 'all') {
                setViewMode('category');
              } else {
                handleBackToHome();
              }
            }}
            onRelatedClick={handleHorseClick}
          />
        )}
      </AnimatePresence>

      {/* Render Sell Horse Page (Overlay) */}
      <AnimatePresence>
        {viewMode === 'sell' && (
          <SellHorsePage 
            onBack={handleBackToHome} 
          />
        )}
      </AnimatePresence>

      <WhatsAppWidget />
    </div>
  );
}

export default App;