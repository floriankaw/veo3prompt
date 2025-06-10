import React from 'react';
import IconButton from './IconButton';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface OutputDisplayProps {
  promptText: string;
  onCopyPrompt: () => void;
  promptCopied: boolean;
  titleText: string; // e.g., "Generated Prompts"
  promptLabel: string; // e.g., "AI-Enhanced Veo 3 Prompt (English)"
  copyText: string;
  copiedText: string;
  isGenerating: boolean;
  generationError: string | null;
  outputDisplayLoadingText: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  promptText,
  onCopyPrompt,
  promptCopied,
  titleText,
  promptLabel,
  copyText,
  copiedText,
  isGenerating,
  generationError,
  outputDisplayLoadingText,
}) => {
  if (isGenerating) {
    return (
      <div className="mt-8 p-6 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-white/10">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-700 pb-3">{titleText}</h2>
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <SpinnerIcon className="w-12 h-12 text-sky-400 animate-spin mb-4" />
          <p className="text-lg text-sky-300">{outputDisplayLoadingText}</p>
        </div>
      </div>
    );
  }

  if (generationError) {
     return (
      <div className="mt-8 p-6 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-white/10">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-700 pb-3">{titleText}</h2>
        <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-center text-lg text-red-400">
                <span className="font-semibold block mb-2">Error Generating Prompt</span>
                {generationError}
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-white/10">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-700 pb-3">{titleText}</h2>
      {!promptText && (
         <p className="text-center text-gray-400 italic min-h-[200px] flex items-center justify-center">
            Fill the form and click "Generate Veo 3 Prompts" to see your AI-enhanced prompt here.
        </p>
      )}
      {promptText && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-200">{promptLabel}</h3>
            <IconButton
              onClick={onCopyPrompt}
              icon={promptCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
              text={promptCopied ? copiedText : copyText}
              className="text-xs"
              disabled={!promptText}
            />
          </div>
          <div 
            className="w-full p-3 border border-gray-700 bg-gray-900/50 rounded-lg shadow-sm text-sm text-gray-200 overflow-auto"
            style={{ minHeight: '330px', whiteSpace: 'pre-wrap' }} 
            aria-live="polite"
          >
            {promptText}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
