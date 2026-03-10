'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function TabGroup({ tabs, activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-white/[0.04] rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === tab.key
              ? 'bg-[#1DB954] text-black shadow-lg shadow-[#1DB954]/20'
              : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
