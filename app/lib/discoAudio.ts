// Module-level audio instance created during the Konami keydown gesture,
// so the browser autoplay policy is satisfied immediately.
let audio: HTMLAudioElement | null = null;

export function startDiscoAudio() {
  if (audio) return;
  audio = new Audio("/disco-music.m4a");
  audio.loop = true;
  audio.volume = 0.7;
  audio.play().catch(() => {});
}

export function stopDiscoAudio() {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio = null;
}

export function getDiscoAudio() {
  return audio;
}
