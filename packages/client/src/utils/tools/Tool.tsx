export default class Tool {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D | null

  set fillColor(color: string | CanvasGradient | CanvasPattern) {
    this.ctx!.fillStyle = color
  }
  set strokeColor(color: string | CanvasGradient | CanvasPattern) {
    this.ctx!.strokeStyle = color
  }

  set lineWidth(width: number) {
    this.ctx!.lineWidth = width
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
  }
}
