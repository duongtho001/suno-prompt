
import { CategoryMap, TagMap, DemoTemplate, StructureTemplate } from './types';

// Expanded Genres
export const genres: CategoryMap = {
  'Nhạc Pop (Pop)': {
    'Pop': 'Nhạc Pop', 'K-Pop': 'K-Pop (Hàn Quốc)', 'J-Pop': 'J-Pop (Nhật Bản)', 'City Pop': 'City Pop', 
    'Synth-Pop': 'Synth-Pop', 'Indie Pop': 'Indie Pop', 'Dream Pop': 'Dream Pop', 
    'Art Pop': 'Art Pop', 'Baroque Pop': 'Baroque Pop', 'Electropop': 'Electropop',
    'Hyperpop': 'Hyperpop', 'Disco': 'Disco', 'Teen Pop': 'Teen Pop',
    'Dance Pop': 'Dance Pop', 'Bubblegum Pop': 'Bubblegum Pop', 'Sophisti-Pop': 'Sophisti-Pop',
    'Mandopop': 'Mandopop (Nhạc Hoa)', 'Cantopop': 'Cantopop (Nhạc Quảng)', 'Latin Pop': 'Latin Pop',
    'V-Pop': 'V-Pop (Việt Nam)'
  },
  'Rock': {
    'Rock': 'Rock', 'Classic Rock': 'Rock cổ điển', 'Math Rock': 'Math Rock', 
    'Post-Rock': 'Post-Rock', 'Punk': 'Punk', 'Pop Punk': 'Pop Punk',
    'Alternative Rock': 'Alternative Rock', 'Indie Rock': 'Indie Rock', 'Grunge': 'Grunge',
    'Psychedelic Rock': 'Rock ảo giác', 'J-Rock': 'J-Rock (Nhật)', 'Shoegaze': 'Shoegaze',
    'Emo': 'Emo', 'Progressive Rock': 'Progressive Rock', 'Hard Rock': 'Hard Rock',
    'Surf Rock': 'Surf Rock', 'Garage Rock': 'Garage Rock', 'Post-Punk': 'Post-Punk',
    'Soft Rock': 'Soft Rock', 'New Wave': 'New Wave', 'Rockabilly': 'Rockabilly'
  },
  'Metal': {
    'Metal': 'Metal', 'Heavy Metal': 'Heavy Metal', 'Thrash Metal': 'Thrash Metal',
    'Death Metal': 'Death Metal', 'Black Metal': 'Black Metal', 'Power Metal': 'Power Metal',
    'Doom Metal': 'Doom Metal', 'Symphonic Metal': 'Symphonic Metal', 'Gothic Metal': 'Gothic Metal',
    'Metalcore': 'Metalcore', 'Nu Metal': 'Nu Metal', 'Folk Metal': 'Folk Metal',
    'Industrial Metal': 'Industrial Metal', 'Djent': 'Djent', 'Sludge Metal': 'Sludge Metal',
    'Prog Metal': 'Prog Metal', 'Kawaii Metal': 'Kawaii Metal'
  },
  'Điện tử (Electronic)': {
    'EDM': 'EDM', 'Techno': 'Techno', 'House': 'House', 'Deep House': 'Deep House', 
    'Drum and Bass': 'Drum and Bass', 'Dubstep': 'Dubstep', 'IDM': 'IDM', 
    'Vaporwave': 'Vaporwave', 'Synthwave': 'Synthwave', 'Future Bass': 'Future Bass', 
    'Hardstyle': 'Hardstyle', 'Chiptune': 'Chiptune', '8-bit': 'Nhạc 8-bit',
    'Trance': 'Trance', 'Psytrance': 'Psytrance', 'Ambient': 'Ambient',
    'Downtempo': 'Downtempo', 'Trip-Hop': 'Trip-Hop', 'Garage': 'UK Garage',
    'Breakcore': 'Breakcore', 'Glitch Hop': 'Glitch Hop', 'Eurobeat': 'Eurobeat',
    'Hardcore': 'Hardcore', 'Electro Swing': 'Electro Swing'
  },
  'Hip-Hop & Rap': {
    'Hip-Hop': 'Hip-Hop', 'Trap': 'Trap', 'Boom Bap': 'Boom Bap', 'Drill': 'Drill', 
    'Grime': 'Grime', 'Jazz Rap': 'Jazz Rap', 'Cloud Rap': 'Cloud Rap', 
    'Phonk': 'Phonk', 'Gangsta Rap': 'Gangsta Rap', 'Conscious Hip-Hop': 'Conscious Hip-Hop',
    'Old School': 'Old School', 'Turntablism': 'Turntablism', 'Mumble Rap': 'Mumble Rap',
    'Lo-Fi Hip Hop': 'Lo-Fi Hip Hop'
  },
  'Jazz & Blues': {
    'Jazz': 'Jazz', 'Neo-Soul': 'Neo-Soul', 'Funk': 'Funk', 'R&B': 'R&B', 
    'Soul': 'Nhạc Soul', 'Gospel': 'Gospel (Thánh ca)', 'Swing': 'Swing', 'Bebop': 'Bebop',
    'Fusion': 'Fusion', 'Smooth Jazz': 'Smooth Jazz', 'Acid Jazz': 'Acid Jazz',
    'Cool Jazz': 'Cool Jazz', 'Free Jazz': 'Free Jazz', 'Big Band': 'Big Band',
    'Blues': 'Blues', 'Delta Blues': 'Delta Blues', 'Chicago Blues': 'Chicago Blues',
    'Electric Blues': 'Electric Blues'
  },
  'Cổ điển & Nhạc phim (Classical/Soundtrack)': {
    'Orchestral': 'Dàn nhạc', 'Classical': 'Cổ điển', 'Symphony': 'Giao hưởng', 
    'Chamber Music': 'Thính phòng', 'Opera': 'Opera', 'Baroque': 'Baroque',
    'Romantic Era': 'Thời kỳ Lãng mạn', 'Impressionist': 'Ấn tượng', 'Minimalism': 'Tối giản',
    'Cinematic': 'Điện ảnh', 'Soundtrack': 'Nhạc phim', 'Trailer Music': 'Nhạc Trailer',
    'Epic': 'Hùng tráng', 'Video Game Music': 'Nhạc Game', 'Musical Theatre': 'Nhạc kịch'
  },
  'Dân gian & Thế giới (World/Folk)': {
    'Folk': 'Dân ca', 'Acoustic Folk': 'Folk mộc', 'Indie Folk': 'Indie Folk',
    'Country': 'Đồng quê', 'Bluegrass': 'Bluegrass', 'Americana': 'Americana',
    'Reggae': 'Reggae', 'Ska': 'Ska', 'Dub': 'Dub', 'Dancehall': 'Dancehall',
    'Celtic': 'Celtic', 'Traditional Japanese': 'Nhật Bản truyền thống', 'Flamenco': 'Flamenco', 
    'Salsa': 'Salsa', 'Bossa Nova': 'Bossa Nova', 'Samba': 'Samba', 'Tango': 'Tango',
    'Afrobeat': 'Afrobeat', 'Bollywood': 'Bollywood', 'Klezmer': 'Klezmer',
    'Reggaeton': 'Reggaeton', 'Latin': 'Latin', 'Bolero': 'Bolero', 'Vietnamese Folk': 'Dân ca Việt Nam'
  },
  'Thực nghiệm & V5 (Experimental)': {
    'Experimental': 'Thực nghiệm', 'Avant-Garde': 'Tiền vệ (Avant-Garde)', 'Noise': 'Noise',
    'Drone': 'Drone', 'Soundscape': 'Cảnh quan âm thanh', 'Musique Concrète': 'Musique Concrète',
    'Glitch': 'Glitch', 'Abstract': 'Trừu tượng', 'Microtonal': 'Microtonal',
    'Spoken Word': 'Đọc thơ/Kể chuyện', 'Acousmatic': 'Acousmatic', 'Industrial': 'Industrial',
    'Atmospheric Black Metal': 'Atmospheric Black Metal'
  }
};

