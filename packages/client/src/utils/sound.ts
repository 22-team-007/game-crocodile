interface CrocoSound {
  fileName: string
  buffer: ArrayBuffer | undefined
}
class Sound {
  protected soundCtx: AudioContext | undefined

  protected sounds: Record<string, CrocoSound> = {
    fullScreenIn: {
      fileName: 'FullScreen_In.mp3',
      buffer: undefined,
    },
    fullScreenOut: {
      fileName: 'FullScreen_Out.mp3',
      buffer: undefined,
    },
  }

  public fullScreenIn() {
    if (typeof this.sounds.fullScreenIn.buffer !== 'undefined') {
      this.play(this.sounds.fullScreenIn.buffer)
    }
  }

  public fullScreenOut() {
    if (typeof this.sounds.fullScreenOut.buffer !== 'undefined') {
      this.play(this.sounds.fullScreenOut.buffer)
    }
  }

  protected async play(buffer: ArrayBuffer) {
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
        const fetch2 =
          typeof fetch === 'undefined'
            ? function (
                url: string
              ): Promise<{ arrayBuffer: () => Promise<any> }> {
                return new Promise(a => {
                  a({
                    arrayBuffer: () => {
                      return new Promise(b => {
                        b('')
                      })
                    },
                  })
                })
              }
            : fetch
        return fetch2(`/assets/${nameLoadingFile}`)
          .then(res => res.arrayBuffer())
          .then(audioData => (this.sounds[key].buffer = audioData))
      } catch (e) {
        console.error(`Fail loading sound file`, e as Error)
      }
    })

    await Promise.all(promises)
  }
}

const sound = new Sound()

;(async () => await sound.init())()

export default sound
