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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    console.log();

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