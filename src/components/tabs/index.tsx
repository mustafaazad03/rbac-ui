'use client';

import React, { useState } from 'react';

export interface TabItem {
  name: string;
  href: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tab: TabItem) => void;
}

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({ tabs, defaultTab, onTabChange }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(defaultTab || tabs[0].name);

  const handleTabChange = (tab: TabItem) => {
    setCurrentTab(tab.name);
    onTabChange?.(tab);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tab = tabs.find((t) => t.name === event.target.value);
    if (tab) {
      handleTabChange(tab);
    }
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={currentTab}
          onChange={handleSelectChange}
          className="block w-full rounded-md border-secondary-red py-2 pl-3 pr-10 text-base focus:border-fade-primary-red-2 focus:outline-none focus:ring-secondary-red sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab)}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive
                      ? 'border-secondary-red text-secondary-red'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                  )}
                >
                  {tab.name}
                </button>
              )}
            )}
          </nav>
        </div>
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.name === currentTab)?.content}
      </div>
    </div>
  );
}
