/**
 * Web Speech API helper for natural native pronunciation
 * Works 100% offline, zero latency, zero storage bandwidth
 */
export function speakText(text: string, rate: number = 0.85, lang: string = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported on this browser.");
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // 0.85 rate is ideal for learners to hear clearly
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Speech error:", error);
  }
}
