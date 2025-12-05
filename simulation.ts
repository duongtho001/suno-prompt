
import { CategoryKey } from './types';
import { genres, instruments, moods, effects, production, v5Advanced, mixingPresets, v5Performance } from './data';
import { GoogleGenAI } from "@google/genai";

// --- API KEY ROTATION LOGIC ---

/**
 * Parses a newline-separated string into an array of clean API keys.
 */
export const parseApiKeys = (input: string): string[] => {
  return input.split('\n').map(k => k.trim()).filter(k => k.length > 0);
};

/**
 * Tries to execute a Gemini API call using a list of keys.
 * If a key fails due to quota/server issues, it tries the next one.
 */
async function runWithApiKeyRotation<T>(
  apiKeys: string[],
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T | null> {
  if (!apiKeys || apiKeys.length === 0) return null;

  let lastError: any = null;

  for (const key of apiKeys) {
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      // console.log(`Attempting with key ending in ...${key.slice(-4)}`);
      return await operation(ai);
    } catch (error: any) {
      console.warn(`Key ...${key.slice(-4)} failed:`, error);
      lastError = error;
      
      // Check for errors that warrant a retry with a new key
      // 429: Too Many Requests (Quota)
      // 500/503: Server Errors
      const isRetryable = error.status === 429 || error.status === 503 || error.status === 500 || (error.message && error.message.includes('429'));
      
      if (!isRetryable) {
        // If it's a Bad Request (400) or Permission Denied (403), do not rotate, just fail.
        throw error;
      }
      // If retryable, loop continues to next key
    }
  }

  // If we get here, all keys failed
  console.error("All API keys exhausted or failed.");
  throw lastError || new Error("All API keys failed");
}

// --- HELPER FUNCTIONS ---

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// --- MAIN FUNCTIONS ---

export const analyzeImageSim = async (file: File, apiKeysStr: string): Promise<{ topic: string; tags: string[] }> => {
  const apiKeys = parseApiKeys(apiKeysStr);

  // 1. Try Real AI
  if (apiKeys.length > 0) {
    try {
      const base64Data = await fileToBase64(file);
      
      const result = await runWithApiKeyRotation(apiKeys, async (ai) => {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [
              { 
                inlineData: { 
                  mimeType: file.type || 'image/jpeg', 
                  data: base64Data 
                } 
              },
              { 
                text: `Analyze this image for music inspiration. 
                Return a STRICT JSON object (no markdown, just raw json) with two keys:
                1. "topic": A creative song description in Vietnamese (max 20 words).
                2. "tags": An array of 5-8 English musical style tags (genres, instruments, moods).` 
              }
            ]
          },
          config: { 
              responseMimeType: "application/json"
          }
        });
        
        const text = response.text;
        if (!text) throw new Error("No response text");
        return JSON.parse(text);
      });

      if (result && result.topic && Array.isArray(result.tags)) {
        return { topic: result.topic, tags: result.tags };
      }
    } catch (e) {
      console.warn("Real AI Analysis failed, falling back to sim:", e);
    }
  }

  // 2. Fallback Simulation
  await new Promise(resolve => setTimeout(resolve, 1500));
  const simulatedResponses = [
    { topic: "Đua xe tốc độ dưới ánh đèn neon thành phố về đêm", tags: ['Synthwave', 'Dark', 'Energetic', 'Fast Tempo', 'Analog Synth'] },
    { topic: "Con đường rừng yên tĩnh trong sương sớm", tags: ['Ambient', 'Relaxing', 'Acoustic Guitar', 'Flute', 'Birdsong'] },
    { topic: "Tiệc bãi biển sôi động cùng bạn bè", tags: ['Reggae', 'Happy', 'Uplifting', 'Steel Drums', 'Medium Tempo'] },
    { topic: "Khám phá ngôi đền cổ xưa bí ẩn", tags: ['Cinematic', 'Ominous', 'Orchestral', 'Duduk', 'Percussion'] }
  ];
  return simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
};

export const optimizePromptSim = async (input: string, apiKeysStr: string): Promise<string> => {
  const apiKeys = parseApiKeys(apiKeysStr);

  // 1. Try Real AI
  if (apiKeys.length > 0) {
    try {
        const result = await runWithApiKeyRotation(apiKeys, async (ai) => {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    parts: [{ text: `Act as a professional music producer. Rewrite this song idea into a concise, high-quality Suno AI prompt (in English). 
                    Input Idea: "${input}"
                    
                    Rules:
                    - Keep it under 40 words.
                    - Focus on style, mood, and instrumentation.
                    - Output ONLY the prompt string.` }]
                }
            });
            return response.text;
        });
        if (result) return result.trim();
    } catch (e) {
        console.warn("Real AI Optimize failed, falling back:", e);
    }
  }

  // 2. Fallback Logic
  const lower = input.toLowerCase();
  if (lower.includes('sad') || lower.includes('mưa') || lower.includes('buồn')) {
    return "A melancholic and somber piano ballad, evoking feelings of a rainy day, with soft strings and a gentle, breathy female vocal, Lo-Fi production.";
  }
  if (lower.includes('epic') || lower.includes('chiến') || lower.includes('hùng')) {
    return "An epic, soaring orchestral soundtrack for a cinematic battle scene, powerful timpani, dramatic choir, and a rising crescendo, studio quality.";
  }
  if (lower.includes('cyber') || lower.includes('future')) {
    return "Dark, futuristic synthwave, 1980s style, with pulsing analog synths, arpeggiators, and a driving drum machine rhythm, vocoder vocals.";
  }
  return `A high-quality song about: ${input}, featuring rich instrumentation, studio production, and clear structure.`;
};

