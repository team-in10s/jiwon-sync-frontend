import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Option = {
  platform: string;
  displayName: string;
  imageSrc: string | null;
};

type CustomSelectProps = {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function PlatformSelect({ options, selectedValue, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        {options.find((option) => option.platform === selectedValue)?.displayName || '플랫폼 선택'}
        <svg
          className={`size-5 transition-transform${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-600 bg-gray-800">
          {options.map((option, index) => (
            <li
              key={option.platform}
              className={`flex cursor-pointer items-center p-2 hover:bg-gray-600 ${
                selectedValue === option.platform ? 'bg-gray-600' : ''
              } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
              onClick={() => handleOptionClick(option.platform)}
              role="option"
              aria-selected={selectedValue === option.platform}
            >
              {option.imageSrc && (
                <Image
                  src={option.imageSrc}
                  alt={option.displayName}
                  width={24}
                  height={24}
                  className="mr-2 rounded-md"
                />
              )}
              <span className="text-white">{option.displayName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
