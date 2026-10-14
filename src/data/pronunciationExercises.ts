export interface ListeningQuiz {
  id: number;
  wordA: string;
  wordB: string;
  ipaA: string;
  ipaB: string;
  correctWord: string; // Native audio plays this word
  hint: string;
}

export interface CategorizeWord {
  word: string;
  ipa: string;
  category: "A" | "B";
  meaning_vi: string;
}

export interface CategorizeExercise {
  title: string;
  instruction: string;
  categoryA: string;
  categoryB: string;
  words: CategorizeWord[];
}

export interface FillBlankExercise {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: string;
  ipa: string;
  meaning_vi: string;
}

export interface TongueTwisterExercise {
  title: string;
  text: string;
  ipa: string;
  tips: string;
}

export interface UnitExercises {
  unit_number: number;
  listeningQuizzes: ListeningQuiz[];
  categorizeExercise?: CategorizeExercise;
  fillBlankExercises: FillBlankExercise[];
  tongueTwisters?: TongueTwisterExercise[];
}

export const PRONUNCIATION_EXERCISES: Record<number, UnitExercises> = {
  // UNIT 1: /ɪ/ - /i:/ & /ʊ/ - /u:/
  1: {
    unit_number: 1,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "sit",
        wordB: "seat",
        ipaA: "/sɪt/",
        ipaB: "/siːt/",
        correctWord: "seat",
        hint: "Âm /i:/ kéo dài khóe môi cười tươi, khác với /ɪ/ giật ngắn thả lỏng."
      },
      {
        id: 2,
        wordA: "ship",
        wordB: "sheep",
        ipaA: "/ʃɪp/",
        ipaB: "/ʃiːp/",
        correctWord: "ship",
        hint: "Âm /ɪ/ trong con tàu phát âm ngắn gọn, dứt khoát."
      },
      {
        id: 3,
        wordA: "pull",
        wordB: "pool",
        ipaA: "/pʊl/",
        ipaB: "/puːl/",
        correctWord: "pool",
        hint: "Âm /u:/ tròn môi huýt sáo ngân dài: hồ bơi."
      },
      {
        id: 4,
        wordA: "full",
        wordB: "fool",
        ipaA: "/fʊl/",
        ipaB: "/fuːl/",
        correctWord: "full",
        hint: "Âm /ʊ/ giật ngắn dứt khoát: no bụng, đầy đặn."
      },
      {
        id: 5,
        wordA: "chip",
        wordB: "cheap",
        ipaA: "/tʃɪp/",
        ipaB: "/tʃiːp/",
        correctWord: "cheap",
        hint: "Âm /i:/ ngân dài: giá rẻ."
      }
    ],
    categorizeExercise: {
      title: "Task 2 (Trang 2): Phân loại từ vựng vào cột âm /ɪ/ và /i:/",
      instruction: "Nghe từng từ và chọn từ đó chứa nguyên âm ngắn /ɪ/ hay nguyên âm dài /i:/:",
      categoryA: "/ɪ/ (Ngắn)",
      categoryB: "/i:/ (Dài)",
      words: [
        { word: "Cheese", ipa: "/tʃiːz/", category: "B", meaning_vi: "phô mai" },
        { word: "Milk", ipa: "/mɪlk/", category: "A", meaning_vi: "sữa tươi" },
        { word: "Seafood", ipa: "/ˈsiːfuːd/", category: "B", meaning_vi: "hải sản" },
        { word: "Fish", ipa: "/fɪʃ/", category: "A", meaning_vi: "con cá" },
        { word: "Meat", ipa: "/miːt/", category: "B", meaning_vi: "thịt" },
        { word: "Sandwich", ipa: "/ˈsænwɪtʃ/", category: "A", meaning_vi: "bánh kẹp" },
        { word: "Beef", ipa: "/biːf/", category: "B", meaning_vi: "thịt bò" },
        { word: "Shrimp", ipa: "/ʃrɪmp/", category: "A", meaning_vi: "con tôm" },
        { word: "Pizza", ipa: "/ˈpiːtsə/", category: "B", meaning_vi: "bánh pizza" },
        { word: "Pumpkin", ipa: "/ˈpʌmpkɪn/", category: "A", meaning_vi: "quả bí ngô" }
      ]
    },
    fillBlankExercises: [
      {
        id: 1,
        sentence: "Please sir, this way! You may sit in this ______.",
        options: ["seat", "sit"],
        correctAnswer: "seat",
        ipa: "/pliːz sɜːr, ðɪs weɪ! juː meɪ sɪt ɪn ðɪs siːt/",
        meaning_vi: "Xin mời ngài đi lối này! Ngài có thể ngồi vào chỗ ngồi này."
      },
      {
        id: 2,
        sentence: "I need to ______ at six o’clock.",
        options: ["leave", "live"],
        correctAnswer: "leave",
        ipa: "/aɪ niːd tuː liːv æt sɪks əˈklɑːk/",
        meaning_vi: "Tôi cần phải rời đi lúc 6 giờ đúng."
      },
      {
        id: 3,
        sentence: "It's important to seek a doctor if you are ______.",
        options: ["sick", "seek"],
        correctAnswer: "sick",
        ipa: "/ɪts ɪmˈpɔːrtənt tuː siːk ˈdɑːktər ɪf juː ɑːr sɪk/",
        meaning_vi: "Rất quan trọng là phải đi khám bác sĩ nếu bạn bị ốm."
      },
      {
        id: 4,
        sentence: "Could you pass the ______, please?",
        options: ["sugar", "shooter"],
        correctAnswer: "sugar",
        ipa: "/kʊd juː pæs ðə ˈʃʊɡər, pliːz/",
        meaning_vi: "Bạn có thể làm ơn chuyển giúp tôi lọ đường được không?"
      },
      {
        id: 5,
        sentence: "Look how big the ______ is in the night sky!",
        options: ["moon", "man"],
        correctAnswer: "moon",
        ipa: "/lʊk haʊ bɪɡ ðə muːn ɪz ɪn ðə naɪt skaɪ/",
        meaning_vi: "Hãy nhìn xem mặt trăng đêm nay to làm sao!"
      }
    ],
    tongueTwisters: [
      {
        title: "Luyện ngữ điệu câu với cặp âm /i:/ - /ɪ/",
        text: "Please sir, this way! You may sit in this comfortable seat.",
        ipa: "/pliːz sɜːr, ðɪs weɪ! juː meɪ sɪt ɪn ðɪs ˈkʌmftəbl siːt/",
        tips: "Nhấn mạnh vào từ 'sit' (ngắn) và 'seat' (kéo dài miệng cười tươi)."
      }
    ]
  },

  // UNIT 2: /e/ - /æ/ & /ə/ - /ɜː/
  2: {
    unit_number: 2,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "bed",
        wordB: "bad",
        ipaA: "/bed/",
        ipaB: "/bæd/",
        correctWord: "bed",
        hint: "/e/ miệng mở vừa phải; /æ/ hạ hàm rất sâu."
      },
      {
        id: 2,
        wordA: "pen",
        wordB: "pan",
        ipaA: "/pen/",
        ipaB: "/pæn/",
        correctWord: "pan",
        hint: "/æ/ mở to miệng hết cỡ: cái chảo."
      },
      {
        id: 3,
        wordA: "men",
        wordB: "man",
        ipaA: "/men/",
        ipaB: "/mæn/",
        correctWord: "man",
        hint: "/mæn/ số ít hạ quai hàm sâu; /men/ số nhiều mở miệng vừa."
      },
      {
        id: 4,
        wordA: "bird",
        wordB: "bed",
        ipaA: "/bɜːd/",
        ipaB: "/bed/",
        correctWord: "bird",
        hint: "/ɜː/ cong lưỡi ngân dài: con chim."
      }
    ],
    categorizeExercise: {
      title: "Phân loại nguyên âm /e/ (mở vừa) và /æ/ (hạ hàm sâu)",
      instruction: "Nghe và xếp từ vào nhóm /e/ hoặc /æ/:",
      categoryA: "/e/ (Vừa)",
      categoryB: "/æ/ (Mở sâu)",
      words: [
        { word: "bed", ipa: "/bed/", category: "A", meaning_vi: "giường ngủ" },
        { word: "cat", ipa: "/kæt/", category: "B", meaning_vi: "con mèo" },
        { word: "pen", ipa: "/pen/", category: "A", meaning_vi: "bút mực" },
        { word: "black", ipa: "/blæk/", category: "B", meaning_vi: "màu đen" },
        { word: "desk", ipa: "/desk/", category: "A", meaning_vi: "bàn học" },
        { word: "hand", ipa: "/hænd/", category: "B", meaning_vi: "bàn tay" }
      ]
    },
    fillBlankExercises: [
      {
        id: 1,
        sentence: "The early ______ catches the worm.",
        options: ["bird", "bed"],
        correctAnswer: "bird",
        ipa: "/ði ˈɜːrli bɜːrd ˈkætʃɪz ðə wɜːrm/",
        meaning_vi: "Chú chim dậy sớm mới bắt được sâu (Thành ngữ: Người chăm chỉ sẽ thành công)."
      },
      {
        id: 2,
        sentence: "The black ______ sat on the mat.",
        options: ["cat", "cut"],
        correctAnswer: "cat",
        ipa: "/ðə blæk kæt sæt ɑːn ðə mæt/",
        meaning_vi: "Chú mèo đen ngồi trên tấm thảm."
      },
      {
        id: 3,
        sentence: "Her birthday is on the ______ of March.",
        options: ["first", "fast"],
        correctAnswer: "first",
        ipa: "/hɜːr ˈbɜːrθdeɪ ɪz ɑːn ðə fɜːrst əv mɑːrtʃ/",
        meaning_vi: "Sinh nhật của cô ấy là vào ngày đầu tiên của tháng Ba."
      }
    ]
  },

  // UNIT 3: /eɪ/ - /ɔɪ/ & /aɪ/ - /ʊə/
  3: {
    unit_number: 3,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "pain",
        wordB: "pen",
        ipaA: "/peɪn/",
        ipaB: "/pen/",
        correctWord: "pain",
        hint: "Nguyên âm đôi /eɪ/ trượt từ e sang i: đau đớn."
      },
      {
        id: 2,
        wordA: "boy",
        wordB: "buy",
        ipaA: "/bɔɪ/",
        ipaB: "/baɪ/",
        correctWord: "boy",
        hint: "Âm /ɔɪ/ tròn môi ở o rồi trượt lên i: cậu bé."
      },
      {
        id: 3,
        wordA: "night",
        wordB: "net",
        ipaA: "/naɪt/",
        ipaB: "/net/",
        correctWord: "night",
        hint: "Âm /aɪ/ mở miệng a rồi lên i: buổi đêm."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "Rain, rain, go away, come again another ______!",
        options: ["day", "die"],
        correctAnswer: "day",
        ipa: "/reɪn, reɪn, ɡoʊ əˈweɪ, kʌm əˈɡen əˈnʌðər deɪ/",
        meaning_vi: "Mưa ơi mưa hãy đi đi, ngày khác hãy quay lại nhé!"
      },
      {
        id: 2,
        sentence: "The little ______ enjoys playing with his new toy.",
        options: ["boy", "buy"],
        correctAnswer: "boy",
        ipa: "/ðə ˈlɪtl bɔɪ ɪnˈdʒɔɪz ˈpleɪɪŋ wɪð hɪz njuː tɔɪ/",
        meaning_vi: "Cậu bé nhỏ thích thú chơi với món đồ chơi mới."
      }
    ]
  },

  // UNIT 4: /ʌ/ - /ɑː/ - /ɔː/
  4: {
    unit_number: 4,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "cup",
        wordB: "cap",
        ipaA: "/kʌp/",
        ipaB: "/kæp/",
        correctWord: "cup",
        hint: "Âm /ʌ/ phát âm dứt khoát như dấu á: tách trà."
      },
      {
        id: 2,
        wordA: "park",
        wordB: "pack",
        ipaA: "/pɑːk/",
        ipaB: "/pæk/",
        correctWord: "park",
        hint: "Âm /ɑː/ mở miệng to ngân dài từ cuống họng: công viên."
      },
      {
        id: 3,
        wordA: "door",
        wordB: "dear",
        ipaA: "/dɔː/",
        ipaB: "/dɪə/",
        correctWord: "door",
        hint: "Âm /ɔː/ tròn môi nhỏ ngân dài: cánh cửa."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "A ______ of hot coffee under the sun.",
        options: ["cup", "cap"],
        correctAnswer: "cup",
        ipa: "/ə kʌp əv hɑːt ˈkɔːfi ˈʌndər ðə sʌn/",
        meaning_vi: "Một tách cà phê nóng dưới ánh mặt trời."
      },
      {
        id: 2,
        sentence: "Park the ______ after dark near the garden.",
        options: ["car", "cat"],
        correctAnswer: "car",
        ipa: "/pɑːrk ðə kɑːr ˈæftər dɑːrk nɪər ðə ˈɡɑːrdn/",
        meaning_vi: "Hãy đỗ xe ô tô khi trời tối ở gần vườn."
      }
    ]
  },

  // UNIT 5: /ɪə/ - /eə/ & /aʊ/ - /oʊ/
  5: {
    unit_number: 5,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "here",
        wordB: "hair",
        ipaA: "/hɪə/",
        ipaB: "/heə/",
        correctWord: "here",
        hint: "Âm /ɪə/ trượt từ i sang ơ: ở đây."
      },
      {
        id: 2,
        wordA: "beer",
        wordB: "bear",
        ipaA: "/bɪə/",
        ipaB: "/beə/",
        correctWord: "bear",
        hint: "Âm /eə/ trượt từ e sang ơ: con gấu."
      },
      {
        id: 3,
        wordA: "cow",
        wordB: "car",
        ipaA: "/kaʊ/",
        ipaB: "/kɑː/",
        correctWord: "cow",
        hint: "Âm /aʊ/ mở a rồi thu tròn u: con bò sữa."
      }
    ],
    categorizeExercise: {
      title: "Task (Trang 27): Phân loại từ chứa âm /oʊ/ vs /aʊ/",
      instruction: "Xếp các từ sau vào cột âm /oʊ/ (như phone) hay /aʊ/ (như cow):",
      categoryA: "/oʊ/ (Âm boat)",
      categoryB: "/aʊ/ (Âm town)",
      words: [
        { word: "shoulder", ipa: "/ˈʃoʊldər/", category: "A", meaning_vi: "bờ vai" },
        { word: "tower", ipa: "/ˈtaʊər/", category: "B", meaning_vi: "tòa tháp" },
        { word: "phone", ipa: "/foʊn/", category: "A", meaning_vi: "điện thoại" },
        { word: "ground", ipa: "/ɡraʊnd/", category: "B", meaning_vi: "mặt đất" },
        { word: "tomato", ipa: "/təˈmeɪtoʊ/", category: "A", meaning_vi: "cà chua" },
        { word: "shower", ipa: "/ˈʃaʊər/", category: "B", meaning_vi: "vòi sen" }
      ]
    },
    fillBlankExercises: [
      {
        id: 1,
        sentence: "There is only one ______ in the town.",
        options: ["tower", "toe"],
        correctAnswer: "tower",
        ipa: "/ðer ɪz ˈoʊnli wʌn ˈtaʊər ɪn ðə taʊn/",
        meaning_vi: "Chỉ có một tòa tháp duy nhất trong thị trấn."
      },
      {
        id: 2,
        sentence: "Put the ______ down and listen to me!",
        options: ["phone", "fine"],
        correctAnswer: "phone",
        ipa: "/pʊt ðə foʊn daʊn ænd ˈlɪsn tuː miː/",
        meaning_vi: "Đặt điện thoại xuống và lắng nghe tôi nói này!"
      }
    ]
  },

  // UNIT 7: /θ/ và /ð/
  7: {
    unit_number: 7,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "think",
        wordB: "sink",
        ipaA: "/θɪŋk/",
        ipaB: "/sɪŋk/",
        correctWord: "think",
        hint: "Âm /θ/ đặt lưỡi giữa răng thổi hơi không rung: suy nghĩ."
      },
      {
        id: 2,
        wordA: "three",
        wordB: "tree",
        ipaA: "/θriː/",
        ipaB: "/triː/",
        correctWord: "three",
        hint: "Âm /θ/ đặt lưỡi cắn nhẹ thổi hơi: số 3."
      },
      {
        id: 3,
        wordA: "this",
        wordB: "dis",
        ipaA: "/ðɪs/",
        ipaB: "/dɪs/",
        correctWord: "this",
        hint: "Âm /ð/ kẹp lưỡi nhưng RUNG cổ họng: cái này."
      },
      {
        id: 4,
        wordA: "they",
        wordB: "day",
        ipaA: "/ðeɪ/",
        ipaB: "/deɪ/",
        correctWord: "they",
        hint: "Âm /ð/ rung lưỡi: bọn họ."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "I ______ thank you is very polite.",
        options: ["think", "sink"],
        correctAnswer: "think",
        ipa: "/aɪ θɪŋk θæŋk juː ɪz ˈveri pəˈlaɪt/",
        meaning_vi: "Tôi nghĩ nói lời cảm ơn là rất lịch sự."
      },
      {
        id: 2,
        sentence: "Thursday is the ______ of this month.",
        options: ["thirteenth", "thirsty"],
        correctAnswer: "thirteenth",
        ipa: "/ˈθɜːrzdeɪ ɪz ðə ˌθɜːrˈtiːnθ əv ðɪs mʌnθ/",
        meaning_vi: "Thứ Năm là ngày mười ba của tháng này."
      },
      {
        id: 3,
        sentence: "This is my ______ and that is my brother.",
        options: ["mother", "monster"],
        correctAnswer: "mother",
        ipa: "/ðɪs ɪz maɪ ˈmʌðər ænd ðæt ɪz maɪ ˈbrʌðər/",
        meaning_vi: "Đây là mẹ tôi và đằng kia là anh trai tôi."
      }
    ],
    tongueTwisters: [
      {
        title: "Luyện ngữ điệu âm /θ/ và /ð/ (Trang 38)",
        text: "Both of the brothers are turning thirty next week.",
        ipa: "/boʊθ əv ðə ˈbrʌðərz ɑːr ˈtɜːrnɪŋ ˈθɜːrti nekst wiːk/",
        tips: "Để ý từ 'Both' (/θ/), 'brothers' (/ð/) và 'thirty' (/θ/)."
      }
    ]
  },

  // UNIT 8: /s/ và /ʃ/
  8: {
    unit_number: 8,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "see",
        wordB: "she",
        ipaA: "/siː/",
        ipaB: "/ʃiː/",
        correctWord: "she",
        hint: "Âm /ʃ/ chu tròn môi xì gió mạnh như suỵt im lặng: cô ấy."
      },
      {
        id: 2,
        wordA: "sip",
        wordB: "ship",
        ipaA: "/sɪp/",
        ipaB: "/ʃɪp/",
        correctWord: "ship",
        hint: "Âm /ʃ/ chu môi: con tàu."
      },
      {
        id: 3,
        wordA: "sock",
        wordB: "shock",
        ipaA: "/sɒk/",
        ipaB: "/ʃɒk/",
        correctWord: "sock",
        hint: "Âm /s/ khép răng mỉm cười xì nhẹ: đôi tất."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "The young girl sells jewelry made from ______.",
        options: ["shells", "sells"],
        correctAnswer: "shells",
        ipa: "/ðə jʌŋ ɡɜːrl selz ˈdʒuːəlri meɪd frəm ʃelz/",
        meaning_vi: "Cô gái trẻ bán đồ trang sức làm từ vỏ sò."
      },
      {
        id: 2,
        sentence: "There is a clean sheet on my ______.",
        options: ["seat", "sheet"],
        correctAnswer: "seat",
        ipa: "/ðer ɪz ə kliːn ʃiːt ɑːn maɪ siːt/",
        meaning_vi: "Có một tấm ga sạch đặt trên chỗ ngồi của tôi."
      }
    ],
    tongueTwisters: [
      {
        title: "Thử thách Líu lưỡi kinh điển (Trang 42)",
        text: "She sells sea shells by the sea shore. The shells she sells are surely seashells.",
        ipa: "/ʃiː selz siː ʃelz baɪ ðə siː ʃɔːr. ðə ʃelz ʃiː selz ɑːr ˈʃʊərli ˈsiːʃelz/",
        tips: "Chuyển đổi linh hoạt giữa miệng cười xì /s/ ('sells', 'sea') và chu môi /ʃ/ ('she', 'shells', 'surely')."
      }
    ]
  },

  // UNIT 9: /tʃ/ và /dʒ/
  9: {
    unit_number: 9,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "cheap",
        wordB: "jeep",
        ipaA: "/tʃiːp/",
        ipaB: "/dʒiːp/",
        correctWord: "jeep",
        hint: "Âm /dʒ/ rung thanh quản mạnh: xe jeep."
      },
      {
        id: 2,
        wordA: "choke",
        wordB: "joke",
        ipaA: "/tʃəʊk/",
        ipaB: "/dʒəʊk/",
        correctWord: "joke",
        hint: "Âm /dʒ/ hữu thanh rung cổ họng: lời nói đùa."
      },
      {
        id: 3,
        wordA: "catch",
        wordB: "cash",
        ipaA: "/kætʃ/",
        ipaB: "/kæʃ/",
        correctWord: "catch",
        hint: "Âm /tʃ/ bật hơi dứt khoát ở đầu lưỡi: bắt lấy."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "Choose a piece of ______ and chocolate.",
        options: ["cheese", "jeep"],
        correctAnswer: "cheese",
        ipa: "/tʃuːz ə piːs əv tʃiːz ænd ˈtʃɔːklət/",
        meaning_vi: "Hãy chọn một miếng phô mai và sô cô la."
      },
      {
        id: 2,
        sentence: "John jumped for joy after getting the new ______.",
        options: ["job", "chop"],
        correctAnswer: "job",
        ipa: "/dʒɑːn dʒʌmpt fɔːr dʒɔɪ ˈæftər ˈɡetɪŋ ðə dʒɑːb/",
        meaning_vi: "John đã nhảy cẫng lên vì vui sướng sau khi nhận được công việc mới."
      }
    ]
  },

  // UNIT 10: /z/ và /ʒ/
  10: {
    unit_number: 10,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "zoo",
        wordB: "sue",
        ipaA: "/zuː/",
        ipaB: "/suː/",
        correctWord: "zoo",
        hint: "Âm /z/ khép răng rung như tiếng ong kêu zzz: sở thú."
      },
      {
        id: 2,
        wordA: "eyes",
        wordB: "ice",
        ipaA: "/aɪz/",
        ipaB: "/aɪs/",
        correctWord: "eyes",
        hint: "Từ 'eyes' tận cùng bằng âm /z/ rung: đôi mắt."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "Watching television is a true ______ and relaxation.",
        options: ["pleasure", "pressure"],
        correctAnswer: "pleasure",
        ipa: "/ˈwɑːtʃɪŋ ˈtelɪvɪʒn ɪz ə truː ˈpleʒər ænd ˌriːlækˈseɪʃn/",
        meaning_vi: "Xem truyền hình là một niềm vui và sự thư giãn đích thực."
      },
      {
        id: 2,
        sentence: "He decided to be ______ and rest at home today.",
        options: ["lazy", "lady"],
        correctAnswer: "lazy",
        ipa: "/hiː dɪˈsaɪdɪd tuː biː ˈleɪzi ænd rest æt hoʊm təˈdeɪ/",
        meaning_vi: "Anh ấy quyết định lười một chút và nghỉ ngơi ở nhà hôm nay."
      }
    ]
  },

  // UNIT 11: /t/ - /d/ & Đuôi -ed
  11: {
    unit_number: 11,
    listeningQuizzes: [
      {
        id: 1,
        wordA: "ten",
        wordB: "den",
        ipaA: "/ten/",
        ipaB: "/den/",
        correctWord: "ten",
        hint: "/t/ bật luồng gió mạnh vô thanh: số 10."
      },
      {
        id: 2,
        wordA: "wanted",
        wordB: "walked",
        ipaA: "/ˈwɒntɪd/",
        ipaB: "/wɔːkt/",
        correctWord: "wanted",
        hint: "Đuôi -ed sau âm 't' phát âm là /ɪd/: wanted."
      },
      {
        id: 3,
        wordA: "walked",
        wordB: "played",
        ipaA: "/wɔːkt/",
        ipaB: "/pleɪd/",
        correctWord: "walked",
        hint: "Đuôi -ed sau âm vô thanh 'k' phát âm là /t/: walked."
      }
    ],
    fillBlankExercises: [
      {
        id: 1,
        sentence: "He ______ to play football, so he walked outside.",
        options: ["wanted", "walked"],
        correctAnswer: "wanted",
        ipa: "/hiː ˈwɒntɪd tuː pleɪ ˈfʊtbɔːl, soʊ hiː wɔːkt ˌaʊtˈsaɪd/",
        meaning_vi: "Cậu ấy đã muốn chơi bóng đá, nên cậu ấy đã đi bộ ra ngoài."
      },
      {
        id: 2,
        sentence: "We ______ English together for two hours yesterday.",
        options: ["studied", "stopped"],
        correctAnswer: "studied",
        ipa: "/wiː ˈstʌdid ˈɪŋɡlɪʃ təˈɡeðər fɔːr tuː ˈaʊərz ˈjestərdeɪ/",
        meaning_vi: "Hôm qua chúng tôi đã cùng nhau học tiếng Anh suốt hai tiếng."
      }
    ]
  }
};
