import React, { useState, useEffect, useRef } from 'react';
import { 
  genres, instruments, effects, moods, vocals, structure, production, demoTemplates, 
  v5Advanced, mixingPresets, structureTemplates, animeDrama, v5Performance
} from './data';
import { SelectionState, CategoryKey } from './types';
import { analyzeImageSim, optimizePromptSim, generateLyricsSim, suggestTagsSim, generatePromptSim } from './simulation';
import { 
  Wand2, Music, Mic, Layers, Settings, PlayCircle, Copy, Trash2, 
  Image as ImageIcon, Sparkles, Loader2, Info, Languages, Rocket, Zap, Lightbulb,
  Sliders, FileAudio, AlignLeft, PlusCircle, Tv, Gauge, Heart, X, Check, Share2, HelpCircle, BookOpen, ArrowRight, Star
} from 'lucide-react';

const categoryNames: Record<CategoryKey, string> = {
    genres: 'Thể loại',
    production: 'Sản xuất',
    instruments: 'Nhạc cụ',
    moods: 'Cảm xúc',
    vocals: 'Giọng hát',
    structure: 'Cấu trúc',
    effects: 'Hiệu ứng',
    v5Advanced: 'Kỹ thuật V5',
    mixingPresets: 'Mixing Presets',
    animeDrama: 'Anime & Drama',
    v5Performance: 'V5 Performance'
};

