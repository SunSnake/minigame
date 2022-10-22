/**
 * 游戏主函数
 */
import JSNES from "./nes";
import JSNESUI from "./ui";

const windowWidth = wx.getSystemInfoSync().windowWidth;
const windowHeight = wx.getSystemInfoSync().windowHeight;

const padding = parseInt(windowWidth*15/896);
const fontSize = parseInt(windowWidth*20/896);
const cellWidth = parseInt(windowHeight*256/240);
const screenDistanceX = parseInt((windowWidth - cellWidth)/2);

const ctx = canvas.getContext('2d');
const DIRECTION_BTN_SIZE = parseInt(windowWidth*50/896);
const FUNCTION_BTN_SIZE = DIRECTION_BTN_SIZE;
const AB_BTN_SIZE = DIRECTION_BTN_SIZE;

const listDistanceX = 5;
const listDistanceY = 10 + padding;
const lineHeight = 30;

export default class Main {

    constructor() {
        this.isListShowing = false;
        this.dirCodes = [];
        this.funCodes = [];

        //初始化中间屏幕
        this.ui = new JSNESUI(padding)
        this.nes = new JSNES(this.ui);
        this.ui.setNES(this.nes);

        // 初始化事件监听
        this.initEvent();
        this.intiButtons();
    }

    intiButtons() {
        this.drawBGIMG();
        this.drawChooseButton();
        this.drawDirectionButtons();
        this.drawFuncButtons();
        this.drawABButtons();
    }

    drawBGIMG() {
        //填充背景色
        ctx.fillStyle = "#70f3ff";
        ctx.fillRect(0,0, windowWidth, windowHeight);
    }

    //选择游戏按钮
    drawChooseButton() {
        this.cgX = screenDistanceX - padding - DIRECTION_BTN_SIZE*3;
        this.cgWidth = DIRECTION_BTN_SIZE*3;
        this.cgY = windowHeight - padding - DIRECTION_BTN_SIZE*6;
        this.cgHeight = DIRECTION_BTN_SIZE;

        const chooseGameCanvas = wx.createCanvas()
        const context = chooseGameCanvas.getContext('2d')
        chooseGameCanvas.width  = this.cgWidth;
        chooseGameCanvas.height = this.cgHeight;
        context.fillStyle = "#eeeeee";
        context.fillRect(0,0, chooseGameCanvas.width, chooseGameCanvas.height);
        context.font = fontSize + "px Microsoft YaHei"
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillStyle = "#333333";
        context.fillText("选择游戏", chooseGameCanvas.width/2, chooseGameCanvas.height/2);
        ctx.drawImage(chooseGameCanvas, this.cgX, this.cgY);
    }

