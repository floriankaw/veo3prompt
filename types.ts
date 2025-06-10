
export interface HybridFieldValue {
  selected: string[];
  custom: string;
}

export interface PromptData {
  dialogueLanguage: string; 
  sceneTitle: string;
  coreCharacterDescription: string;
  characterVoiceDetails: HybridFieldValue;
  characterActions: HybridFieldValue;
  characterExpressions: HybridFieldValue;
  locationTimeBackground: HybridFieldValue;
  additionalVisualDetails: string;
  overallAtmosphere: HybridFieldValue;
  environmentalSounds: HybridFieldValue;
  characterDialogue: string;
  negativePrompts: string;
  cameraMotion: string;
  styleCustomization: string; // This might be repurposed or removed if visualStyle covers it

  // New Professional Tools Fields
  visualStyle: HybridFieldValue;
  colorGrading: HybridFieldValue;
  lightingStyle: HybridFieldValue;
  videoAspectRatio: string;
  videoResolution: string;
  frameRate: string;
  motionEffects: HybridFieldValue;
  audioAmbience: HybridFieldValue;
  subtitles: string;
}

export type SectionPresetData = Partial<PromptData>;

export interface Preset {
  name: string;
  data: SectionPresetData;
}

export type SectionPresetCollection = Preset[];

export interface AllAppPresets {
  [sectionKey: string]: SectionPresetCollection | undefined;
}


export interface SelectOption {
  value: string;
  label: string;
}

export interface TranslationSet {
  [key: string]: string | NestedTranslationSet;
}
export interface NestedTranslationSet {
  [key: string]: string;
}

export interface AppTranslations extends TranslationSet {
  dialogueLanguage: string;
  sceneTitle: string;
  coreCharacterDescription: string;
  characterVoiceDetails: string;
  characterActions: string;
  characterExpressions: string;
  locationTimeBackground: string;
  additionalVisualDetails: string;
  overallAtmosphere: string;
  environmentalSounds: string;
  characterDialogue: string;
  negativePrompts: string;
  cameraMotion: string;
  styleCustomization: string;
  selectPlaceholder: string;
  customInputPlaceholder: string;
  generateRandomPrompt: string;
  generatePromptsButton: string;
  generatingButton: string; 
  resetFormButton: string;
  headerTitle: string;
  footerText: string;
  formSectionTitles: NestedTranslationSet & {
    professionalTools?: string;
  };
  outputDisplayTitles: {
    generatedPrompts: string;
    promptLabel: string;
  };
  copyButton: NestedTranslationSet;
  formGeneralDescription: string;
  fieldLabels: {
    addFromAvailableOptions: string;
    customDetails: string;
    addButton: string;
    currentSelections: string;
    noSelections: string;
    selectToAddPlaceholder: string;
  };
  outputDisplayLoadingText: string;
  presetManager: {
    saveSectionSettings: string;
    loadSectionSettings: string;
    manageSectionSettings: string; 
    modalTitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    saveButton: string;
    cancelButton: string;
    noPresets: string;
    deletePresetPrompt: string;
    confirmDeleteButton: string;
    loadButton: string;
    deleteButton: string;
  };

  // Keys for Professional Tools fields
  visualStyle: string;
  colorGrading: string;
  lightingStyle: string;
  videoAspectRatio: string;
  videoResolution: string;
  frameRate: string;
  motionEffects: string;
  audioAmbience: string;
  subtitles: string;

  // Keys for AI Chat Input Section
  aiChatInputTitle: string;
  aiChatInputPlaceholder: string;
  aiChatInputSubmitButton: string;
  aiChatInputProcessing: string;
  aiChatInputError: string;
  aiChatInputRandomIdeaButton: string; 

  // Keys for Login Page
  loginPageTitle: string;
  loginUsernameLabel: string;
  loginPasswordLabel: string;
  loginButtonText: string;
  loginErrorMessage: string;
}