// Significantly Expanded Instruments based on User Images & V5 capabilities
export const instruments: CategoryMap = {
  'Bàn phím (Keys)': {
    'Piano': 'Piano', 'Grand Piano': 'Đại dương cầm', 'Felt Piano': 'Piano nỉ (Felt)', 'Electric Piano': 'Piano điện',
    'Rhodes': 'Rhodes', 'Wurlitzer': 'Wurlitzer', 'Organ': 'Organ', 'Hammond Organ': 'Hammond Organ',
    'Pipe Organ': 'Đàn ống', 'Harpsichord': 'Harpsichord', 'Clavinet': 'Clavinet', 'Celesta': 'Celesta',
    'Accordion': 'Accordion (Phong cầm)', 'Mellotron': 'Mellotron', 'Toy Piano': 'Piano đồ chơi'
  },
  'Tổng hợp & Điện tử (Synths & Electronic)': {
    'Synthesizer': 'Synthesizer', 'Analog Synth': 'Analog Synth', 'Modular Synth': 'Modular Synth',
    'Wavetable Synth': 'Wavetable Synth', 'FM Synth': 'FM Synth', 'Moog Synth': 'Moog Synth',
    'Theremin': 'Theremin', 'Vocoder': 'Vocoder', 'Sampler': 'Sampler', 'Arpeggiator': 'Arpeggiator',
    'Sawtooth Wave': 'Sóng răng cưa', 'Square Wave': 'Sóng vuông', 'Sub-bass': 'Sub-bass', 
    '8-bit': '8-bit', 'Chiptune': 'Chiptune', 'Glitch': 'Glitch', 'Oscillator': 'Bộ dao động'
  },
  'Guitar & Bass': {
    'Acoustic Guitar': 'Guitar thùng', 'Nylon Guitar': 'Guitar dây nilon', 'Electric Guitar': 'Guitar điện',
    'Distorted Guitar': 'Guitar méo tiếng', 'Clean Guitar': 'Guitar sạch', 'Muted Guitar': 'Guitar bịt dây',
    'Steel Guitar': 'Guitar thép', 'Dobro': 'Dobro', 'Funky Guitar': 'Funky Guitar',
    'Bass Guitar': 'Guitar Bass', 'Slap Bass': 'Slap Bass', 'Double Bass': 'Contrabass', 'Fretless Bass': 'Bass không phím',
    '808 Bass': '808 Bass', 'Reese Bass': 'Reese Bass',
    'Banjo': 'Banjo', 'Mandolin': 'Mandolin', 'Ukulele': 'Ukulele', 'Pedal Steel': 'Pedal Steel'
  },
  'Dàn dây & Giao hưởng (Orchestral & Strings)': {
    'String Section': 'Dàn dây', 'Violin': 'Violin', 'Cello': 'Cello', 'Viola': 'Viola',
    'Harp': 'Đàn hạc', 'Fiddle': 'Đàn Fiddle',
    'Pizzicato Strings': 'Dây gảy (Pizzicato)', 'Tremolo Strings': 'Dây rung (Tremolo)', 'Spiccato': 'Spiccato',
    'Staccato': 'Ngắt âm (Staccato)', 'Legato': 'Liền mạch (Legato)', 'Orchestral Hit': 'Dàn nhạc nhấn mạnh'
  },
  'Bộ gõ (Percussion)': {
    'Drum Kit': 'Bộ trống', 'Electronic Drums': 'Trống điện tử', 'Drum Machine': 'Máy trống',
    'Acoustic Drums': 'Trống mộc', '808 Kick': 'Trống Kick 808', 'Breakbeat': 'Breakbeat',
    'Timpani': 'Trống định âm', 'Cajon': 'Trống Cajon', 'Congas': 'Congas', 'Bongos': 'Bongos', 'Djembe': 'Djembe',
    'Taiko': 'Trống Taiko', 'Tabla': 'Trống Tabla', 'Steel Drums': 'Trống thép', 'Hang Drum': 'Hang Drum',
    'Marimba': 'Marimba', 'Xylophone': 'Mộc cầm', 'Vibraphone': 'Vibraphone', 'Glockenspiel': 'Chuông phiến',
    'Shaker': 'Shaker', 'Tambourine': 'Tambourine', 'Cowbell': 'Mõ bò', 'Gong': 'Chiêng/Cồng',
    'Claps': 'Tiếng vỗ tay', 'Snap': 'Tiếng búng tay', 'Finger Snap': 'Búng tay', 'Wind Chimes': 'Chuông gió'
  },
  'Bộ hơi & Kèn đồng (Wind & Brass)': {
    'Saxophone': 'Saxophone', 'Trumpet': 'Trumpet', 'Trombone': 'Trombone', 'Tuba': 'Tuba', 'French Horn': 'Kèn Pháp',
    'Brass Section': 'Dàn kèn đồng', 'Flute': 'Sáo tây', 'Piccolo': 'Piccolo', 'Clarinet': 'Clarinet', 'Oboe': 'Oboe',
    'Bassoon': 'Bassoon', 'Recorder': 'Sáo dọc', 'Harmonica': 'Harmonica', 'Bagpipes': 'Kèn túi',
    'Pan Flute': 'Sáo Pan', 'Didgeridoo': 'Didgeridoo', 'Tin Whistle': 'Sáo tin'
  },
  'Nhạc cụ dân tộc (World/Ethnic)': {
    'Erhu': 'Đàn nhị', 'Guzheng': 'Cổ tranh', 'Pipa': 'Tỳ bà', 'Dizi': 'Sáo trúc', 'Suona': 'Kèn xona', 'Sheng': 'Sanh',
    'Guqin': 'Cổ cầm', 'Xiao': 'Tiêu', 'Shamisen': 'Shamisen', 'Koto': 'Koto', 'Shakuhachi': 'Shakuhachi',
    'Sitar': 'Sitar', 'Tabla': 'Tabla', 'Gamelan': 'Gamelan', 'Kalimba': 'Kalimba',
    'Oud': 'Oud', 'Bouzouki': 'Bouzouki', 'Duduk': 'Duduk', 'Dan Bau': 'Đàn Bầu', 'Dan Tranh': 'Đàn Tranh'
  }
};

