
import { SelectOption, PromptData } from './types';

export const DIALOGUE_LANGUAGES: SelectOption[] = [
  { value: 'english', label: 'English (for video dialogue)' },
  { value: 'indonesian', label: 'Indonesian (for video dialogue)' },
  { value: 'spanish', label: 'Spanish (for video dialogue)' },
  { value: 'french', label: 'French (for video dialogue)' },
  { value: 'german', label: 'German (for video dialogue)' },
  { value: 'japanese', label: 'Japanese (for video dialogue)' },
  { value: 'korean', label: 'Korean (for video dialogue)' },
  { value: 'chinese_mandarin', label: 'Chinese (Mandarin, for video dialogue)' },
  { value: 'no_dialogue', label: 'No Dialogue / Instrumental' },
];

export const CAMERA_MOTIONS_OPTIONS: SelectOption[] = [
  { value: '', label: 'None' },
  { value: 'static_shot', label: 'Static Shot' },
  { value: 'pan_left', label: 'Pan Left' },
  { value: 'pan_right', label: 'Pan Right' },
  { value: 'tilt_up', label: 'Tilt Up' },
  { value: 'tilt_down', label: 'Tilt Down' },
  { value: 'zoom_in', label: 'Zoom In (Subtle)' },
  { value: 'zoom_out', label: 'Zoom Out (Subtle)' },
  { value: 'dolly_in', label: 'Dolly In' },
  { value: 'dolly_out', label: 'Dolly Out' },
  { value: 'trucking_shot_left', label: 'Trucking Shot (Move Left)' },
  { value: 'trucking_shot_right', label: 'Trucking Shot (Move Right)' },
  { value: 'pedestal_up', label: 'Pedestal Up (Camera moves vertically up)' },
  { value: 'pedestal_down', label: 'Pedestal Down (Camera moves vertically down)' },
  { value: 'crane_shot_up', label: 'Crane Shot Up' },
  { value: 'crane_shot_down', label: 'Crane Shot Down' },
  { value: 'tracking_shot_follow', label: 'Tracking Shot (Follow Subject)' },
  { value: 'arc_shot', label: 'Arc Shot (Circles Subject)' },
  { value: 'handheld_shaky', label: 'Handheld (Slightly Shaky)' },
  { value: 'handheld_smooth', label: 'Handheld (Smooth)' },
  { value: 'steadicam_shot', label: 'Steadicam Shot' },
  { value: 'drone_shot_aerial', label: 'Drone Shot - Aerial View' },
  { value: 'drone_shot_fly_through', label: 'Drone Shot - Fly Through' },
  { value: 'first_person_pov', label: 'First-person POV' },
  { value: 'dutch_angle', label: 'Dutch Angle (Canted)' },
  { value: 'whip_pan', label: 'Whip Pan (Fast Pan)' },
  { value: 'crash_zoom', label: 'Crash Zoom (Fast Zoom In)' },
  { value: 'orbital_shot', label: 'Orbital Shot (360 around subject)' },
  { value: 'reveal_shot', label: 'Reveal Shot' },
];

// --- Professional Tools Options ---

export const VISUAL_STYLE_OPTIONS: SelectOption[] = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'cinematic_live_action', label: 'Cinematic Live-Action' },
  { value: 'ghibli_inspired_anime', label: 'Ghibli Inspired Anime' },
  { value: 'classic_anime_90s', label: 'Classic Anime (90s Style)' },
  { value: 'modern_anime_detailed', label: 'Modern Anime (Detailed)' },
  { value: 'chibi_anime', label: 'Chibi Anime Style' },
  { value: 'cyberpunk_noir', label: 'Cyberpunk Noir' },
  { value: 'steampunk_vintage_tech', label: 'Steampunk Vintage Tech' },
  { value: 'stop_motion_claymation', label: 'Stop Motion (Claymation)' },
  { value: 'stop_motion_paper_cut', label: 'Stop Motion (Paper Cut-out)' },
  { value: 'vintage_film_1950s', label: 'Vintage Film (1950s)' },
  { value: 'vintage_film_1920s_silent', label: 'Vintage Film (1920s Silent Movie)' },
  { value: 'impressionistic_painting', label: 'Impressionistic Painting (Animated)' },
  { value: 'watercolor_art_style', label: 'Watercolor Art Style (Animated)' },
  { value: 'pixel_art_16bit', label: 'Pixel Art (16-bit)' },
  { value: 'low_poly_3d', label: 'Low Poly 3D Animation' },
  { value: 'documentary_style_realistic', label: 'Documentary Style (Realistic)' },
  { value: 'surreal_dreamscape', label: 'Surreal Dreamscape' },
  { value: 'fantasy_epic_high_detail', label: 'Fantasy Epic (High Detail)' },
  { value: 'sci_fi_futuristic_sleek', label: 'Sci-Fi Futuristic (Sleek)' },
  { value: 'horror_gothic', label: 'Horror (Gothic)' },
  { value: 'western_classic', label: 'Western (Classic Film)' },
  { value: 'minimalist_graphic', label: 'Minimalist Graphic Style' },
  { value: 'comic_book_art', label: 'Comic Book Art (Animated)' },
  { value: 'noir_film_bw', label: 'Noir Film (Black & White)' },
];

