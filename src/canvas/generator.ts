export class Generator {
  constructor() {}
  line(x1: number, y1: number, x2: number, y2: number) {
    const operation = [];
    operation.push({ op: 'moveTo', data: [x1, y1] });
    operation.push({ op: 'lineTo', data: [x2, y2] });
    return { shape: 'line', operation };
  }
}