// Effects and Mixing
export const effects: CategoryMap = {
  'Hiệu ứng hòa âm (Mixing)': {
    'Reverb': 'Vang (Reverb)', 'Hall Reverb': 'Vang sảnh lớn', 'Shimmer Reverb': 'Vang lấp lánh', 'Delay': 'Trễ (Delay)', 'Ping Pong Delay': 'Delay bóng bàn',
    'Tape Delay': 'Delay băng từ', 'Chorus': 'Chorus', 'Flanger': 'Flanger', 'Phaser': 'Phaser', 'Tremolo': 'Tremolo',
    'Distortion': 'Méo tiếng (Distortion)', 'Overdrive': 'Overdrive', 'Fuzz': 'Fuzz', 'Bitcrusher': 'Bitcrusher', 'Saturation': 'Bão hòa (Saturation)',
    'Sidechain Compression': 'Nén Sidechain', 'Auto-Tune': 'Auto-Tune', 'Vocoder': 'Vocoder', 'Talkbox': 'Talkbox'
  },
  'Môi trường & Âm thanh (Foley/SFX)': {
    'Vinyl Crackle': 'Tiếng đĩa than', 'Tape Hiss': 'Tiếng băng từ', 'Rain Sounds': 'Tiếng mưa', 'Thunder': 'Sấm sét', 'Ocean Waves': 'Sóng biển',
    'City Traffic': 'Giao thông thành phố', 'Birdsong': 'Tiếng chim', 'Campfire': 'Lửa trại', 'Crowd Noise': 'Tiếng đám đông', 'Siren': 'Còi hụ',
    'Glitch': 'Tiếng Glitch', 'Record Scratch': 'Tiếng chà đĩa', 'White Noise': 'Tiếng ồn trắng', 'Pink Noise': 'Tiếng ồn hồng', 'Sub Drop': 'Sub Drop'
  }
};

// Vocals
export const vocals: CategoryMap = {
  'Cơ bản (Basic Types)': {
    'Male Vocal': 'Giọng nam', 'Female Vocal': 'Giọng nữ', 'Child Vocal': 'Giọng trẻ em', 
    'Deep Voice': 'Giọng trầm', 'High-Pitched Voice': 'Giọng cao', 
    'Duet': 'Song ca', 'Choir': 'Hợp xướng', 'Background Vocals': 'Bè nền',
    'Male Harmony': 'Bè nam', 'Female Harmony': 'Bè nữ',
    'Acapella': 'Acapella', 'Gregorian Chant': 'Thánh ca Gregorian'
  },
  'Phong cách & Chất liệu (Style & Texture)': {
    'Airy Vocal': 'Giọng hơi', 'Whisper': 'Thì thầm', 'Raspy Voice': 'Giọng khàn', 
    'Soulful Singing': 'Hát truyền cảm', 'Rap': 'Rap', 'Spoken Word': 'Đọc lời', 
    'Operatic': 'Phong cách Opera', 'Male Vocoder': 'Vocoder nam', 'Robot Voice': 'Giọng robot',
    'Soft': 'Nhẹ nhàng', 'Sharp': 'Sắc bén', 'Steady': 'Ổn định', 'Ethereal': 'Thanh tao',
    'Full': 'Đầy đặn', 'Bright': 'Sáng', 'Rich': 'Phong phú', 'Crisp': 'Gọn gàng',
    'Delicate': 'Tinh tế', 'Clear': 'Trong trẻo', 'Moist': 'Ướt át', 'Dry': 'Khô',
    'Metallic': 'Kim loại', 'Lingering': 'Vương vấn', 'Smooth': 'Mượt mà', 
    'Rough': 'Thô ráp', 'Resonant': 'Vang vọng'
  },
  'Kỹ thuật (Technique)': {
    'Swallowed Sound': 'Nuốt âm', 'Coughing': 'Ho', 'Muttering': 'Lầm bầm', 
    'Humming': 'Ngân nga', 'Vibrato': 'Rung giọng', 'Enunciated': 'Phát âm rõ', 
    'Nasal Sound': 'Giọng mũi', 'Emphasized Pronunciation': 'Nhấn âm', 
    'Fast-Talking': 'Nói nhanh', 'Gasping': 'Thở hổn hển', 'Abrupt Speaking': 'Nói cộc lốc', 
    'Staccato Voice': 'Giọng ngắt quãng', 'Legato': 'Hát liền mạch', 'Belting': 'Hát to/Hét',
    'Head Voice': 'Giọng đầu', 'Chest Voice': 'Giọng ngực', 'Diaphragmatic Voice': 'Giọng bụng', 
    'Falsetto': 'Giọng gió', 'Soft Singing': 'Hát nhẹ', 'Pressed Voice': 'Giọng nén', 
    'Relaxed Voice': 'Giọng thư giãn', 'Voice Breaks': 'Vỡ giọng', 'High Note Breakthrough': 'Đột phá nốt cao',
    'Whistling': 'Huýt sáo', 'Beatboxing': 'Beatboxing'
  },
  'Cảm xúc & Biểu đạt (Emotion & Expression)': {
    'Crying Tone': 'Giọng khóc', 'Exaggerated Pronunciation': 'Phát âm cường điệu', 
    'Heart-Wrenching Voice': 'Giọng đau xé lòng', 'Fresh Voice': 'Giọng tươi mới', 
    'Definite Pronunciation': 'Phát âm dứt khoát', 'Free Voice': 'Giọng tự do', 
    'Straightforward Voice': 'Giọng thẳng thắn', 'Emotional': 'Đa cảm',
    'Screaming': 'Gào thét', 'Growling': 'Gầm gừ'
  },
  'Đặc điểm âm thanh (Audio Characteristics)': {
    'Clear High Frequencies': 'Tần số cao rõ', 'Solid Low Frequencies': 'Tần số thấp chắc', 
    'Irregular Pitch': 'Cao độ không đều', 'Pitch Modulation': 'Biến điệu cao độ', 
    'Pitch Fluctuations': 'Dao động cao độ', 'Pitch Bending': 'Bẻ cong cao độ', 
    'Breathy Sound': 'Nhiều hơi', 'Pushed Voice': 'Giọng đẩy', 
    'Resonance': 'Cộng hưởng', 'Chest Resonance': 'Cộng hưởng ngực', 
    'Nasal Resonance': 'Cộng hưởng mũi', 'Throat Resonance': 'Cộng hưởng họng', 
    'Muted Resonance': 'Cộng hưởng bị hãm', 'Heavy Breathing': 'Thở nặng', 
    'Trembling Tone': 'Giọng run', 'Distorted Tone': 'Giọng méo', 
    'Throat Sound': 'Âm họng', 'Vocal Distortion': 'Méo giọng'
  },
  'Sáng tạo & Khác (Creative & Other)': {
    'Vocal Chops': 'Cắt giọng (Vocal Chops)',
    'Scat Singing': 'Hát Scat', 'Yodeling': 'Hát Yodel',
    'Tuvan Throat Singing': 'Hát khan Tuva',
    'Mandarin': 'Tiếng Quan Thoại', 'Cantonese': 'Tiếng Quảng Đông', 'Seiyuu Voice': 'Giọng Seiyuu', 'Idol Group': 'Nhóm thần tượng',
    'Vietnamese': 'Tiếng Việt'
  }
};

