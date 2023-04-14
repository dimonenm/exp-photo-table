export const drawArrowArray = (Ctx, Text, ArrowsColor, ArrowsWidth, X1, Y1, X2, Y2) => {
  // инициализация переменных
  const ctx = Ctx; // контекст
  const text = Text; // текст  
  const arrowsColor = ArrowsColor; // цвет стрелок
  const arrowsWidth = ArrowsWidth; // ширина чтрелок
  const lineCap = 'round'; // вид соединения
  const angleValue = 25; // угол разварота стрелок
  const indent = 20; // величина отступа цифр от стрелок
  const x1 = X1;
  const y1 = Y1;
  const x2 = X2;
  const y2 = Y2;

  //настройка контекста
  ctx.strokeStyle = arrowsColor;
  ctx.lineWidth = arrowsWidth;
  ctx.lineCap = lineCap;
  ctx.font = `${16 + (parseInt(arrowsWidth) * 4)}px Times New Roman serif`;
  ctx.fillStyle = arrowsColor;

  // определение координат
  const angle = ((Math.PI / 2) * angleValue) / 100;
  const lineangle = Math.atan2(y2 - y1, x2 - x1);
  const d = (Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) / 100) * 50;
  const h = Math.abs((d > 20 ? 20 : d) / Math.cos(angle));

  const angle1 = lineangle + angle;
  const rx = Math.floor(x1 + Math.cos(angle1) * h);
  const ry = Math.floor(y1 + Math.sin(angle1) * h);

  const angle2 = lineangle - angle;
  const lx = Math.floor(x1 + Math.cos(angle2) * h);
  const ly = Math.floor(y1 + Math.sin(angle2) * h);

  const x3 = Math.floor(x2 + Math.cos(lineangle + (((Math.PI / 2)) / 100)) * indent);
  const y3 = Math.floor(y2 + Math.sin(lineangle - (((Math.PI / 2)) / 100)) * indent);

  // отрисовывание
  ctx.beginPath();

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.moveTo(x1, y1);
  ctx.lineTo(rx, ry);

  ctx.moveTo(x1, y1);
  ctx.lineTo(lx, ly);

  ctx.stroke();

  ctx.fillText(text, x3, y3);
}

