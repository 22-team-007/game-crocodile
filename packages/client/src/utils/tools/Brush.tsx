import Tool from './Tool'

export default class Brush extends Tool {
  constructor(
    canvas: HTMLCanvasElement,
    onMouseUp: (buffer: Coordinate[]) => void
  ) {
    super(canvas)
    this.listen()
    this.onMouseUp = onMouseUp
  }

  public mouseDown = false

  public drawArray(coordinates: Coordinate[], color: string) {
    const tmpStrokeColor = this.strokeColor
    const tmpfillColor = this.fillColor
    this.strokeColor = this.fillColor = color
    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i]
      if (i === 0) {
        this.ctx?.beginPath()
        this.ctx?.moveTo(x, y)
      } else {
        this.ctx?.lineTo(x, y)
        this.ctx?.stroke()
      }
    }
    this.strokeColor = tmpStrokeColor
    this.fillColor = tmpfillColor
  }

  private buffer: Coordinate[] = []
  private onMouseUp: (buffer: Coordinate[]) => void

  private listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmouseleave = this.mouseUpHandler.bind(this)
  }

  private mouseUpHandler() {
    this.mouseDown = false
    if (this.buffer.length > 0) {
      this.onMouseUp(this.buffer)
      this.buffer = []
    }
  }

  private mouseDownHandler(e: MouseEvent) {
    const x = e.pageX - (e.target as HTMLElement).offsetLeft
    const y = e.pageY - (e.target as HTMLElement).offsetTop
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(x, y)
    this.buffer.push([x, y])
  }

  private mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const x = e.pageX - (e.target as HTMLElement).offsetLeft
      const y = e.pageY - (e.target as HTMLElement).offsetTop
      this.ctx?.lineTo(x, y)
      this.ctx?.stroke()
      this.buffer.push([x, y])
    }
  }
}
