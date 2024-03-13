//Copy to clipboard does not work in the Glitch.com editor

var btn3 = document.getElementById("generate3");
btn3.addEventListener("click", render3);
document.getElementById("hide").style.display = "none";

var java = "";
var cpp = "";
var glsl = "";

function copyJava() {navigator.clipboard.writeText(java);}
function copyCPP() {navigator.clipboard.writeText(cpp);}
function copyGLSL() {navigator.clipboard.writeText(glsl);}

function render3() {
  document.getElementById("hide").style.display = "block";
  var id = document.getElementById("enter").value;
  if (isNaN(id) || document.getElementById("enter").value === '') {
    id = 0;
    document.getElementById("enter").value = '';
  } else {
    id = id % 16384;
    if (id < 0) {
      id += 16384;
    }
    document.getElementById("enter").value = id;
  }
  
  java = "temp = "
  cpp = "temp = "
  glsl = "z = vec2("
  if (Math.floor(id / 16) % 2 == 0) {
    java = java + "";
    cpp = cpp + "";
    glsl = glsl + "";
  } else {
    java = java + "-1 * ";
    cpp = cpp + "-1 * ";
    glsl = glsl + "-1 * ";
  }
  if (Math.floor(id / 4096) % 2 == 0) {
    java = java + "((";
    cpp = cpp + "((";
    glsl = glsl + "((";
  } else {
    java = java + "Math.abs((";
    cpp = cpp + "abs((";
    glsl = glsl + "abs((";
  }
  if (id % 2 == 0) {
    java = java + "";
    cpp = cpp + "";
    glsl = glsl + "";
  } else {
    glsl = glsl + "-1 * ";
    java = java + "-1 * ";
    cpp = cpp + "-1 * ";
  }
  if (Math.floor(id / 64) % 2 == 0) {
    java = java + "zr * zr * zr) ";
    cpp = cpp + "zr * zr * zr) ";
    glsl = glsl + "z.x * z.x * z.x) ";
  } else {
    java = java + "Math.abs(zr) * zr * zr) ";
    cpp = cpp + "abs(zr) * zr * zr) ";
    glsl = glsl + "abs(z.x) * z.x * z.x) ";
  }
  if (Math.floor(id / 2) % 2 == 0) {
    java = java + "- (3 * ";
    cpp = cpp + "- (3 * ";
    glsl = glsl + "- (3 * ";
  } else {
    java = java + "+ (3 * ";
    cpp = cpp + "+ (3 * ";
    glsl = glsl + "+ (3 * ";
  }
  if (Math.floor(id / 256) % 2 == 0) {
    java = java + "zr * ";
    cpp = cpp + "zr * ";
    glsl = glsl + "z.x * ";
  } else {
    java = java + "Math.abs(zr) * ";
    cpp = cpp + "abs(zr) * ";
    glsl = glsl + "abs(z.x) * ";
  }
  if (Math.floor(id / 128) % 2 == 0) {
    java = java + "zi * zi)) + cr;\nzi = ";
    cpp = cpp + "zi * zi)) + cr;\nzi = ";
    glsl = glsl + "z.y * z.y)), ";
  } else {
    java = java + "Math.abs(zi) * zi)) + cr;\nzi = ";
    cpp = cpp + "abs(zi) * zi)) + cr;\nzi = ";
    glsl = glsl + "abs(z.y) * z.y)), ";
  }
  if (Math.floor(id / 32) % 2 == 0) {
    java = java + "";
    cpp = cpp + "";
    glsl = glsl + "";
  } else {
    java = java + "-1 * ";
    cpp = cpp + "-1 * ";
    glsl = glsl + "-1 * ";
  }
  if (Math.floor(id / 8192) % 2 == 0) {
    java = java + "((";
    cpp = cpp + "((";
    glsl = glsl + "((";
  } else {
    java = java + "Math.abs((";
    cpp = cpp + "abs((";
    glsl = glsl + "abs((";
  }
  if (Math.floor(id / 4) % 2 == 0) {
    java = java + "3 * ";
    cpp = cpp + "3 * ";
    glsl = glsl + "3 * ";
  } else {
    java = java + "-3 * ";
    cpp = cpp + "-3 * ";
    glsl = glsl + "-3 * ";
  }
  if (Math.floor(id / 1024) % 2 == 0) {
    java = java + "zr * zr * ";
    cpp = cpp + "zr * zr * ";
    glsl = glsl + "z.x * z.x * ";
  } else {
    java = java + "Math.abs(zr) * zr * ";
    cpp = cpp + "abs(zr) * zr * ";
    glsl = glsl + "abs(z.x) * z.x * ";
  }
  if (Math.floor(id / 512) % 2 == 0) {
    java = java + "zi) ";
    cpp = cpp + "zi) ";
    glsl = glsl + "z.y) ";
  } else {
    java = java + "Math.abs(zi)) ";
    cpp = cpp + "abs(zi)) ";
    glsl = glsl + "abs(z.y)) ";
  }
  if (Math.floor(id / 8) % 2 == 0) {
    java = java + "- (";
    cpp = cpp + "- (";
    glsl = glsl + "- (";
  } else {
    java = java + "+ (";
    cpp = cpp + "+ (";
    glsl = glsl + "+ (";
  }
  if (Math.floor(id / 2048) % 2 == 0) {
    java = java + "zi * zi * zi)) + ci;\nzr = temp;";
    cpp = cpp + "zi * zi * zi)) + ci;\nzr = temp;";
    glsl = glsl + "z.y * z.y * z.y))) + c;";
  } else {
    java = java + "Math.abs(zi) * zi * zi)) + ci;\nzr = temp;";
    cpp = cpp + "abs(zi) * zi * zi)) + ci;\nzr = temp;";
    glsl = glsl + "abs(z.y) * z.y * z.y))) + c;";
  }
  //"z = vec2(s5 * abs(s1 * (zr1 * z.x * z.x) - (s2 * (3 * zr2 * zi1 * z.y))), s6 * abs((s3 * (3 * zr3 * z.x * zi2)) - (s4 * (zi3 * z.y * z.y)))) + c;"
  document.querySelector("#java span").textContent = java;
  document.querySelector("#cpp span").textContent = cpp;
  document.querySelector("#glsl span").textContent = glsl;
  render(id,3);
}

render3();