    //方向按钮组
    drawDirectionButtons() {
        const directionMarginX = screenDistanceX - padding - DIRECTION_BTN_SIZE*3;
        const directionMarginY = windowHeight - padding - DIRECTION_BTN_SIZE*3;

        const DIRECTION_BTN_IMG_SRC = 'images/bullet.png'

        let uL = new Image();
        uL.src = DIRECTION_BTN_IMG_SRC;
        uL.onload = () => {
            this.uLX = directionMarginX;
            this.uLY = directionMarginY;
            ctx.drawImage(uL, this.uLX, this.uLY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let up = new Image();
        up.src = DIRECTION_BTN_IMG_SRC;
        up.onload = () => {
            this.upX = directionMarginX + DIRECTION_BTN_SIZE;
            this.upY = directionMarginY;
            ctx.drawImage(up, this.upX, this.upY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let uR = new Image();
        uR.src = DIRECTION_BTN_IMG_SRC;
        uR.onload = () => {
            this.uRX = directionMarginX + DIRECTION_BTN_SIZE*2;
            this.uRY = directionMarginY;
            ctx.drawImage(uR, this.uRX, this.uRY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let right = new Image();
        right.src = DIRECTION_BTN_IMG_SRC;
        right.onload = () => {
            this.rightX = directionMarginX + DIRECTION_BTN_SIZE*2;
            this.rightY = directionMarginY + DIRECTION_BTN_SIZE;
            ctx.drawImage(right, this.rightX, this.rightY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let dR = new Image();
        dR.src = DIRECTION_BTN_IMG_SRC;
        dR.onload = () => {
            this.dRX = directionMarginX + DIRECTION_BTN_SIZE*2;
            this.dRY = directionMarginY + DIRECTION_BTN_SIZE*2;
            ctx.drawImage(uR, this.dRX, this.dRY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let down = new Image();
        down.src = DIRECTION_BTN_IMG_SRC;
        down.onload = () => {
            this.downX = directionMarginX + DIRECTION_BTN_SIZE;
            this.downY = directionMarginY + DIRECTION_BTN_SIZE*2;
            ctx.drawImage(down, this.downX, this.downY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let dL = new Image();
        dL.src = DIRECTION_BTN_IMG_SRC;
        dL.onload = () => {
            this.dLX = directionMarginX;
            this.dLY = directionMarginY + DIRECTION_BTN_SIZE*2;
            ctx.drawImage(dL, this.dLX, this.dLY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }

        let left = new Image();
        left.src = DIRECTION_BTN_IMG_SRC;
        left.onload = () => {
            this.leftX = directionMarginX;
            this.leftY = directionMarginY + DIRECTION_BTN_SIZE;
            ctx.drawImage(left, this.leftX, this.leftY, DIRECTION_BTN_SIZE, DIRECTION_BTN_SIZE)
        }
    }

    //功能按钮组
    drawFuncButtons() {
        const functionMarginX = screenDistanceX + cellWidth + padding;
        const functionMarginY = windowHeight - padding - DIRECTION_BTN_SIZE*6;

        const SELECT_BTN_IMG_SRC = 'images/explosion8.png';
        let select = new Image();
        select.src = SELECT_BTN_IMG_SRC;
        select.onload = () => {
            this.selectX = functionMarginX;
            this.selectY = functionMarginY;
            ctx.drawImage(select, this.selectX, this.selectY, FUNCTION_BTN_SIZE, FUNCTION_BTN_SIZE)
        }

        const PAUSE_BTN_IMG_SRC = 'images/hero.png';
        let pause = new Image();
        pause.src = PAUSE_BTN_IMG_SRC;
        pause.onload = () => {
            this.pauseX = functionMarginX + FUNCTION_BTN_SIZE + padding*2;
            this.pauseY = functionMarginY;
            ctx.drawImage(pause, this.pauseX, this.pauseY, FUNCTION_BTN_SIZE, FUNCTION_BTN_SIZE)
        }

        const SOUND_BTN_IMG_SRC = 'images/explosion8.png';
        let sound = new Image();
        sound.src = SOUND_BTN_IMG_SRC;
        sound.onload = () => {
            this.soundX = functionMarginX;
            this.soundY = functionMarginY + FUNCTION_BTN_SIZE + padding*2;
            ctx.drawImage(sound, this.soundX, this.soundY, FUNCTION_BTN_SIZE, FUNCTION_BTN_SIZE)
        }

        const RESTART_BTN_IMG_SRC = 'images/enemy.png';
        let restart = new Image();
        restart.src = RESTART_BTN_IMG_SRC;
        restart.onload = () => {
            this.restartX = functionMarginX + FUNCTION_BTN_SIZE + padding*2;
            this.restartY = functionMarginY + FUNCTION_BTN_SIZE + padding*2;
            ctx.drawImage(restart, this.restartX, this.restartY, FUNCTION_BTN_SIZE, FUNCTION_BTN_SIZE)
        }
    }

    //AB按钮组
    drawABButtons() {
        const ABMarginX = screenDistanceX + cellWidth + padding;
        const ABMarginY = windowHeight - padding - AB_BTN_SIZE;

        const A_BTN_IMG_SRC = 'images/explosion8.png';
        let a = new Image();
        a.src = A_BTN_IMG_SRC;
        a.onload = () => {
            this.aX = ABMarginX;
            this.aY = ABMarginY;
            ctx.drawImage(a, this.aX, this.aY, AB_BTN_SIZE, AB_BTN_SIZE)
        }

        const B_BTN_IMG_SRC = 'images/explosion8.png';
        let b = new Image();
        b.src = B_BTN_IMG_SRC;
        b.onload = () => {
            this.bX = ABMarginX + AB_BTN_SIZE + padding*2;
            this.bY = ABMarginY;
            ctx.drawImage(b, this.bX, this.bY, AB_BTN_SIZE, AB_BTN_SIZE)
        }

        const AB_BTN_IMG_SRC = 'images/explosion8.png';
        let ab = new Image();
        ab.src = AB_BTN_IMG_SRC;
        ab.onload = () => {
            this.abX = ABMarginX;
            this.abY = ABMarginY - AB_BTN_SIZE;
            ctx.drawImage(ab, this.abX, this.abY, AB_BTN_SIZE*3, AB_BTN_SIZE)
        }
    }

    // 响应手指的触摸事件
    initEvent() {
        let _this = this;
        wx.onTouchStart(function (e) {
            e.touches.forEach(touch => {
                const x = touch.clientX;
                const y = touch.clientY;

                if (_this.isListShowing && _this.gameList(x, y)) {
                    return;
                }

                //左半侧只有方向键
                if (x < windowWidth/2) {
                    if (_this.chooseGame(x, y)) {
                        _this.showGameList();
                        return;
                    }

                    if (_this.upLeft(x, y)) {
                        _this.dirCodes.push(65, 87);
                    } else if (_this.up(x, y)) {
                        _this.dirCodes.push(87);
                    } else if (_this.upRight(x, y)) {
                        _this.dirCodes.push(87, 68);
                    } else if (_this.right(x, y)) {
                        _this.dirCodes.push(68);
                    } else if (_this.downRight(x, y)) {
                        _this.dirCodes.push(68, 83);
                    } else if (_this.down(x, y)) {
                        _this.dirCodes.push(83);
                    } else if (_this.downLeft(x, y)) {
                        _this.dirCodes.push(83, 65);
                    } else if (_this.left(x, y)) {
                        _this.dirCodes.push(65);
                    }

                    _this.dirCodes.forEach(dirCode => {
                        _this.nes.keyboard.keyDown({
                            keyCode: dirCode
                        });
                    });
                } else {
                    if (_this.sound(x, y)) {
                        _this.nes.opts.emulateSound = !_this.nes.opts.emulateSound;
                        return;
                    }
                    if (_this.pause(x, y)) {
                        if (_this.nes.isRunning) {
                            _this.nes.stop();
                            _this.ui.updateStatus("Paused");
                        } else {
                            _this.nes.start();
                        }
                        return;
                    }
                    if (_this.restart(x, y)) {
                        _this.nes.reloadRom();
                        _this.nes.start();
                        return;
                    }

                    if (_this.select(x, y)) {
                        _this.funCodes.push(13);
                    } else if (_this.A(x, y)) {
                        _this.funCodes.push(74);
                    } else if (_this.B(x, y)) {
                        _this.funCodes.push(75);
                    } else if (_this.AB(x, y)) {
                        _this.funCodes.push(74, 75);
                    }

                    _this.funCodes.forEach(funCode => {
                        _this.nes.keyboard.keyDown({
                            keyCode: funCode
                        });
                    });
                }

                if (_this.isListShowing) {
                    _this.isListShowing = false;
                    ctx.clearRect(_this.listX, _this.listY, _this.listWidth, _this.listHeight);
                    _this.intiButtons();
                }
            })
        });

        canvas.addEventListener('touchmove', ((e) => {
            e.preventDefault()

            const x = e.touches[0].clientX
            const y = e.touches[0].clientY

            if (!(_this.isListShowing && _this.gameList(x, y))) {
                return;
            }

            console.log(x, y)
        }))
        canvas.addEventListener('touchstart', ((e) => {}));
        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault();

            const x = e.changedTouches[0].clientX;

            if (x < windowWidth/2) {
                this.dirCodes.forEach(dirCode => {
                    this.nes.keyboard.keyUp({
                        keyCode: dirCode
                    });
                });
                this.dirCodes = [];
            } else {
                this.funCodes.forEach(funCode => {
                    this.nes.keyboard.keyUp({
                        keyCode: funCode
                    });
                });
                this.funCodes = [];
            }
        }))
    }

    showGameList() {
        this.isListShowing = true;
        this.listX = screenDistanceX - padding - DIRECTION_BTN_SIZE*3;
        this.listWidth = DIRECTION_BTN_SIZE*3;
        this.listY = padding;
        this.listHeight = windowHeight - padding*2;

        let listCanvas = wx.createCanvas()
        let listContext = listCanvas.getContext('2d')
        listCanvas.width  = this.listWidth;
        listCanvas.height = this.listHeight;
        listContext.fillStyle = "#eeeeee";
        listContext.fillRect(0,0, listCanvas.width, listCanvas.height);
        listContext.font = fontSize + "px Microsoft YaHei"
        listContext.fillStyle = "#333333";

        let data = ['纽约大拳猫', 'roms/rom2/RockinCats.nes'];
        for (let i = 0; i < data.length; i++) {
            listContext.fillText(data[i], listDistanceX, listDistanceY + i*lineHeight);
        }

        ctx.drawImage(listCanvas, this.listX, this.listY);
    }

    gameList(x, y) {
        return !!(x >= this.listX
            && y >= this.listY
            && x <= this.listX + this.listWidth
            && y <= this.listY + this.listHeight);
    }

    chooseGame(x, y) {
        return !!(x >= this.cgX
            && y >= this.cgY
            && x <= this.cgX + this.cgWidth
            && y <= this.cgY + this.cgHeight);
    }

    upLeft(x, y) {
        return !!(x >= this.uLX
            && y >= this.uLY
            && x <= this.uLX + DIRECTION_BTN_SIZE
            && y <= this.uLY + DIRECTION_BTN_SIZE);
    }

    up(x, y) {
        return !!(x >= this.upX
            && y >= this.upY
            && x <= this.upX + DIRECTION_BTN_SIZE
            && y <= this.upY + DIRECTION_BTN_SIZE);
    }

    upRight(x, y) {
        return !!(x >= this.uRX
            && y >= this.uRY
            && x <= this.uRX + DIRECTION_BTN_SIZE
            && y <= this.uRY + DIRECTION_BTN_SIZE);
    }

    right(x, y) {
        return !!(x >= this.rightX
            && y >= this.rightY
            && x <= this.rightX + DIRECTION_BTN_SIZE
            && y <= this.rightY + DIRECTION_BTN_SIZE);
    }

    downRight(x, y) {
        return !!(x >= this.dRX
            && y >= this.dRY
            && x <= this.dRX + DIRECTION_BTN_SIZE
            && y <= this.dRY + DIRECTION_BTN_SIZE);
    }

    down(x, y) {
        return !!(x >= this.downX
            && y >= this.downY
            && x <= this.downX + DIRECTION_BTN_SIZE
            && y <= this.downY + DIRECTION_BTN_SIZE);
    }

    downLeft(x, y) {
        return !!(x >= this.dLX
            && y >= this.dLY
            && x <= this.dLX + DIRECTION_BTN_SIZE
            && y <= this.dLY + DIRECTION_BTN_SIZE);
    }

    left(x, y) {
        return !!(x >= this.leftX
            && y >= this.leftY
            && x <= this.leftX + DIRECTION_BTN_SIZE
            && y <= this.leftY + DIRECTION_BTN_SIZE);
    }

    select(x, y) {
        return !!(x >= this.selectX
            && y >= this.selectY
            && x <= this.selectX + FUNCTION_BTN_SIZE
            && y <= this.selectY + FUNCTION_BTN_SIZE);
    }

    sound(x, y) {
        return !!(x >= this.soundX
            && y >= this.soundY
            && x <= this.soundX + FUNCTION_BTN_SIZE
            && y <= this.soundY + FUNCTION_BTN_SIZE);
    }

    pause(x, y) {
        return !!(x >= this.pauseX
            && y >= this.pauseY
            && x <= this.pauseX + FUNCTION_BTN_SIZE
            && y <= this.pauseY + FUNCTION_BTN_SIZE);
    }

    restart(x, y) {
        return !!(x >= this.restartX
            && y >= this.restartY
            && x <= this.restartX + FUNCTION_BTN_SIZE
            && y <= this.restartY + FUNCTION_BTN_SIZE);
    }

    A(x, y) {
        return !!(x >= this.aX
            && y >= this.aY
            && x <= this.aX + AB_BTN_SIZE
            && y <= this.aY + AB_BTN_SIZE);
    }

    B(x, y) {
        return !!(x >= this.bX
            && y >= this.bY
            && x <= this.bX + AB_BTN_SIZE
            && y <= this.bY + AB_BTN_SIZE);
    }

    AB(x, y) {
        return !!(x >= this.abX
            && y >= this.abY
            && x <= this.abX + AB_BTN_SIZE*3
            && y <= this.abY + AB_BTN_SIZE);
    }
}