export const COLOR_GRADING_OPTIONS: SelectOption[] = [
  { value: 'teal_and_orange', label: 'Teal & Orange' },
  { value: 'pastel_tones_soft', label: 'Pastel Tones (Soft)' },
  { value: 'monochromatic_bw', label: 'Monochromatic (Black & White)' },
  { value: 'high_contrast_gritty', label: 'High Contrast Gritty' },
  { value: 'sepia_tone_vintage', label: 'Sepia Tone (Vintage)' },
  { value: 'vibrant_and_saturated', label: 'Vibrant & Saturated Colors' },
  { value: 'desaturated_muted_tones', label: 'Desaturated & Muted Tones' },
  { value: 'golden_hour_glow_warm', label: 'Golden Hour Glow (Warm)' },
  { value: 'cool_blues_nighttime', label: 'Cool Blues (Nighttime/Sci-Fi)' },
  { value: 'neon_hues_cyberpunk', label: 'Neon Hues (Cyberpunk)' },
  { value: 'natural_realistic_colors', label: 'Natural & Realistic Colors' },
  { value: 'dreamy_ethereal_colors', label: 'Dreamy & Ethereal Colors' },
  { value: 'two_strip_technicolor', label: 'Two-Strip Technicolor Look' },
  { value: 'three_strip_technicolor', label: 'Three-Strip Technicolor Look' },
];

export const LIGHTING_STYLE_OPTIONS: SelectOption[] = [
  { value: 'natural_daylight_soft', label: 'Natural Daylight (Soft)' },
  { value: 'golden_hour_warm', label: 'Golden Hour (Warm, Long Shadows)' },
  { value: 'blue_hour_twilight_cool', label: 'Blue Hour/Twilight (Cool)' },
  { value: 'moonlit_night_low_key', label: 'Moonlit Night (Low Key)' },
  { value: 'studio_lighting_softbox', label: 'Studio Lighting (Softbox, Even)' },
  { value: 'dramatic_rim_lighting', label: 'Dramatic Rim Lighting' },
  { value: 'chiaroscuro_high_contrast', label: 'Chiaroscuro (High Contrast)' },
  { value: 'ambient_occlusion_subtle_shadows', label: 'Ambient Occlusion (Subtle Shadows)' },
  { value: 'volumetric_lighting_light_rays', label: 'Volumetric Lighting (Light Rays)' },
  { value: 'neon_glow_urban', label: 'Neon Glow (Urban Environment)' },
  { value: 'candlelight_flickering', label: 'Candlelight (Warm, Flickering)' },
  { value: 'spotlight_focused_beam', label: 'Spotlight (Focused Beam)' },
  { value: 'backlighting_silhouette', label: 'Backlighting (Silhouette Effect)' },
  { value: 'underlighting_eerie', label: 'Underlighting (Eerie Effect)' },
  { value: 'hard_direct_sunlight', label: 'Hard Direct Sunlight (Strong Shadows)' },
];

export const VIDEO_ASPECT_RATIO_OPTIONS: SelectOption[] = [
  { value: '16:9', label: '16:9 (Widescreen TV/YouTube)' },
  { value: '9:16', label: '9:16 (Vertical/Portrait - TikTok, Reels)' },
  { value: '1:1', label: '1:1 (Square - Instagram, Facebook)' },
  { value: '4:3', label: '4:3 (Classic TV/Monitor)' },
  { value: '2.39:1', label: '2.39:1 (Anamorphic Cinematic Widescreen)' },
  { value: '21:9', label: '21:9 (Ultrawide Cinematic)' },
  { value: '3:2', label: '3:2 (Classic Photography)' },
];

