
// Logic ported from original JS and typed
import { CategoryKey } from './types';
import { genres, instruments, moods, effects, production, v5Advanced, mixingPresets, v5Performance } from './data';
import { GoogleGenAI } from "@google/genai";

// Helper to convert File to Base64 for Gemini API
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const analyzeImageSim = async (file: File): Promise<{ topic: string; tags: string[] }> => {
  // Check if API KEY is available for real analysis
  if (process.env.API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await fileToBase64(file);
      
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
              Return a STRICT JSON object (no markdown) with two keys:
              1. 'topic': A short, creative song description in Vietnamese based on the visual mood.
              2. 'tags': An array of 5-8 English musical style tags that fit the image (genres, instruments, moods).` 
            }
          ]
        },
        config: { 
            responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        const json = JSON.parse(text);
        if (json.topic && Array.isArray(json.tags)) {
           return { topic: json.topic, tags: json.tags };
        }
      }
    } catch (error) {
      console.warn("Gemini Vision API failed, falling back to simulation:", error);
    }
  }

  // Fallback Simulation (if no key or error)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const simulatedResponses = [
    {
      topic: "Đua xe tốc độ dưới ánh đèn neon thành phố về đêm",
      tags: ['Synthwave', 'Dark', 'Energetic', 'Fast Tempo', 'Analog Synth']
    },
    {
      topic: "Con đường rừng yên tĩnh trong sương sớm",
      tags: ['Ambient', 'Relaxing', 'Acoustic Guitar', 'Flute', 'Birdsong']
    },
    {
      topic: "Tiệc bãi biển sôi động cùng bạn bè dưới nắng",
      tags: ['Reggae', 'Happy', 'Uplifting', 'Steel Drums', 'Medium Tempo']
    },
    {
      topic: "Khám phá ngôi đền cổ xưa bí ẩn",
      tags: ['Cinematic', 'Ominous', 'Orchestral', 'Duduk', 'Percussion']
    }
  ];

  return simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
};

export const optimizePromptSim = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('sad') || lower.includes('mưa') || lower.includes('buồn') || lower.includes('khóc')) {
    return "A melancholic and somber piano ballad, evoking feelings of a rainy day, with soft strings and a gentle, breathy female vocal, Lo-Fi production.";
  }
  if (lower.includes('epic') || lower.includes('chiến') || lower.includes('hùng tráng') || lower.includes('sử thi')) {
    return "An epic, soaring orchestral soundtrack for a cinematic battle scene, powerful timpani, dramatic choir, and a rising crescendo, studio quality.";
  }
  if (lower.includes('happy') || lower.includes('vui') || lower.includes('hạnh phúc') || lower.includes('cười')) {
    return "An upbeat, energetic and happy J-Pop song, fast tempo, with bright synthesizers, electric guitar, and a clear, high-pitched female vocal, 1990s style.";
  }
  if (lower.includes('cyber') || lower.includes('tương lai') || lower.includes('future') || lower.includes('máy móc')) {
    return "Dark, futuristic synthwave, 1980s style, with pulsing analog synths, arpeggiators, and a driving drum machine rhythm, vocoder vocals.";
  }
  if (lower.includes('lofi') || lower.includes('học') || lower.includes('chill') || lower.includes('thư giãn')) {
    return "A cozy, nostalgic Lo-Fi hip hop beat, perfect for studying, with mellow electric piano, soft drums, and vinyl crackle, instrumental.";
  }
  return `A high-quality song about: ${input}, featuring rich instrumentation, studio production, and clear structure.`;
};

// Returns a list of tag keys found in the input string to simulate AI suggestion
export const suggestTagsSim = (input: string): { category: CategoryKey, tag: string }[] => {
  const inputLower = input.toLowerCase();
  const suggestions: { category: CategoryKey, tag: string }[] = [];

  const checkAndPush = (map: any, category: CategoryKey) => {
     // Handle nested maps (like instruments/genres) or flat maps
     Object.entries(map).forEach(([key, value]) => {
         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // It's a nested category (e.g., 'Rock': {...})
            Object.keys(value as any).forEach(subKey => {
                if (inputLower.includes(subKey.toLowerCase()) || inputLower.includes((value as any)[subKey].toLowerCase())) {
                    suggestions.push({ category, tag: subKey });
                }
            });
         } else {
             // It's a flat map
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

  // Hardcoded simple associations for simulation
  if (inputLower.includes('buồn') || inputLower.includes('sad')) {
      suggestions.push({category: 'moods', tag: 'Sad'});
      suggestions.push({category: 'instruments', tag: 'Piano'});
      suggestions.push({category: 'v5Performance', tag: 'Expressive'});
  }
  if (inputLower.includes('rock') || inputLower.includes('mạnh')) {
      suggestions.push({category: 'genres', tag: 'Rock'});
      suggestions.push({category: 'instruments', tag: 'Electric Guitar'});
      suggestions.push({category: 'instruments', tag: 'Drum Kit'});
      suggestions.push({category: 'v5Performance', tag: 'Dynamic'});
  }
   if (inputLower.includes('điện tử') || inputLower.includes('edm')) {
      suggestions.push({category: 'genres', tag: 'EDM'});
      suggestions.push({category: 'instruments', tag: 'Synthesizer'});
      suggestions.push({category: 'v5Performance', tag: 'Wide Stereo'});
  }

  // Deduplicate
  return suggestions.filter((v, i, a) => a.findIndex(t => t.category === v.category && t.tag === v.tag) === i);
};

export const generatePromptSim = async (input: string): Promise<string> => {
     // Simulates "AI Generate v5" - constructing a full prompt string
     await new Promise(resolve => setTimeout(resolve, 800));
     const opt = optimizePromptSim(input);
     // Add some v5 specific formatting
     return `[Part 1]
${opt}
(Detailed instrumentation: high fidelity, studio recording)`;
};

// Simple template-based lyric generator logic
export const generateLyricsSim = async (topic: string, style: string, lang: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isSad = style.toLowerCase().includes('sad') || style.toLowerCase().includes('rain') || style.toLowerCase().includes('blue');
  const isEpic = style.toLowerCase().includes('epic') || style.toLowerCase().includes('war') || style.toLowerCase().includes('battle');
  
  let content = '';

  if (lang === 'ja') {
      if (isSad) {
          content = `[Verse 1]\n窓の外は雨 (Mado no soto wa ame)\n君の影を探して (Kimi no kage o sagashite)\nネオンライトが滲む (Neon lights blur)\n心はまだ痛む (My heart still hurts)\n\n[Chorus]\n${topic}の記憶 (Memories of ${topic})\n色褪せないまま (Not fading away)\nサヨナラは言えない (Can't say goodbye)\n涙が止まらない (Tears won't stop)`;
      } else if (isEpic) {
          content = `[Verse 1]\n灰の中から立ち上がれ (Rise from the ashes)\n運命の声を聴け (Hear the voice of destiny)\n嵐の中を進む (Moving through the storm)\n勇気を胸に (With courage in our hearts)\n\n[Chorus]\n${topic}のために！戦う今夜 (For ${topic}! Fight tonight)\n光よりも強く (Brighter than light)\n歴史に刻むこの瞬間 (Carve this moment in history)\n勝利を掴め (Seize the victory)`;
      } else {
          content = `[Verse 1]\n街を歩けば (Walking in the city)\nリズムを感じて (Feel the rhythm)\n未来は僕らの手の中に (Future is in our hands)\n迷わず進もう (Let's go without hesitation)\n\n[Chorus]\nそれが ${topic} (That's ${topic})\n自由に生きて (Living freely)\n手を掲げて (Raise your hands)\n魔法を感じて (Feel the magic)`;
      }
  } else if (lang === 'vi') {
      if (isSad) {
          content = `[Verse 1]\nMưa rơi bên hiên vắng\nTìm bóng hình em trong nắng\nĐèn đường nhạt nhòa hư ảo\nTim đau biết làm sao?\n\n[Chorus]\nKý ức về ${topic}\nChẳng thể nào phai nhòa\nLời chia tay chưa nói\nLệ rơi mãi không thôi`;
      } else if (isEpic) {
          content = `[Verse 1]\nĐứng lên từ tro tàn đổ nát\nNghe tiếng gọi của định mệnh vang vọng\nVượt qua bão tố cuồng phong\nLòng dũng cảm rực cháy trong tim\n\n[Chorus]\nVì ${topic}! Ta chiến đấu đêm nay!\nSáng hơn cả ánh hào quang\nKhắc ghi khoảnh khắc này vào lịch sử\nChiến thắng nằm trong tầm tay`;
      } else {
          content = `[Verse 1]\nDạo bước trên phố đông\nCảm nhận nhịp điệu trong lòng\nTương lai nằm trong tay ta\nNgại chi đường đời phong ba\n\n[Chorus]\nĐó chính là ${topic}\nSống tự do thỏa thích\nGiơ tay lên trời cao\nCảm nhận phép màu nào`;
      }
  } else {
      if (isSad) {
          content = `[Verse 1]\nRaindrops falling on the window pane\nThinking about you and the eased pain\nThe city lights blur into grey\nI wish you hadn't gone away\n\n[Chorus]\nOh, ${topic}, why did it end?\nJust a broken heart I cannot mend\nMemories fading in the mist\nThe last goodbye, the final kiss`;
      } else if (isEpic) {
          content = `[Verse 1]\nRise from the ashes, stand tall\nHeed the destiny, answer the call\nThrough the fire and the storm we ride\nWith honor and courage by our side\n\n[Chorus]\nFor the ${topic}! We fight tonight!\nBurning brighter than the morning light\nHistory written in our blood and sweat\nA victory we will never forget`;
      } else {
          content = `[Verse 1]\nWalking down the street, feeling the beat\nLife is a puzzle, incomplete\nBut we keep moving, yeah we flow\nWhere the river takes us, we go\n\n[Chorus]\nIt's all about ${topic}, yeah\nLiving life without a care\nHands in the air, everywhere\nFeel the magic, if you dare`;
      }
  }

  return `[Style: ${style.substring(0, 30)}...]\n[Topic: ${topic}]\n\n[Intro]\n(Instrumental Build-up)\n\n${content}\n\n[Outro]\n(Fade out)`;
};
