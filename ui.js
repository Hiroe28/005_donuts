// モバイルナビゲーションの設定
function setupMobileNav() {
  // モバイルナビゲーションのタブ切り替え
  const navButtons = document.querySelectorAll('#mobile-nav .nav-button');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      // すべてのナビボタンの選択状態を解除
      navButtons.forEach(b => b.classList.remove('active'));
      // クリックしたボタンを選択状態に
      this.classList.add('active');
      
      // すべてのパネルを非表示に
      const panels = document.querySelectorAll('#mobile-panels .control-panel');
      panels.forEach(panel => panel.classList.remove('active'));
      
      // 対応するパネルを表示
      const panelId = this.getAttribute('data-panel');
      document.getElementById(`panel-${panelId}`).classList.add('active');
    });
  });
  
  // モバイル用ボタンのイベントをデスクトップ用と同期
  
  // ドーナツ形状
  document.getElementById('mobile-btn-ring').addEventListener('click', function() {
    document.getElementById('btn-ring').click();
    this.classList.add('active');
    document.getElementById('mobile-btn-jam').classList.remove('active');
  });
  
  document.getElementById('mobile-btn-jam').addEventListener('click', function() {
    document.getElementById('btn-jam').click();
    this.classList.add('active');
    document.getElementById('mobile-btn-ring').classList.remove('active');
  });
  
  // デコレーションツール
  document.getElementById('mobile-btn-spray').addEventListener('click', function() {
    document.getElementById('btn-spray').click();
    setActiveButton('mobile-btn-spray', ['mobile-btn-sprinkles', 'mobile-btn-choco', 'mobile-btn-heart', 'mobile-btn-star']);
    document.getElementById('mobile-spray-settings').style.display = 'block';
    document.getElementById('mobile-topping-settings').style.display = 'none';
  });
  
  document.getElementById('mobile-btn-sprinkles').addEventListener('click', function() {
    document.getElementById('btn-sprinkles').click();
    setActiveButton('mobile-btn-sprinkles', ['mobile-btn-spray', 'mobile-btn-choco', 'mobile-btn-heart', 'mobile-btn-star']);
    document.getElementById('mobile-spray-settings').style.display = 'none';
    document.getElementById('mobile-topping-settings').style.display = 'block';
  });
  
  document.getElementById('mobile-btn-choco').addEventListener('click', function() {
    document.getElementById('btn-choco').click();
    setActiveButton('mobile-btn-choco', ['mobile-btn-spray', 'mobile-btn-sprinkles', 'mobile-btn-heart', 'mobile-btn-star']);
    document.getElementById('mobile-spray-settings').style.display = 'none';
    document.getElementById('mobile-topping-settings').style.display = 'block';
  });
  
  document.getElementById('mobile-btn-heart').addEventListener('click', function() {
    document.getElementById('btn-heart').click();
    setActiveButton('mobile-btn-heart', ['mobile-btn-spray', 'mobile-btn-sprinkles', 'mobile-btn-choco', 'mobile-btn-star']);
    document.getElementById('mobile-spray-settings').style.display = 'none';
    document.getElementById('mobile-topping-settings').style.display = 'block';
  });
  
  document.getElementById('mobile-btn-star').addEventListener('click', function() {
    document.getElementById('btn-star').click();
    setActiveButton('mobile-btn-star', ['mobile-btn-spray', 'mobile-btn-sprinkles', 'mobile-btn-choco', 'mobile-btn-heart']);
    document.getElementById('mobile-spray-settings').style.display = 'none';
    document.getElementById('mobile-topping-settings').style.display = 'block';
  });
  
  // サイズスライダーの同期
  document.getElementById('mobile-tool-size').addEventListener('input', function() {
    document.getElementById('tool-size').value = this.value;
    document.getElementById('tool-size-value').textContent = this.value;
    document.getElementById('mobile-tool-size-value').textContent = this.value;
    toolSize = parseInt(this.value);
  });
  
  document.getElementById('mobile-topping-size').addEventListener('input', function() {
    document.getElementById('topping-size').value = this.value;
    document.getElementById('topping-size-value').textContent = this.value;
    document.getElementById('mobile-topping-size-value').textContent = this.value;
    toppingSize = parseInt(this.value);
  });
  
  // ランダム配置チェックボックスの同期
  document.getElementById('mobile-random-placement').addEventListener('change', function() {
    document.getElementById('random-placement').checked = this.checked;
    randomPlacement = this.checked;
  });
  
  // アクションボタン
  document.getElementById('mobile-btn-undo').addEventListener('click', function() {
    document.getElementById('btn-undo').click();
  });
  
  document.getElementById('mobile-btn-random').addEventListener('click', function() {
    document.getElementById('btn-random').click();
  });
  
  document.getElementById('mobile-btn-reset').addEventListener('click', function() {
    document.getElementById('btn-reset').click();
  });
  
  document.getElementById('mobile-btn-save').addEventListener('click', function() {
    document.getElementById('btn-save').click();
  });
}