export const moods: TagMap = {
  'Happy': 'Hạnh phúc', 'Sad': 'Buồn', 'Energetic': 'Năng động', 'Relaxing': 'Thư giãn', 'Romantic': 'Lãng mạn',
  'Dark': 'Tăm tối', 'Epic': 'Hùng tráng', 'Mysterious': 'Bí ẩn', 'Nostalgic': 'Hoài niệm', 'Uplifting': 'Phấn chấn',
  'Melancholic': 'U sầu', 'Peaceful': 'Bình yên', 'Anxious': 'Lo âu', 'Aggressive': 'Hung hăng',
  'Dreamy': 'Mơ mộng', 'Cozy': 'Ấm cúng', 'Futuristic': 'Tương lai', 'Spooky': 'Rùng rợn', 'Suspenseful': 'Hồi hộp',
  'Soaring': 'Bay bổng', 'Heartfelt': 'Chân thành', 'Driving': 'Mạnh mẽ (Driving)', 'Intimate': 'Thân mật', 'Warm': 'Ấm áp',
  'Mellow': 'Êm dịu', 'Cold and Uncaring': 'Lạnh lùng vô cảm', 'Emotional Singing': 'Hát đầy cảm xúc',
  'Touching Performance': 'Màn trình diễn cảm động', 'Danceable': 'Dễ nhảy', 'Festive': 'Lễ hội', 'Groovy': 'Cuốn hút (Groovy)',
  'Tipsy': 'Chếnh choáng', 'Atmospheric': 'Có không khí', 'Cold': 'Lạnh', 'Doom': 'Diệt vong', 'Dramatic': 'Kịch tính',

  'Cinematic': 'Điện ảnh', 'Emotional': 'Cảm xúc', 'Euphoric': 'Hưng phấn', 'Playful': 'Tinh nghịch', 'Heartbroken': 'Tan nát cõi lòng',
  'Ominous': 'Điềm gở', 'Creepy': 'Đáng sợ', 'Chill': 'Thư thái', 'Ethereal': 'Thanh tao', 'Hypnotic': 'Thôi miên',
  'Sexy': 'Quyến rũ', 'Sentimental': 'Đa cảm', 'Manic': 'Điên cuồng', 'Chaotic': 'Hỗn loạn', 'Kawaii': 'Dễ thương (Kawaii)',

  'Anthemic': 'Tráng ca', 'Gritty': 'Gai góc', 'Raw': 'Thô mộc', 'Psychedelic': 'Ảo giác',
  'Surreal': 'Siêu thực', 'Minimalist': 'Tối giản', 'Complex': 'Phức tạp', 'Industrial': 'Công nghiệp',
  'Tribal': 'Bộ lạc', 'Noir': 'Noir', 'Gothic': 'Gothic', 'Funky': 'Funky',
  'Soulful': 'Có hồn', 'Tense': 'Căng thẳng', 'Majestic': 'Uy nghi', 'Bitter': 'Cay đắng',
  'Sweet': 'Ngọt ngào', 'Angry': 'Giận dữ', 'Lonely': 'Cô đơn', 'Hopeful': 'Hy vọng',
  'Sarcastic': 'Mỉa mai', 'Whimsical': 'Kỳ lạ', 'Seishun': 'Thanh xuân'
};

