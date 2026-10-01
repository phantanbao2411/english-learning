/**
 * High-Quality Native Audio & Speech System
 * Plays genuine native human speaker recordings (MP3) from dictionary voice CDN
 * with seamless fallback to browser SpeechSynthesis.
 */

let activeAudio: HTMLAudioElement | null = null;

/**
 * Play authentic human native speaker audio for any English word or sentence
 * @param text Word or phrase to speak
 * @param accent 'uk' for British English, 'us' for American English
 */
export function playNativeAudio(text: string, accent: "uk" | "us" = "uk"): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const clean = text.trim();
    if (!clean) return resolve();

    try {
      if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      }

      const type = accent === "uk" ? 1 : 2;
      const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&type=${type}`;
      const audio = new Audio(audioUrl);
      activeAudio = audio;

      const timer = setTimeout(() => {
        resolve();
      }, 7000);

      audio.onended = () => {
        clearTimeout(timer);
        resolve();
      };

      audio.onerror = () => {
        clearTimeout(timer);
        speakWithSynthesis(clean, accent === "uk" ? "en-GB" : "en-US");
        resolve();
      };

      audio.play().catch(() => {
        clearTimeout(timer);
        speakWithSynthesis(clean, accent === "uk" ? "en-GB" : "en-US");
        resolve();
      });
    } catch {
      speakWithSynthesis(clean, accent === "uk" ? "en-GB" : "en-US");
      resolve();
    }
  });
}

/**
 * Fallback Web Speech API
 */
export function speakWithSynthesis(text: string, lang: string = "en-US", rate: number = 0.85) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("SpeechSynthesis error:", err);
  }
}

/**
 * General speech wrapper
 */
export function speakText(text: string, rate: number = 0.85, lang: string = "en-US") {
  const accent: "uk" | "us" = lang.toLowerCase().includes("gb") ? "uk" : "us";
  // Always try genuine native human MP3 audio first!
  playNativeAudio(text, accent).catch(() => {
    speakWithSynthesis(text, lang, rate);
  });
}