const App: React.FC = () => {
  // State
  const [selections, setSelections] = useState<SelectionState>({
    genres: [], production: [], instruments: [], moods: [], vocals: [], structure: [], effects: [],
    v5Advanced: [], mixingPresets: [], animeDrama: [], v5Performance: []
  });
  const [aiInput, setAiInput] = useState('');
  const [optimizedIdea, setOptimizedIdea] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  // AI/Sim State
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false);
  const [lyricsOutput, setLyricsOutput] = useState('');
  const [lyricsLang, setLyricsLang] = useState('vi'); 
  const [customLyricsLang, setCustomLyricsLang] = useState(''); 
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  
  // Guide & Welcome State
  const [showGuide, setShowGuide] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Refs for scrolling and focus
  const lyricsRef = useRef<HTMLTextAreaElement>(null);
  const topicRef = useRef<HTMLDivElement>(null); // For scrolling to AI Input
  const styleRef = useRef<HTMLDivElement>(null); // For scrolling to Tag Selection
  const promptRef = useRef<HTMLDivElement>(null); // For scrolling to Prompt Output (Result)
  const aiInputRef = useRef<HTMLInputElement>(null); // For focusing input

  // Update prompt whenever selections or optimized idea change
  useEffect(() => {
    const parts: string[] = [];
    if (optimizedIdea) parts.push(optimizedIdea);

    // Order: Genres -> Moods -> Anime/Drama -> Production -> Mixing -> V5 Performance -> Instruments -> Effects -> Vocals -> Structure -> V5 Advanced
    if (selections.genres.length) parts.push(selections.genres.join(', '));
    if (selections.moods.length) parts.push(selections.moods.join(', '));
    if (selections.animeDrama.length) parts.push(selections.animeDrama.join(', '));
    if (selections.production.length) parts.push(selections.production.join(', '));
    if (selections.mixingPresets.length) parts.push(selections.mixingPresets.join(', '));
    if (selections.v5Performance.length) parts.push(selections.v5Performance.join(', '));
    if (selections.instruments.length) parts.push(selections.instruments.join(', '));
    if (selections.effects.length) parts.push(selections.effects.join(', '));
    if (selections.vocals.length) parts.push(selections.vocals.join(', '));
    if (selections.structure.length) parts.push(selections.structure.join(', '));
    if (selections.v5Advanced.length) parts.push(selections.v5Advanced.join(', '));

    setGeneratedPrompt(parts.join(', '));
  }, [selections, optimizedIdea]);

  // Helpers
  const showFeedback = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setFeedbackMsg(msg);
    // Auto-hide after 3s
    const timer = setTimeout(() => setFeedbackMsg(''), 3000);
    return () => clearTimeout(timer);
  };

  const toggleTag = (category: CategoryKey, tag: string) => {
    setSelections(prev => {
      const current = prev[category];
      const exists = current.includes(tag);
      const action = exists ? 'Đã bỏ' : 'Đã chọn';
      
      showFeedback(`${action}: ${tag} (${categoryNames[category]})`, exists ? 'info' : 'success');
      
      return {
        ...prev,
        [category]: exists 
          ? current.filter(t => t !== tag) 
          : [...current, tag]
      };
    });
  };

  const clearAll = () => {
    setSelections({
      genres: [], production: [], instruments: [], moods: [], vocals: [], structure: [], effects: [],
      v5Advanced: [], mixingPresets: [], animeDrama: [], v5Performance: []
    });
    setOptimizedIdea('');
    setAiInput('');
    setLyricsOutput('');
    setImagePreview(null);
    setLyricsLang('vi');
    setCustomLyricsLang('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    showFeedback('Đã xóa tất cả', 'info');
  };

  const copyToClipboard = (text: string) => {
    if (!text) return showFeedback('Không có nội dung để sao chép', 'error');
    navigator.clipboard.writeText(text);
    showFeedback('Đã sao chép vào bộ nhớ tạm!');
  };

  // V5 Meta Injection Logic
  const injectMetaTags = () => {
    if (!generatedPrompt) return showFeedback('Vui lòng chọn thẻ phong cách trước', 'error');
    const styleTag = `[Style: ${selections.genres[0] || 'Pop'}]`;
    const moodTag = selections.moods.length ? `[Mood: ${selections.moods[0]}]` : '';
    const tempoTag = selections.structure.find(t => t.includes('Tempo')) ? `[Tempo: ${selections.structure.find(t => t.includes('Tempo'))}]` : '';
    
    const metaHeader = `${styleTag}\n${moodTag}\n${tempoTag}\n\n`.replace(/\n\n\n/g, '\n').trim() + '\n\n';
    
    setLyricsOutput(prev => metaHeader + prev);
    showFeedback('Đã chèn thẻ Meta V5 vào đầu lời bài hát!');
  };

  const insertStructureTag = (tag: string) => {
    const textarea = lyricsRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const insertion = `\n${tag}\n`;
    setLyricsOutput(before + insertion + after);
    
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + insertion.length, start + insertion.length);
    }, 0);
  };

  const applyStructureTemplate = (content: string) => {
      if (lyricsOutput && !window.confirm("Thao tác này sẽ ghi đè nội dung lời bài hát hiện tại, bạn có chắc chắn không?")) return;
      setLyricsOutput(content);
      showFeedback('Đã áp dụng mẫu cấu trúc');
  };

  // Simulation Handlers
  const handleOptimizeIdea = () => {
    if (!aiInput.trim()) {
        showFeedback('Vui lòng nhập từ khóa ý tưởng', 'error');
        topicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        aiInputRef.current?.focus();
        return;
    }
    const optimized = optimizePromptSim(aiInput);
    setOptimizedIdea(optimized);
    showFeedback('Đã tối ưu hóa ý tưởng!');
  };

  const handleSuggestTags = () => {
    if (!aiInput.trim()) {
        showFeedback('Vui lòng nhập từ khóa ý tưởng', 'error');
        topicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        aiInputRef.current?.focus();
        return;
    }
    const suggestions = suggestTagsSim(aiInput);
    
    if (suggestions.length === 0) {
        showFeedback('Không tìm thấy thẻ liên quan, hãy thử từ khóa khác', 'info');
        return;
    }

    setSelections(prev => {
        const next = { ...prev };
        let addedCount = 0;
        suggestions.forEach(item => {
            if (!next[item.category].includes(item.tag)) {
                next[item.category] = [...next[item.category], item.tag];
                addedCount++;
            }
        });
        if (addedCount > 0) showFeedback(`Đã đề xuất ${addedCount} thẻ cho bạn!`);
        else showFeedback('Các thẻ liên quan đã được chọn', 'info');
        return next;
    });
  };

  const handleAutoGenerate = async () => {
    if (!aiInput.trim()) return showFeedback('Vui lòng nhập ý tưởng', 'error');
    setIsAnalyzingImage(true); // Re-use spinner state for visual effect
    try {
        const result = await generatePromptSim(aiInput);
        // Parse result if needed, but here we just simulate optimization
        setOptimizedIdea(result);
        handleSuggestTags(); // Also suggest tags
        showFeedback('Đã tạo Prompt AI!');
    } catch (e) {
        showFeedback('Lỗi tạo prompt', 'error');
    } finally {
        setIsAnalyzingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setIsAnalyzingImage(true);
      showFeedback('Đang phân tích hình ảnh...');
      
      try {
        const result = await analyzeImageSim(file);
        setAiInput(result.topic);
        // Map strings to categories (simple simulation logic)
        // In a real app, logic would map result.tags to specific categories
        // Here we just add to moods or genres if they match, or just set topic
        showFeedback('Đã phân tích xong!');
      } catch (error) {
        showFeedback('Lỗi phân tích hình ảnh', 'error');
      } finally {
        setIsAnalyzingImage(false);
      }
    }
  };

  const handleGenerateLyrics = async () => {
    if (!aiInput && !generatedPrompt) return showFeedback('Vui lòng nhập chủ đề hoặc tạo prompt trước', 'error');
    setIsGeneratingLyrics(true);
    try {
      const lang = lyricsLang === 'custom' ? customLyricsLang : lyricsLang;
      const lyrics = await generateLyricsSim(aiInput || 'Tình yêu', generatedPrompt || 'Pop, Sad', lang);
      setLyricsOutput(lyrics);
      showFeedback('Đã viết xong lời bài hát!');
    } catch (error) {
      showFeedback('Lỗi tạo lời', 'error');
    } finally {
      setIsGeneratingLyrics(false);
    }
  };

  const applyDemoTemplate = (template: any) => {
      // Clear current
      setSelections({
        genres: [], production: [], instruments: [], moods: [], vocals: [], structure: [], effects: [],
        v5Advanced: [], mixingPresets: [], animeDrama: [], v5Performance: []
      });
      
      // Apply new
      setTimeout(() => {
          setSelections(prev => {
              const next = { ...prev };
              Object.keys(template.tags).forEach(cat => {
                 if (cat in next) {
                     (next as any)[cat] = template.tags[cat];
                 }
              });
              return next;
          });
          showFeedback(`Đã áp dụng mẫu: ${template.name}`);
      }, 50);
  };

  // UI Components
  const SectionHeader = ({ icon: Icon, title, color = "text-gray-700" }: any) => (
    <div className="flex items-center gap-3 mb-4 mt-8 pb-2 border-b border-gray-200">
      <div className={`p-2 rounded-lg neu-flat-sm ${color}`}>
        <Icon size={20} />
      </div>
      <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
    </div>
  );

  const TagGroup = ({ category, data, icon }: { category: CategoryKey, data: any, icon: any }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{categoryNames[category]}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(data).map(([key, value]) => {
           // Check if it's a nested group or flat string
           const isGroup = typeof value === 'object' && value !== null;
           if (isGroup) {
               return (
                   <div key={key} className="w-full mb-2">
                       <h4 className="text-xs font-semibold text-gray-400 mb-2 ml-1">{key}</h4>
                       <div className="flex flex-wrap gap-2">
                           {Object.entries(value as any).map(([subKey, subLabel]) => (
                               <button
                                   key={subKey}
                                   onClick={() => toggleTag(category, subKey)}
                                   className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 border ${
                                       selections[category].includes(subKey)
                                       ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105'
                                       : 'neu-btn hover:text-purple-600 border-transparent'
                                   }`}
                               >
                                   {subLabel as string}
                               </button>
                           ))}
                       </div>
                   </div>
               );
           }
           return (
            <button
                key={key}
                onClick={() => toggleTag(category, key)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 border ${
                    selections[category].includes(key)
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105'
                    : 'neu-btn hover:text-purple-600 border-transparent'
                }`}
            >
                {value as string}
            </button>
           );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Toast Feedback */}
      {feedbackMsg && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 toast-enter">
              <div className="neu-flat px-6 py-3 rounded-full flex items-center gap-3 bg-gray-800 text-white border border-gray-700">
                  {feedbackMsg.includes('Lỗi') ? <X size={18} className="text-red-400"/> : <Check size={18} className="text-green-400"/>}
                  <span className="font-medium text-sm">{feedbackMsg}</span>
              </div>
          </div>
      )}

      {/* Header */}
      <header className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl neu-flat flex items-center justify-center text-purple-600">
                <Music size={32} strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 neu-text-shadow">
                    Đường Thọ AI
                </h1>
                <p className="text-gray-500 font-medium text-sm">Trình tạo Prompt & Lời bài hát Suno v5</p>
            </div>
        </div>
        <div className="flex gap-3">
             <button onClick={clearAll} className="neu-btn px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600">
                <Trash2 size={16} className="mr-2" />
                Làm mới
            </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Idea Input */}
            <div className="neu-flat p-6" ref={topicRef}>
                <SectionHeader icon={Lightbulb} title="Ý tưởng bài hát" color="text-amber-600" />
                
                <div className="space-y-4">
                    <div className="relative">
                        <input 
                            ref={aiInputRef}
                            type="text" 
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            placeholder="Mô tả bài hát (VD: Một bản tình ca buồn dưới mưa ở Sài Gòn...)"
                            className="w-full neu-input p-4 pl-12 text-lg font-medium"
                        />
                        <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        {aiInput && (
                            <button onClick={() => setAiInput('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <button 
                            onClick={handleOptimizeIdea}
                            className="neu-btn flex-1 py-3 px-4 font-bold text-purple-600 hover:bg-purple-50"
                        >
                            <Wand2 size={18} className="mr-2" />
                            Tối ưu ý tưởng
                        </button>
                        <button 
                            onClick={handleSuggestTags}
                            className="neu-btn flex-1 py-3 px-4 font-bold text-indigo-600 hover:bg-indigo-50"
                        >
                            <Zap size={18} className="mr-2" />
                            Gợi ý thẻ
                        </button>
                    </div>

                    {/* Image Upload */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer transition-colors bg-gray-50/50">
                            {isAnalyzingImage ? (
                                <div className="flex flex-col items-center text-purple-600 animate-pulse">
                                    <Loader2 size={32} className="animate-spin mb-2" />
                                    <span className="text-sm font-semibold">Đang phân tích ảnh...</span>
                                </div>
                            ) : imagePreview ? (
                                <div className="relative w-full h-full p-2">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                        <span className="text-white font-medium text-sm">Thay đổi ảnh</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <ImageIcon size={32} className="mb-2" />
                                    <span className="text-sm font-medium">Tải ảnh lên để lấy cảm hứng</span>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>
            </div>

            {/* 2. Style & Instrument Selection */}
            <div className="neu-flat p-6" ref={styleRef}>
                <SectionHeader icon={Sliders} title="Phong cách & Nhạc cụ" color="text-blue-600" />
                
                {/* Accordion-like structure for categories */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <TagGroup category="genres" data={genres} icon={Music} />
                    <TagGroup category="moods" data={moods} icon={Heart} />
                    <TagGroup category="animeDrama" data={animeDrama} icon={Tv} />
                    <TagGroup category="instruments" data={instruments} icon={Mic} />
                    <TagGroup category="v5Performance" data={v5Performance} icon={Star} />
                    <TagGroup category="production" data={production} icon={Layers} />
                    <TagGroup category="mixingPresets" data={mixingPresets} icon={Settings} />
                    <TagGroup category="effects" data={effects} icon={Sparkles} />
                    <TagGroup category="vocals" data={vocals} icon={Mic} />
                    <TagGroup category="structure" data={structure} icon={AlignLeft} />
                    <TagGroup category="v5Advanced" data={v5Advanced} icon={Gauge} />
                </div>
            </div>
            
            {/* Quick Templates */}
             <div className="neu-flat p-6">
                <SectionHeader icon={BookOpen} title="Mẫu có sẵn (Templates)" color="text-pink-600" />
                <div className="grid grid-cols-2 gap-3">
                    {demoTemplates.map((tpl, idx) => (
                        <button 
                            key={idx}
                            onClick={() => applyDemoTemplate(tpl)}
                            className="neu-btn py-2 px-3 text-xs font-semibold text-gray-600 hover:text-purple-600 text-left truncate"
                            title={tpl.name}
                        >
                            {tpl.name}
                        </button>
                    ))}
                </div>
            </div>

        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 space-y-8">
            
            {/* Result Prompt */}
            <div className="neu-flat p-6 relative" ref={promptRef}>
                <div className="absolute top-4 right-4">
                     <button onClick={() => copyToClipboard(generatedPrompt)} className="neu-icon-btn text-purple-600" title="Sao chép">
                        <Copy size={20} />
                     </button>
                </div>
                
                <SectionHeader icon={Rocket} title="Prompt hoàn chỉnh" color="text-purple-600" />
                
                <div className="neu-pressed p-4 rounded-xl bg-gray-50 min-h-[160px]">
                    {generatedPrompt ? (
                        <p className="text-gray-700 leading-relaxed font-medium text-lg font-mono whitespace-pre-wrap">
                            {generatedPrompt}
                        </p>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                            <Music size={40} className="mb-2" />
                            <p>Chọn các thẻ bên trái hoặc nhập ý tưởng để tạo Prompt...</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-end">
                     <div className="text-xs text-gray-400 italic mr-auto flex items-center">
                        <Info size={14} className="mr-1" />
                        Đã tối ưu cho Suno v5
                     </div>
                </div>
            </div>

            {/* Lyrics Generator */}
            <div className="neu-flat p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4 mt-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg neu-flat-sm text-green-600">
                            <FileAudio size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-green-600">Trình tạo lời bài hát (Lyrics)</h3>
                    </div>
                    
                    <div className="flex gap-2">
                        <select 
                            value={lyricsLang} 
                            onChange={(e) => setLyricsLang(e.target.value)}
                            className="neu-flat-sm px-3 py-1.5 text-sm font-semibold text-gray-600 outline-none bg-transparent"
                        >
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                            <option value="ja">Japanese</option>
                            <option value="custom">Khác...</option>
                        </select>
                        {lyricsLang === 'custom' && (
                             <input 
                                type="text" 
                                placeholder="Nhập ngôn ngữ..." 
                                value={customLyricsLang}
                                onChange={(e) => setCustomLyricsLang(e.target.value)}
                                className="w-24 neu-input px-2 py-1 text-sm"
                             />
                        )}
                        <button 
                            onClick={handleGenerateLyrics}
                            disabled={isGeneratingLyrics}
                            className="neu-btn px-4 py-1.5 text-sm font-bold text-green-600 hover:text-green-700 disabled:opacity-50"
                        >
                            {isGeneratingLyrics ? <Loader2 size={16} className="animate-spin" /> : <div className="flex items-center"><Sparkles size={16} className="mr-1"/> Viết lời AI</div>}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Lyrics Tools */}
                    <div className="md:col-span-1 space-y-4">
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Chèn thẻ cấu trúc</h4>
                            <div className="flex flex-wrap gap-2">
                                {['[Intro]', '[Verse]', '[Chorus]', '[Bridge]', '[Outro]', '[Solo]', '[Instrumental]'].map(tag => (
                                    <button 
                                        key={tag}
                                        onClick={() => insertStructureTag(tag)}
                                        className="neu-btn px-2 py-1 text-xs font-medium hover:text-purple-600"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Mẫu cấu trúc bài hát</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                {structureTemplates.map((tpl, i) => (
                                    <button
                                        key={i}
                                        onClick={() => applyStructureTemplate(tpl.content)}
                                        className="w-full text-left neu-btn px-3 py-2 text-xs font-medium hover:text-purple-600 truncate"
                                    >
                                        {tpl.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <button 
                            onClick={injectMetaTags}
                            className="w-full neu-btn py-2 text-xs font-bold text-blue-600 mt-2"
                        >
                            Chèn Meta Tags (V5)
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="md:col-span-2 relative">
                         <div className="absolute top-2 right-2 z-10">
                            <button onClick={() => copyToClipboard(lyricsOutput)} className="p-2 bg-white/50 hover:bg-white rounded-full shadow-sm transition-all text-gray-600">
                                <Copy size={16} />
                            </button>
                        </div>
                        <textarea
                            ref={lyricsRef}
                            value={lyricsOutput}
                            onChange={(e) => setLyricsOutput(e.target.value)}
                            placeholder="Lời bài hát sẽ hiển thị ở đây..."
                            className="w-full h-[500px] neu-input p-4 font-mono text-sm leading-relaxed resize-none focus:ring-2 ring-purple-500/20"
                        />
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 font-medium">
            Designed & Developed by <span className="text-purple-600 font-bold">Đường Thọ</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} Đường Thọ AI. Optimized for Suno v5.
          </p>
      </footer>

    </div>
  );
};

export default App;
