// UI要素を設定
function setupUI() {
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
    
    colors.forEach(color => {
      const element = document.createElement('div');
      element.className = 'color-option';
      
      if (color.value === 'rainbow') {
        // レインボーカラーの場合、グラデーションを設定
        element.style.background = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
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
        
        // コールバックを実行
        callback(color.value);
      });
      
      container.appendChild(element);
    });
    
    // 最初の色を選択状態に
    container.querySelector('.color-option').classList.add('selected');
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