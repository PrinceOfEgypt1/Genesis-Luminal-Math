export const narrate = (text: string, rate: number = 0.9, pitch: number = 1) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'pt-BR';

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      voice => voice.lang.includes('pt-BR') && voice.name.toLowerCase().includes('feminino')
    ) || voices.find(voice => voice.lang.includes('pt-BR'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
};