export const VIDEO_RESOLUTION_OPTIONS: SelectOption[] = [
  { value: '1080p', label: '1080p (Full HD)' },
  { value: '1440p', label: '1440p (QHD/2K)' },
  { value: '4K_UHD', label: '4K UHD (2160p)' },
  { value: '8K_UHD', label: '8K UHD (4320p)' },
  { value: '720p', label: '720p (HD)' },
];

export const FRAME_RATE_OPTIONS: SelectOption[] = [
  { value: '24fps', label: '24 FPS (Cinematic Film Standard)' },
  { value: '25fps', label: '25 FPS (PAL Standard)' },
  { value: '30fps', label: '30 FPS (NTSC Standard/Digital Video)' },
  { value: '48fps', label: '48 FPS (High Frame Rate Film)' },
  { value: '50fps', label: '50 FPS (PAL Smooth Motion)' },
  { value: '60fps', label: '60 FPS (Smooth Motion/Action/Gaming)' },
  { value: '120fps', label: '120 FPS (Slow Motion/High Detail)' },
];

export const MOTION_EFFECTS_OPTIONS: SelectOption[] = [
  { value: 'cinematic_motion_blur', label: 'Cinematic Motion Blur' },
  { value: 'no_motion_blur_crisp', label: 'No Motion Blur (Crisp)' },
  { value: 'subtle_focus_pull', label: 'Subtle Subject Focus Pull' },
  { value: 'rack_focus_dramatic', label: 'Rack Focus (Dramatic Shift)' },
  { value: 'deep_depth_of_field', label: 'Deep Depth of Field (Everything in Focus)' },
  { value: 'shallow_depth_of_field_bokeh', label: 'Shallow Depth of Field (Bokeh Background)' },
  { value: 'slow_motion_50_percent', label: 'Slow Motion (50%)' },
  { value: 'slow_motion_25_percent', label: 'Slow Motion (25%)' },
  { value: 'time_lapse_effect', label: 'Time-lapse Effect' },
  { value: 'lens_flare_anamorphic', label: 'Lens Flare (Anamorphic)' },
  { value: 'lens_flare_subtle', label: 'Lens Flare (Subtle)' },
  { value: 'ghosting_trailing_effect', label: 'Ghosting/Trailing Effect' },
  { value: 'film_grain_light', label: 'Film Grain (Light)' },
  { value: 'film_grain_heavy', label: 'Film Grain (Heavy)' },
  { value: 'vignette_subtle', label: 'Vignette (Subtle Darkening Edges)' },
];

export const AUDIO_AMBIENCE_OPTIONS: SelectOption[] = [
  { value: 'epic_orchestral_score', label: 'Epic Orchestral Score' },
  { value: 'minimalist_electronic_synth', label: 'Minimalist Electronic/Synth' },
  { value: 'ambient_nature_sounds_calm', label: 'Ambient Nature Sounds (Calm)' },
  { value: 'cityscape_hum_bustling', label: 'Cityscape Hum (Bustling)' },
  { value: 'lo_fi_hip_hop_chill', label: 'Lo-fi Hip Hop (Chill)' },
  { value: 'suspenseful_drones_tense', label: 'Suspenseful Drones (Tense)' },
  { value: 'complete_silence_eerie', label: 'Complete Silence (Eerie)' },
  { value: 'foley_rich_environment_detailed_sounds', label: 'Foley-Rich Environment (Detailed Sounds)' },
  { value: 'jazz_club_atmosphere', label: 'Jazz Club Atmosphere' },
  { value: 'industrial_machinery_sounds', label: 'Industrial Machinery Sounds' },
  { value: 'futuristic_sci_fi_soundscape', label: 'Futuristic Sci-Fi Soundscape' },
  { value: 'traditional_folk_music', label: 'Traditional Folk Music (Region Specific)' },
  { value: 'upbeat_pop_music', label: 'Upbeat Pop Music' },
  { value: 'haunting_choir_vocals', label: 'Haunting Choir Vocals' },
];

export const SUBTITLES_OPTIONS: SelectOption[] = [
  { value: 'no_subtitles', label: 'No Subtitles' },
  { value: 'yes_subtitles_simple', label: 'Include Subtitles (Simple, Bottom Center)' },
  { value: 'yes_subtitles_styled', label: 'Include Subtitles (Stylized, Thematic)' },
];


