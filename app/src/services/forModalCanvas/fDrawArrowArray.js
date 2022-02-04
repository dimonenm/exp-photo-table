const drawArrowArray = (Ctx, Text, ArrowsColor, ArrowsWidth, X1, Y1, X2, Y2) => {
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

export default drawArrowArray;