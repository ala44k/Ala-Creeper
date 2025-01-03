// script.js

const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
let isJumping = false;
let isGameOver = false;

// حركة القفز
function jump() {
    if (isJumping) return;
    isJumping = true;
    let upInterval = setInterval(() => {
        let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
        if (playerBottom >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (playerBottom <= 50) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                playerBottom -= 5;
                player.style.bottom = playerBottom + 'px';
            }, 20);
        }
        playerBottom += 5;
        player.style.bottom = playerBottom + 'px';
    }, 20);
}

// حركة العوائق
function moveObstacle() {
    if (isGameOver) return;
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft < -50) {
        obstacle.style.left = '100%';
    } else {
        obstacle.style.left = obstacleLeft - 10 + 'px';
    }
    setTimeout(moveObstacle, 30);
}

// كشف الاصطدام
function checkCollision() {
    if (isGameOver) return;
    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft > 0 && obstacleLeft < 50 && playerBottom < 50) {
        alert('Game Over!');
        isGameOver = true;
    } else {
        setTimeout(checkCollision, 10);
    }
}

// بدء اللعبة
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

moveObstacle();
checkCollision();
// تغيير مفتاح القفز إلى Ctrl
document.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') { // يدعم كلا المفتاحين Ctrl
        jump();
    }
});
// إضافة مستمع لللمس
document.addEventListener('touchstart', () => {
    jump();
});

// الحفاظ على دعم لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        jump();
    }
});
function restartGame() {
    // إخفاء زر إعادة التشغيل
    document.getElementById('restartButton').style.display = 'none';

    // إعادة تعيين المتغيرات
    isGameOver = false;

    // إعادة موقع اللاعب والعائق
    player.style.bottom = '50px';
    obstacle.style.left = '100%';

    // إعادة تشغيل حركة العائق والنقاط
    moveObstacle();
    checkCollision();
    startScore();
}
function startScore() {
    score = 0;
    document.getElementById('scoreBoard').innerText = `Score: ${score}`;
    scoreInterval = setInterval(() => {
        score++;
        document.getElementById('scoreBoard').innerText = `Score: ${score}`;
    }, 100); // زيادة النقاط كل 100 مللي ثانية
}
let score = 0;
let scoreInterval; // لحفظ interval الخاص بالنقاط

// دالة لبدء عداد النقاط
function startScore() {
    score = 0;
    document.getElementById('scoreBoard').innerText = `Score: ${score}`;
    scoreInterval = setInterval(() => {
        score++;
        document.getElementById('scoreBoard').innerText = `Score: ${score}`;
    }, 100); // زيادة النقاط كل 100 مللي ثانية
}

// دالة لفحص الاصطدام
function checkCollision() {
    if (isGameOver) return;

    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft > 0 && obstacleLeft < 50 && playerBottom < 50) {
        // إيقاف عداد النقاط
        clearInterval(scoreInterval);

        isGameOver = true;

        // إظهار زر إعادة التشغيل
        document.getElementById('restartButton').style.display = 'block';
    } else {
        setTimeout(checkCollision, 10);
    }
}
function restartGame() {
    // إخفاء زر إعادة التشغيل
    document.getElementById('restartButton').style.display = 'none';

    // إعادة تعيين المتغيرات
    isGameOver = false;

    // إعادة موقع اللاعب والعائق
    player.style.bottom = '50px';
    obstacle.style.left = '100%';

    // إعادة تشغيل حركة العائق والنقاط
    moveObstacle();
    checkCollision();
    startScore(); // إعادة تشغيل عداد النقاط
}
// تحديث دالة checkCollision
function checkCollision() {
    if (isGameOver) return;

    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft > 0 && obstacleLeft < 50 && playerBottom < 50) {
        // إيقاف عداد النقاط
        clearInterval(scoreInterval);

        isGameOver = true;

        // إظهار زر إعادة التشغيل
        document.getElementById('restartButton').style.display = 'block';
    } else {
        setTimeout(checkCollision, 10);
    }
}
function startGame() {
    // إخفاء شاشة البدء
    document.getElementById('startScreen').style.display = 'none';
    
    // إظهار اللعبة
    document.getElementById('game').style.display = 'block';
    
    // هنا تبدأ اللعبة، مثل بدء الحركة أو العد التنازلي إذا كنت بحاجة لذلك
    moveObstacle(); // على سبيل المثال، يمكنك إضافة دالة لبدء اللعبة
    checkCollision();
    startScore(); // بدء عداد النقاط
}
