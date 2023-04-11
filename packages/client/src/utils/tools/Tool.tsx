export default class Tool {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D | null

  public get fillColor(): string {
    if (this.ctx) return this.ctx.fillStyle as string
    return '#000000'
  }

  public set fillColor(color: string | CanvasGradient | CanvasPattern) {
    this.ctx!.fillStyle = color
  }

  public get strokeColor(): string {
    if (this.ctx) return this.ctx.strokeStyle as string
    return '#000000'
  }

  public set strokeColor(color: string | CanvasGradient | CanvasPattern) {
    this.ctx!.strokeStyle = color
  }

  public get lineWidth(): number {
    if (this.ctx) return this.ctx.lineWidth as number
    return 1
  }

  public set lineWidth(width: number) {
    this.ctx!.lineWidth = width
  }

  private destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmouseleave = null
  }
}
