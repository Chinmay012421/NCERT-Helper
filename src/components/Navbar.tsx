import React from 'react';
import { ActiveTab } from '../types/study';
import { Sparkles, Home, BookOpen, FileText, Layers, Library } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  streakDays: number;
  onQuickFocus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navLinks: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ncert', label: 'Solutions & AI', icon: BookOpen },
    { id: 'notes', label: 'AI Notes', icon: FileText },
    { id: 'ncert-diagrams', label: 'Diagrams', icon: Layers },
    { id: 'ncert-pdfs', label: 'Textbooks', icon: Library },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-15 flex items-center justify-between gap-4">
          {/* Brand on the left */}
          <button
            onClick={() => setActiveTab('home')}
            className="font-brand font-black text-lg sm:text-xl tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            NCERT HELPER
          </button>

          {/* Desktop Navigation links */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-medium">
              {navLinks.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-2.5 py-1 transition-colors whitespace-nowrap rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'text-amber-400 font-semibold bg-stone-800/60'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setActiveTab('ncert')}
              className="flex items-center gap-1.5 px-3 py-1.5 font-brand text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Ask AI Doubt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Phone Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 border-t border-stone-800/80 backdrop-blur-lg px-1.5 py-1.5 flex items-center justify-around shadow-2xl">
        {navLinks.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors rounded-lg cursor-pointer ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-amber-400 stroke-[2.5]' : 'text-stone-400'}`} />
              <span className="text-[10px] tracking-tight font-medium leading-none">
                {item.id === 'ncert' ? 'Solutions' : item.id === 'ncert-diagrams' ? 'Diagrams' : item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
