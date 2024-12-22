// 一秒时间测试游戏
(function() {
    // 只在一秒时间测试页面执行
    if (!document.getElementById('timeButton')) return;

    let startTime = 0;
    let isPressed = false;
    let bestTime = localStorage.getItem('oneSecondBestTime') ? parseFloat(localStorage.getItem('oneSecondBestTime')) : Infinity;
    let lastTime = localStorage.getItem('oneSecondLastTime') ? parseFloat(localStorage.getItem('oneSecondLastTime')) : 0;

    const timeButton = document.getElementById('timeButton');
    const resultDiv = document.getElementById('result');
    const feedbackDiv = document.getElementById('feedback');
    const bestTimeDiv = document.getElementById('bestTime');
    const lastTimeDiv = document.getElementById('lastTime');

    // 初始化显示
    if (bestTime !== Infinity) {
        bestTimeDiv.textContent = `${bestTime.toFixed(3)}秒`;
    }
    if (lastTime !== 0) {
        lastTimeDiv.textContent = `${lastTime.toFixed(3)}秒`;
    }

    function updateResult(timeDiff) {
        resultDiv.textContent = `${timeDiff.toFixed(3)}秒`;
        const difference = Math.abs(timeDiff - 1);
        
        if (difference < 0.1) {
            feedbackDiv.textContent = '太厉害了！你的时间感知非常精准！🎯';
        } else if (difference < 0.2) {
            feedbackDiv.textContent = '很棒！差一点点就完美了！👏';
        } else if (difference < 0.3) {
            feedbackDiv.textContent = '不错，继续练习吧！💪';
        } else {
            feedbackDiv.textContent = '慢慢来，稳定节奏很重要！🎮';
        }
        
        updateStats(timeDiff);
    }
    
    function updateStats(time) {
        lastTime = time;
        localStorage.setItem('oneSecondLastTime', lastTime);
        const difference = Math.abs(time - 1);
        if (difference < Math.abs(bestTime - 1)) {
            bestTime = time;
            bestTimeDiv.textContent = `${bestTime.toFixed(3)}秒`;
            localStorage.setItem('oneSecondBestTime', bestTime);
        }
        lastTimeDiv.textContent = `${lastTime.toFixed(3)}秒`;
    }

    // 检测是否是移动设备
    const isMobile = 'ontouchstart' in window;

    if (isMobile) {
        // 移动端触摸事件
        timeButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!isPressed) {
                isPressed = true;
                startTime = new Date().getTime();
                resultDiv.textContent = '';
                feedbackDiv.textContent = '正在计时...';
                timeButton.style.transform = 'scale(0.95)';
            }
        });

        timeButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (isPressed) {
                const endTime = new Date().getTime();
                const timeDiff = (endTime - startTime) / 1000;
                isPressed = false;
                timeButton.style.transform = '';
                updateResult(timeDiff);
            }
        });
    } else {
        // PC端鼠标事件
        timeButton.addEventListener('mousedown', function() {
            if (!isPressed) {
                isPressed = true;
                startTime = new Date().getTime();
                resultDiv.textContent = '';
                feedbackDiv.textContent = '正在计时...';
                timeButton.style.transform = 'scale(0.95)';
            }
        });

        timeButton.addEventListener('mouseup', function() {
            if (isPressed) {
                const endTime = new Date().getTime();
                const timeDiff = (endTime - startTime) / 1000;
                isPressed = false;
                timeButton.style.transform = '';
                updateResult(timeDiff);
            }
        });

        timeButton.addEventListener('mouseleave', function() {
            if (isPressed) {
                isPressed = false;
                timeButton.style.transform = '';
                feedbackDiv.textContent = '请保持按住按钮直到你认为一秒钟到了';
            }
        });
    }
})();

