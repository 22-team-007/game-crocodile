interface CrocoSound {
  fileName: string
  buffer?: ArrayBuffer
}

class Sound {
  protected soundCtx: AudioContext | undefined

  protected sounds: Record<string, CrocoSound> = {
    fullScreenIn: {
      fileName: 'FullScreen_In.mp3',
    },
    fullScreenOut: {
      fileName: 'FullScreen_Out.mp3',
    },
    userEnter:{
      fileName: 'userEnter.mp3',
    },
    YouWon:{
      fileName: 'YouWon.mp3',
    },
  }

  public play(key: any){
    if(typeof this.sounds[key].buffer !== 'undefined') {
      const soud = this.sounds[key].buffer as ArrayBuffer
      this.start(soud)
  }
    
  }

  protected async start(buffer: ArrayBuffer) {
    const soundCtx = new AudioContext()

    const decodeBuffer = await soundCtx.decodeAudioData(buffer.slice(0))

    const source = soundCtx.createBufferSource()
    source.buffer = decodeBuffer

    source.connect(soundCtx.destination)
    source.start(0)
  }

  public async init() {
    const promises = Object.keys(this.sounds).map(key => {
      if (this.sounds[key].fileName.length === 0) {
        return Promise.resolve()
      }

      const nameLoadingFile = this.sounds[key].fileName

      try {
        return fetch(`/${nameLoadingFile}`)
          .then(res => res.arrayBuffer())
          .then(audioData => (this.sounds[key].buffer = audioData))
      } catch (e) {
        console.error(`Fail loading sound file`, e as Error)
      }
    })

    await Promise.all(promises)
  }
}

export const sound = new Sound()

if(typeof window !== 'undefined') {
  (async () => await sound.init())()
}