// UI要素を設定
function setupUI() {
  // モバイルナビゲーションの設定
  setupMobileNav();
  
  // ドーナツ形状ボタン
  document.getElementById('btn-ring').addEventListener('click', () => {
    donutShape = 'ring';
    setActiveButton('btn-ring', ['btn-jam']);
    clearPaintLayer(); // ペイントレイヤーをクリア
    drawDonut();
    saveToHistory();
  });
  
  document.getElementById('btn-jam').addEventListener('click', () => {
    donutShape = 'jam';
    setActiveButton('btn-jam', ['btn-ring']);
    clearPaintLayer(); // ペイントレイヤーをクリア
    drawDonut();
    saveToHistory();
  });
  
  // デコレーションツールボタン
  document.getElementById('btn-spray').addEventListener('click', () => {
    activeTool = 'spray';
    setActiveButton('btn-spray', ['btn-sprinkles', 'btn-choco', 'btn-heart', 'btn-star']);
    
    // ツール設定パネルの表示・非表示を切り替え
    document.getElementById('spray-settings').style.display = 'block';
    document.getElementById('topping-settings').style.display = 'none';
  });
  
  document.getElementById('btn-sprinkles').addEventListener('click', () => {
    activeTool = 'sprinkles';
    setActiveButton('btn-sprinkles', ['btn-spray', 'btn-choco', 'btn-heart', 'btn-star']);
    
    // ツール設定パネルの表示・非表示を切り替え
    document.getElementById('spray-settings').style.display = 'none';
    document.getElementById('topping-settings').style.display = 'block';
    
    if (randomPlacement) {
      addRandomToppings('sprinkles');
      drawDonut();
      saveToHistory();
    }
  });
  
  document.getElementById('btn-choco').addEventListener('click', () => {
    activeTool = 'choco';
    setActiveButton('btn-choco', ['btn-spray', 'btn-sprinkles', 'btn-heart', 'btn-star']);
    
    // ツール設定パネルの表示・非表示を切り替え
    document.getElementById('spray-settings').style.display = 'none';
    document.getElementById('topping-settings').style.display = 'block';
    
    if (randomPlacement) {
      addRandomToppings('choco', 15);
      drawDonut();
      saveToHistory();
    }
  });
  
  document.getElementById('btn-heart').addEventListener('click', () => {
    activeTool = 'heart';
    setActiveButton('btn-heart', ['btn-spray', 'btn-sprinkles', 'btn-choco', 'btn-star']);
    
    // ツール設定パネルの表示・非表示を切り替え
    document.getElementById('spray-settings').style.display = 'none';
    document.getElementById('topping-settings').style.display = 'block';
    
    if (randomPlacement) {
      addRandomToppings('heart', 10);
      drawDonut();
      saveToHistory();
    }
  });
  
  document.getElementById('btn-star').addEventListener('click', () => {
    activeTool = 'star';
    setActiveButton('btn-star', ['btn-spray', 'btn-sprinkles', 'btn-choco', 'btn-heart']);
    
    // ツール設定パネルの表示・非表示を切り替え
    document.getElementById('spray-settings').style.display = 'none';
    document.getElementById('topping-settings').style.display = 'block';
    
    if (randomPlacement) {
      addRandomToppings('star', 10);
      drawDonut();
      saveToHistory();
    }
  });
  
  // スプレーサイズのスライダー設定
  const toolSizeSlider = document.getElementById('tool-size');
  const toolSizeValue = document.getElementById('tool-size-value');
  
  toolSizeSlider.addEventListener('input', (e) => {
    toolSize = parseInt(e.target.value);
    toolSizeValue.textContent = toolSize;
  });
  
  // トッピングサイズのスライダー設定
  const toppingSizeSlider = document.getElementById('topping-size');
  const toppingSizeValue = document.getElementById('topping-size-value');
  
  toppingSizeSlider.addEventListener('input', (e) => {
    toppingSize = parseInt(e.target.value);
    toppingSizeValue.textContent = toppingSize;
  });
  
  // ランダム配置設定
  document.getElementById('random-placement').addEventListener('change', (e) => {
    randomPlacement = e.target.checked;
  });
  
  // 色パレットを作成
  createColorPalette('base-colors', baseColors, (color) => {
    baseColor = color;
    drawDonut();
    saveToHistory();
  });
  
  createColorPalette('icing-colors', icingColors, (color) => {
    icingColor = color;
    drawDonut();
    saveToHistory();
  });
  
  createColorPalette('spray-colors', sprayColors, (color) => {
    sprayColor = color;
  });
  
  // モバイル用の色パレットも作成
  createColorPalette('mobile-base-colors', baseColors, (color) => {
    baseColor = color;
    drawDonut();
    saveToHistory();
  });
  
  createColorPalette('mobile-icing-colors', icingColors, (color) => {
    icingColor = color;
    drawDonut();
    saveToHistory();
  });
  
  createColorPalette('mobile-spray-colors', sprayColors, (color) => {
    sprayColor = color;
  });
  
  // アクションボタン
  document.getElementById('btn-undo').addEventListener('click', () => {
    if (currentHistoryIndex > 0) {
      restoreFromHistory(currentHistoryIndex - 1);
    }
  });
  
  document.getElementById('btn-random').addEventListener('click', () => {
    createRandomDonut();
    saveToHistory();
  });
  
  document.getElementById('btn-reset').addEventListener('click', () => {
    resetDonut();
    saveToHistory();
  });
  
  document.getElementById('btn-save').addEventListener('click', () => {
    saveDonut();
  });
}