// 双击速度测试游戏
(function() {
    // 只在双击速度测试页面执行
    if (!document.getElementById('clickButton')) return;

    let firstClickTime = 0;
    let bestTime = localStorage.getItem('doubleClickBestTime') ? parseFloat(localStorage.getItem('doubleClickBestTime')) : Infinity;
    let lastTime = localStorage.getItem('doubleClickLastTime') ? parseFloat(localStorage.getItem('doubleClickLastTime')) : 0;
    let isReady = true;

    const clickButton = document.getElementById('clickButton');
    const resultDiv = document.getElementById('result');
    const feedbackDiv = document.getElementById('feedback');
    const bestTimeDiv = document.getElementById('bestTime');
    const lastTimeDiv = document.getElementById('lastTime');

    // 初始化显示
    if (bestTime !== Infinity) {
        bestTimeDiv.textContent = `${bestTime.toFixed(3)}秒`;
    }
    if (lastTime !== 0) {
        lastTimeDiv.textContent = `${lastTime.toFixed(3)}秒`;
    }

    function resetButton() {
        setTimeout(() => {
            isReady = true;
            clickButton.classList.add('ready');
            feedbackDiv.textContent = '准备就绪，开始测试！';
        }, 1000);
    }

    function updateStats(time) {
        lastTime = time;
        localStorage.setItem('doubleClickLastTime', lastTime);
        if (time < bestTime) {
            bestTime = time;
            bestTimeDiv.textContent = `${bestTime.toFixed(3)}秒`;
            localStorage.setItem('doubleClickBestTime', bestTime);
        }
        lastTimeDiv.textContent = `${lastTime.toFixed(3)}秒`;
    }

    function getFeedback(time) {
        if (time < 0.15) {
            return '神级反应速度！你是电光火石吗？⚡️';
        } else if (time < 0.2) {
            return '太厉害了！这速度堪比职业选手！🏆';
        } else if (time < 0.25) {
            return '很棒！你的的反应速度相当快！👏';
        } else if (time < 0.3) {
            return '不错的成绩，继续加油！💪';
        } else if (time < 0.4) {
            return '还可以，多加练习就能提升！🎯';
        } else {
            return '慢慢来，稳定节奏很重要！🎮';
        }
    }

    clickButton.addEventListener('click', function() {
        if (!isReady) return;

        const currentTime = new Date().getTime();
        clickButton.classList.remove('ready');

        if (firstClickTime === 0) {
            firstClickTime = currentTime;
            feedbackDiv.textContent = '很好！现在快速点击第二下！';
            resultDiv.textContent = '';
        } else {
            const timeDiff = (currentTime - firstClickTime) / 1000;
            
            firstClickTime = 0;
            isReady = false;

            resultDiv.textContent = `${timeDiff.toFixed(3)}秒`;
            feedbackDiv.textContent = getFeedback(timeDiff);
            
            updateStats(timeDiff);
            
            resetButton();
        }
    });
})();

// 反应速度测试游戏
(function() {
    // 只在反应速度测试页面执行
    if (!document.getElementById('reactionButton')) return;

    let startTime;
    let timeoutId;
    let bestTime = localStorage.getItem('reactionBestTime') ? parseFloat(localStorage.getItem('reactionBestTime')) : Infinity;
    let lastTime = localStorage.getItem('reactionLastTime') ? parseFloat(localStorage.getItem('reactionLastTime')) : 0;
    let gameState = 'initial'; // initial, waiting, ready, cheating

    const startButton = document.getElementById('startButton');
    const reactionButton = document.getElementById('reactionButton');
    const resultDiv = document.getElementById('result');
    const feedbackDiv = document.getElementById('feedback');
    const bestTimeDiv = document.getElementById('bestTime');
    const lastTimeDiv = document.getElementById('lastTime');
    const colorIndicator = document.getElementById('colorIndicator');

    // 初始化显示
    if (bestTime !== Infinity) {
        bestTimeDiv.textContent = `${bestTime.toFixed(0)}ms`;
    }
    if (lastTime !== 0) {
        lastTimeDiv.textContent = `${lastTime.toFixed(0)}ms`;
    }

    function updateStats(time) {
        lastTime = time;
        localStorage.setItem('reactionLastTime', lastTime);
        if (time < bestTime) {
            bestTime = time;
            bestTimeDiv.textContent = `${bestTime.toFixed(0)}ms`;
            localStorage.setItem('reactionBestTime', bestTime);
        }
        lastTimeDiv.textContent = `${lastTime.toFixed(0)}ms`;
    }

    function getFeedback(time) {
        if (time < 180) {
            return '神级反应速度！你是闪电侠吗？⚡️';
        } else if (time < 200) {
            return '太厉害了！这速度堪比职业选手！🏆';
        } else if (time < 250) {
            return '很棒！你的反应速度相当快！👏';
        } else if (time < 300) {
            return '不错的成绩，继续加油！💪';
        } else if (time < 350) {
            return '还可以，多加练习就能提升！🎯';
        } else {
            return '慢慢来，保持专注很重要！🎮';
        }
    }

    function startGame() {
        gameState = 'waiting';
        startButton.style.display = 'none';
        reactionButton.style.display = 'inline-flex';
        colorIndicator.className = 'color-indicator waiting';
        reactionButton.innerHTML = '<span class="button-text">准备点击</span><span class="button-icon">⚡️</span>';
        feedbackDiv.textContent = '准备...';
        resultDiv.textContent = '';

        const randomDelay = Math.floor(Math.random() * 4000) + 2000;
        timeoutId = setTimeout(() => {
            if (gameState === 'waiting') {
                gameState = 'ready';
                startTime = new Date().getTime();
                colorIndicator.className = 'color-indicator ready';
                reactionButton.innerHTML = '<span class="button-text">立即点击！</span><span class="button-icon">⚡️</span>';
            }
        }, randomDelay);
    }

    function resetGame() {
        gameState = 'initial';
        startButton.style.display = 'inline-flex';
        reactionButton.style.display = 'none';
        colorIndicator.className = 'color-indicator waiting';
        feedbackDiv.textContent = '点击开始按钮开始测试';
    }

    startButton.addEventListener('click', function() {
        startGame();
    });

    reactionButton.addEventListener('click', function() {
        switch (gameState) {
            case 'waiting':
                clearTimeout(timeoutId);
                gameState = 'cheating';
                colorIndicator.className = 'color-indicator cheating';
                reactionButton.innerHTML = '<span class="button-text">太着急了！</span><span class="button-icon">😅</span>';
                feedbackDiv.textContent = '请等待指示器变红后再点击';
                setTimeout(resetGame, 1500);
                break;

            case 'ready':
                const endTime = new Date().getTime();
                const reactionTime = endTime - startTime;
                
                resultDiv.textContent = `${reactionTime}ms`;
                feedbackDiv.textContent = getFeedback(reactionTime);
                
                updateStats(reactionTime);
                
                setTimeout(resetGame, 1500);
                break;

            case 'cheating':
                break;
        }
    });

    // 初始状态
    resetGame();
})();

