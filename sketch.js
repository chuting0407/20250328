let grasses = []; // 儲存所有水草的屬性
let grassCount = 45; // 水草數量
let grassColors = ["#d9ed92", "#b5e48c", "#99d98c", "#76c893", "#52b69a", "#34a0a4", "#168aad", "#1a759f", "#1e6091", "#184e77"]; // 指定的顏色

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 設定畫布層級為 1
  canvas.style('pointer-events', 'none'); // 禁用畫布的指針事件，讓 iframe 可操作

  // 建立 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/main.aspx'); // 設定 iframe 的內容網址
  iframe.style('position', 'absolute');
  iframe.style('top', '0%'); // 距離視窗頂部 10%
  iframe.style('left', '0%'); // 距離視窗左側 10%
  iframe.style('width', '100%'); // 寬度為視窗的 80%
  iframe.style('height', '100%'); // 高度為視窗的 80%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '0'); // 設定 iframe 層級為 0
  iframe.style('pointer-events', 'auto'); // 確保 iframe 可以正常操作

  // 初始化 45 條水草的屬性，平均分布
  for (let i = 0; i < grassCount; i++) {
    let grass = {
      x: (i + 0.5) * (width / grassCount), // 水草的 x 座標，平均分布
      height: random(100, 400), // 水草的高度
      color: color(grassColors[floor(random(grassColors.length))]), // 隨機選擇一個顏色
      thickness: random(20, 40), // 水草的粗細
      frequency: random(0.03, 0.08), // 水草的搖晃頻率
      amplitude: random(10, 30) // 水草左右移動的幅度
    };
    grasses.push(grass); // 將水草屬性加入陣列
  }
}

function draw() {
  clear(); // 清除畫布，讓背景透明

  blendMode(MULTIPLY); // 設定混合模式為 MULTIPLY，讓顏色疊加更柔和

  // 繪製每條水草
  for (let i = 0; i < grasses.length; i++) {
    let grass = grasses[i]; // 取得水草屬性
    let baseX = grass.x; // 水草的基底位置
    let baseY = height; // 水草的底部位置
    let lineHeight = grass.height; // 水草的高度
    let grassColor = grass.color; // 水草的顏色
    let thickness = grass.thickness; // 水草的粗細

    push();
    translate(baseX, baseY); // 將原點移到水草的底部
    stroke(grassColor); // 設定水草的顏色
    strokeWeight(thickness); // 設定水草的粗細
    noFill(); // 不填充，僅繪製線條

    beginShape(); // 開始繪製水草的曲線
    for (let y = 0; y > -lineHeight; y -= 10) { // 增加每段的高度間隔，減少枝節
      // 計算每個枝節的獨立搖晃偏移量
      let localAngle = sin(frameCount * grass.frequency * 0.5 + y * 0.05) * map(y, 0, -lineHeight, 0, grass.amplitude);
      vertex(localAngle, y); // 添加頂點
    }
    endShape(); // 結束繪製水草的曲線
    pop();
  }

  blendMode(BLEND); // 恢復混合模式為默認
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小

  // 重新調整水草的 x 座標，保持平均分布
  for (let i = 0; i < grasses.length; i++) {
    grasses[i].x = (i + 0.5) * (width / grassCount); // 根據新的視窗寬度重新分布 x 座標
  }
}