export const production: TagMap = {
  'Studio Quality': 'Chất lượng phòng thu', 'High-Fidelity': 'Hi-Fi', 'Live Performance': 'Trình diễn trực tiếp', 'Demo': 'Bản nháp (Demo)',
  'Raw Recording': 'Thu âm thô', 'Lo-Fi': 'Lo-Fi', 'Vintage': 'Cổ điển', 'Retro': 'Phong cách Retro',
  '1950s': 'Thập niên 1950', '1960s': 'Thập niên 1960', '1970s': 'Thập niên 1970', '1980s': 'Thập niên 1980', '1990s': 'Thập niên 1990',
  '2000s': 'Thập niên 2000', '2010s': 'Thập niên 2010', 'Futuristic': 'Tương lai', 'Medieval': 'Trung cổ',
  'Cyberpunk': 'Cyberpunk', 'Steampunk': 'Steampunk', 'Synthetic Effects': 'Hiệu ứng tổng hợp',
  'Acoustic': 'Acoustic', 'Electric': 'Điện', 'Digital': 'Kỹ thuật số', 'Live': 'Sống động', 'Studio': 'Phòng thu',
  'Unplugged': 'Không cắm điện', 'Amplified': 'Khuếch đại', 'Layered': 'Nhiều lớp', 'Echoed': 'Vang vọng',
  'Distorted': 'Méo tiếng', 'Stereo': 'Stereo', 'Mono': 'Mono', 'Surround Sound': 'Âm thanh vòm',
  'Binaural': 'Binaural', 'Immersive': 'Đắm chìm', 'Masterpiece': 'Kiệt tác'
};

export const structure: TagMap = {
  'Slow Tempo': 'Nhịp chậm', 'Medium Tempo': 'Nhịp vừa', 'Fast Tempo': 'Nhịp nhanh', 'Pulsing rhythm': 'Nhịp đập',
  'Repetitive loop': 'Vòng lặp', 'Slow build-up': 'Tăng dần chậm', 'Crescendo': 'Mạnh dần (Crescendo)', 'Decrescendo': 'Nhẹ dần',
  'No Drums': 'Không trống', 'Instrumental': 'Không lời',
  '[Intro]': 'Mở đầu [Intro]', '[Verse]': 'Lời chính [Verse]', '[Chorus]': 'Điệp khúc [Chorus]', '[Bridge]': 'Cầu nối [Bridge]',
  '[Solo]': 'Độc tấu', '[Guitar Solo]': 'Solo Guitar', '[Synth Solo]': 'Solo Synth', '[Acoustic Solo]': 'Solo Acoustic',
  '[Outro]': 'Kết thúc [Outro]', '[Grand Finale]': 'Kết màn hoành tráng',
  'Volume Swells': 'Âm lượng tăng giảm', 'Sustained Notes': 'Nốt kéo dài', 'Interval Jumps': 'Nhảy quãng',
  'Quick Transitions': 'Chuyển đoạn nhanh', 'Glide': 'Trượt âm', 'Pause': 'Tạm dừng',
  'Rhythmic Breathing': 'Thở theo nhịp', 'Frequent Breathing Pauses': 'Thở ngắt quãng', 'Tone Transitions': 'Chuyển đổi âm sắc',
  '[Refrain]': 'Điệp ngữ [Refrain]', '[Big Finish]': 'Kết thúc lớn', '[Fade Out]': 'Nhạt dần', '[Fade to End]': 'Nhạt dần đến hết',
  '[Break]': 'Nghỉ [Break]', '[Instrumental Interlude]': 'Gian tấu', '[Melodic Bass]': 'Bass giai điệu',
  '[Percussion Break]': 'Đoạn nghỉ bộ gõ', '[Syncopated Bass]': 'Bass đảo phách', '[Fingerstyle Guitar Solo]': 'Solo Guitar gảy ngón',
  '[Build]': 'Xây dựng cao trào', '[Bass Drop]': 'Bass Drop', '[Hook]': 'Đoạn bắt tai [Hook]', '[instrumental intro]': 'Mở đầu không lời',
  '[Short Instrumental Intro]': 'Mở đầu ngắn không lời', '[piano intro]': 'Mở đầu Piano', '[sad verse]': 'Lời buồn',
  '[rapped verse]': 'Đoạn Rap', '[pre-chorus]': 'Tiền điệp khúc', '[catchy hook]': 'Hook bắt tai',
  '[finale]': 'Hồi kết', '[Interlude]': 'Khúc dạo', '[End]': 'Hết',
  'Key Change': 'Chuyển giọng (Key Change)', 'Polyrhythm': 'Đa tiết tấu', 'Odd Time Signature': 'Nhịp lẻ', 'Double Time': 'Nhân đôi tốc độ'
};

// V5 Advanced Technical Tags
export const v5Advanced: TagMap = {
  '[Instrumental]': 'Chế độ không lời', '[Explicit]': 'Nội dung nhạy cảm', '[Fade Out]': 'Kết thúc nhỏ dần', '[Fade In]': 'Bắt đầu to dần',
  '[Silence]': 'Im lặng/Dừng', '[Spoken Word]': 'Đoạn nói', '[Acappella]': 'Hát không nhạc', '[Count In]': 'Đếm nhịp vào',
  '[Audience Cheer]': 'Tiếng reo hò', '[Applause]': 'Tiếng vỗ tay', '[Laugh]': 'Tiếng cười', '[Sigh]': 'Tiếng thở dài',
  '[Breathing]': 'Tiếng thở', '[Short]': 'Bản ngắn', '[Long]': 'Bản dài'
};

// NEW: Suno v5 High Quality Performance Tags (AI-Enhanced for v5 Model)
export const v5Performance: TagMap = {
  'Virtuoso Solo': 'Solo điêu luyện', 'Improvisation': 'Ngẫu hứng', 'Complex Harmony': 'Hòa âm phức tạp',
  'Syncopated Rhythm': 'Nhịp đảo phách', 'Polyrhythm': 'Đa tiết tấu', 'Rubato': 'Nhịp tự do (Rubato)',
  'Staccato': 'Ngắt âm (Staccato)', 'Legato': 'Liền mạch (Legato)', 'Crescendo': 'Mạnh dần', 'Diminuendo': 'Nhẹ dần',
  'Unplugged': 'Mộc (Unplugged)', 'Acoustic Resonance': 'Cộng hưởng mộc', 'Room Tone': 'Âm thanh phòng',
  'Wide Stereo': 'Stereo rộng', '3D Audio': 'Âm thanh 3D', 'High Fidelity': 'Độ trung thực cao',
  'Detailed Texture': 'Kết cấu chi tiết', 'Atmospheric': 'Bầu không khí', 'Experimental': 'Thực nghiệm',
  'Dynamic': 'Động lực học', 'Expressive': 'Biểu cảm', 'Crisp': 'Sắc nét', 'Warm': 'Ấm áp',
  'Intricate': 'Tinh xảo', 'Lush': 'Phong phú', 'Punchy': 'Mạnh mẽ', 'Tight': 'Chặt chẽ'
};