// 点击速度测试游戏
(function() {
    // 只在点击速度测试页面执行
    if (!document.getElementById('speedClickButton')) return;

    let clickCount = 0;
    let timeLeft = 10;
    let timerId = null;
    let isGameRunning = false;
    let bestScore = localStorage.getItem('clickSpeedBestScore') ? parseInt(localStorage.getItem('clickSpeedBestScore')) : 0;
    let lastScore = localStorage.getItem('clickSpeedLastScore') ? parseInt(localStorage.getItem('clickSpeedLastScore')) : 0;

    const startButton = document.getElementById('startButton');
    const clickButton = document.getElementById('speedClickButton');
    const resultDiv = document.getElementById('result');
    const feedbackDiv = document.getElementById('feedback');
    const bestTimeDiv = document.getElementById('bestTime');
    const lastTimeDiv = document.getElementById('lastTime');
    const timeIndicator = document.getElementById('timeIndicator');

    // 初始化显示
    if (bestScore > 0) {
        bestTimeDiv.textContent = `${bestScore}次`;
    }
    if (lastScore > 0) {
        lastTimeDiv.textContent = `${lastScore}次`;
    }

    function updateStats(score) {
        lastScore = score;
        localStorage.setItem('clickSpeedLastScore', lastScore);
        if (score > bestScore) {
            bestScore = score;
            bestTimeDiv.textContent = `${bestScore}次`;
            localStorage.setItem('clickSpeedBestScore', bestScore);
        }
        lastTimeDiv.textContent = `${lastScore}次`;
    }

    function getFeedback(score) {
        if (score >= 80) {
            return '神级点���速度！你是连珠炮吗？⚡️';
        } else if (score >= 70) {
            return '太厉害了！这速度堪比职业选手！🏆';
        } else if (score >= 60) {
            return '很棒！你的点击速度相当快！👏';
        } else if (score >= 50) {
            return '不错的成绩，继续加油！💪';
        } else if (score >= 40) {
            return '还可以，多加练习就能提升！🎯';
        } else {
            return '慢慢来，稳定节奏很重要！🎮';
        }
    }

    function updateTimer() {
        timeLeft = Math.max(0, timeLeft - 0.1);
        timeIndicator.textContent = timeLeft.toFixed(2);

        if (timeLeft <= 0) {
            endGame();
        }
    }

    function startGame() {
        isGameRunning = true;
        clickCount = 0;
        timeLeft = 10;
        startButton.style.display = 'none';
        clickButton.style.display = 'inline-flex';
        resultDiv.textContent = '';
        feedbackDiv.textContent = '开始点击！';
        timeIndicator.textContent = '10.00';
        timeIndicator.classList.add('running');
        timerId = setInterval(updateTimer, 100);
    }

    function endGame() {
        isGameRunning = false;
        clearInterval(timerId);
        startButton.style.display = 'inline-flex';
        clickButton.style.display = 'none';
        resultDiv.textContent = `${clickCount}次`;
        feedbackDiv.textContent = getFeedback(clickCount);
        timeIndicator.classList.remove('running');
        updateStats(clickCount);
    }

    startButton.addEventListener('click', function() {
        startGame();
    });

    clickButton.addEventListener('click', function() {
        if (!isGameRunning) return;
        clickCount++;
        resultDiv.textContent = `${clickCount}次`;
    });

    // 初始状态
    feedbackDiv.textContent = '点击开始按钮开始测试';
})();

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navContent.classList.toggle('active');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!navContent.contains(e.target) && !menuToggle.contains(e.target)) {
            navContent.classList.remove('active');
        }
    });
});