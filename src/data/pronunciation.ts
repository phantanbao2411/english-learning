import { PronunciationUnit } from "@/types/database";

export const PRONUNCIATION_UNITS: PronunciationUnit[] = [
  {
    id: 1,
    unit_number: 1,
    sound_pair: "/ɪ/ - /i:/ & /ʊ/ - /u:/",
    title: "Nguyên âm ngắn /ɪ/, /ʊ/ và Nguyên âm dài /i:/, /u:/",
    guide_summary: "Luyện khẩu hình mở rộng cười tươi với /i:/ và thả lỏng môi với /ɪ/. Tròn môi đẩy hơi với /u:/ và /ʊ/.",
    dialogue: `Mimi: Good evening! I’m Mimi. What’s your name?\nDean: Hi, I’m Dean. Nice to meet you.\nMimi: Nice to meet you too. Are you a newbie?\nDean: Yes, I am a newbie. I’m in Pronunciation Class.\nMimi: You will learn to speak with clean speech!`,
    sounds: [
      {
        id: 1,
        unit_id: 1,
        ipa: "/ɪ/",
        sound_type: "vowel",
        mouth_guide: "Âm ngắn. Lưỡi, miệng và môi thả lỏng hoàn toàn. Không cười!",
        minimal_pairs: [
          { word1: "sit", ipa1: "/sɪt/", word2: "seat", ipa2: "/siːt/" },
          { word1: "hit", ipa1: "/hɪt/", word2: "heat", ipa2: "/hiːt/" },
          { word1: "bit", ipa1: "/bɪt/", word2: "beat", ipa2: "/biːt/" },
          { word1: "slip", ipa1: "/slɪp/", word2: "sleep", ipa2: "/sliːp/" },
          { word1: "sick", ipa1: "/sɪk/", word2: "seek", ipa2: "/siːk/" },
        ],
        example_sentences: [
          { sentence: "Please sit down!", ipa: "/pliːz sɪt daʊn/" },
          { sentence: "Mom! Jolly bit me.", ipa: "/mɑːm! ˈdʒɑːli bɪt mi/" },
          { sentence: "He slips and fell off the cliff.", ipa: "/hi slɪps ænd fel əv ðə klɪf/" },
          { sentence: "I am so sick.", ipa: "/aɪ æm soʊ sɪk/" },
        ],
      },
      {
        id: 2,
        unit_id: 1,
        ipa: "/i:/",
        sound_type: "vowel",
        mouth_guide: "Âm dài. Lưỡi nâng cao, khóe miệng kéo rộng sang hai bên như đang cười tươi, thấy răng.",
        minimal_pairs: [
          { word1: "seat", ipa1: "/siːt/", word2: "sit", ipa2: "/sɪt/" },
          { word1: "heat", ipa1: "/hiːt/", word2: "hit", ipa2: "/hɪt/" },
          { word1: "beat", ipa1: "/biːt/", word2: "bit", ipa2: "/bɪt/" },
          { word1: "sleep", ipa1: "/sliːp/", word2: "slip", ipa2: "/slɪp/" },
          { word1: "seek", ipa1: "/siːk/", word2: "sick", ipa2: "/sɪk/" },
        ],
        example_sentences: [
          { sentence: "Please have a seat!", ipa: "/pliːz hæv ə siːt/" },
          { sentence: "This heat is killing me.", ipa: "/ðɪs hiːt ɪz ˈkɪlɪŋ mi/" },
          { sentence: "He sleeps like a baby.", ipa: "/hiː sliːps laɪk ə ˈbeɪbi/" },
          { sentence: "I am seeking a new job.", ipa: "/aɪ æm ˈsiːkɪŋ ə njuː dʒɑːb/" },
        ],
      },
      {
        id: 3,
        unit_id: 1,
        ipa: "/ʊ/",
        sound_type: "vowel",
        mouth_guide: "Âm ngắn. Môi hơi tròn và hơi đẩy nhẹ về phía trước, phát âm dứt khoát.",
        minimal_pairs: [
          { word1: "pull", ipa1: "/pʊl/", word2: "pool", ipa2: "/puːl/" },
          { word1: "full", ipa1: "/fʊl/", word2: "fool", ipa2: "/fuːl/" },
          { word1: "look", ipa1: "/lʊk/", word2: "Luke", ipa2: "/luːk/" },
          { word1: "foot", ipa1: "/fʊt/", word2: "food", ipa2: "/fuːd/" },
        ],
        example_sentences: [
          { sentence: "Come on guys, pull!", ipa: "/kʌm ɑːn, ɡaɪz, pʊl/" },
          { sentence: "I'm full, I can't eat more.", ipa: "/aɪm fʊl, aɪ kɑːnt iːt mɔː/" },
          { sentence: "You should eat more vegetables.", ipa: "/juː ʃʊd iːt mɔː/" },
        ],
      },
      {
        id: 4,
        unit_id: 1,
        ipa: "/u:/",
        sound_type: "vowel",
        mouth_guide: "Âm dài. Tròn môi như đang huýt sáo, kéo phần trước của lưỡi về phía sau, giữ hơi dài.",
        minimal_pairs: [
          { word1: "pool", ipa1: "/puːl/", word2: "pull", ipa2: "/pʊl/" },
          { word1: "fool", ipa1: "/fuːl/", word2: "full", ipa2: "/fʊl/" },
          { word1: "shoot", ipa1: "/ʃuːt/", word2: "should", ipa2: "/ʃʊd/" },
        ],
        example_sentences: [
          { sentence: "Let's go to the pool!", ipa: "/lets ɡoʊ tuː ðə puːl/" },
          { sentence: "I love Chinese food so much.", ipa: "/aɪ lʌv ˌtʃaɪˈniːz fuːd soʊ mʌtʃ/" },
          { sentence: "I love you too!", ipa: "/aɪ lʌv juː tuː/" },
        ],
      },
    ],
  },
  {
    id: 2,
    unit_number: 2,
    sound_pair: "/e/ - /æ/ & /ə/ - /ɜː/",
    title: "Cặp âm /e/ - /æ/ và Âm Schwa /ə/ - /ɜː/",
    guide_summary: "Khác biệt độ mở miệng giữa /e/ (mở vừa) và /æ/ (mở rộng cằm). Âm lướt /ə/ nhẹ và âm dài /ɜː/ uốn lưỡi.",
    sounds: [
      {
        id: 5,
        unit_id: 2,
        ipa: "/e/",
        sound_type: "vowel",
        mouth_guide: "Mở miệng tự nhiên, khóe môi kéo nhẹ sang hai bên, phát âm ngắn gọn.",
        minimal_pairs: [
          { word1: "bed", ipa1: "/bed/", word2: "bad", ipa2: "/bæd/" },
          { word1: "pen", ipa1: "/pen/", word2: "pan", ipa2: "/pæn/" },
          { word1: "men", ipa1: "/men/", word2: "man", ipa2: "/mæn/" },
        ],
        example_sentences: [
          { sentence: "Send me the letter, please.", ipa: "/send mi ðə ˈletər, pliːz/" },
          { sentence: "Ten men went to bed.", ipa: "/ten men went tuː bed/" },
        ],
      },
      {
        id: 6,
        unit_id: 2,
        ipa: "/æ/",
        sound_type: "vowel",
        mouth_guide: "Hạ cằm xuống sâu, mở miệng rộng theo chiều dọc và ngang, phát âm /æ/ căng.",
        minimal_pairs: [
          { word1: "bad", ipa1: "/bæd/", word2: "bed", ipa2: "/bed/" },
          { word1: "pan", ipa1: "/pæn/", word2: "pen", ipa2: "/pen/" },
          { word1: "man", ipa1: "/mæn/", word2: "men", ipa2: "/men/" },
        ],
        example_sentences: [
          { sentence: "The cat sat on the mat.", ipa: "/ðə kæt sæt ɑːn ðə mæt/" },
          { sentence: "He is a handsome man.", ipa: "/hiː ɪz ə ˈhænsəm mæn/" },
        ],
      },
      {
        id: 7,
        unit_id: 2,
        ipa: "/ə/",
        sound_type: "vowel",
        mouth_guide: "Âm Schwa: Thả lỏng toàn bộ cơ miệng, phát âm cực kỳ nhẹ và nhanh, không nhấn trọng âm.",
        minimal_pairs: [
          { word1: "banana", ipa1: "/bəˈnænə/", word2: "burn", ipa2: "/bɜːn/" },
          { word1: "doctor", ipa1: "/ˈdɒktər/", word2: "dirt", ipa2: "/dɜːt/" },
        ],
        example_sentences: [
          { sentence: "A cup of tea and a banana.", ipa: "/ə kʌp əv tiː ænd ə bəˈnænə/" },
          { sentence: "The doctor is about to arrive.", ipa: "/ðə ˈdɒktər ɪz əˈbaʊt tuː əˈraɪv/" },
        ],
      },
      {
        id: 8,
        unit_id: 2,
        ipa: "/ɜː/",
        sound_type: "vowel",
        mouth_guide: "Môi mở hờ, lưỡi cong nhẹ về phía sau vòm họng, phát âm ngân dài.",
        minimal_pairs: [
          { word1: "bird", ipa1: "/bɜːd/", word2: "bed", ipa2: "/bed/" },
          { word1: "first", ipa1: "/fɜːst/", word2: "fast", ipa2: "/fɑːst/" },
        ],
        example_sentences: [
          { sentence: "The early bird catches the worm.", ipa: "/ði ˈɜːrli bɜːrd ˈkætʃɪz ðə wɜːrm/" },
          { sentence: "Her third birthday is on Thursday.", ipa: "/hɜːr θɜːrd ˈbɜːrθdeɪ ɪz ɑːn ˈθɜːrzdeɪ/" },
        ],
      },
    ],
  },
  {
    id: 7,
    unit_number: 7,
    sound_pair: "/θ/ và /ð/",
    title: "Phụ âm Thổi hơi /θ/ (Vô thanh) và /ð/ (Hữu thanh)",
    guide_summary: "Đặt đầu lưỡi ở giữa 2 hàm răng. Đẩy luồng hơi qua khe răng. Rung thanh quản với /ð/, chỉ có gió với /θ/.",
    sounds: [
      {
        id: 19,
        unit_id: 7,
        ipa: "/θ/",
        sound_type: "consonant",
        mouth_guide: "Đặt đầu lưỡi giữa hai hàm răng trên và dưới. Đẩy luồng hơi ra ngoài. Dây thanh quản KHÔNG rung.",
        minimal_pairs: [
          { word1: "think", ipa1: "/θɪŋk/", word2: "sink", ipa2: "/sɪŋk/" },
          { word1: "three", ipa1: "/θriː/", word2: "tree", ipa2: "/triː/" },
          { word1: "mouth", ipa1: "/maʊθ/", word2: "mouse", ipa2: "/maʊs/" },
        ],
        example_sentences: [
          { sentence: "I think thank you is polite.", ipa: "/aɪ θɪŋk θæŋk juː ɪz pəˈlaɪt/" },
          { sentence: "Thursday is the thirteenth.", ipa: "/ˈθɜːrzdeɪ ɪz ðə ˌθɜːrˈtiːnθ/" },
        ],
      },
      {
        id: 20,
        unit_id: 7,
        ipa: "/ð/",
        sound_type: "consonant",
        mouth_guide: "Vị trí lưỡi giống âm /θ/, nhưng DÂY THANH QUẢN PHẢI RUNG lên.",
        minimal_pairs: [
          { word1: "this", ipa1: "/ðɪs/", word2: "dis", ipa2: "/dɪs/" },
          { word1: "they", ipa1: "/ðeɪ/", word2: "day", ipa2: "/deɪ/" },
          { word1: "breathe", ipa1: "/briːð/", word2: "breath", ipa2: "/breθ/" },
        ],
        example_sentences: [
          { sentence: "This is my mother and that is my brother.", ipa: "/ðɪs ɪz maɪ ˈmʌðər ænd ðæt ɪz maɪ ˈbrʌðər/" },
          { sentence: "They breathe the fresh air together.", ipa: "/ðeɪ briːð ðə freʃ er təˈɡeðər/" },
        ],
      },
    ],
  },
  {
    id: 8,
    unit_number: 8,
    sound_pair: "/s/ và /ʃ/",
    title: "Phụ âm /s/ (Răng khép nhẹ) và /ʃ/ (Chu môi xì mạnh)",
    guide_summary: "Khác biệt rõ rệt giữa âm /s/ mỉm cười xì hơi và âm /ʃ/ chu tròn môi xì gió ra như ra hiệu im lặng.",
    sounds: [
      {
        id: 21,
        unit_id: 8,
        ipa: "/s/",
        sound_type: "consonant",
        mouth_guide: "Hai hàm răng khép gần nhau, khóe môi kéo nhẹ sang hai bên, xì hơi qua khe răng.",
        minimal_pairs: [
          { word1: "see", ipa1: "/siː/", word2: "she", ipa2: "/ʃiː/" },
          { word1: "sea", ipa1: "/siː/", word2: "she", ipa2: "/ʃiː/" },
          { word1: "sock", ipa1: "/sɒk/", word2: "shock", ipa2: "/ʃɒk/" },
        ],
        example_sentences: [
          { sentence: "She sells sea shells on the seashore.", ipa: "/ʃiː selz siː ʃelz ɑːn ðə ˈsiːʃɔːr/" },
        ],
      },
      {
        id: 22,
        unit_id: 8,
        ipa: "/ʃ/",
        sound_type: "consonant",
        mouth_guide: "Chu tròn môi về phía trước, nâng thân lưỡi lên gần vòm miệng, đẩy luồng hơi mạnh ra ngoài (như suỵt im lặng).",
        minimal_pairs: [
          { word1: "she", ipa1: "/ʃiː/", word2: "see", ipa2: "/siː/" },
          { word1: "ship", ipa1: "/ʃɪp/", word2: "sip", ipa2: "/sɪp/" },
        ],
        example_sentences: [
          { sentence: "She washed the shiny dishes.", ipa: "/ʃiː wɑːʃt ðə ˈʃaɪni ˈdɪʃɪz/" },
        ],
      },
    ],
  },
];
