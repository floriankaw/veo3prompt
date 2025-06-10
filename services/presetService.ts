
import { AllAppPresets, Preset, SectionPresetCollection } from '../types';

const PRESETS_STORAGE_KEY = 'veo3PromptGeneratorPresets';

export const loadAllPresets = (): AllAppPresets => {
  try {
    const storedPresets = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (storedPresets) {
      return JSON.parse(storedPresets) as AllAppPresets;
    }
  } catch (error) {
    console.error("Error loading presets from localStorage:", error);
  }
  return {};
};

export const saveAllPresets = (presets: AllAppPresets): void => {
  try {
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error("Error saving presets to localStorage:", error);
  }
};

export const addPresetToSection = (
  sectionKey: string,
  preset: Preset,
  currentPresets: AllAppPresets
): AllAppPresets => {
  const updatedPresets = { ...currentPresets }; // Shallow copy of the main preset object
  const currentSectionCollection: SectionPresetCollection = updatedPresets[sectionKey] || [];
  
  let newSectionCollection: SectionPresetCollection;
  const existingIndex = currentSectionCollection.findIndex(p => p.name === preset.name);

  if (existingIndex !== -1) {
    // If updating, create a new array with the updated preset
    newSectionCollection = [
      ...currentSectionCollection.slice(0, existingIndex),
      preset,
      ...currentSectionCollection.slice(existingIndex + 1),
    ];
  } else {
    // If adding, create a new array with the new preset appended
    newSectionCollection = [...currentSectionCollection, preset];
  }
  
  updatedPresets[sectionKey] = newSectionCollection;
  saveAllPresets(updatedPresets);
  return updatedPresets;
};

export const deletePresetFromSection = (
  sectionKey: string,
  presetName: string,
  currentPresets: AllAppPresets
): AllAppPresets => {
  const updatedPresets = { ...currentPresets };
  let sectionCollection: SectionPresetCollection = updatedPresets[sectionKey] || [];
  
  // .filter() always returns a new array, so this is good for immutability
  const newSectionCollection = sectionCollection.filter(p => p.name !== presetName);
  
  if (newSectionCollection.length > 0) {
    updatedPresets[sectionKey] = newSectionCollection;
  } else {
    // If the section is now empty, remove the key for that section
    delete updatedPresets[sectionKey]; 
  }
  
  saveAllPresets(updatedPresets);
  return updatedPresets;
};