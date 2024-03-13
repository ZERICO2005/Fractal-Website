var r = 0,
  i = 0,
  zr = 0,
  zi = 0,
  cr = 0,
  ci = 0,
  zrc = 0,
  zic = 0,
  RESX = 288,
  RESY = 288,
  ratio = 1.0,
  zoom = 0.0,
  maxItr = 144,
  sample = 1,
  size = 1;

var resX,resY,scale = 1.0;
var data = [];
var resList = [128,180,256,360,512,720,1024];
var itrList = [64,90,128,180,256,360,512];
function drawImage() {
  let canvas = document.getElementById("renderWindow");
  let ctx = canvas.getContext("2d");
  let imageData = new ImageData(canvas.width, canvas.height);
  ctx.canvas.width = RESX;
  ctx.canvas.height = RESY;
  document.querySelector("#renderWindow").style.width = ctx.canvas.width;
  document.querySelector("#renderWindow").style.height = ctx.canvas.height;
  
  let p = 0;
  for (let y = 0; y < resY; y++) {
    for (let x = 0; x < resX; x++) {
      ctx.fillStyle = "rgba(" + data[p] + ", " + data[p + 1] + ", " + data[p + 2] + ")";
      ctx.fillRect(x, y, 1, 1);
      p += 3;
    }
  }
}

function render(equation, fractal) {
  data = [];
  scale = window.devicePixelRatio;
  resX = RESX;
  resY = RESY;
  ratio = resX / resY;
  zoom = -(Math.log(2.25) / Math.log(10.0)) / (fractal - 1.0);
  
  if (fractal == 3) {
    renderCubic(equation);
  }
}

render(0,3);

function renderCubic(equation) {

  var zr1, zr2, zr3, zi1, zi2, zi3, s1, s2, s3, s4, s5, s6;

  var formula = [];

  for (let q = 0; q < 14; q++) {
    if ((equation >> q) % 2 == 1) {
      formula[q] = true;
    } else {
      formula[q] = false;
    }
  }

  if (formula[0] == true) {
    s1 = -1.0;
  } else {
    s1 = 1.0;
  }
  if (formula[1] == true) {
    s2 = -3.0;
  } else {
    s2 = 3.0;
  }
  if (formula[2] == true) {
    s3 = -3.0;
  } else {
    s3 = 3.0;
  }
  if (formula[3] == true) {
    s4 = -1.0;
  } else {
    s4 = 1.0;
  }
  if (formula[4] == true) {
    s5 = -1.0;
  } else {
    s5 = 1.0;
  }
  if (formula[5] == true) {
    s6 = -1.0;
  } else {
    s6 = 1.0;
  }

  ci = 1.0 / (Math.pow(10, zoom)) + i;

  for (let y = 0; y < resY; y++) {
    cr = (-1.0 * ratio) / (Math.pow(10, zoom)) + r;

    for (let x = 0; x < resX; x++) {
      let zs = 0.0;
      zr = 0.0;
      zi = 0.0;
      let temp = 0.0;
      let low = 2.0;
      for (let itr = maxItr; itr > 0; itr--) {

        if (formula[6] == false) {
          zr1 = zr;
        } else {
          zr1 = Math.abs(zr);
        }
        if (formula[7] == false) {
          zi1 = zi;
        } else {
          zi1 = Math.abs(zi);
        }
        if (formula[8] == false) {
          zr2 = zr;
        } else {
          zr2 = Math.abs(zr);
        }
        if (formula[9] == false) {
          zi2 = zi;
        } else {
          zi2 = Math.abs(zi);
        }
        if (formula[10] == false) {
          zr3 = zr;
        } else {
          zr3 = Math.abs(zr);
        }
        if (formula[11] == false) {
          zi3 = zi;
        } else {
          zi3 = Math.abs(zi);
        }

        if (formula[12] == false) {
          if (formula[13] == false) {
            temp = s5 * ((s1 * zr1 * zr * zr) - (s2 * zr2 * zi1 * zi)) + cr;
            zi = s6 * ((s3 * zr3 * zr * zi2) - (s4 * zi3 * zi * zi)) + ci;
            zr = temp;
          } else {
            temp = s5 * Math.abs((s1 * zr1 * zr * zr) - (s2 * zr2 * zi1 * zi)) + cr;
            zi = s6 * ((s3 * zr3 * zr * zi2) - (s4 * zi3 * zi * zi)) + ci;
            zr = temp;
          }
        } else {
          if (formula[13] == false) {
            temp = s5 * Math.abs((s1 * zr1 * zr * zr) - (s2 * zr2 * zi1 * zi)) + cr;
            zi = s6 * ((s3 * zr3 * zr * zi2) - (s4 * zi3 * zi * zi)) + ci;
            zr = temp;
          } else {
            temp = s5 * Math.abs((s1 * zr1 * zr * zr) - (s2 * zr2 * zi1 * zi)) + cr;
            zi = s6 * Math.abs((s3 * zr3 * zr * zi2) - (s4 * zi3 * zi * zi)) + ci;
            zr = temp;
          }
        }

        zs = (zr * zr + zi * zi);

        if (zs > 1073741824) {
          let smooth = Math.log(1 + Math.max(0, (maxItr - itr) - Math.log2(Math.log2(zs) / 2.0 / Math.log2(2.0)) / Math.log2(3.0)));
          data.push(Math.floor(0.9 * (127 - 127 * Math.cos(2 * Math.PI * (0.45 * smooth + 0.5)))), Math.floor(127 - 127 * Math.cos(2 * Math.PI * (0.45 * smooth + 0.9))), Math.floor(127 - 127 * Math.cos(2 * Math.PI * (0.45 * smooth + 0.1))));
          //data.push(255,255,255)
          itr = 0;
        } else if (zs < low) {
          low = zs;
        }
      }
      if (zs <= 1073741824) {
        data.push(0, 0, 127 - 127 * Math.cos(Math.log(low) / 2.0));
      }

      cr = cr + (2.0 / resY / Math.pow(10, zoom)); //resY to keep pixel ratio
    }
    ci = ci - (2.0 / resY / Math.pow(10, zoom));
  }

  drawImage();
}