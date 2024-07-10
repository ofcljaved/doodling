export class Doodle {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
  }
  draw(
    operation: {
      op: string;
      data: number[];
    }[]
  ) {
    this.ctx.save();
    this.ctx.beginPath();
    operation.forEach((item) => {
      if (item.op === 'moveTo') {
        this.ctx.moveTo(item.data[0], item.data[1]);
      } else {
        this.ctx.lineTo(item.data[0], item.data[1]);
      }
    });
    this.ctx.stroke();
    this.ctx.restore();
  }
}
