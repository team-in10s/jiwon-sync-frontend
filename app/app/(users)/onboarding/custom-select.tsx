import { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  onSelect,
  placeholder = '플랫폼 선택',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDisabled = options.length === 0;

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
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-2 text-white ${
          isDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        // className="flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {options.find((option) => option.value === selectedValue)?.label || placeholder}
        <svg
          className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && !isDisabled && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-600 bg-gray-800">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`cursor-pointer p-2 hover:bg-gray-600 ${
                selectedValue === option.value ? 'bg-gray-600' : ''
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === options.length - 1 ? 'rounded-b-lg' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              <span className="text-white">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
