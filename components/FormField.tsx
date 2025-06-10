
import React, { useState } from 'react';
import { SelectOption, HybridFieldValue } from '../types';
import XMarkIcon from './icons/XMarkIcon'; // New icon for removing tags

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'hybrid';
  value: string | HybridFieldValue;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: HybridFieldValue } }) => void;
  placeholder?: string;
  options?: SelectOption[];
  rows?: number;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hybridOptionsLabel?: string; 
  hybridCustomLabel?: string;
  hybridCustomPlaceholder?: string;
  // Translations for sub-elements if needed from parent
  addOptionButtonText?: string;
  selectedOptionsLabelText?: string;
  noOptionsSelectedText?: string;
  addAnOptionText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options = [], // Ensure options is always an array
  rows = 3,
  required = false,
  className = '',
  icon,
  hybridOptionsLabel = "Add an option:", // Label for the dropdown to add
  hybridCustomLabel = "Custom input:",
  hybridCustomPlaceholder = "Type custom details...",
  addOptionButtonText = "Add",
  selectedOptionsLabelText = "Selected options:",
  noOptionsSelectedText = "None selected",
  addAnOptionText = "Select to add..."
}) => {
  const commonInputClasses = "bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 shadow-sm transition-colors duration-150";

  // State for the "add option" dropdown in hybrid fields
  const [currentHybridSelection, setCurrentHybridSelection] = useState<string>('');

  const handleHybridChange = (
    action: 'add' | 'remove' | 'custom' | 'addCustomTag',
    data?: string 
  ) => {
    const currentValue = value as HybridFieldValue;
    let newSelected = Array.isArray(currentValue.selected) ? [...currentValue.selected] : [];
    let newCustom = typeof currentValue.custom === 'string' ? currentValue.custom : '';

    if (action === 'add' && data) {
      if (!newSelected.includes(data)) {
        newSelected.push(data);
      }
    } else if (action === 'remove' && data) {
      newSelected = newSelected.filter(item => item !== data);
    } else if (action === 'custom') {
      newCustom = data !== undefined ? data : '';
    } else if (action === 'addCustomTag' && data) {
      const trimmedData = data.trim();
      if (trimmedData && !newSelected.includes(trimmedData)) {
        newSelected.push(trimmedData);
      }
      newCustom = ''; // Clear custom input after adding as tag
    }
    
    onChange({ target: { name: id, value: { selected: newSelected, custom: newCustom } } });
  };
  
  const handleCustomTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      const customText = (value as HybridFieldValue).custom;
      if (customText && customText.trim()) {
        handleHybridChange('addCustomTag', customText.trim());
      }
    }
  };


  if (type === 'hybrid') {
    const hybridValue = value as HybridFieldValue;
    const selectedItems = Array.isArray(hybridValue?.selected) ? hybridValue.selected : [];
    const customText = typeof hybridValue?.custom === 'string' ? hybridValue.custom : '';

    const availableOptions = options.filter(opt => !selectedItems.includes(opt.value));

    return (
      <div className={`mb-6 ${className}`}>
        <label className="flex items-center mb-2 text-sm font-medium text-gray-300">
          {icon && <span className="mr-2 h-5 w-5 text-gray-400">{icon}</span>}
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        
        {/* Selected Options (Tags) */}
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-400 mb-1 block">{selectedOptionsLabelText}</span>
          {selectedItems.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-2 border border-gray-600 rounded-md bg-gray-700/30 min-h-[40px]">
              {selectedItems.map(itemValue => {
                const itemLabel = options.find(opt => opt.value === itemValue)?.label || itemValue;
                return (
                  <span key={itemValue} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-100">
                    {itemLabel}
                    <button
                      type="button"
                      onClick={() => handleHybridChange('remove', itemValue)}
                      className="ml-1.5 flex-shrink-0 text-gray-400 hover:text-gray-200 focus:outline-none"
                      aria-label={`Remove ${itemLabel}`}
                    >
                      <XMarkIcon className="h-3.5 w-3.5" />
                    </button>
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic px-2 py-1">{noOptionsSelectedText}</p>
          )}
        </div>

        {/* Add Option Dropdown */}
        <div className="mb-3">
          <label htmlFor={`${id}-add-option`} className="text-xs font-medium text-gray-400 mb-1 block">{hybridOptionsLabel}</label>
          <div className="flex items-center gap-2">
            <select
              id={`${id}-add-option`}
              value={currentHybridSelection}
              onChange={(e) => setCurrentHybridSelection(e.target.value)}
              className={`${commonInputClasses} flex-grow appearance-none`}
              disabled={availableOptions.length === 0}
            >
              <option value="">{availableOptions.length > 0 ? addAnOptionText : "No more options"}</option>
              {availableOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-gray-700 text-gray-100">
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                if (currentHybridSelection) {
                  handleHybridChange('add', currentHybridSelection);
                  setCurrentHybridSelection(''); // Reset dropdown
                }
              }}
              disabled={!currentHybridSelection}
              className="px-4 py-2.5 text-sm font-medium text-gray-100 bg-gray-600 rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {addOptionButtonText}
            </button>
          </div>
        </div>

        {/* Custom Text Area */}
        <div>
          <label htmlFor={`${id}-custom`} className="text-xs font-medium text-gray-400 mb-1 block">{hybridCustomLabel}</label>
          <textarea
            id={`${id}-custom`}
            name={`${id}-custom`}
            rows={3}
            value={customText}
            onChange={(e) => handleHybridChange('custom', e.target.value)}
            onKeyDown={handleCustomTextareaKeyDown}
            placeholder={hybridCustomPlaceholder}
            className={`${commonInputClasses} resize-y`}
          />
        </div>
      </div>
    );
  }

  // Fallback for non-hybrid types (text, textarea, select)
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="flex items-center mb-2 text-sm font-medium text-gray-300">
        {icon && <span className="mr-2 h-5 w-5 text-gray-400">{icon}</span>}
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value as string}
          // @ts-ignore
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${commonInputClasses} resize-y`}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value as string}
          // @ts-ignore
          onChange={onChange}
          required={required}
          className={`${commonInputClasses} appearance-none`}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-700 text-gray-100">
              {option.label} 
            </option>
          ))}
        </select>
      ) : ( // text input
        <input
          type={type === 'text' ? 'text' : type} // handles text and other potential future flat input types
          id={id}
          name={id}
          value={value as string}
          // @ts-ignore
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonInputClasses}
        />
      )}
    </div>
  );
};

export default FormField;