export function drawScaleGrid(ctx, orientation) {
  ctx.strokeStyle = '#454545';

  if (orientation === 'horizontal') {
    const linesHorizontal = 13.34
    const linesVertical = 10
    const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
    const gridPitchVertical = ctx.canvas.height / linesVertical
    let counterHorizontal = gridPitchHorizontal
    let counterVertical = gridPitchVertical
    for (let i = 0; i < (linesHorizontal - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(counterHorizontal, 0);
      ctx.lineTo(counterHorizontal, ctx.canvas.height);

      ctx.stroke();

      counterHorizontal = counterHorizontal + gridPitchHorizontal
    }
    for (let i = 0; i < (linesVertical - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(0, counterVertical);
      ctx.lineTo(ctx.canvas.width, counterVertical);

      ctx.stroke();

      counterVertical = counterVertical + gridPitchVertical
    }
  }
  if (orientation === 'vertical') {
    const linesHorizontal = 9
    const linesVertical = 12
    const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
    const gridPitchVertical = ctx.canvas.height / linesVertical
    let counterHorizontal = gridPitchHorizontal
    let counterVertical = gridPitchVertical
    for (let i = 0; i < (linesHorizontal - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(counterHorizontal, 0);
      ctx.lineTo(counterHorizontal, ctx.canvas.height);

      ctx.stroke();

      counterHorizontal = counterHorizontal + gridPitchHorizontal
    }
    for (let i = 0; i < (linesVertical - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(0, counterVertical);
      ctx.lineTo(ctx.canvas.width, counterVertical);

      ctx.stroke();

      counterVertical = counterVertical + gridPitchVertical
    }
  }
  if (orientation === '9X6') {
    const linesHorizontal = 9
    const linesVertical = 6
    const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
    const gridPitchVertical = ctx.canvas.height / linesVertical
    let counterHorizontal = gridPitchHorizontal
    let counterVertical = gridPitchVertical
    for (let i = 0; i < (linesHorizontal - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(counterHorizontal, 0);
      ctx.lineTo(counterHorizontal, ctx.canvas.height);

      ctx.stroke();

      counterHorizontal = counterHorizontal + gridPitchHorizontal
    }
    for (let i = 0; i < (linesVertical - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(0, counterVertical);
      ctx.lineTo(ctx.canvas.width, counterVertical);

      ctx.stroke();

      counterVertical = counterVertical + gridPitchVertical
    }
  }
  if (orientation === '6X9') {
    const linesHorizontal = 6
    const linesVertical = 9
    const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
    const gridPitchVertical = ctx.canvas.height / linesVertical
    let counterHorizontal = gridPitchHorizontal
    let counterVertical = gridPitchVertical
    for (let i = 0; i < (linesHorizontal - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(counterHorizontal, 0);
      ctx.lineTo(counterHorizontal, ctx.canvas.height);

      ctx.stroke();

      counterHorizontal = counterHorizontal + gridPitchHorizontal
    }
    for (let i = 0; i < (linesVertical - 1); i++) {
      ctx.beginPath();

      ctx.moveTo(0, counterVertical);
      ctx.lineTo(ctx.canvas.width, counterVertical);

      ctx.stroke();

      counterVertical = counterVertical + gridPitchVertical
    }
  }
}

export function renderImgInCanvas(canvasRef, width, height, galleryImg) {
  const ctx = canvasRef.current.getContext('2d');
  ctx.canvas.width = width
  ctx.canvas.height = height
  const img = new Image();
  
  img.onload = function () {

    const pr = ctx.canvas.height * 100 / this.height;
    const zoom = +galleryImg.getZoom() / 100;
    const imgW = (this.width / 100 * pr) * zoom;
    const imgH = (this.height / 100 * pr) * zoom;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (galleryImg.getImgCuted() === true) {
      galleryImg.setContrast('100')
      galleryImg.setBrightness('100')
      galleryImg.setSaturate('100')
      galleryImg.setRotationDegrees('0')
    }
    if (galleryImg.getContrast() != '100' || galleryImg.getBrightness() != '100' || galleryImg.getSaturate() != '100') {

      ctx.filter =
        `contrast(${galleryImg.getContrast()}%)
        brightness(${galleryImg.getBrightness()}%)
        saturate(${galleryImg.getSaturate()}%)`
    }
    if (galleryImg.getRotationDegrees() != '0') {
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.rotate(galleryImg.getRotationDegrees() * Math.PI / 180)
      ctx.translate(-(ctx.canvas.width / 2), -(ctx.canvas.height / 2));
    }
    ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + galleryImg.getLastOffsetValueX(), ((ctx.canvas.height - imgH) / 2) + galleryImg.getLastOffsetValueY(), imgW, imgH);
    if (galleryImg.getArrowsArray().length > 0) {
      for (const item of galleryImg.getArrowsArray()) {
        drawArrowArray(ctx, item.getNumber(), galleryImg.getArrowsColor(), galleryImg.getArrowsWidth(), item.x1, item.y1, item.x2, item.y2);
      }
    }
  }
  img.src = galleryImg.getUrl();
}

export function renderImgInCanvas2(canvasRef, img, canvasSize, galleryImg) {
  const ctx = canvasRef.current.getContext('2d');
  ctx.canvas.width = canvasSize.width
  ctx.canvas.height = canvasSize.height

  const pr = ctx.canvas.height * 100 / img.height;
  const zoom = +galleryImg.getZoom() / 100;
  const imgW = (img.width / 100 * pr) * zoom;
  const imgH = (img.height / 100 * pr) * zoom;

  if (galleryImg.getImgCuted() === true) {
    galleryImg.setContrast('100')
    galleryImg.setBrightness('100')
    galleryImg.setSaturate('100')
    galleryImg.setRotationDegrees('0')
  }
  if (galleryImg.getContrast() != '100' || galleryImg.getBrightness() != '100' || galleryImg.getSaturate() != '100') {
    ctx.filter =
      `contrast(${galleryImg.getContrast()}%)
        brightness(${galleryImg.getBrightness()}%)
        saturate(${galleryImg.getSaturate()}%)`
  }
  if (galleryImg.getRotationDegrees() != '0') {
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate(galleryImg.getRotationDegrees() * Math.PI / 180)
    ctx.translate(-(ctx.canvas.width / 2), -(ctx.canvas.height / 2));
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + galleryImg.getLastOffsetValueX(), ((ctx.canvas.height - imgH) / 2) + galleryImg.getLastOffsetValueY(), imgW, imgH);

  if (galleryImg.getArrowsArray().length > 0) {
    for (const item of galleryImg.getArrowsArray()) {
      drawArrowArray(ctx, item.getNumber(), galleryImg.getArrowsColor(), galleryImg.getArrowsWidth(), item.x1, item.y1, item.x2, item.y2);
    }
  }
}

export function renderScaleGridInCanvas(scaleGridCanvasRef, width, height, galleryImg, isZoomScaleGrid) {
  if (isZoomScaleGrid) {
    const ctx = scaleGridCanvasRef.current.getContext('2d');
    ctx.canvas.width = width
    ctx.canvas.height = height
    drawScaleGrid(ctx, galleryImg.getOrientation())
  } else {
    const ctx = scaleGridCanvasRef.current.getContext('2d');
    ctx.canvas.width = 0
    ctx.canvas.height = 0
  }
}