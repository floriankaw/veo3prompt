
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PromptData, HybridFieldValue, AppTranslations, SelectOption, AllAppPresets, Preset, SectionPresetData } from './types';
import { 
  DIALOGUE_LANGUAGES, 
  CAMERA_MOTIONS_OPTIONS, 
  INITIAL_PROMPT_DATA,
  CHARACTER_ACTIONS_OPTIONS,
  CHARACTER_EXPRESSIONS_OPTIONS,
  CHARACTER_VOICE_OPTIONS,
  ENVIRONMENTAL_SOUNDS_OPTIONS,
  LOCATION_TIME_OPTIONS,
  OVERALL_ATMOSPHERE_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  COLOR_GRADING_OPTIONS,
  LIGHTING_STYLE_OPTIONS,
  VIDEO_ASPECT_RATIO_OPTIONS,
  VIDEO_RESOLUTION_OPTIONS,
  FRAME_RATE_OPTIONS,
  MOTION_EFFECTS_OPTIONS,
  AUDIO_AMBIENCE_OPTIONS,
  SUBTITLES_OPTIONS,
  RANDOM_SCENE_TITLES,
  RANDOM_CORE_CHAR_DESCRIPTIONS,
  RANDOM_ADDITIONAL_VISUAL_DETAILS,
  RANDOM_DIALOGUES,
  RANDOM_NEGATIVE_PROMPTS,
  RANDOM_STYLE_CUSTOMIZATIONS,
  pickRandom,
  pickRandomMultiple
} from './constants';
import { translations as appTranslations } from './translations';
import * as presetService from './services/presetService';

import FormField from './components/FormField';
import OutputDisplay from './components/OutputDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInputSection from './components/ChatInputSection';
import SavePresetModal from './components/SavePresetModal';
import LoginPage from './components/LoginPage'; // Import LoginPage

import LanguageIcon from './components/icons/LanguageIcon';
import SceneIcon from './components/icons/SceneIcon';
import CharacterIcon from './components/icons/CharacterIcon';
import LocationIcon from './components/icons/LocationIcon';
import CameraIcon from './components/icons/CameraIcon';
import DialogueIcon from './components/icons/DialogueIcon';
import SettingsIcon from './components/icons/SettingsIcon';
import IconButton from './components/IconButton';
import SparklesIcon from './components/icons/SparklesIcon';
import SpinnerIcon from './components/icons/SpinnerIcon';
import SaveIcon from './components/icons/SaveIcon';
import TrashIcon from './components/icons/TrashIcon';
import ChevronDownIcon from './components/icons/ChevronDownIcon';
import RefreshIcon from './components/icons/RefreshIcon';


let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
} else {
  console.warn("API_KEY environment variable is not set. Gemini AI features will be disabled.");
}