// Mixing Presets (Audio Profiles)
export const mixingPresets: TagMap = {
  'Radio Ready': 'Chuẩn Radio', 'Live Stadium': 'Sân vận động', 'Small Club': 'Club nhỏ', 'Bedroom Pop': 'Bedroom Pop',
  'Old Vinyl': 'Đĩa than cũ', 'Cassette Tape': 'Băng Cassette', 'Underwater': 'Dưới nước', 'Phone Recording': 'Ghi âm điện thoại',
  'Wide Stereo': 'Stereo rộng', 'Mono Mix': 'Trộn Mono', 'Bass Boosted': 'Tăng Bass', 'Treble Boosted': 'Tăng Treble'
};

// Japanese Anime & Drama Specialized Data
export const animeDrama: CategoryMap = {
  'Chủ đề & Phong cách (Theme & Style)': {
    'Anime Title Track': 'Nhạc chủ đề Anime', 'Shonen Jump Style': 'Phong cách Shonen (Nhiệt huyết)', 'Shojo Romance': 'Lãng mạn thiếu nữ',
    'Slice of Life': 'Đời thường (Slice of Life)', 'Isekai Fantasy': 'Dị giới (Isekai)', 'Cyberpunk Anime': 'Cyberpunk Anime',
    'Tokusatsu': 'Tokusatsu (Siêu nhân)', 'Idol Group': 'Nhóm thần tượng', 'Visual Kei': 'Visual Kei',
    'Seishun Punk': 'Punk thanh xuân', 'Sentimental Drama': 'Phim tình cảm ướt át', 'Ghibli Style': 'Phong cách Ghibli'
  },
  'Cấu trúc & Giọng hát (Structure & Vocals)': {
    'TV Size': 'Bản TV (90s)', 'Anime OP': 'Nhạc mở đầu (OP)', 'Anime ED': 'Nhạc kết thúc (ED)', 'Insert Song': 'Nhạc lồng trong phim',
    'Character Song': 'Bài hát nhân vật', 'Seiyuu Vocals': 'Giọng diễn viên lồng tiếng', 'Ensemble': 'Hát tập thể',
    'Call and Response': 'Hô hào đối đáp', 'Anime Shout': 'Tiếng hét Anime', 'Monologue': 'Độc thoại',
    'Pre-Chorus Build': 'Dồn dập trước điệp khúc', 'Key Change (Modulation)': 'Chuyển tông (Lên Key)'
  },
  'Nhạc cụ & Hiệu ứng đặc trưng (Special Instruments/FX)': {
    'Orchestra Hit': 'Orchestra Hit', 'Synth Brass': 'Synth Brass', 'Fast BPM': 'BPM cao',
    'Guitar Shredding': 'Guitar tốc độ cao', 'Slap Bass Solo': 'Solo Slap Bass', 'Emotional Piano': 'Piano cảm xúc',
    'Glockenspiel': 'Glockenspiel (Dễ thương)', 'Melodica': 'Melodica', 'School Bell': 'Tiếng chuông trường',
    'Cicada Sounds': 'Tiếng ve sầu (Mùa hè)', 'Train Crossing': 'Tiếng chắn tàu', 'Fireworks': 'Tiếng pháo hoa',
    'Power Drums': 'Trống mạnh', 'Shamisen Rock': 'Rock Shamisen', 'Koto Ballad': 'Ballad Koto'
  }
};

// Song Structure Templates
export const structureTemplates: StructureTemplate[] = [
  {
    name: 'Pop Chuẩn (Standard Pop)',
    content: `[Intro]
(Instrumental)

[Verse 1]
...

[Pre-Chorus]
...

[Chorus]
...

[Verse 2]
...

[Chorus]
...

[Bridge]
...

[Chorus]
...

[Outro]
(Fade out)`
  },
  {
    name: 'Anime Opening (Sôi động)',
    content: `[Intro]
(Fast tempo, high energy)

[Verse 1]
...

[Pre-Chorus]
(Building tension)

[Chorus]
(Explosive energy, catchy hook)

[Interlude]
(Guitar Solo)

[Bridge]
(Slow down, emotional)

[Chorus]
(Key Change / Modulation)

[Outro]
(Big finish)`
  },
  {
    name: 'EDM (Build & Drop)',
    content: `[Intro]
(Atmospheric pads)

[Verse 1]
...

[Build]
(Rising tension)

[Drop]
(Heavy bass and synth lead)

[Break]
...

[Build]
...

[Drop]
...

[Outro]`
  },
  {
    name: 'Rap/Hip-Hop Flow',
    content: `[Intro]
(Beat starts, ad-libs)

[Hook]
...

[Verse 1]
(Flow switch)
...

[Hook]
...

[Verse 2]
...

[Bridge]
...

[Hook]
...

[Outro]
(Beat fades)`
  },
  {
    name: 'Dân ca kể chuyện (Folk)',
    content: `[Intro]
(Acoustic guitar picking)

[Verse 1]
...

[Interlude]
(Harmonica solo)

[Verse 2]
...

[Chorus]
...

[Verse 3]
...

[Chorus]
...

[Outro]
(Slow down)`
  }
];

