const soundUrls = {
    "exam-start": "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
    "correct-answer": "https://cdn.freesound.org/previews/476/476178_7457913-lq.mp3",
    "wrong-answer": "https://cdn.freesound.org/previews/476/476177_7457913-lq.mp3",
    "exam-finish": "https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3",
    "exam-stop": "https://cdn.freesound.org/previews/364/364929_6687669-lq.mp3",
  }
  
  // Fallback sounds using the Web Audio API
  const fallbackSounds = {
    "correct-answer": (context: AudioContext) => {
      const oscillator = context.createOscillator()
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(440, context.currentTime) // A4 note
      oscillator.connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.1)
    },
    "wrong-answer": (context: AudioContext) => {
      const oscillator = context.createOscillator()
      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(220, context.currentTime) // A3 note
      oscillator.connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.1)
    },
  }
  
  export const playSound = (soundName: keyof typeof soundUrls) => {
    const audio = new Audio(soundUrls[soundName])
  
    audio.play().catch((error) => {
      console.warn(`Error playing sound ${soundName}:`, error)
  
      // Fallback to Web Audio API for certain sounds
      if (soundName in fallbackSounds) {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          fallbackSounds[soundName as keyof typeof fallbackSounds](audioContext)
        } catch (fallbackError) {
          console.error("Fallback sound playback failed:", fallbackError)
        }
      }
    })
  }
  
  