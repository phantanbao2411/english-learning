import { PronunciationUnit } from "@/types/database";

export const PRONUNCIATION_UNITS: PronunciationUnit[] = [
  {
    id: 1,
    unit_number: 1,
    sound_pair: "/ɪ/ - /i:/ & /ʊ/ - /u:/",
    title: "Nguyên âm ngắn /ɪ/, /ʊ/ và Nguyên âm dài /i:/, /u:/",
    guide_summary: "Luyện khẩu hình mở rộng cười tươi với /i:/ và thả lỏng môi với /ɪ/. Tròn môi với /u:/ và /ʊ/.",
    dialogue: "Mimi: Good evening! I'm Mimi. What's your name?\nDean: Hi, I'm Dean. Nice to meet you.\nMimi: You will learn to speak with clean speech!",
    sounds: [
      {
        id: 1,
        unit_id: 1,
        ipa: "/ɪ/",
        sound_type: "vowel",
        mouth_guide: "Âm ngắn. Lưỡi, miệng và môi thả lỏng hoàn toàn. Không cười, phát âm dứt khoát.",
        minimal_pairs: [
          { word1: "sit", ipa1: "/sɪt/", word2: "seat", ipa2: "/siːt/" },
          { word1: "hit", ipa1: "/hɪt/", word2: "heat", ipa2: "/hiːt/" },
          { word1: "bit", ipa1: "/bɪt/", word2: "beat", ipa2: "/biːt/" },
          { word1: "ship", ipa1: "/ʃɪp/", word2: "sheep", ipa2: "/ʃiːp/" },
          { word1: "sick", ipa1: "/sɪk/", word2: "seek", ipa2: "/siːk/" },
        ],
        example_sentences: [
          { sentence: "Please sit down on the chair.", ipa: "/pliːz sɪt daʊn ɑːn ðə tʃeər/" },
          { sentence: "A big ship is in the harbor.", ipa: "/ə bɪɡ ʃɪp ɪz ɪn ðə ˈhɑːrbər/" },
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
          { word1: "sheep", ipa1: "/ʃiːp/", word2: "ship", ipa2: "/ʃɪp/" },
          { word1: "sleep", ipa1: "/sliːp/", word2: "slip", ipa2: "/slɪp/" },
        ],
        example_sentences: [
          { sentence: "Please take a comfortable seat.", ipa: "/pliːz teɪk ə ˈkʌmftəbl siːt/" },
          { sentence: "Can you see the green sheep in the field?", ipa: "/kæn juː siː ðə ɡriːn ʃiːp ɪn ðə fiːld/" },
        ],
      },
      {
        id: 3,
        unit_id: 1,
        ipa: "/ʊ/",
        sound_type: "vowel",
        mouth_guide: "Âm ngắn. Môi hơi tròn và đẩy nhẹ về phía trước, phát âm dứt khoát từ cổ họng.",
        minimal_pairs: [
          { word1: "pull", ipa1: "/pʊl/", word2: "pool", ipa2: "/puːl/" },
          { word1: "full", ipa1: "/fʊl/", word2: "fool", ipa2: "/fuːl/" },
          { word1: "look", ipa1: "/lʊk/", word2: "Luke", ipa2: "/luːk/" },
          { word1: "foot", ipa1: "/fʊt/", word2: "food", ipa2: "/fuːd/" },
        ],
        example_sentences: [
          { sentence: "Come on everyone, pull together!", ipa: "/kʌm ɑːn ˈevriwʌn, pʊl təˈɡeðər/" },
          { sentence: "I am completely full after lunch.", ipa: "/aɪ æm kəmˈpliːtli fʊl ˈæftər lʌntʃ/" },
        ],
      },
      {
        id: 4,
        unit_id: 1,
        ipa: "/u:/",
        sound_type: "vowel",
        mouth_guide: "Âm dài. Tròn môi như đang huýt sáo, kéo lưỡi về sau, giữ hơi ngân dài.",
        minimal_pairs: [
          { word1: "pool", ipa1: "/puːl/", word2: "pull", ipa2: "/pʊl/" },
          { word1: "fool", ipa1: "/fuːl/", word2: "full", ipa2: "/fʊl/" },
          { word1: "shoot", ipa1: "/ʃuːt/", word2: "should", ipa2: "/ʃʊd/" },
          { word1: "food", ipa1: "/fuːd/", word2: "foot", ipa2: "/fʊt/" },
        ],
        example_sentences: [
          { sentence: "Let's jump into the cool pool!", ipa: "/lets dʒʌmp ˈɪntuː ðə kuːl puːl/" },
          { sentence: "Fresh fruit and good food are healthy.", ipa: "/freʃ fruːt ænd ɡʊd fuːd ɑːr ˈhelθi/" },
        ],
      },
    ],
  },
  {
    id: 2,
    unit_number: 2,
    sound_pair: "/e/ - /æ/ & /ə/ - /ɜː/",
    title: "Cặp âm /e/ - /æ/ và Âm Schwa /ə/ - /ɜː/",
    guide_summary: "Khác biệt độ mở miệng giữa /e/ và /æ/. Âm lướt /ə/ nhẹ và âm dài /ɜː/ uốn lưỡi.",
    dialogue: "",
    sounds: [
      {
        id: 5,
        unit_id: 2,
        ipa: "/e/",
        sound_type: "vowel",
        mouth_guide: "Mở miệng vừa phải, khóe môi hơi kéo sang 2 bên, phát âm gọn ghẽ.",
        minimal_pairs: [
          { word1: "bed", ipa1: "/bed/", word2: "bad", ipa2: "/bæd/" },
          { word1: "pen", ipa1: "/pen/", word2: "pan", ipa2: "/pæn/" },
          { word1: "men", ipa1: "/men/", word2: "man", ipa2: "/mæn/" },
        ],
        example_sentences: [
          { sentence: "Send me the letter before ten.", ipa: "/send mi ðə ˈletər bɪˈfɔːr ten/" },
          { sentence: "Ten men rested in bed.", ipa: "/ten men ˈrestɪd ɪn bed/" },
        ],
      },
      {
        id: 6,
        unit_id: 2,
        ipa: "/æ/",
        sound_type: "vowel",
        mouth_guide: "Hạ quai hàm sâu, mở rộng miệng hết cỡ theo cả 2 chiều, phát âm âm /æ/ căng.",
        minimal_pairs: [
          { word1: "bad", ipa1: "/bæd/", word2: "bed", ipa2: "/bed/" },
          { word1: "pan", ipa1: "/pæn/", word2: "pen", ipa2: "/pen/" },
          { word1: "man", ipa1: "/mæn/", word2: "men", ipa2: "/men/" },
          { word1: "cat", ipa1: "/kæt/", word2: "cut", ipa2: "/kʌt/" },
        ],
        example_sentences: [
          { sentence: "The black cat sat on the mat.", ipa: "/ðə blæk kæt sæt ɑːn ðə mæt/" },
          { sentence: "He is a very friendly and happy man.", ipa: "/hiː ɪz ə ˈveri ˈfrendli ænd ˈhæpi mæn/" },
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
          { sentence: "A cup of warm tea and a ripe banana.", ipa: "/ə kʌp əv wɔːrm tiː ænd ə raɪp bəˈnænə/" },
          { sentence: "The doctor arrived a minute ago.", ipa: "/ðə ˈdɒktər əˈraɪvd ə ˈmɪnɪt əˈɡoʊ/" },
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
          { word1: "shirt", ipa1: "/ʃɜːt/", word2: "short", ipa2: "/ʃɔːt/" },
        ],
        example_sentences: [
          { sentence: "The early bird catches the worm.", ipa: "/ði ˈɜːrli bɜːrd ˈkætʃɪz ðə wɜːrm/" },
          { sentence: "Her birthday is on the first of March.", ipa: "/hɜːr ˈbɜːrθdeɪ ɪz ɑːn ðə fɜːrst əv mɑːrtʃ/" },
        ],
      },
    ],
  },
  {
    id: 3,
    unit_number: 3,
    sound_pair: "/eɪ/ - /ɔɪ/ & /aɪ/ - /ʊə/",
    title: "Nguyên âm đôi (Diphthongs) /eɪ/, /ɔɪ/, /aɪ/, /ʊə/",
    guide_summary: "Khẩu hình trượt từ âm này sang âm khác nhịp nhàng.",
    dialogue: "",
    sounds: [
      {
        id: 9,
        unit_id: 3,
        ipa: "/eɪ/",
        sound_type: "diphthong",
        mouth_guide: "Bắt đầu từ âm /e/ rồi trượt nhẹ nhàng lên âm /ɪ/, khóe miệng hơi giãn ra.",
        minimal_pairs: [
          { word1: "pain", ipa1: "/peɪn/", word2: "pen", ipa2: "/pen/" },
          { word1: "rain", ipa1: "/reɪn/", word2: "ran", ipa2: "/ræn/" },
          { word1: "bake", ipa1: "/beɪk/", word2: "back", ipa2: "/bæk/" },
        ],
        example_sentences: [
          { sentence: "Rain, rain, go away, come again another day!", ipa: "/reɪn, reɪn, ɡoʊ əˈweɪ, kʌm əˈɡen əˈnʌðər deɪ/" },
        ],
      },
      {
        id: 10,
        unit_id: 3,
        ipa: "/ɔɪ/",
        sound_type: "diphthong",
        mouth_guide: "Tròn môi ở âm /ɔː/ rồi trượt nhanh và thả lỏng về âm /ɪ/.",
        minimal_pairs: [
          { word1: "boy", ipa1: "/bɔɪ/", word2: "buy", ipa2: "/baɪ/" },
          { word1: "coin", ipa1: "/kɔɪn/", word2: "corn", ipa2: "/kɔːn/" },
          { word1: "voice", ipa1: "/vɔɪs/", word2: "verse", ipa2: "/vɜːs/" },
        ],
        example_sentences: [
          { sentence: "The little boy enjoys playing with his new toy.", ipa: "/ðə ˈlɪtl bɔɪ ɪnˈdʒɔɪz ˈpleɪɪŋ wɪð hɪz njuː tɔɪ/" },
        ],
      },
      {
        id: 11,
        unit_id: 3,
        ipa: "/aɪ/",
        sound_type: "diphthong",
        mouth_guide: "Mở rộng miệng phát âm /a/ rồi trượt dứt khoát lên âm /ɪ/.",
        minimal_pairs: [
          { word1: "buy", ipa1: "/baɪ/", word2: "boy", ipa2: "/bɔɪ/" },
          { word1: "night", ipa1: "/naɪt/", word2: "net", ipa2: "/net/" },
          { word1: "time", ipa1: "/taɪm/", word2: "team", ipa2: "/tiːm/" },
        ],
        example_sentences: [
          { sentence: "The bright white sky at night.", ipa: "/ðə braɪt waɪt skaɪ æt naɪt/" },
        ],
      },
    ],
  },
  {
    id: 4,
    unit_number: 4,
    sound_pair: "/ʌ/ - /ɑː/ - /ɔː/",
    title: "Bộ ba nguyên âm /ʌ/ - /ɑː/ - /ɔː/",
    guide_summary: "Hạ hàm và mở rộng khoang miệng.",
    dialogue: "",
    sounds: [
      {
        id: 12,
        unit_id: 4,
        ipa: "/ʌ/",
        sound_type: "vowel",
        mouth_guide: "Miệng mở tự nhiên như đang ngạc nhiên nhẹ, phát âm âm 'á' dứt khoát từ vòm họng.",
        minimal_pairs: [
          { word1: "cup", ipa1: "/kʌp/", word2: "cap", ipa2: "/kæp/" },
          { word1: "sun", ipa1: "/sʌn/", word2: "son", ipa2: "/sʌn/" },
          { word1: "cut", ipa1: "/kʌt/", word2: "cat", ipa2: "/kæt/" },
        ],
        example_sentences: [
          { sentence: "A cup of hot coffee under the sun.", ipa: "/ə kʌp əv hɑːt ˈkɔːfi ˈʌndər ðə sʌn/" },
        ],
      },
      {
        id: 13,
        unit_id: 4,
        ipa: "/ɑː/",
        sound_type: "vowel",
        mouth_guide: "Hạ hàm, mở to miệng như khi bác sĩ khám họng, phát âm âm 'a' sâu và ngân dài.",
        minimal_pairs: [
          { word1: "park", ipa1: "/pɑːk/", word2: "pack", ipa2: "/pæk/" },
          { word1: "star", ipa1: "/stɑː/", word2: "stir", ipa2: "/stɜː/" },
          { word1: "heart", ipa1: "/hɑːt/", word2: "hot", ipa2: "/hɒt/" },
        ],
        example_sentences: [
          { sentence: "Park the car after dark near the garden.", ipa: "/pɑːrk ðə kɑːr ˈæftər dɑːrk nɪər ðə ˈɡɑːrdn/" },
        ],
      },
      {
        id: 14,
        unit_id: 4,
        ipa: "/ɔː/",
        sound_type: "vowel",
        mouth_guide: "Tròn môi hình chữ O nhỏ, lưỡi hơi rút về sau, phát âm 'o' kéo dài.",
        minimal_pairs: [
          { word1: "door", ipa1: "/dɔː/", word2: "dear", ipa2: "/dɪə/" },
          { word1: "four", ipa1: "/fɔː/", word2: "far", ipa2: "/fɑː/" },
          { word1: "ball", ipa1: "/bɔːl/", word2: "bowl", ipa2: "/bəʊl/" },
        ],
        example_sentences: [
          { sentence: "Four horses walked towards the door.", ipa: "/fɔːr ˈhɔːrsɪz wɔːkt təˈwɔːrdz ðə dɔːr/" },
        ],
      },
    ],
  },
  {
    id: 5,
    unit_number: 5,
    sound_pair: "/ɪə/ - /eə/ & /aʊ/ - /oʊ/",
    title: "Nguyên âm đôi có âm /r/ và nguyên âm đôi /aʊ/ - /oʊ/",
    guide_summary: "Luyện trượt âm tự nhiên.",
    dialogue: "",
    sounds: [
      {
        id: 15,
        unit_id: 5,
        ipa: "/ɪə/",
        sound_type: "diphthong",
        mouth_guide: "Phát âm /ɪ/ rồi lướt nhẹ sang âm Schwa /ə/.",
        minimal_pairs: [
          { word1: "here", ipa1: "/hɪə/", word2: "hair", ipa2: "/heə/" },
          { word1: "beer", ipa1: "/bɪə/", word2: "bear", ipa2: "/beə/" },
          { word1: "clear", ipa1: "/klɪə/", word2: "clerk", ipa2: "/klɑːk/" },
        ],
        example_sentences: [
          { sentence: "Come here, my dear, and listen closely.", ipa: "/kʌm hɪər, maɪ dɪər, ænd ˈlɪsn ˈkloʊsli/" },
        ],
      },
      {
        id: 16,
        unit_id: 5,
        ipa: "/eə/",
        sound_type: "diphthong",
        mouth_guide: "Mở miệng ở âm /e/ rồi trượt nhẹ về âm /ə/.",
        minimal_pairs: [
          { word1: "chair", ipa1: "/tʃeə/", word2: "cheer", ipa2: "/tʃɪə/" },
          { word1: "hair", ipa1: "/heə/", word2: "here", ipa2: "/hɪə/" },
          { word1: "bear", ipa1: "/beə/", word2: "beer", ipa2: "/bɪə/" },
        ],
        example_sentences: [
          { sentence: "Sit on the chair over there and rest.", ipa: "/sɪt ɑːn ðə tʃeər ˈoʊvər ðer ænd rest/" },
        ],
      },
      {
        id: 17,
        unit_id: 5,
        ipa: "/aʊ/",
        sound_type: "diphthong",
        mouth_guide: "Mở rộng miệng âm /a/ rồi thu tròn môi lại ở âm /ʊ/.",
        minimal_pairs: [
          { word1: "cow", ipa1: "/kaʊ/", word2: "car", ipa2: "/kɑː/" },
          { word1: "house", ipa1: "/haʊs/", word2: "horse", ipa2: "/hɔːs/" },
          { word1: "loud", ipa1: "/laʊd/", word2: "load", ipa2: "/ləʊd/" },
        ],
        example_sentences: [
          { sentence: "How about walking around the town now?", ipa: "/haʊ əˈbaʊt ˈwɔːkɪŋ əˈraʊnd ðə taʊn naʊ/" },
        ],
      },
    ],
  },
  {
    id: 6,
    unit_number: 6,
    sound_pair: "Review time",
    title: "Tổng ôn tập nguyên âm & nguyên âm đôi",
    guide_summary: "Luyện phản xạ phân biệt các cặp âm tương tự.",
    dialogue: "",
    sounds: [
      {
        id: 18,
        unit_id: 6,
        ipa: "Ôn tập: /i:/ vs /ɪ/",
        sound_type: "vowel",
        mouth_guide: "So sánh độ căng cơ miệng: /i:/ cười tươi, căng khóe môi; /ɪ/ thả lỏng tự nhiên hoàn toàn.",
        minimal_pairs: [
          { word1: "sheep", ipa1: "/ʃiːp/", word2: "ship", ipa2: "/ʃɪp/" },
          { word1: "leak", ipa1: "/liːk/", word2: "lick", ipa2: "/lɪk/" },
          { word1: "heel", ipa1: "/hiːl/", word2: "hill", ipa2: "/hɪl/" },
        ],
        example_sentences: [
          { sentence: "The sheep were transported by a large ship.", ipa: "/ðə ʃiːp wɜːr trænsˈpɔːrtɪd baɪ ə lɑːrdʒ ʃɪp/" },
        ],
      },
    ],
  },
  {
    id: 7,
    unit_number: 7,
    sound_pair: "/θ/ và /ð/",
    title: "Phụ âm Thổi hơi /θ/ (Vô thanh) và /ð/ (Hữu thanh)",
    guide_summary: "Đặt đầu lưỡi ở giữa hai hàm răng trên và dưới.",
    dialogue: "",
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
          { word1: "thick", ipa1: "/θɪk/", word2: "sick", ipa2: "/sɪk/" },
        ],
        example_sentences: [
          { sentence: "I think thank you is very polite.", ipa: "/aɪ θɪŋk θæŋk juː ɪz ˈveri pəˈlaɪt/" },
          { sentence: "Thursday is the thirteenth of this month.", ipa: "/ˈθɜːrzdeɪ ɪz ðə ˌθɜːrˈtiːnθ əv ðɪs mʌnθ/" },
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
          { sentence: "They breathe the fresh morning air together.", ipa: "/ðeɪ briːð ðə freʃ ˈmɔːrnɪŋ er təˈɡeðər/" },
        ],
      },
    ],
  },
  {
    id: 8,
    unit_number: 8,
    sound_pair: "/s/ và /ʃ/",
    title: "Phụ âm /s/ (Răng khép nhẹ) và /ʃ/ (Chu môi xì mạnh)",
    guide_summary: "Phân biệt rõ âm s mỉm cười và âm sh chu môi như suỵt im lặng.",
    dialogue: "",
    sounds: [
      {
        id: 21,
        unit_id: 8,
        ipa: "/s/",
        sound_type: "consonant",
        mouth_guide: "Hai hàm răng khép gần nhau, khóe môi kéo nhẹ sang hai bên, xì hơi qua khe răng.",
        minimal_pairs: [
          { word1: "see", ipa1: "/siː/", word2: "she", ipa2: "/ʃiː/" },
          { word1: "sock", ipa1: "/sɒk/", word2: "shock", ipa2: "/ʃɒk/" },
          { word1: "sip", ipa1: "/sɪp/", word2: "ship", ipa2: "/ʃɪp/" },
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
        mouth_guide: "Chu tròn môi về phía trước, nâng thân lưỡi lên gần vòm miệng, đẩy luồng hơi mạnh ra ngoài.",
        minimal_pairs: [
          { word1: "she", ipa1: "/ʃiː/", word2: "see", ipa2: "/siː/" },
          { word1: "ship", ipa1: "/ʃɪp/", word2: "sip", ipa2: "/sɪp/" },
          { word1: "shoe", ipa1: "/ʃuː/", word2: "sue", ipa2: "/suː/" },
        ],
        example_sentences: [
          { sentence: "She washed the shiny dishes in the kitchen.", ipa: "/ʃiː wɑːʃt ðə ˈʃaɪni ˈdɪʃɪz ɪn ðə ˈkɪtʃɪn/" },
        ],
      },
    ],
  },
  {
    id: 9,
    unit_number: 9,
    sound_pair: "/tʃ/ và /dʒ/",
    title: "Cặp phụ âm bật hơi /tʃ/ và /dʒ/",
    guide_summary: "Bật hơi dứt khoát ở đầu lưỡi.",
    dialogue: "",
    sounds: [
      {
        id: 23,
        unit_id: 9,
        ipa: "/tʃ/",
        sound_type: "consonant",
        mouth_guide: "Chu môi, đầu lưỡi chạm vào chân răng trên rồi bật luồng hơi mạnh dứt khoát.",
        minimal_pairs: [
          { word1: "chair", ipa1: "/tʃeə/", word2: "share", ipa2: "/ʃeə/" },
          { word1: "catch", ipa1: "/kætʃ/", word2: "cash", ipa2: "/kæʃ/" },
          { word1: "cheap", ipa1: "/tʃiːp/", word2: "jeep", ipa2: "/dʒiːp/" },
        ],
        example_sentences: [
          { sentence: "Choose a piece of cheese and chocolate.", ipa: "/tʃuːz ə piːs əv tʃiːz ænd ˈtʃɔːklət/" },
        ],
      },
      {
        id: 24,
        unit_id: 9,
        ipa: "/dʒ/",
        sound_type: "consonant",
        mouth_guide: "Khẩu hình giống /tʃ/ nhưng DÂY THANH QUẢN PHẢI RUNG MẠNH lên.",
        minimal_pairs: [
          { word1: "jeep", ipa1: "/dʒiːp/", word2: "cheap", ipa2: "/tʃiːp/" },
          { word1: "joke", ipa1: "/dʒəʊk/", word2: "choke", ipa2: "/tʃəʊk/" },
          { word1: "jump", ipa1: "/dʒʌmp/", word2: "chump", ipa2: "/tʃʌmp/" },
        ],
        example_sentences: [
          { sentence: "John jumped for joy after getting the job.", ipa: "/dʒɑːn dʒʌmpt fɔːr dʒɔɪ ˈæftər ˈɡetɪŋ ðə dʒɑːb/" },
        ],
      },
    ],
  },
  {
    id: 10,
    unit_number: 10,
    sound_pair: "/z/ và /ʒ/",
    title: "Phụ âm rung /z/ và /ʒ/",
    guide_summary: "Rung mạnh dây thanh quản.",
    dialogue: "",
    sounds: [
      {
        id: 25,
        unit_id: 10,
        ipa: "/z/",
        sound_type: "consonant",
        mouth_guide: "Khẩu hình giống /s/ (khép nhẹ răng), nhưng dây thanh quản rung mạnh như tiếng ong kêu zzz.",
        minimal_pairs: [
          { word1: "zoo", ipa1: "/zuː/", word2: "sue", ipa2: "/suː/" },
          { word1: "prize", ipa1: "/praɪz/", word2: "price", ipa2: "/praɪs/" },
          { word1: "eyes", ipa1: "/aɪz/", word2: "ice", ipa2: "/aɪs/" },
        ],
        example_sentences: [
          { sentence: "Zebras at the zoo have black and white stripes.", ipa: "/ˈziːbrəz æt ðə zuː hæv blæk ænd waɪt straɪps/" },
        ],
      },
      {
        id: 26,
        unit_id: 10,
        ipa: "/ʒ/",
        sound_type: "consonant",
        mouth_guide: "Khẩu hình chu môi như /ʃ/, nhưng rung mạnh dây thanh quản.",
        minimal_pairs: [
          { word1: "vision", ipa1: "/ˈvɪʒn/", word2: "fission", ipa2: "/ˈfɪʃn/" },
          { word1: "measure", ipa1: "/ˈmeʒə/", word2: "mesher", ipa2: "/ˈmeʃə/" },
        ],
        example_sentences: [
          { sentence: "Watching television is a pleasure and relaxation.", ipa: "/ˈwɑːtʃɪŋ ˈtelɪvɪʒn ɪz ə ˈpleʒər ænd ˌriːlækˈseɪʃn/" },
        ],
      },
    ],
  },
  {
    id: 11,
    unit_number: 11,
    sound_pair: "/t/ - /d/ & /k/ - /g/",
    title: "Cặp phụ âm bật /t/-/d/, /k/-/g/ và quy tắc đuôi -ed",
    guide_summary: "Nắm vững 3 cách phát âm đuôi -ed (/t/, /d/, /ɪd/).",
    dialogue: "",
    sounds: [
      {
        id: 27,
        unit_id: 11,
        ipa: "/t/ - /d/",
        sound_type: "consonant",
        mouth_guide: "Đầu lưỡi chạm nướu răng trên rồi bật hơi. /t/ vô thanh (bật gió), /d/ hữu thanh (rung cổ).",
        minimal_pairs: [
          { word1: "ten", ipa1: "/ten/", word2: "den", ipa2: "/den/" },
          { word1: "train", ipa1: "/treɪn/", word2: "drain", ipa2: "/dreɪn/" },
          { word1: "two", ipa1: "/tuː/", word2: "do", ipa2: "/duː/" },
        ],
        example_sentences: [
          { sentence: "Tom told Dan to drive the red truck.", ipa: "/tɑːm toʊld dæn tuː draɪv ðə red trʌk/" },
        ],
      },
      {
        id: 28,
        unit_id: 11,
        ipa: "Đuôi -ed",
        sound_type: "consonant",
        mouth_guide: "3 quy tắc: /ɪd/ sau t/d (wanted, needed); /t/ sau âm vô thanh s, p, k, f, sh, ch (cooked, washed); /d/ các âm còn lại (played, cleaned).",
        minimal_pairs: [
          { word1: "wanted", ipa1: "/ˈwɒntɪd/", word2: "walked", ipa2: "/wɔːkt/" },
          { word1: "played", ipa1: "/pleɪd/", word2: "passed", ipa2: "/pɑːst/" },
        ],
        example_sentences: [
          { sentence: "He wanted to play football, so he walked outside.", ipa: "/hiː ˈwɒntɪd tuː pleɪ ˈfʊtbɔːl, soʊ hiː wɔːkt ˌaʊtˈsaɪd/" },
        ],
      },
    ],
  },
];