const SESSION_STORAGE_AUTH_KEY = 'veo3pro_authenticated';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [formData, setFormData] = useState<PromptData>(() => JSON.parse(JSON.stringify(INITIAL_PROMPT_DATA)));
  const [englishPrompt, setEnglishPrompt] = useState<string>('');
  const [englishCopied, setEnglishCopied] = useState<boolean>(false);
  const currentTranslations: AppTranslations = appTranslations; 
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false); 
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState<string>('');
  const [isChatQueryProcessing, setIsChatQueryProcessing] = useState<boolean>(false); 
  const [chatQueryError, setChatQueryError] = useState<string | null>(null);
  const [isInspireMeLoading, setIsInspireMeLoading] = useState<boolean>(false); 

  const outputRef = useRef<HTMLDivElement>(null);

  const [allPresets, setAllPresets] = useState<AllAppPresets>({});
  const [isSavePresetModalOpen, setIsSavePresetModalOpen] = useState<boolean>(false);
  const [currentSectionKeyForModal, setCurrentSectionKeyForModal] = useState<string | null>(null);
  const [newPresetNameInput, setNewPresetNameInput] = useState<string>('');
  const [activePresetDropdownKey, setActivePresetDropdownKey] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState<number>(0); 
  
  useEffect(() => {
    // Check session storage for existing authentication
    const storedAuthStatus = sessionStorage.getItem(SESSION_STORAGE_AUTH_KEY);
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
    setAllPresets(presetService.loadAllPresets());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, 'true');
  };

  const ALL_OPTIONS_MAP = useMemo(() => ({
    characterVoiceDetails: CHARACTER_VOICE_OPTIONS,
    characterActions: CHARACTER_ACTIONS_OPTIONS,
    characterExpressions: CHARACTER_EXPRESSIONS_OPTIONS,
    locationTimeBackground: LOCATION_TIME_OPTIONS,
    overallAtmosphere: OVERALL_ATMOSPHERE_OPTIONS,
    environmentalSounds: ENVIRONMENTAL_SOUNDS_OPTIONS,
    visualStyle: VISUAL_STYLE_OPTIONS,
    colorGrading: COLOR_GRADING_OPTIONS,
    lightingStyle: LIGHTING_STYLE_OPTIONS,
    motionEffects: MOTION_EFFECTS_OPTIONS,
    audioAmbience: AUDIO_AMBIENCE_OPTIONS,
  }), []);
  
  const formatHybridFieldValue = useCallback((value: HybridFieldValue, fieldKey?: keyof typeof ALL_OPTIONS_MAP): string => {
    let parts: string[] = [];
    if (value.selected && value.selected.length > 0) {
      const optionsSet = fieldKey ? ALL_OPTIONS_MAP[fieldKey] || [] : [];
      const selectedLabels = value.selected.map(val => {
        return optionsSet.find(opt => opt.value === val)?.label || val;
      });
      parts = parts.concat(selectedLabels);
    }
    if (value.custom && value.custom.trim()) {
      parts.push(value.custom.trim());
    }
    return parts.join(', ');
  }, [ALL_OPTIONS_MAP]);

  const buildInitialStructuredPrompt = useCallback((data: PromptData): string => {
    const {
      dialogueLanguage, sceneTitle, coreCharacterDescription, characterVoiceDetails, characterActions,
      characterExpressions, locationTimeBackground, additionalVisualDetails,
      overallAtmosphere, environmentalSounds, characterDialogue,
      negativePrompts, cameraMotion, styleCustomization,
      visualStyle, colorGrading, lightingStyle, videoAspectRatio, videoResolution,
      frameRate, motionEffects, audioAmbience, subtitles
    } = data;

    const parts: string[] = [];
    const addPartInternal = (label: string, value: string | HybridFieldValue | undefined, fieldKey?: keyof typeof ALL_OPTIONS_MAP, optionsList?: SelectOption[]) => {
        if (value === undefined || value === null) return;
        let formattedValue = '';
        if (typeof value === 'string') {
            if (optionsList) { 
                formattedValue = optionsList.find(opt => opt.value === value)?.label || value;
            } else {
                formattedValue = value.trim();
            }
        } else if (value && typeof value === 'object' && ('selected' in value || 'custom' in value)) { 
            formattedValue = formatHybridFieldValue(value as HybridFieldValue, fieldKey).trim();
        }
        
        if (formattedValue) {
            parts.push(`${label.toUpperCase()}: ${formattedValue}`);
        }
    };
    
    addPartInternal("Scene Title", sceneTitle);
    addPartInternal("Core Character Description", coreCharacterDescription);
    addPartInternal("Character Voice Details", characterVoiceDetails, 'characterVoiceDetails');
    addPartInternal("Character Actions", characterActions, 'characterActions');
    addPartInternal("Character Expressions", characterExpressions, 'characterExpressions');
    addPartInternal("Location & Time Background", locationTimeBackground, 'locationTimeBackground');
    addPartInternal("Additional Visual Details", additionalVisualDetails);
    addPartInternal("Overall Atmosphere", overallAtmosphere, 'overallAtmosphere');
    addPartInternal("Environmental Sounds", environmentalSounds, 'environmentalSounds');
    addPartInternal("Character Dialogue (content)", characterDialogue);
    if (dialogueLanguage) {
        const langLabel = DIALOGUE_LANGUAGES.find(opt => opt.value === dialogueLanguage)?.label || dialogueLanguage;
        addPartInternal("Video Dialogue Language", langLabel);
    }
    addPartInternal("Camera Motion", cameraMotion, undefined, CAMERA_MOTIONS_OPTIONS);
    addPartInternal("General Style Notes", styleCustomization);

    parts.push("\n--- CINEMATIC & PROFESSIONAL DETAILS ---");
    addPartInternal("Visual Style", visualStyle, 'visualStyle');
    addPartInternal("Color Grading", colorGrading, 'colorGrading');
    addPartInternal("Lighting Style", lightingStyle, 'lightingStyle');
    addPartInternal("Video Aspect Ratio", videoAspectRatio, undefined, VIDEO_ASPECT_RATIO_OPTIONS);
    addPartInternal("Video Resolution", videoResolution, undefined, VIDEO_RESOLUTION_OPTIONS);
    addPartInternal("Frame Rate (FPS)", frameRate, undefined, FRAME_RATE_OPTIONS);
    addPartInternal("Motion Effects & Lens", motionEffects, 'motionEffects');
    addPartInternal("Audio Ambience & Sound Design", audioAmbience, 'audioAmbience');
    addPartInternal("Subtitles", subtitles, undefined, SUBTITLES_OPTIONS);
    
    addPartInternal("Negative Prompts (Avoid)", negativePrompts);

    return parts.filter(p => p.trim() !== "--- CINEMATIC & PROFESSIONAL DETAILS ---" || parts.some(part => part.startsWith("VISUAL STYLE:") || part.startsWith("COLOR GRADING:"))).join('\n\n');
  }, [formatHybridFieldValue, ALL_OPTIONS_MAP]);

  const generatePromptsWithGemini = useCallback(async () => {
    if (!ai) {
      setGenerationError("Gemini AI SDK not initialized. API_KEY might be missing or invalid.");
      setEnglishPrompt('');
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setEnglishPrompt('');

    const structuredBase = buildInitialStructuredPrompt(formData);
    const videoDialogueLanguageLabel = DIALOGUE_LANGUAGES.find(l => l.value === formData.dialogueLanguage)?.label || formData.dialogueLanguage;

    try {
      const geminiPromptInstruction = `You are VEO3PRO, a specialized AI assistant that crafts advanced, highly descriptive, and cinematic prompts for the Veo 3 video generation model.
Your task is to take the structured details provided below and transform them into a cohesive, evocative, and detailed narrative prompt in English.
The prompt should:
- Be rich in sensory details (visual, auditory, atmospheric).
- Ensure character consistency in description, action, and expression.
- Vividly paint the scene, location, and time.
- Clearly define the visual style, color grading, lighting, and camera work for a high-budget cinematic feel.
- Incorporate all professional tool specifications.
- Structure sentences well for maximum impact and clarity.
- The dialogue *within the video described by this prompt* should be in ${videoDialogueLanguageLabel}.
The final output should be a single, coherent prompt (possibly a few paragraphs) ready for Veo 3.

Here are the structured details:`;

      const apiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: `${geminiPromptInstruction}\n\n${structuredBase}`
      });
      setEnglishPrompt(apiResponse.text.trim());

    } catch (error: any) {
      console.error("Error generating prompt with Gemini:", error);
      let errorMessage = "Failed to generate prompt with AI. Please try again.";
      if (error.message) {
          errorMessage += ` Details: ${error.message}`;
      }
      setGenerationError(errorMessage);
      setEnglishPrompt('Error generating prompt.');
    } finally {
      setIsGenerating(false);
    }
  }, [formData, buildInitialStructuredPrompt]);

  const handleManualPromptGeneration = () => {
    generatePromptsWithGemini();
    if (outputRef.current) {
        setTimeout(() => {
            outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); 
    }
  };

  const handleNaturalLanguageQueryChange = (value: string) => {
    setNaturalLanguageQuery(value);
  };
  
  const handlePickRandomChatIdea = async () => {
    if (!ai) {
      setChatQueryError("AI features are disabled (API key might be missing). Cannot generate idea.");
      return;
    }
    setIsInspireMeLoading(true);
    setChatQueryError(null);
    try {
      const ideaPrompt = `Generate a single, creative, detailed, and concise (1-3 sentences) video concept suitable for the Veo 3 video generation model. 
      The idea should have cinematic potential, hinting at a story, interesting characters, or a unique visual scene. Avoid cliches. Make it intriguing.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: ideaPrompt,
      });
      setNaturalLanguageQuery(response.text.trim());
    } catch (error: any) {
      console.error("Error generating AI idea for chat:", error);
      setChatQueryError("Failed to generate an AI idea. Please try again.");
    } finally {
      setIsInspireMeLoading(false);
    }
  };

  const formSections = useMemo(() => [ 
    {
     key: 'general',
     title: currentTranslations.formSectionTitles.general,
     icon: <LanguageIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'dialogueLanguage', label: currentTranslations.dialogueLanguage, type: 'select', options: DIALOGUE_LANGUAGES },
       { id: 'sceneTitle', label: currentTranslations.sceneTitle, placeholder: "e.g., Midnight Rendezvous" },
     ]
   },
   {
     key: 'character',
     title: currentTranslations.formSectionTitles.character,
     icon: <CharacterIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'coreCharacterDescription', label: currentTranslations.coreCharacterDescription, type: 'textarea', placeholder: "e.g., A grizzled detective haunted by his past..." },
       { id: 'characterVoiceDetails', label: currentTranslations.characterVoiceDetails, type: 'hybrid', options: CHARACTER_VOICE_OPTIONS, hybridCustomPlaceholder: currentTranslations.customInputPlaceholder },
       { id: 'characterActions', label: currentTranslations.characterActions, type: 'hybrid', options: CHARACTER_ACTIONS_OPTIONS, hybridCustomPlaceholder: currentTranslations.customInputPlaceholder },
       { id: 'characterExpressions', label: currentTranslations.characterExpressions, type: 'hybrid', options: CHARACTER_EXPRESSIONS_OPTIONS, hybridCustomPlaceholder: currentTranslations.customInputPlaceholder },
     ]
   },
   {
     key: 'environment',
     title: currentTranslations.formSectionTitles.environment,
     icon: <LocationIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'locationTimeBackground', label: currentTranslations.locationTimeBackground, type: 'hybrid', options: LOCATION_TIME_OPTIONS, hybridCustomPlaceholder: "e.g., A derelict spaceship, eternal twilight" },
       { id: 'overallAtmosphere', label: currentTranslations.overallAtmosphere, type: 'hybrid', options: OVERALL_ATMOSPHERE_OPTIONS, hybridCustomPlaceholder: currentTranslations.customInputPlaceholder },
       { id: 'environmentalSounds', label: currentTranslations.environmentalSounds, type: 'hybrid', options: ENVIRONMENTAL_SOUNDS_OPTIONS, hybridCustomPlaceholder: currentTranslations.customInputPlaceholder },
     ]
   },
   {
     key: 'visuals',
     title: currentTranslations.formSectionTitles.visuals,
     icon: <CameraIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'additionalVisualDetails', label: currentTranslations.additionalVisualDetails, type: 'textarea', placeholder: "e.g., Lens flares, shallow depth of field, dust motes..." },
       { id: 'cameraMotion', label: currentTranslations.cameraMotion, type: 'select', options: CAMERA_MOTIONS_OPTIONS },
       { id: 'styleCustomization', label: currentTranslations.styleCustomization, placeholder: "General style notes or specific requests not covered elsewhere" },
     ]
   },
   {
     key: 'professionalTools',
     title: currentTranslations.formSectionTitles.professionalTools!,
     icon: <SettingsIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'visualStyle', label: currentTranslations.visualStyle, type: 'hybrid', options: VISUAL_STYLE_OPTIONS, hybridCustomPlaceholder: "Describe a unique visual blend..." },
       { id: 'colorGrading', label: currentTranslations.colorGrading, type: 'hybrid', options: COLOR_GRADING_OPTIONS, hybridCustomPlaceholder: "Custom color palette notes..." },
       { id: 'lightingStyle', label: currentTranslations.lightingStyle, type: 'hybrid', options: LIGHTING_STYLE_OPTIONS, hybridCustomPlaceholder: "Specific lighting nuances..." },
       { id: 'videoAspectRatio', label: currentTranslations.videoAspectRatio, type: 'select', options: VIDEO_ASPECT_RATIO_OPTIONS },
       { id: 'videoResolution', label: currentTranslations.videoResolution, type: 'select', options: VIDEO_RESOLUTION_OPTIONS },
       { id: 'frameRate', label: currentTranslations.frameRate, type: 'select', options: FRAME_RATE_OPTIONS },
       { id: 'motionEffects', label: currentTranslations.motionEffects, type: 'hybrid', options: MOTION_EFFECTS_OPTIONS, hybridCustomPlaceholder: "e.g., specific lens distortion, unique transitions" },
       { id: 'audioAmbience', label: currentTranslations.audioAmbience, type: 'hybrid', options: AUDIO_AMBIENCE_OPTIONS, hybridCustomPlaceholder: "Custom sound design notes, specific music style..." },
       { id: 'subtitles', label: currentTranslations.subtitles, type: 'select', options: SUBTITLES_OPTIONS },
     ]
   },
   {
     key: 'content',
     title: currentTranslations.formSectionTitles.content,
     icon: <DialogueIcon className="w-6 h-6 text-sky-400" />,
     fields: [
       { id: 'characterDialogue', label: currentTranslations.characterDialogue, type: 'textarea', placeholder: "Enter character lines here..." },
       { id: 'negativePrompts', label: currentTranslations.negativePrompts, placeholder: "e.g., No close-ups, avoid bright colors, no text overlays" },
     ]
   }
 ], [currentTranslations]); 

  const handleNaturalLanguageQuerySubmit = useCallback(async () => {
    if (!naturalLanguageQuery.trim() || !ai) {
      if(!ai) setChatQueryError("AI features are disabled (API key might be missing).");
      return;
    }

    setIsChatQueryProcessing(true);
    setChatQueryError(null);

    const systemInstruction = `You are VEO3PRO Form Assistant, an AI expert at understanding natural language video descriptions and translating them into a structured JSON format suitable for pre-filling a detailed video prompt generation form.
The user will provide a natural language description of a video they want to create.
Your task is to analyze this description and extract information for the following fields.
Return ONLY a single, valid JSON object with keys corresponding to these fields.
If information for a field is not present in the user's query, omit the key from your JSON response.
For fields that represent a concept (e.g., 'visualStyle', 'coreCharacterDescription'), provide a concise descriptive string.
Do not add any explanations or introductory text outside the JSON object.

Possible fields to extract (use these exact key names in your JSON):
- sceneTitle
- coreCharacterDescription
- characterVoiceDetails (as string)
- characterActions (as string)
- characterExpressions (as string)
- locationTimeBackground (as string)
- additionalVisualDetails
- overallAtmosphere (as string)
- environmentalSounds (as string)
- characterDialogue
- negativePrompts
- cameraMotion (use values from: ${CAMERA_MOTIONS_OPTIONS.map(o => o.value).filter(v => v).join(', ')})
- styleCustomization
- visualStyle (as string, try to map to values like: ${VISUAL_STYLE_OPTIONS.map(o => o.value).join(', ')})
- colorGrading (as string, try to map to values like: ${COLOR_GRADING_OPTIONS.map(o => o.value).join(', ')})
- lightingStyle (as string, try to map to values like: ${LIGHTING_STYLE_OPTIONS.map(o => o.value).join(', ')})
- videoAspectRatio (use values from: ${VIDEO_ASPECT_RATIO_OPTIONS.map(o => o.value).join(', ')})
- videoResolution (use values from: ${VIDEO_RESOLUTION_OPTIONS.map(o => o.value).join(', ')})
- frameRate (use values from: ${FRAME_RATE_OPTIONS.map(o => o.value).join(', ')})
- motionEffects (as string, try to map to values like: ${MOTION_EFFECTS_OPTIONS.map(o => o.value).join(', ')})
- audioAmbience (as string, try to map to values like: ${AUDIO_AMBIENCE_OPTIONS.map(o => o.value).join(', ')})
- subtitles (use values from: ${SUBTITLES_OPTIONS.map(o => o.value).join(', ')})
- dialogueLanguage (Infer from user query if language is mentioned for dialogue, use values: ${DIALOGUE_LANGUAGES.map(o => o.value).join(', ')}. If not mentioned, omit.)
`;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: [{role: "user", parts: [{text: naturalLanguageQuery}]}],
        config: { 
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
        }
      });
      
      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }

      const parsedAiResponse = JSON.parse(jsonStr);
      
      setFormData(_prevData => {
        const newData = JSON.parse(JSON.stringify(INITIAL_PROMPT_DATA)); 
        for (const key in parsedAiResponse) {
          if (Object.prototype.hasOwnProperty.call(parsedAiResponse, key) && Object.prototype.hasOwnProperty.call(newData, key)) {
            const aiValue = parsedAiResponse[key];
            const fieldKey = key as keyof PromptData;
            
            const formFieldDefinition = (formSections.flatMap(s => s.fields) as Array<{ id: keyof PromptData, type?: string, options?: SelectOption[]}>)
              .find(f => f.id === fieldKey);

            const currentFormFieldValue = newData[fieldKey];
            
            if (formFieldDefinition?.type === 'select') {
              const optionExists = formFieldDefinition.options?.some(opt => opt.value === aiValue);
              if (optionExists) {
                 (newData as any)[fieldKey] = aiValue;
              } else if (typeof aiValue === 'string' && !optionExists) {
                console.warn(`AI suggested value "${aiValue}" for select field "${fieldKey}" which is not in options. Keeping original or default.`);
              }
            } else if (typeof currentFormFieldValue === 'string') {
                (newData as any)[fieldKey] = typeof aiValue === 'string' ? aiValue : String(aiValue);
            } else if (currentFormFieldValue && typeof currentFormFieldValue === 'object' && 'selected' in currentFormFieldValue && 'custom' in currentFormFieldValue) {
                const newHybridField: HybridFieldValue = { 
                  selected: [...(currentFormFieldValue as HybridFieldValue).selected], 
                  custom: '' 
                };

                newHybridField.custom = typeof aiValue === 'string' ? aiValue : Array.isArray(aiValue) ? aiValue.join(', ') : String(aiValue);
                
                const optionsForHybrid = ALL_OPTIONS_MAP[fieldKey as keyof typeof ALL_OPTIONS_MAP];
                if (typeof aiValue === 'string' && optionsForHybrid?.some(opt => opt.value === aiValue || opt.label.toLowerCase() === aiValue.toLowerCase())) {
                    const matchedOption = optionsForHybrid.find(opt => opt.value === aiValue || opt.label.toLowerCase() === aiValue.toLowerCase());
                    if (matchedOption && !newHybridField.selected.includes(matchedOption.value)) {
                        newHybridField.selected.push(matchedOption.value);
                        newHybridField.custom = ''; 
                    }
                }
                (newData as any)[fieldKey] = newHybridField;
            }
          }
        }
        return newData;
      });
      setResetCounter(prev => prev + 1);

    } catch (error: any) {
      console.error("Error processing natural language query with Gemini:", error);
      let detailedError = error.message || "Unknown error";
      if (error.message && error.message.includes("JSON")) {
          detailedError = "AI returned an invalid format. " + detailedError;
      }
      setChatQueryError(`AI Error: ${detailedError}`);
    } finally {
      setIsChatQueryProcessing(false);
    }
  }, [naturalLanguageQuery, formSections, ALL_OPTIONS_MAP]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: HybridFieldValue } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateRandomPrompt = () => {
    const randomDialogueLang = pickRandom(DIALOGUE_LANGUAGES);
    const randomData: PromptData = {
      dialogueLanguage: randomDialogueLang.value,
      sceneTitle: pickRandom(RANDOM_SCENE_TITLES),
      coreCharacterDescription: pickRandom(RANDOM_CORE_CHAR_DESCRIPTIONS),
      characterVoiceDetails: {
        selected: pickRandomMultiple(CHARACTER_VOICE_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value),
        custom: Math.random() > 0.7 ? pickRandom(["with a slight rasp", "accented"]) : ""
      },
      characterActions: {
        selected: pickRandomMultiple(CHARACTER_ACTIONS_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value),
        custom: Math.random() > 0.7 ? pickRandom(["nervously fidgets", "gazes intently"]) : ""
      },
      characterExpressions: {
        selected: pickRandomMultiple(CHARACTER_EXPRESSIONS_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value),
        custom: Math.random() > 0.7 ? pickRandom(["a flicker of doubt", "a confident smirk"]) : ""
      },
      locationTimeBackground: {
        selected: [pickRandom(LOCATION_TIME_OPTIONS).value],
        custom: Math.random() > 0.7 ? pickRandom(["eerie silence", "hum of ancient tech"]) : ""
      },
      additionalVisualDetails: pickRandom(RANDOM_ADDITIONAL_VISUAL_DETAILS),
      overallAtmosphere: {
        selected: [pickRandom(OVERALL_ATMOSPHERE_OPTIONS).value],
        custom: Math.random() > 0.7 ? pickRandom(["tinged with nostalgia", "unbearably tense"]) : ""
      },
      environmentalSounds: {
        selected: pickRandomMultiple(ENVIRONMENTAL_SOUNDS_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value),
        custom: Math.random() > 0.7 ? pickRandom(["a distant, mournful song", "the creak of old wood"]) : ""
      },
      characterDialogue: pickRandom(RANDOM_DIALOGUES),
      negativePrompts: pickRandom(RANDOM_NEGATIVE_PROMPTS),
      cameraMotion: pickRandom(CAMERA_MOTIONS_OPTIONS).value,
      styleCustomization: pickRandom(RANDOM_STYLE_CUSTOMIZATIONS),

      visualStyle: { selected: [pickRandom(VISUAL_STYLE_OPTIONS).value], custom: Math.random() > 0.8 ? "a unique blend of styles" : "" },
      colorGrading: { selected: [pickRandom(COLOR_GRADING_OPTIONS).value], custom: "" },
      lightingStyle: { selected: [pickRandom(LIGHTING_STYLE_OPTIONS).value], custom: Math.random() > 0.8 ? "with dramatic god rays" : "" },
      videoAspectRatio: pickRandom(VIDEO_ASPECT_RATIO_OPTIONS).value,
      videoResolution: pickRandom(VIDEO_RESOLUTION_OPTIONS).value,
      frameRate: pickRandom(FRAME_RATE_OPTIONS).value,
      motionEffects: { 
        selected: pickRandomMultiple(MOTION_EFFECTS_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value), 
        custom: Math.random() > 0.8 ? "subtle lens distortions on edges" : "" 
      },
      audioAmbience: { 
        selected: pickRandomMultiple(AUDIO_AMBIENCE_OPTIONS, Math.floor(Math.random() * 2) + 1).map(opt => opt.value),
        custom: Math.random() > 0.8 ? "a recurring motif theme" : "" 
      },
      subtitles: pickRandom(SUBTITLES_OPTIONS).value,
    };
    setFormData(randomData);
    setEnglishPrompt('');
    setGenerationError(null);
    setNaturalLanguageQuery(''); 
    setResetCounter(prev => prev + 1); 
  };
  
  const handleResetForm = () => {
    setFormData(JSON.parse(JSON.stringify(INITIAL_PROMPT_DATA)));
    setEnglishPrompt('');
    setGenerationError(null);
    setNaturalLanguageQuery('');
    setEnglishCopied(false);
    setActivePresetDropdownKey(null); 
    setResetCounter(prev => prev + 1); 
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setEnglishCopied(true);
      setTimeout(() => setEnglishCopied(false), 2000);
    }).catch(err => console.error('Failed to copy:', err));
  };

  const handleOpenSavePresetModal = (sectionKey: string) => {
    setCurrentSectionKeyForModal(sectionKey);
    setNewPresetNameInput('');
    setIsSavePresetModalOpen(true);
  };

  const handleCloseSavePresetModal = () => {
    setIsSavePresetModalOpen(false);
    setCurrentSectionKeyForModal(null);
    setNewPresetNameInput('');
  };

  const handleConfirmSavePreset = () => {
    if (!currentSectionKeyForModal || !newPresetNameInput.trim()) return;

    const sectionInfo = formSections.find(s => s.key === currentSectionKeyForModal);
    if (!sectionInfo) return;

    const presetData: SectionPresetData = {};
    sectionInfo.fields.forEach(field => {
      const fieldId = field.id as keyof PromptData;
      if (Object.prototype.hasOwnProperty.call(formData, fieldId)) {
        (presetData as any)[fieldId] = formData[fieldId];
      }
    });

    const newPreset: Preset = { name: newPresetNameInput.trim(), data: presetData };
    const updatedPresets = presetService.addPresetToSection(currentSectionKeyForModal, newPreset, allPresets);
    setAllPresets(updatedPresets);
    handleCloseSavePresetModal();
  };

  const handleLoadPreset = (sectionKey: string, presetName: string) => {
    const sectionPresets = allPresets[sectionKey];
    const presetToLoad = sectionPresets?.find(p => p.name === presetName);
    if (presetToLoad) {
      setFormData(prev => JSON.parse(JSON.stringify({ ...prev, ...presetToLoad.data })));
      setActivePresetDropdownKey(null);
      setResetCounter(prev => prev + 1); 
    }
  };

  const handleDeletePreset = (sectionKey: string, presetName: string) => {
    if (window.confirm(currentTranslations.presetManager.deletePresetPrompt)) {
      const updatedPresets = presetService.deletePresetFromSection(sectionKey, presetName, allPresets);
      setAllPresets(updatedPresets);
    }
  };
  
  const togglePresetDropdown = (sectionKey: string) => {
    setActivePresetDropdownKey(prevKey => (prevKey === sectionKey ? null : sectionKey));
  };
  
  if (!isAuthenticated) {
    return <LoginPage 
              onLoginSuccess={handleLoginSuccess} 
              translations={{
                loginPageTitle: currentTranslations.loginPageTitle,
                loginUsernameLabel: currentTranslations.loginUsernameLabel,
                loginPasswordLabel: currentTranslations.loginPasswordLabel,
                loginButtonText: currentTranslations.loginButtonText,
                loginErrorMessage: currentTranslations.loginErrorMessage,
              }} 
            />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header title={currentTranslations.headerTitle} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full max-w-7xl">
        
        <ChatInputSection
          query={naturalLanguageQuery}
          onQueryChange={handleNaturalLanguageQueryChange}
          onSubmit={handleNaturalLanguageQuerySubmit}
          isProcessing={isChatQueryProcessing}
          error={chatQueryError}
          translations={{
            title: currentTranslations.aiChatInputTitle,
            placeholder: currentTranslations.aiChatInputPlaceholder,
            submitButton: currentTranslations.aiChatInputSubmitButton,
            processingText: currentTranslations.aiChatInputProcessing,
            errorText: currentTranslations.aiChatInputError,
            randomIdeaButton: currentTranslations.aiChatInputRandomIdeaButton, 
          }}
          onPickRandomIdea={handlePickRandomChatIdea}
          isInspireMeLoading={isInspireMeLoading} 
        />

        <p className="mb-8 text-center text-gray-300 text-md">
          {currentTranslations.formGeneralDescription}
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
          {formSections.map((section) => (
            <section key={section.key} aria-labelledby={`section-title-${section.key}`} className="p-6 bg-gray-800/70 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-700 pb-4 mb-6 gap-3">
                <div className="flex items-center">
                  {section.icon}
                  <h2 id={`section-title-${section.key}`} className="ml-3 text-xl font-semibold text-gray-100">{section.title}</h2>
                </div>
                <div className="flex items-center gap-2 relative self-end sm:self-center">
                  <IconButton
                    icon={<SaveIcon className="w-4 h-4" />}
                    text={currentTranslations.presetManager.saveSectionSettings}
                    onClick={() => handleOpenSavePresetModal(section.key)}
                    className="text-xs px-2.5 py-1.5"
                  />
                  <div className="relative">
                    <IconButton
                      icon={<ChevronDownIcon className="w-4 h-4" />}
                      text={currentTranslations.presetManager.loadSectionSettings}
                      onClick={() => togglePresetDropdown(section.key)}
                      className="text-xs px-2.5 py-1.5"
                      aria-expanded={activePresetDropdownKey === section.key}
                    />
                    {activePresetDropdownKey === section.key && (
                      <div className="absolute right-0 mt-2 w-64 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-20 py-1 max-h-60 overflow-y-auto">
                        {(allPresets[section.key] && allPresets[section.key]!.length > 0) ? (
                          allPresets[section.key]!.map(preset => (
                            <div key={preset.name} className="flex items-center justify-between px-3 py-2 hover:bg-gray-600">
                              <span className="text-sm text-gray-100 truncate flex-grow mr-2">{preset.name}</span>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => handleLoadPreset(section.key, preset.name)}
                                  className="p-1 text-xs text-sky-400 hover:text-sky-300 focus:outline-none"
                                  title={currentTranslations.presetManager.loadButton}
                                >
                                 {currentTranslations.presetManager.loadButton}
                                </button>
                                <button
                                  onClick={() => handleDeletePreset(section.key, preset.name)}
                                  className="p-1 text-red-400 hover:text-red-300 focus:outline-none"
                                  title={currentTranslations.presetManager.deleteButton}
                                >
                                  <TrashIcon className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="px-3 py-2 text-sm text-gray-400 italic">{currentTranslations.presetManager.noPresets}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                {section.fields.map(field => (
                  <FormField
                    key={`${field.id}-${resetCounter}`} 
                    id={field.id}
                    label={currentTranslations[field.id as keyof AppTranslations] as string || field.label}
                    type={field.type as any}
                    value={formData[field.id as keyof PromptData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || currentTranslations.selectPlaceholder}
                    options={field.options}
                    hybridCustomPlaceholder={field.hybridCustomPlaceholder || currentTranslations.customInputPlaceholder}
                    addOptionButtonText={currentTranslations.fieldLabels.addButton}
                    selectedOptionsLabelText={currentTranslations.fieldLabels.currentSelections}
                    noOptionsSelectedText={currentTranslations.fieldLabels.noSelections}
                    hybridOptionsLabel={currentTranslations.fieldLabels.addFromAvailableOptions}
                    hybridCustomLabel={currentTranslations.fieldLabels.customDetails}
                    addAnOptionText={currentTranslations.fieldLabels.selectToAddPlaceholder}
                    rows={field.type === 'textarea' ? 4 : undefined}
                  />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 py-6">
            <button
              type="button"
              onClick={handleManualPromptGeneration}
              disabled={isGenerating || isChatQueryProcessing || isInspireMeLoading} 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500 disabled:opacity-50 transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {currentTranslations.generatingButton}
                </>
              ) : (
                currentTranslations.generatePromptsButton
              )}
            </button>
            <IconButton
              onClick={handleGenerateRandomPrompt}
              icon={<SparklesIcon className="w-5 h-5 mr-2" />}
              text={currentTranslations.generateRandomPrompt}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 border-gray-500 text-gray-100 px-8 py-3 text-base rounded-lg shadow-lg transform hover:scale-105 transition-all"
              disabled={isGenerating || isChatQueryProcessing || isInspireMeLoading} 
            />
             <IconButton
              onClick={handleResetForm}
              icon={<RefreshIcon className="w-5 h-5 mr-2" />}
              text={currentTranslations.resetFormButton}
              className="w-full sm:w-auto bg-red-700 hover:bg-red-600 border-red-600 text-gray-100 px-8 py-3 text-base rounded-lg shadow-lg transform hover:scale-105 transition-all"
              disabled={isGenerating || isChatQueryProcessing || isInspireMeLoading} 
            />
          </div>
        </form>
        
        <div ref={outputRef}>
          <OutputDisplay
            promptText={englishPrompt}
            onCopyPrompt={() => copyToClipboard(englishPrompt)}
            promptCopied={englishCopied}
            titleText={currentTranslations.outputDisplayTitles.generatedPrompts}
            promptLabel={currentTranslations.outputDisplayTitles.promptLabel}
            copyText={currentTranslations.copyButton.copy}
            copiedText={currentTranslations.copyButton.copied}
            isGenerating={isGenerating}
            generationError={generationError}
            outputDisplayLoadingText={currentTranslations.outputDisplayLoadingText}
          />
        </div>
      </main>
      <Footer text={currentTranslations.footerText} />
      <SavePresetModal
        isOpen={isSavePresetModalOpen}
        onClose={handleCloseSavePresetModal}
        onSave={handleConfirmSavePreset}
        presetName={newPresetNameInput}
        setPresetName={setNewPresetNameInput}
        translations={currentTranslations.presetManager}
      />
    </div>
  );
};

export default App;