export const INITIAL_PROMPT_DATA: PromptData = {
  dialogueLanguage: 'english',
  sceneTitle: '',
  coreCharacterDescription: '',
  characterVoiceDetails: { selected: [], custom: '' },
  characterActions: { selected: [], custom: '' },
  characterExpressions: { selected: [], custom: '' },
  locationTimeBackground: { selected: [], custom: '' },
  additionalVisualDetails: '',
  overallAtmosphere: { selected: [], custom: '' },
  environmentalSounds: { selected: [], custom: '' },
  characterDialogue: '',
  negativePrompts: '',
  cameraMotion: '',
  styleCustomization: '', 

  // Professional Tools Defaults
  visualStyle: { selected: [], custom: '' }, // Reset
  colorGrading: { selected: [], custom: '' }, // Reset
  lightingStyle: { selected: [], custom: '' }, // Reset
  videoAspectRatio: '16:9',
  videoResolution: '1080p', // Correct
  frameRate: '60fps', // Updated
  motionEffects: { selected: [], custom: '' }, // Reset
  audioAmbience: { selected: [], custom: '' },
  subtitles: 'no_subtitles',
};

// --- Predefined Options for Existing Hybrid Fields ---
export const CHARACTER_VOICE_OPTIONS: SelectOption[] = [
  { value: 'Deep', label: 'Deep' },
  { value: 'Gravelly', label: 'Gravelly' },
  { value: 'Soft-spoken', label: 'Soft-spoken' },
  { value: 'High-pitched', label: 'High-pitched' },
  { value: 'Robotic echo', label: 'Robotic echo' },
  { value: 'Clear and authoritative', label: 'Clear and authoritative' },
  { value: 'Whispering', label: 'Whispering' },
  { value: 'Melodious', label: 'Melodious' },
  { value: 'Raspy', label: 'Raspy' },
  { value: 'Monotone', label: 'Monotone' },
];

export const CHARACTER_ACTIONS_OPTIONS: SelectOption[] = [
  { value: 'Sips coffee', label: 'Sips coffee' },
  { value: 'Looks out window', label: 'Looks out window' },
  { value: 'Types on keyboard', label: 'Types on keyboard' },
  { value: 'Paces back and forth', label: 'Paces back and forth' },
  { value: 'Reads a book', label: 'Reads a book' },
  { value: 'Leans against a wall', label: 'Leans against a wall' },
  { value: 'Checks a device', label: 'Checks a device' },
  { value: 'Gestures while talking', label: 'Gestures while talking' },
  { value: 'Adjusts clothing', label: 'Adjusts clothing' },
  { value: 'Stares into the distance', label: 'Stares into the distance' },
];

export const CHARACTER_EXPRESSIONS_OPTIONS: SelectOption[] = [
  { value: 'Stern', label: 'Stern' },
  { value: 'Thoughtful', label: 'Thoughtful' },
  { value: 'Smirking', label: 'Smirking' },
  { value: 'Surprised', label: 'Surprised' },
  { value: 'Anxious', label: 'Anxious' },
  { value: 'Focused', label: 'Focused' },
  { value: 'Content', label: 'Content' },
  { value: 'Joyful', label: 'Joyful' },
  { value: 'Sorrowful', label: 'Sorrowful' },
  { value: 'Determined', label: 'Determined' },
];

export const LOCATION_TIME_OPTIONS: SelectOption[] = [
  { value: 'Neon-drenched alley, 3 AM', label: 'Neon-drenched alley, 3 AM' },
  { value: 'Sun-drenched beach, midday', label: 'Sun-drenched beach, midday' },
  { value: 'Ancient forest, twilight', label: 'Ancient forest, twilight' },
  { value: 'Bustling city square, afternoon', label: 'Bustling city square, afternoon' },
  { value: 'Quiet library, morning', label: 'Quiet library, morning' },
  { value: 'Space station, zero gravity, Earth view', label: 'Space station, zero gravity, Earth view' },
  { value: 'Dusty desert, sunset, lone cactus', label: 'Dusty desert, sunset, lone cactus' },
  { value: 'Misty mountains, dawn', label: 'Misty mountains, dawn' },
  { value: 'Victorian mansion, stormy night', label: 'Victorian mansion, stormy night' },
  { value: 'Underwater coral reef, clear water', label: 'Underwater coral reef, clear water' },
];