// 色パレットを作成する関数
function createColorPalette(containerId, colors, callback) {
  const container = document.getElementById(containerId);
  const isMobile = containerId.startsWith('mobile-');
  
  colors.forEach(color => {
    const element = document.createElement('div');
    element.className = 'color-option';
    
    if (color.value === 'rainbow') {
      // レインボーカラーの場合、グラデーションを設定
      element.style.background = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
      
      // レインボーの場合はデフォルトで選択状態に（sprayColorsの場合のみ）
      if (containerId === 'spray-colors' || containerId === 'mobile-spray-colors') {
        element.classList.add('selected');
      }
    } else {
      element.style.backgroundColor = color.value;
    }
    
    element.title = color.name;
    
    element.addEventListener('click', () => {
      // 選択状態をリセット
      container.querySelectorAll('.color-option').forEach(el => {
        el.classList.remove('selected');
      });
      
      // 選択した色をハイライト
      element.classList.add('selected');
      
      // モバイルとデスクトップの同期
      if (isMobile) {
        // モバイルで選択された場合、デスクトップのパレットも更新
        const desktopId = containerId.replace('mobile-', '');
        const desktopPalette = document.getElementById(desktopId);
        
        if (desktopPalette) {
          const desktopElements = desktopPalette.querySelectorAll('.color-option');
          // 対応する色を選択状態に
          desktopElements.forEach((el, index) => {
            if (index === Array.from(container.querySelectorAll('.color-option')).indexOf(element)) {
              el.classList.add('selected');
            } else {
              el.classList.remove('selected');
            }
          });
        }
      } else {
        // デスクトップで選択された場合、モバイルのパレットも更新
        const mobileId = 'mobile-' + containerId;
        const mobilePalette = document.getElementById(mobileId);
        
        if (mobilePalette) {
          const mobileElements = mobilePalette.querySelectorAll('.color-option');
          // 対応する色を選択状態に
          mobileElements.forEach((el, index) => {
            if (index === Array.from(container.querySelectorAll('.color-option')).indexOf(element)) {
              el.classList.add('selected');
            } else {
              el.classList.remove('selected');
            }
          });
        }
      }
      
      // コールバックを実行
      callback(color.value);
    });
    
    container.appendChild(element);
  });
  
  // デフォルトの色が明示的に選択されていない場合、最初の色を選択状態に
  if (container.querySelector('.selected') === null) {
    container.querySelector('.color-option').classList.add('selected');
  }
}

// アクティブボタンを設定する関数
function setActiveButton(activeId, inactiveIds) {
  document.getElementById(activeId).classList.add('active');
  inactiveIds.forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
}

// 色選択の状態を更新
function updateColorSelection(containerId, color) {
  const container = document.getElementById(containerId);
  const elements = container.querySelectorAll('.color-option');
  
  elements.forEach(el => {
    el.classList.remove('selected');
    if (el.style.backgroundColor === color) {
      el.classList.add('selected');
    }
  });
}