export const demoTemplates: DemoTemplate[] = [
  // --- EXISTING TEMPLATES ---
  {
    name: 'Nhạc Phim Sử Thi',
    tags: {
      genres: ['Cinematic', 'Soundtrack', 'Orchestral'],
      instruments: ['String Section', 'Brass Section', 'Timpani', 'Choir'],
      moods: ['Epic', 'Dramatic', 'Suspenseful'],
      production: ['Studio Quality', 'High-Fidelity'],
      structure: ['[Intro]', '[Build]', '[Grand Finale]']
    }
  },
  {
    name: 'Trailer Lai Epic',
    tags: {
      genres: ['Cinematic', 'Hybrid'],
      instruments: ['Synthesizer', 'Braams', 'String Section', 'Taiko'],
      moods: ['Epic', 'Aggressive', 'Suspenseful'],
      production: ['Studio Quality', 'Distorted', 'Layered'],
      structure: ['[Intro]', 'Slow build-up', '[Bass Drop]', '[Climax]']
    }
  },
  {
    name: 'Cyber Metal',
    tags: {
      genres: ['Industrial Metal', 'Cyberpunk'],
      instruments: ['Distorted Guitar', 'Synthesizer', 'Drum Machine'],
      moods: ['Aggressive', 'Futuristic', 'Dark'],
      vocals: ['Screaming', 'Vocal Distortion'],
      production: ['Cyberpunk', 'Distorted', 'High-Fidelity'],
      structure: ['Fast Tempo', '[Guitar Solo]', '[Breakdown]']
    }
  },
  {
    name: 'Lo-Fi Chill Học Bài',
    tags: {
      genres: ['Lo-Fi Hip Hop'],
      instruments: ['Felt Piano', 'Electronic Drums', 'Double Bass'],
      moods: ['Relaxing', 'Cozy', 'Nostalgic', 'Mellow'],
      production: ['Lo-Fi', 'Vintage', 'Vinyl Crackle'],
      vocals: ['Instrumental']
    }
  },
  {
    name: 'Synthwave Thập Niên 80',
    tags: {
      genres: ['Synthwave', 'Cyberpunk'],
      instruments: ['Analog Synth', 'Drum Kit', 'Arpeggiator', 'Sawtooth Wave'],
      moods: ['Dark', 'Futuristic', 'Energetic', 'Driving'],
      vocals: ['Male Vocoder', 'Robot Voice'],
      production: ['1980s', 'Retro', 'Synthetic Effects'],
      effects: ['Delay', 'Reverb']
    }
  },
  {
    name: 'Chuyện Tình Indie Folk',
    tags: {
      genres: ['Folk', 'Indie Pop'],
      instruments: ['Acoustic Guitar', 'Harmonica', 'Violin', 'Tambourine'],
      moods: ['Heartbroken', 'Intimate', 'Warm', 'Sentimental'],
      vocals: ['Female Vocal', 'Male Vocal'],
      production: ['Acoustic', 'Raw Recording'],
      structure: ['[Verse]', '[Chorus]', '[Bridge]']
    }
  },
  // --- NEW ANIME / DRAMA TEMPLATES ---
  {
    name: 'Anime Shonen Nhiệt Huyết',
    tags: {
      genres: ['J-Rock', 'Pop Punk'],
      instruments: ['Electric Guitar', 'Drum Kit', 'Bass Guitar', 'Synth Brass'],
      moods: ['Energetic', 'Heroic', 'Uplifting', 'Anthemic'],
      vocals: ['Male Vocal', 'Belting'],
      structure: ['TV Size', '[Intro]', '[Chorus]', 'Fast Tempo'],
      animeDrama: ['Shonen Jump Style', 'Anime OP', 'Orchestra Hit', 'Fast BPM']
    }
  },
  {
    name: 'Ballad Phim Tình Cảm',
    tags: {
      genres: ['J-Pop', 'Ballad'],
      instruments: ['Grand Piano', 'String Section', 'Acoustic Guitar'],
      moods: ['Sentimental', 'Heartbroken', 'Emotional', 'Warm'],
      vocals: ['Female Vocal', 'Breath Sound', 'Emotional Singing'],
      production: ['Studio Quality', 'Masterpiece'],
      structure: ['Slow Tempo', '[Bridge]', 'Key Change'],
      animeDrama: ['Sentimental Drama', 'Insert Song', 'Emotional Piano']
    }
  },
  {
    name: 'Magical Girl (Biến Hình)',
    tags: {
      genres: ['J-Pop', 'Synth-Pop'],
      instruments: ['Synthesizer', 'Glockenspiel', 'Violin', 'Electronic Drums'],
      moods: ['Kawaii', 'Happy', 'Sparkling', 'Energetic'],
      vocals: ['Female Vocal', 'High-Pitched Voice', 'Seiyuu Voice'],
      effects: ['Shimmer Reverb'],
      animeDrama: ['Shojo Romance', 'Anime OP', 'Idol Group']
    }
  },
  {
    name: 'Chiến Đấu Isekai',
    tags: {
      genres: ['Symphonic Metal', 'Fantasy'],
      instruments: ['Electric Guitar', 'Choir', 'Orchestra Hit', 'Drum Kit'],
      moods: ['Epic', 'Fantasy', 'Dramatic'],
      production: ['High-Fidelity', 'Wide Stereo'],
      animeDrama: ['Isekai Fantasy', 'Orchestra Hit', 'Guitar Shredding']
    }
  },
  {
    name: 'Ban Nhạc Học Đường',
    tags: {
      genres: ['J-Rock', 'Power Pop'],
      instruments: ['Electric Guitar', 'Bass Guitar', 'Drum Kit', 'Piano'],
      moods: ['Seishun', 'Energetic', 'Nostalgic', 'Playful'],
      vocals: ['Female Vocal', 'Ensemble'],
      production: ['Live Performance', 'Raw'],
      animeDrama: ['Slice of Life', 'School Bell', 'Seishun Punk']
    }
  },
  // --- EXISTING CONTINUED ---
  {
    name: 'J-Rock Anime (Cổ Điển)', // Kept for backward compatibility but users can choose new ones
    tags: {
      genres: ['J-Rock', 'Rock', 'Pop'],
      instruments: ['Electric Guitar', 'Bass Guitar', 'Drum Kit', 'String Section'],
      moods: ['Energetic', 'Uplifting', 'Epic', 'Heroic'],
      vocals: ['Female Vocal', 'Belting', 'High Note Breakthrough'],
      structure: ['Fast Tempo', '[Intro]', '[Guitar Solo]', '[Grand Finale]'],
      production: ['Studio Quality', 'Amplified']
    }
  },
  {
    name: 'R&B Hiện Đại',
    tags: {
      genres: ['R&B', 'Neo-Soul'],
      instruments: ['Rhodes', 'Bass Guitar', 'Electronic Drums', 'Synth-Pop'],
      moods: ['Relaxing', 'Sensual', 'Mellow', 'Intimate'],
      vocals: ['Female Vocal', 'Falsetto', 'Breathy Sound'],
      effects: ['Reverb', 'Tape Delay'],
      production: ['High-Fidelity', 'Layered']
    }
  },
  {
    name: 'Jazz Fusion Odyssey',
    tags: {
      genres: ['Fusion', 'Progressive Rock'],
      instruments: ['Electric Guitar', 'Synthesizer', 'Saxophone', 'Bass Guitar'],
      moods: ['Complex', 'Energetic', 'Groovy'],
      structure: ['Odd Time Signature', '[Solo]', 'Polyrhythm'],
      production: ['Studio Quality', 'Stereo']
    }
  },
  {
    name: 'Nhạc Thiền Ambient',
    tags: {
      genres: ['Ambient', 'New Age'],
      instruments: ['Modular Synth', 'Flute', 'Harp', 'Singing Bowl'],
      moods: ['Peaceful', 'Relaxing', 'Dreamy', 'Ethereal'],
      vocals: ['Instrumental'],
      structure: ['Slow Tempo', '[Fade Out]'],
      effects: ['Reverb', 'Shimmer Reverb']
    }
  },
  {
    name: 'Trap Hip-Hop',
    tags: {
      genres: ['Trap', 'Hip-Hop'],
      instruments: ['808 Bass', 'Drum Machine', 'Synthesizer'],
      moods: ['Dark', 'Aggressive', 'Driving'],
      vocals: ['Rap', 'Auto-Tune'],
      structure: ['Fast Tempo', '[Bass Drop]'],
      production: ['Studio Quality', 'Digital']
    }
  },
  {
    name: 'Piano Cổ Điển Solo',
    tags: {
      genres: ['Classical', 'Cinematic'],
      instruments: ['Grand Piano'],
      moods: ['Melancholic', 'Intimate', 'Peaceful', 'Romantic'],
      vocals: ['Instrumental'],
      structure: ['Slow Tempo', '[Solo]', 'Rubato'],
      production: ['Studio Quality', 'Wide Stereo']
    }
  },
  {
    name: '90s Boom Bap Hip-Hop',
    tags: {
      genres: ['Boom Bap', 'Hip-Hop', 'Jazz Rap'],
      instruments: ['Sampler', 'Drum Kit', 'Double Bass'],
      moods: ['Nostalgic', 'Chill', 'Groovy'],
      production: ['1990s', 'Vintage', 'Lo-Fi'],
      effects: ['Vinyl Crackle']
    }
  },
  {
    name: 'Nhạc Đồng Quê',
    tags: {
      genres: ['Country', 'Folk'],
      instruments: ['Acoustic Guitar', 'Pedal Steel', 'Fiddle'],
      moods: ['Nostalgic', 'Heartbroken', 'Warm'],
      vocals: ['Male Vocal', 'Raspy Voice'],
      structure: ['[Verse]', '[Chorus]', '[Bridge]']
    }
  },
  {
    name: 'Future Bass Sôi Động',
    tags: {
      genres: ['Future Bass', 'EDM'],
      instruments: ['Synthesizer', 'Sawtooth Wave', 'Electronic Drums'],
      moods: ['Uplifting', 'Energetic', 'Euphoric'],
      vocals: ['Vocal Chops'],
      effects: ['Sidechain Compression'],
      structure: ['[Build]', '[Drop]']
    }
  },
  {
    name: 'Bossa Nova Cafe',
    tags: {
      genres: ['Bossa Nova', 'Jazz'],
      instruments: ['Nylon Guitar', 'Flute', 'Double Bass', 'Bongos'],
      moods: ['Relaxing', 'Romantic', 'Mellow'],
      vocals: ['Female Vocal', 'Whisper'],
      production: ['Acoustic', 'Intimate']
    }
  },
  {
    name: 'Gothic Metal Tối Tăm',
    tags: {
      genres: ['Gothic Metal', 'Metal'],
      instruments: ['Distorted Guitar', 'Bass Guitar', 'Drum Kit', 'Pipe Organ'],
      moods: ['Dark', 'Ominous', 'Dramatic', 'Epic'],
      vocals: ['Operatic', 'Growling'],
      structure: ['[Intro]', '[Guitar Solo]']
    }
  },
  {
    name: 'Reggae Bãi Biển',
    tags: {
      genres: ['Reggae', 'Dub'],
      instruments: ['Bass Guitar', 'Hammond Organ', 'Drum Kit', 'Clean Guitar'],
      moods: ['Happy', 'Relaxing', 'Chill'],
      effects: ['Delay', 'Reverb'],
      production: ['Vintage', 'Echoed']
    }
  },
  {
    name: 'Nhạc Game 8-bit',
    tags: {
      genres: ['8-bit', 'Chiptune'],
      instruments: ['Square Wave', 'Sawtooth Wave', 'Electronic Drums'],
      moods: ['Playful', 'Energetic', 'Happy', 'Nostalgic'],
      vocals: ['Instrumental'],
      structure: ['Fast Tempo', '[Intro]'],
      effects: ['Bitcrusher']
    }
  },
  {
    name: 'Tam Tấu Jazz (Jazz Trio)',
    tags: {
      genres: ['Jazz', 'Swing'],
      instruments: ['Grand Piano', 'Double Bass', 'Drum Kit'],
      moods: ['Relaxing', 'Intimate', 'Classy'],
      vocals: ['Instrumental'],
      production: ['Live Performance', 'High-Fidelity'],
      structure: ['[Solo]']
    }
  },
  {
    name: 'Phim Hành Động Kịch Tính',
    tags: {
      genres: ['Cinematic', 'Soundtrack'],
      instruments: ['String Section', 'Brass Section', 'Electronic Drums', 'Synthesizer'],
      moods: ['Suspenseful', 'Aggressive', 'Driving', 'Chaotic'],
      structure: ['Fast Tempo', '[Climax]'],
      production: ['Studio Quality']
    }
  },
  {
    name: 'Nhạc Nhật Truyền Thống',
    tags: {
      genres: ['Traditional Japanese', 'Folk'],
      instruments: ['Koto', 'Shamisen', 'Shakuhachi', 'Taiko'],
      moods: ['Peaceful', 'Mysterious', 'Ethereal'],
      vocals: ['Female Vocal', 'Traditional'],
      production: ['Acoustic', 'Live']
    }
  },
  {
    name: 'Dân Ca Celtic',
    tags: {
      genres: ['Celtic', 'Folk'],
      instruments: ['Fiddle', 'Tin Whistle', 'Acoustic Guitar', 'Bodhrán', 'Bagpipes'],
      moods: ['Happy', 'Energetic', 'Nostalgic'],
      structure: ['Fast Tempo'],
      production: ['Live Performance']
    }
  }
];
