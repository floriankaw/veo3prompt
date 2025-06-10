
import React from 'react';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import ThinkingDotsIcon from './icons/ThinkingDotsIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import SpinnerIcon from './icons/SpinnerIcon'; // Import SpinnerIcon

interface ChatInputSectionProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean; // Processing the main query to fill the form
  error: string | null;
  translations: {
    title: string;
    placeholder: string;
    submitButton: string;
    processingText: string;
    errorText: string;
    randomIdeaButton: string;
  };
  onPickRandomIdea: () => void; // Handler for "Inspire Me"
  isInspireMeLoading: boolean; // Loading state for "Inspire Me"
}

const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  query,
  onQueryChange,
  onSubmit,
  isProcessing,
  error,
  translations,
  onPickRandomIdea,
  isInspireMeLoading, // New prop
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isProcessing && !isInspireMeLoading && query.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <section 
      aria-labelledby="ai-chat-input-title" 
      className="mb-10 p-6 bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-2xl ring-1 ring-sky-500/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow"
           style={{
             boxShadow: '0 0 20px 0px rgba(71, 159, 219, 0.2), 0 0 30px -5px rgba(126, 194, 239, 0.15)',
             animation: 'pulse-glow 5s infinite alternate ease-in-out'
           }}>
      </div>
       <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 25px 2px rgba(71, 159, 219, 0.25), 0 0 35px -5px rgba(126, 194, 239, 0.2); }
          100% { box-shadow: 0 0 40px 5px rgba(71, 159, 219, 0.35), 0 0 50px 0px rgba(126, 194, 239, 0.3); }
        }
      `}</style>

      <div className="relative z-10">
        <h2 id="ai-chat-input-title" className="text-xl font-semibold text-sky-300 mb-4 text-center">
          {translations.title}
        </h2>
        
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={translations.placeholder}
            rows={3}
            className="w-full p-3 pr-32 md:pr-28 border border-gray-600/80 bg-gray-700/70 text-gray-100 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-md transition-all duration-150 ease-in-out resize-none focus:shadow-sky-400/30 focus:shadow-lg"
            disabled={isProcessing || isInspireMeLoading}
            aria-label={translations.placeholder}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onPickRandomIdea}
              disabled={isProcessing || isInspireMeLoading}
              className="p-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 transform hover:scale-105 flex items-center justify-center min-w-[36px] min-h-[36px]"
              title={translations.randomIdeaButton} 
              aria-label={translations.randomIdeaButton}
            >
              {isInspireMeLoading ? (
                <SpinnerIcon className="w-5 h-5 animate-spin" />
              ) : (
                <LightbulbIcon className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isProcessing || isInspireMeLoading || !query.trim()}
              className="p-2.5 bg-sky-600 text-white rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 transform hover:scale-105 flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label={translations.submitButton}
            >
              {isProcessing ? (
                <ThinkingDotsIcon className="w-5 h-5 animate-pulse-dots" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5" />
              )}
            </button>
          </div>
           <style>{`
            @keyframes pulse-dots-animation {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            .animate-pulse-dots circle:nth-child(1) { animation: pulse-dots-animation 1.2s infinite 0s; }
            .animate-pulse-dots circle:nth-child(2) { animation: pulse-dots-animation 1.2s infinite 0.2s; }
            .animate-pulse-dots circle:nth-child(3) { animation: pulse-dots-animation 1.2s infinite 0.4s; }
          `}</style>
        </div>

        {(isProcessing || isInspireMeLoading) && (
          <p className="mt-3 text-sm text-sky-300 text-center flex items-center justify-center">
            <ThinkingDotsIcon className="w-4 h-4 mr-2 animate-pulse-dots" />
            {isInspireMeLoading ? "AI is crafting an idea..." : translations.processingText}
          </p>
        )}
        {error && !isProcessing && !isInspireMeLoading && ( // Show error only if not otherwise loading
          <p className="mt-3 text-sm text-red-400 bg-red-900/30 p-2 rounded-md text-center border border-red-700">
            {translations.errorText} <span className="block text-xs text-red-500 mt-1">{error}</span>
          </p>
        )}
      </div>
    </section>
  );
};

export default ChatInputSection;