export const OVERALL_ATMOSPHERE_OPTIONS: SelectOption[] = [
  { value: 'Mysterious and Eerie', label: 'Mysterious and Eerie' },
  { value: 'Suspenseful and Tense', label: 'Suspenseful and Tense' },
  { value: 'Joyful and Vibrant', label: 'Joyful and Vibrant' },
  { value: 'Calm and Serene', label: 'Calm and Serene' },
  { value: 'Dark and Gritty', label: 'Dark and Gritty' },
  { value: 'Whimsical and Magical', label: 'Whimsical and Magical' },
  { value: 'Urgent and Action-packed', label: 'Urgent and Action-packed' },
  { value: 'Romantic and Nostalgic', label: 'Romantic and Nostalgic' },
  { value: 'Melancholic and Somber', label: 'Melancholic and Somber' },
  { value: 'Epic and Grandiose', label: 'Epic and Grandiose' },
];

export const ENVIRONMENTAL_SOUNDS_OPTIONS: SelectOption[] = [
  { value: 'Distant sirens and city hum', label: 'Distant sirens and city hum' },
  { value: 'Gentle rain against window pane', label: 'Gentle rain against window pane' },
  { value: 'Birds chirping and leaves rustling', label: 'Birds chirping and leaves rustling' },
  { value: 'Wind howling through cracks', label: 'Wind howling through cracks' },
  { value: 'Crowd murmur and distant music', label: 'Crowd murmur and distant music' },
  { value: 'Heavy machinery hum and clanking', label: 'Heavy machinery hum and clanking' },
  { value: 'Flowing water and distant waterfall', label: 'Flowing water and distant waterfall' },
  { value: 'Crackling fireplace and old wood creaks', label: 'Crackling fireplace and old wood creaks' },
  { value: 'Sci-fi computer beeps and spaceship hum', label: 'Sci-fi computer beeps and spaceship hum' },
  { value: 'Complete silence, occasional floorboard creak', label: 'Complete silence, occasional floorboard creak' },
];

// --- Sample Data for Random Prompt Generation ---
export const RANDOM_SCENE_TITLES = ["The Last Sunset", "Cyber City Blues", "Whispers in the Woods", "Market Day Mayhem", "Cosmic Anomaly", "Forgotten Relics", "Urban Jungle Gym", "Crimson Peak Echoes", "Neon Heartbeat"];
export const RANDOM_CORE_CHAR_DESCRIPTIONS = ["A weary traveler with a secret map.", "A rookie cop in a futuristic city, out of her depth.", "An eccentric inventor with wild, static-charged hair and mismatched socks.", "A silent guardian of an ancient, glowing artifact.", "A street artist fighting for expression against a corporate dystopia.", "A time-displaced historian, bewildered by the modern world."];
export const RANDOM_ADDITIONAL_VISUAL_DETAILS = ["Flickering neon signs reflecting in rain-slicked puddles.", "Dramatic lens flares from a setting sun over a desolate landscape.", "Intricate glowing tattoos that pulse with faint light.", "Volumetric dust particles dancing in sparse light shafts through ruins.", "Holographic advertisements glitching and distorting intermittently."];
export const RANDOM_DIALOGUES = ["\"We don't have much time. They're closing in.\"", "\"Is this what you were looking for? It cost me everything.\"", "\"I've seen things you wouldn't believe... and some I wish I hadn't.\"", "\"The answer lies hidden in plain sight, if you know how to look.\"", "\"Let's get out of here before this whole place comes down!\""];
export const RANDOM_NEGATIVE_PROMPTS = ["No cliches or overused tropes.", "Avoid bright, sunny days; maintain a muted palette.", "Character is not overly emotional or melodramatic.", "No modern technology if set in a fantasy medieval period.", "Keep the tone serious, avoid comedic elements."];
export const RANDOM_STYLE_CUSTOMIZATIONS = ["Cinematic, anamorphic widescreen, shallow depth of field.", "Retro pixel art style with a limited color palette.", "Impressionistic, painterly visuals with visible brushstrokes.", "Gritty film noir with high contrast shadows and stark lighting.", "Clean, minimalist anime aesthetic with sharp lines."]; // This might be overridden by new visualStyle

// Helper to pick random elements
export const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const pickRandomMultiple = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
