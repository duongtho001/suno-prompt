
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
  Sliders, FileAudio, AlignLeft, PlusCircle, Tv, Gauge, Heart, X, CreditCard, Check, Share2, HelpCircle, BookOpen, ArrowRight, Star
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
    if (!aiInput.trim()) {
        showFeedback('Vui lòng nhập từ khóa ý tưởng', 'error');
        topicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        aiInputRef.current?.focus();
        return;
    }
    const generated = await generatePromptSim(aiInput);
    setOptimizedIdea(generated);
    handleSuggestTags(); 
    showFeedback('AI đã tự động tạo prompt đầy đủ!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!fileInputRef.current?.files?.[0]) return showFeedback('Vui lòng tải lên hình ảnh trước', 'error');
    setIsAnalyzingImage(true);
    try {
      const result = await analyzeImageSim(fileInputRef.current.files[0]);
      setAiInput(result.topic);
      if (result.tags && result.tags.length > 0) {
           setSelections(prev => {
                const next = {...prev};
                return next;
           });
           setOptimizedIdea(`Song about ${result.topic}. Style: ${result.tags.join(', ')}`);
      } else {
           setOptimizedIdea(`Song about ${result.topic}.`);
      }
      showFeedback('Phân tích hình ảnh hoàn tất!');
      
      // Auto-scroll to Prompt Output (Result)
      setTimeout(() => {
        promptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (e) {
      console.error(e);
      showFeedback('Phân tích thất bại', 'error');
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleGenerateLyrics = async () => {
    // 1. Check prompt (Styles)
    if (!generatedPrompt) {
        showFeedback('Vui lòng chọn thẻ phong cách trước (Style)', 'error');
        styleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    // 2. Check Topic (Input)
    if (!aiInput && !optimizedIdea) {
        showFeedback('Vui lòng nhập chủ đề hoặc ý tưởng', 'error');
        topicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        aiInputRef.current?.focus();
        return;
    }
    
    let langToUse = lyricsLang;
    if (lyricsLang === 'other') {
      if (!customLyricsLang.trim()) return showFeedback('Vui lòng nhập ngôn ngữ tùy chỉnh', 'error');
      langToUse = customLyricsLang.trim();
    }
    
    setIsGeneratingLyrics(true);
    try {
      const topic = aiInput || 'Untitled';
      const lyrics = await generateLyricsSim(topic, generatedPrompt, langToUse); 
      setLyricsOutput(lyrics);
      showFeedback('Tạo lời bài hát hoàn tất!');
    } catch (e) {
      showFeedback('Tạo lời bài hát thất bại', 'error');
    } finally {
      setIsGeneratingLyrics(false);
    }
  };

  const loadTemplate = (template: typeof demoTemplates[0]) => {
    clearAll();
    const newSel = { ...selections }; 
    (Object.keys(template.tags) as CategoryKey[]).forEach(cat => {
      if (template.tags[cat]) {
        newSel[cat] = template.tags[cat]!;
      }
    });
    setSelections(newSel);
    showFeedback(`Đã tải mẫu: ${template.name}`);
  };

  // Render Helpers
  const renderTagSection = (title: string, icon: React.ReactNode, category: CategoryKey, dataMap: Record<string, string>, extraClass = "") => (
    <div className={`neu-flat p-6 mb-8 ${extraClass}`}>
      <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2 neu-text-shadow">
        {icon} {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(dataMap).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleTag(category, key)}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selections[category].includes(key)
                ? 'neu-pressed active text-purple-600'
                : 'neu-btn text-gray-600 hover:text-purple-500'
            }`}
          >
            {key} <span className="text-xs opacity-60 ml-1 font-normal">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderGroupedSection = (title: string, icon: React.ReactNode, category: CategoryKey, groupedData: Record<string, Record<string, string>>, extraClass = "") => (
    <div className={`neu-flat p-6 mb-8 ${extraClass}`}>
      <h3 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-2 neu-text-shadow">
        {icon} {title}
      </h3>
      <div className="space-y-6">
        {Object.entries(groupedData).map(([groupName, items]) => (
          <div key={groupName}>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">{groupName}</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(items).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleTag(category, key)}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    selections[category].includes(key)
                      ? 'neu-pressed active text-purple-600'
                      : 'neu-btn text-gray-600 hover:text-purple-500'
                  }`}
                >
                  {key} <span className="text-xs opacity-60 ml-1 font-normal">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      {/* Fixed Toast Notification */}
      {feedbackMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] toast-enter">
            <div className={`px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 ${
                feedbackMsg.includes('lỗi') || feedbackMsg.includes('thất bại') 
                ? 'bg-red-500/90 text-white' 
                : feedbackMsg.includes('Đã bỏ')
                    ? 'bg-gray-700/90 text-white'
                    : 'bg-emerald-600/90 text-white'
            }`}>
               {feedbackMsg.includes('thành công') || feedbackMsg.includes('hoàn tất') || feedbackMsg.includes('Đã chọn') ? <Check size={18} /> : <Info size={18} />}
               {feedbackMsg}
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12 relative">
          <div className="inline-block p-4 neu-flat rounded-full mb-4">
             <Music size={40} className="text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-3 neu-text-shadow tracking-tight">
            Suno AI Prompt
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 font-medium">
            Trình tạo prompt tối ưu cho âm nhạc.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowGuide(true)}
              className="neu-btn px-6 py-3 text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2"
            >
              <BookOpen size={20} />
              <span>Hướng dẫn</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Controls */}
          <div className="lg:w-3/5 space-y-8">

            {/* AI Assistant Panel */}
            <section className="neu-flat p-6 relative overflow-hidden" ref={topicRef}>
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Zap size={100} />
               </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
                 <span className="neu-icon-btn"><Zap size={20} /></span> 
                 Trợ lý Gợi ý AI
              </h2>
              
              <div className="space-y-5">
                <input 
                  type="text" 
                  ref={aiInputRef}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Nhập ý tưởng của bạn (ví dụ: ngày mưa, trận chiến sử thi)..."
                  className="w-full neu-input px-5 py-4 text-lg text-gray-700 placeholder-gray-400"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={handleSuggestTags}
                      className="neu-btn py-3 px-4 font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
                    >
                      <Lightbulb size={18} /> Gợi ý thẻ
                    </button>
                    <button 
                      onClick={handleAutoGenerate}
                      className="neu-btn py-3 px-4 font-bold text-purple-600 hover:text-purple-700 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={18} /> Tự động tạo
                    </button>
                    <button 
                      onClick={handleOptimizeIdea}
                      className="neu-btn py-3 px-4 font-semibold text-green-600 hover:text-green-700 flex items-center justify-center gap-2"
                    >
                      <Wand2 size={18} /> Tối ưu ý tưởng
                    </button>
                </div>
                
                {/* Image to Song Section */}
                <div className="pt-4 mt-2">
                   <h3 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
                    <ImageIcon size={20} /> Cảm hứng từ Ảnh AI
                   </h3>
                   <div className="neu-pressed p-4 rounded-2xl space-y-4">
                        <input 
                          type="file" 
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-gray-200 file:text-gray-700
                            file:shadow-sm
                            hover:file:bg-gray-300
                            file:cursor-pointer transition-colors"
                        />
                      {imagePreview && (
                        <div className="neu-flat-sm p-2">
                            <img src={imagePreview} alt="Preview" className="w-full h-48 rounded-lg object-contain" />
                        </div>
                      )}
                      <button 
                        onClick={handleAnalyzeImage}
                        disabled={isAnalyzingImage}
                        className="w-full neu-btn py-3 text-emerald-600 font-bold hover:text-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isAnalyzingImage ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />} 
                        Phân tích ảnh
                      </button>
                   </div>
                </div>
              </div>
            </section>

             {/* Pro Templates */}
             <section className="neu-flat p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-3">
                <span className="neu-icon-btn"><Rocket size={20} /></span> 
                Mẫu Pro (Templates)
              </h3>
              <div className="flex flex-wrap gap-3">
                {demoTemplates.map(tpl => (
                  <button 
                    key={tpl.name}
                    onClick={() => loadTemplate(tpl)}
                    className="neu-btn px-4 py-2 text-sm font-semibold text-gray-600 hover:text-purple-600 transition-transform active:scale-95"
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </section>

             {/* J-Pop / Anime Special Zone */}
             {renderGroupedSection(
                'Khu vực Anime & Phim Nhật', 
                <Tv size={20} className="text-pink-500" />, 
                'animeDrama', 
                animeDrama
             )}

            {/* V5 Special Controls */}
            <div className="neu-flat p-6 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-3">
                    <span className="neu-icon-btn"><Sliders size={20} /></span> 
                    Tham số & Cài đặt Suno v5
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Meta & Kỹ thuật</h4>
                        <div className="flex flex-wrap gap-3">
                             {Object.entries(v5Advanced).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleTag('v5Advanced', key)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                                    selections.v5Advanced.includes(key)
                                        ? 'neu-pressed active text-amber-600'
                                        : 'neu-btn text-gray-500'
                                    }`}
                                >
                                    {key}
                                </button>
                             ))}
                        </div>
                     </div>
                     <div>
                         <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Mixing Presets</h4>
                         <div className="flex flex-wrap gap-3">
                             {Object.entries(mixingPresets).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleTag('mixingPresets', key)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                                    selections.mixingPresets.includes(key)
                                        ? 'neu-pressed active text-rose-600'
                                        : 'neu-btn text-gray-500'
                                    }`}
                                >
                                    {key}
                                </button>
                             ))}
                        </div>
                     </div>
                </div>
                
                {/* NEW V5 Performance Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase flex items-center gap-1">
                      <Gauge size={14} /> V5 Performance (Tăng cường chi tiết)
                    </h4>
                    <div className="flex flex-wrap gap-3">
                         {Object.entries(v5Performance).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => toggleTag('v5Performance', key)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                selections.v5Performance.includes(key)
                                    ? 'neu-pressed active text-emerald-600'
                                    : 'neu-btn text-gray-600'
                                }`}
                            >
                                {key}
                            </button>
                         ))}
                    </div>
                </div>
            </div>

            {/* Tag Selection Areas */}
            <div ref={styleRef}>
                {renderGroupedSection('Thể loại (Genres)', <Music size={20} />, 'genres', genres)}
                {renderGroupedSection('Nhạc cụ (Instruments)', <Settings size={20} />, 'instruments', instruments)}
                {renderTagSection('Cảm xúc (Moods)', <Sparkles size={20} />, 'moods', moods)}
                {renderGroupedSection('Hiệu ứng & Hòa âm (Effects)', <Layers size={20} />, 'effects', effects)}
                {renderGroupedSection('Giọng hát (Vocals)', <Mic size={20} />, 'vocals', vocals)}
                {renderTagSection('Sản xuất (Production)', <Settings size={20} />, 'production', production)}
                {renderTagSection('Cấu trúc (Structure)', <Layers size={20} />, 'structure', structure)}
            </div>

          </div>

          {/* Right Column: Sticky Result Panel */}
          <div className="lg:w-2/5">
            <div className="sticky top-8 space-y-8">
              
              {/* Prompt Output */}
              <div ref={promptRef} className="neu-flat p-6 flex flex-col relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-700 neu-text-shadow">Prompt Output</h2>
                  <div className="flex gap-3">
                     <button 
                      onClick={() => copyToClipboard(generatedPrompt)}
                      className="neu-btn px-4 py-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-2"
                    >
                      <Copy size={16} /> Sao chép
                    </button>
                    <button 
                      onClick={clearAll}
                      className="neu-btn px-4 py-2 text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Xóa
                    </button>
                  </div>
                </div>
                
                <textarea 
                  value={generatedPrompt}
                  readOnly
                  className="w-full h-48 neu-input p-4 resize-none font-mono text-sm leading-relaxed text-gray-700"
                  placeholder="Chọn các thẻ để tạo prompt..."
                />
              </div>

              {/* Lyrics Generator with V5 Controls */}
              <div className="neu-flat p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold text-gray-700 flex items-center gap-3">
                    <span className="neu-icon-btn"><FileAudio size={20} /></span>
                    Lời & Cấu trúc
                  </h2>
                  <button
                    onClick={injectMetaTags}
                    className="neu-btn px-3 py-1.5 text-xs font-bold text-amber-600 flex items-center gap-1"
                  >
                    <PlusCircle size={14} /> Chèn Meta
                  </button>
                </div>
                
                <div className="space-y-4">
                  
                  {/* Structure Toolbar */}
                  <div className="neu-pressed p-3 flex flex-wrap gap-2 justify-center">
                      <span className="text-xs text-gray-400 w-full text-center font-bold uppercase mb-1">Chèn nhanh (Quick Insert)</span>
                      {['[Intro]', '[Verse]', '[Chorus]', '[Bridge]', '[Solo]', '[Outro]', '[Break]', '[Instrumental]'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => insertStructureTag(tag)}
                            className="px-2 py-1 rounded text-xs font-bold bg-gray-200 text-gray-600 hover:bg-gray-300 shadow-sm"
                          >
                              {tag}
                          </button>
                      ))}
                  </div>

                  {/* Template Selector */}
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                       {structureTemplates.map(tpl => (
                           <button
                             key={tpl.name}
                             onClick={() => applyStructureTemplate(tpl.content)}
                             className="neu-btn whitespace-nowrap px-3 py-1.5 text-xs text-gray-600 font-medium"
                           >
                               📄 {tpl.name}
                           </button>
                       ))}
                  </div>

                  {/* Language Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="neu-pressed rounded-xl px-2">
                        <select
                        value={lyricsLang}
                        onChange={(e) => setLyricsLang(e.target.value)}
                        className="w-full bg-transparent text-gray-700 h-10 text-sm outline-none font-bold"
                        >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="other">Khác</option>
                        </select>
                    </div>
                     <button 
                        onClick={handleGenerateLyrics}
                        disabled={isGeneratingLyrics}
                        className="neu-btn text-teal-600 font-bold h-10 flex justify-center items-center gap-2 text-sm disabled:opacity-50"
                    >
                        {isGeneratingLyrics ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                        AI Tạo lời
                    </button>
                  </div>
                   {lyricsLang === 'other' && (
                      <input 
                        type="text"
                        value={customLyricsLang}
                        onChange={(e) => setCustomLyricsLang(e.target.value)}
                        placeholder="Nhập ngôn ngữ..."
                        className="w-full neu-input p-3 text-sm"
                      />
                    )}

                  <textarea 
                    ref={lyricsRef}
                    value={lyricsOutput}
                    onChange={(e) => setLyricsOutput(e.target.value)}
                    className="w-full h-64 neu-input p-4 font-mono text-sm leading-relaxed text-gray-700 resize-none"
                    placeholder="Lời bài hát sẽ xuất hiện ở đây..."
                  />
                  <button 
                    onClick={() => copyToClipboard(lyricsOutput)}
                    className="w-full neu-btn py-3 text-cyan-600 font-bold"
                  >
                    Sao chép lời
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center pb-8 border-t border-gray-300 pt-8">
            <p className="text-gray-500 font-bold neu-text-shadow">
               Designed & Developed by <span className="text-purple-600 font-bold decoration-2 underline-offset-4">Đường Thọ</span>
            </p>
        </footer>
      </div>

      {/* Welcome Modal */}
      {showWelcome && (
        <div 
          onClick={() => setShowWelcome(false)}
          className="fixed inset-0 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="neu-flat p-8 max-w-lg w-full relative animate-in zoom-in-95 duration-300"
          >
            <button 
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 neu-icon-btn w-10 h-10 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
                <div className="neu-icon-btn w-16 h-16 mx-auto mb-4 text-purple-600">
                    <Star className="fill-current w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-700 neu-text-shadow">Chào mừng bạn! 🎉</h2>
                <p className="text-gray-500 mt-2 font-medium">Khám phá công cụ tạo nhạc AI tối ưu nhất.</p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-3 neu-pressed rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full shrink-0"><Zap size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-700">AI Gợi ý Thông minh</h4>
                        <p className="text-sm text-gray-500">Nhập ý tưởng, AI sẽ tự động chọn thẻ phong cách phù hợp nhất.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-3 neu-pressed rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full shrink-0"><ImageIcon size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-700">Cảm hứng từ Hình ảnh</h4>
                        <p className="text-sm text-gray-500">Tải ảnh lên để AI phân tích và đề xuất âm nhạc dựa trên cảm xúc bức ảnh.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-3 neu-pressed rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full shrink-0"><Sliders size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-700">Tối ưu cho Suno v5</h4>
                        <p className="text-sm text-gray-500">Hỗ trợ đầy đủ các tham số nâng cao, cấu trúc bài hát và thẻ Meta.</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => setShowWelcome(false)}
                className="w-full neu-btn py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg border-none"
            >
                Bắt đầu sáng tạo ngay 🚀
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuide && (
         <div 
         onClick={() => setShowGuide(false)}
         className="fixed inset-0 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all"
       >
         <div 
           onClick={(e) => e.stopPropagation()}
           className="neu-flat p-6 max-w-2xl w-full relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
         >
           <button 
             onClick={() => setShowGuide(false)}
             className="absolute top-4 right-4 neu-icon-btn w-10 h-10 text-gray-500 hover:text-red-500"
           >
             <X size={20} />
           </button>

           <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2 neu-text-shadow">
               <BookOpen className="text-blue-600" /> Hướng dẫn sử dụng & Mẹo
           </h2>

           <div className="space-y-8">
               
               {/* Step by Step Workflow */}
               <section>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <Zap size={18} className="text-yellow-500" /> Quy trình tạo nhạc
                   </h3>
                   <div className="space-y-4">
                       <div className="flex gap-4 items-start">
                           <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                               <p className="font-bold text-gray-700">Nhập ý tưởng hoặc Tải ảnh</p>
                               <p className="text-sm text-gray-500">Nhập chủ đề vào "Trợ lý Gợi ý AI" hoặc tải ảnh lên để lấy cảm hứng.</p>
                           </div>
                       </div>
                       <div className="flex gap-4 items-start">
                           <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                               <p className="font-bold text-gray-700">Chọn Thẻ phong cách (Style)</p>
                               <p className="text-sm text-gray-500">Bấm "Gợi ý thẻ" hoặc chọn thủ công các thể loại, nhạc cụ, cảm xúc bên dưới. Kết quả sẽ hiện ở ô <strong>Prompt Output</strong>.</p>
                           </div>
                       </div>
                       <div className="flex gap-4 items-start">
                           <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                               <p className="font-bold text-gray-700">Tạo Lời & Cấu trúc</p>
                               <p className="text-sm text-gray-500">Bấm nút "AI Tạo lời". Bạn có thể chỉnh sửa, thêm các thẻ cấu trúc như [Chorus], [Bridge].</p>
                           </div>
                       </div>
                   </div>
               </section>

               {/* Mapping to Suno */}
               <section className="neu-pressed p-5 rounded-xl bg-gray-50/50">
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <Rocket size={18} className="text-red-500" /> Cách dán vào Suno (Custom Mode)
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                           <div className="font-bold text-xs text-gray-400 uppercase">App này (Đường Thọ AI)</div>
                           <div className="neu-flat-sm p-3 text-sm font-semibold text-gray-600 bg-white">
                               Prompt Output (Các thẻ Tag)
                           </div>
                           <div className="flex justify-center text-gray-400"><ArrowRight className="rotate-90 md:rotate-0" /></div>
                           <div className="font-bold text-xs text-gray-400 uppercase">Suno AI</div>
                           <div className="neu-pressed p-3 text-sm font-bold text-purple-700 border border-purple-200">
                               Style of Music
                           </div>
                       </div>

                       <div className="space-y-2">
                           <div className="font-bold text-xs text-gray-400 uppercase">App này (Đường Thọ AI)</div>
                           <div className="neu-flat-sm p-3 text-sm font-semibold text-gray-600 bg-white">
                               Lời & Cấu trúc (Lyrics)
                           </div>
                           <div className="flex justify-center text-gray-400"><ArrowRight className="rotate-90 md:rotate-0" /></div>
                           <div className="font-bold text-xs text-gray-400 uppercase">Suno AI</div>
                           <div className="neu-pressed p-3 text-sm font-bold text-purple-700 border border-purple-200">
                               Lyrics
                           </div>
                       </div>
                   </div>
                   <p className="text-xs text-gray-500 mt-4 italic text-center">
                       *Đừng quên bật chế độ <strong>Custom Mode</strong> trên Suno để thấy các ô này.
                   </p>
               </section>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default App;