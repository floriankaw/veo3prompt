
import React from 'react';

interface SavePresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  presetName: string;
  setPresetName: (name: string) => void;
  translations: {
    modalTitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    saveButton: string;
    cancelButton: string;
  };
}

const SavePresetModal: React.FC<SavePresetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  presetName,
  setPresetName,
  translations
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md ring-1 ring-white/10 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalEnter">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">{translations.modalTitle}</h2>
        <div>
          <label htmlFor="presetName" className="block text-sm font-medium text-gray-300 mb-1">
            {translations.inputLabel}
          </label>
          <input
            type="text"
            id="presetName"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder={translations.inputPlaceholder}
            className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {translations.cancelButton}
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!presetName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
          >
            {translations.saveButton}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modalEnter {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalEnter {
          animation: modalEnter 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default SavePresetModal;