export const suggestTagsSim = (input: string): { category: CategoryKey, tag: string }[] => {
  // Pure local logic is fine for tags, but we could enhance it later.
  // Keeping local for speed as per user request flow usually implies tag selection is UI driven.
  const inputLower = input.toLowerCase();
  const suggestions: { category: CategoryKey, tag: string }[] = [];

  const checkAndPush = (map: any, category: CategoryKey) => {
     Object.entries(map).forEach(([key, value]) => {
         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.keys(value as any).forEach(subKey => {
                if (inputLower.includes(subKey.toLowerCase()) || inputLower.includes((value as any)[subKey].toLowerCase())) {
                    suggestions.push({ category, tag: subKey });
                }
            });
         } else {
             const label = value as string;
             if (inputLower.includes(key.toLowerCase()) || inputLower.includes(label.toLowerCase())) {
                 suggestions.push({ category, tag: key });
             }
         }
     });
  };

  checkAndPush(genres, 'genres');
  checkAndPush(instruments, 'instruments');
  checkAndPush(moods, 'moods');
  checkAndPush(effects, 'effects');
  checkAndPush(production, 'production');
  checkAndPush(v5Advanced, 'v5Advanced');
  checkAndPush(mixingPresets, 'mixingPresets');
  checkAndPush(v5Performance, 'v5Performance');

  // Hardcoded simple associations
  if (inputLower.includes('buồn') || inputLower.includes('sad')) {
      suggestions.push({category: 'moods', tag: 'Sad'});
      suggestions.push({category: 'instruments', tag: 'Piano'});
  }
  
  return suggestions.filter((v, i, a) => a.findIndex(t => t.category === v.category && t.tag === v.tag) === i);
};

export const generatePromptSim = async (input: string, apiKeysStr: string): Promise<string> => {
     // If we have an optimizer, we essentially used it in handleAutoGenerate. 
     // This function mainly constructs the final string.
     // However, if we want "Auto Generate" to use AI to build the WHOLE structure:
     
     const apiKeys = parseApiKeys(apiKeysStr);
     if (apiKeys.length > 0) {
         try {
             const result = await runWithApiKeyRotation(apiKeys, async (ai) => {
                 const response = await ai.models.generateContent({
                     model: 'gemini-2.5-flash',
                     contents: {
                         parts: [{ text: `Create a comprehensive music prompt structure for Suno v5 based on this idea: "${input}".
                         Format:
                         [Part 1]
                         {Description of style and instruments}
                         (Detailed tags: tag1, tag2, tag3)` }]
                     }
                 });
                 return response.text;
             });
             if (result) return result;
         } catch (e) { console.warn("AI Prompt Gen failed", e); }
     }

     await new Promise(resolve => setTimeout(resolve, 800));
     const opt = await optimizePromptSim(input, ""); // use fallback
     return `[Part 1]
${opt}
(Detailed instrumentation: high fidelity, studio recording)`;
};

export const generateLyricsSim = async (topic: string, style: string, lang: string, apiKeysStr: string): Promise<string> => {
  const apiKeys = parseApiKeys(apiKeysStr);

  // 1. Try Real AI
  if (apiKeys.length > 0) {
    try {
      const result = await runWithApiKeyRotation(apiKeys, async (ai) => {
        const prompt = `Write song lyrics in language code '${lang}' (e.g. 'vi' for Vietnamese).
        Topic: "${topic}"
        Style/Mood: "${style}"
        
        Requirements:
        1. Structure: [Intro], [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Chorus], [Outro].
        2. Include meta tags like (Instrumental Build-up) or (Fade out) where appropriate.
        3. Be creative and rhyming.
        
        Output ONLY the lyrics.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: { parts: [{ text: prompt }] }
        });
        return response.text;
      });
      if (result) return result;
    } catch (e) {
      console.warn("Real AI Lyrics failed, falling back:", e);
    }
  }

  // 2. Fallback Template
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isSad = style.toLowerCase().includes('sad') || style.toLowerCase().includes('rain');
  const isEpic = style.toLowerCase().includes('epic') || style.toLowerCase().includes('war');
  
  // (Existing Template Logic simplified for brevity as fallback)
  let content = '';
  if (lang === 'vi') {
      if (isSad) {
          content = `[Verse 1]\nMưa rơi bên hiên vắng\nTìm bóng hình em trong nắng...`;
      } else {
          content = `[Verse 1]\nDạo bước trên phố đông\nCảm nhận nhịp điệu trong lòng...`;
      }
  } else {
      content = `[Verse 1]\nWalking down the street\nFeeling the rhythm and the beat...`;
  }

  return `[Style: ${style.substring(0, 30)}...]\n[Topic: ${topic}]\n\n[Intro]\n(Instrumental Build-up)\n\n${content}\n\n[Outro]\n(Fade out)\n\n(Lưu ý: Bạn chưa nhập API Key, đây là nội dung mẫu. Hãy vào Cài đặt để thêm key)`;
};
