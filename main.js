let canvas = document.getElementById("canvas"); //获取canvas对象
canvas.width = document.documentElement.clientWidth //设置canvas的宽度
canvas.height = document.documentElement.clientHeight //设置canvas的高度

let ctx = canvas.getContext("2d");
ctx.fillStyle = "black"; //设置填充颜色为黑色
ctx.strokeStyle = 'none'; //设置描边为空
ctx.lineWidth = 8;  //设置连线宽度
ctx.lineCap = "round" //设置转折点为圆点

let painting = false //默认为false
let last  //作为上一个的标志

let isTouchDevice = 'ontouchstart' in document.documentElement; //判断是否为移动设备
if (isTouchDevice) {  //如果是移动设备
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }

  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0], last[1], x, y)
    last = [x, y]
  }
} else {  //如果是PC
  canvas.onmousedown = (e) => { //当按下鼠标时设置为true
    painting = true
    last = [e.clientX, e.clientY]
  }

  canvas.onmousemove = (e) => { //当鼠标滑动时
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }

  canvas.onmouseup = () => { //当松开鼠标时
    painting = false
  }
}

function drawLine(x1, y1, x2, y2) { //画线
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}