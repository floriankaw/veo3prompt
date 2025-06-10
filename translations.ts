
import { AppTranslations } from './types';

const en: AppTranslations = {
  dialogueLanguage: "Video Dialogue Language",
  sceneTitle: "Scene Title",
  coreCharacterDescription: "Core Character Description",
  characterVoiceDetails: "Character Voice Details",
  characterActions: "Character Actions",
  characterExpressions: "Character Expressions",
  locationTimeBackground: "Location & Time Background",
  additionalVisualDetails: "Additional Visual Details",
  overallAtmosphere: "Overall Atmosphere",
  environmentalSounds: "Environmental Sounds",
  characterDialogue: "Character Dialogue",
  negativePrompts: "Negative Prompts (What to avoid)",
  cameraMotion: "Camera Motion",
  styleCustomization: "General Style Notes", // Renamed for clarity, less prominent now
  selectPlaceholder: "Select or type...",
  customInputPlaceholder: "Add custom details here...",
  generateRandomPrompt: "Suggest Random Ideas",
  generatePromptsButton: "Generate VEO3PRO Prompts",
  generatingButton: "Generating with AI...",
  resetFormButton: "Reset Form", 
  headerTitle: "VEO3PRO", 
  footerText: "© {year} VEO3PRO. Cinematic Prompt Engineering.",
  formSectionTitles: {
    general: "General & Scene Setup",
    character: "Character Details",
    environment: "Environment & Atmosphere",
    visuals: "Visuals & Camera",
    content: "Content & Directives",
    professionalTools: "Professional Tools & Cinematic FX", 
  },
  outputDisplayTitles: {
    generatedPrompts: "Generated Prompt",
    promptLabel: "AI-Enhanced VEO3PRO Prompt (English)", 
  },
  copyButton: {
    copy: "Copy",
    copied: "Copied!",
  },
  formGeneralDescription: "Craft highly detailed, cinematic prompts for Veo 3. Fill the fields then click 'Generate' to create your AI-enhanced prompt.",
  fieldLabels: {
    addFromAvailableOptions: "Add from available options:",
    customDetails: "Or add custom details:",
    addButton: "Add",
    currentSelections: "Currently selected:",
    noSelections: "None selected",
    selectToAddPlaceholder: "Select to add...",
  },
  outputDisplayLoadingText: "Generating Your VEO3PRO Prompt <3",
  presetManager: {
    saveSectionSettings: "Save Section Settings",
    loadSectionSettings: "Load Section Settings",
    manageSectionSettings: "Manage Settings", 
    modalTitle: "Save Current Section Settings",
    inputLabel: "Preset Name:",
    inputPlaceholder: "e.g., My Awesome Character Setup",
    saveButton: "Save Preset",
    cancelButton: "Cancel",
    noPresets: "No saved settings for this section yet.",
    deletePresetPrompt: "Are you sure you want to delete this preset?",
    confirmDeleteButton: "Delete",
    loadButton: "Load",
    deleteButton: "Delete",
  },

  // Translations for Professional Tools
  visualStyle: "Visual Style",
  colorGrading: "Color Grading",
  lightingStyle: "Lighting Style",
  videoAspectRatio: "Video Aspect Ratio",
  videoResolution: "Video Resolution",
  frameRate: "Frame Rate (FPS)",
  motionEffects: "Motion Effects & Lens",
  audioAmbience: "Audio Ambience & Sound Design",
  subtitles: "Subtitles",

  // Translations for AI Chat Input Section
  aiChatInputTitle: "Describe Your Video Idea",
  aiChatInputPlaceholder: "e.g., A knight fighting a dragon in a volcano, cinematic style...",
  aiChatInputSubmitButton: "Pre-fill Form with AI",
  aiChatInputProcessing: "AI is analyzing your idea...",
  aiChatInputError: "AI couldn't process this request. Please try rephrasing or fill the form manually.",
  aiChatInputRandomIdeaButton: "Inspire Me ✨", 

  // Translations for Login Page
  loginPageTitle: "VEO3PRO Access",
  loginUsernameLabel: "Username",
  loginPasswordLabel: "Password",
  loginButtonText: "Login",
  loginErrorMessage: "Invalid username or password.",
};

export const translations: AppTranslations = en;