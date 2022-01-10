import Tool from "./Tool";

export default class Arrow extends Tool {
  constructor(canvas) {
    super(canvas);
    this.img = new Image();

    this.listen();
    console.log('Arrow');
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
  }

  mouseLeaveHandler(event) {
    this.mouseDown = false;
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
  }
  mouseDownHandler(event) {
    this.mouseDown = true;

    this.startX = event.offsetX;
    this.startY = event.offsetY;

    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.draw(this.startX, this.startY, event.offsetX, event.offsetY);
    }
  }

  draw(x1, y1, x2, y2) {
    this.img.src = this.saved;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    const lineangle = Math.atan2(y2 - y1, x2 - x1);
    console.log('lineangle: ', lineangle);
    const d = 20;
    // const angle = Math.PI / 12;
    const angle = ((Math.PI / 2) * 25) / 100;
    console.log('angle: ', angle);
    // const h = Math.abs(d / Math.cos(angle));
    const h = 20;

    // const angle1 = lineangle + Math.PI + angle;
    const angle1 = lineangle + angle;
    console.log('angle1: ', angle1);
    const topx = x1 + Math.cos(angle1) * h;
    const topy = y1 + Math.sin(angle1) * h;

    const angle2 = lineangle - angle;
    const botx = x1 + Math.cos(angle2) * h;
    const boty = y1 + Math.sin(angle2) * h;

    this.ctx.beginPath();

    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(Math.floor(topx), Math.floor(topy));

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(botx, boty);

    this.ctx.stroke();

    // console.log(`x1 - ${x1}, y1 - ${y1}`);
    // console.log(`x2 - ${x2}, y2 - ${y2}`);
    // console.log(`topx - ${Math.floor(topx)}, topy - ${Math.floor(topy)}`);
    // const AB = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    // console.log('AB: ', AB);
    // console.log(`Math.atan2 - `, Math.atan2((y2 - y1), (x2 - x1)) * Math.PI);

    // const lineangle = Math.atan2((y2 - y1), (x2 - x1));
    // const d = 10;
    // const angle = 25;
    // const h = Math.abs(d / Math.cos(angle));

    // var angle1 = lineangle + Math.PI + angle;
    // var topx = x2 + Math.cos(angle1) * h;
    // var topy = y2 + Math.sin(angle1) * h;

    // определение угла
    // if (x2 - x1 >= 0)
    //   console.log("влево");
    // if (x2 - x1 < 0)
    //   console.log("вправо");
    // if (y2 - y1 >= 0)
    //   console.log("вверх");
    // if (y2 - y1 < 0)
    //   console.log("вниз");
    // const a = 25;

    // const AB = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    // const AC = 10;
    // //a2 = b2 + c2 - 2bc·cos α
    // let BC = Math.sqrt(Math.pow(AB, 2) + Math.pow(AC, 2) - (((AB * AC) * 2) * Math.cos(a)));

    // // a² + b² - c²
    // //     2ab
    // const b = (Math.pow(AB, 2) + Math.pow(BC, 2) - Math.pow(AC, 2) / ((AB * BC) * 2));
    // //b² + c² - a²
    // //     2cb
    // const c = (Math.pow(BC, 2) + Math.pow(AC, 2) - Math.pow(AB, 2) / ((AC * BC) * 2));

    // console.log('AB: ', AB);
    // console.log('AC: ', AC);
    // console.log('BC: ', BC);
    // console.log('a: ', a);
    // console.log('b: ', b);
    // console.log('c: ', c);
    // console.log('проверка AC - ', Math.sqrt(Math.pow(AB, 2) + Math.pow(BC, 2) - (((AB * BC) * 2) * Math.cos(a))));

  }
}