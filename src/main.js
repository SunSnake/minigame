/**
 * 游戏主函数
 */
import JSNES from "./nes";
import JSNESUI from "./ui";

const windowWidth = wx.getSystemInfoSync().windowWidth;
const windowHeight = wx.getSystemInfoSync().windowHeight;

const padding = parseInt(windowWidth*15/896);
const fontSize = parseInt(windowWidth*24/896);
const cellWidth = parseInt(windowHeight*256/240);
const screenDistanceX = parseInt((windowWidth - cellWidth)/2);

const ctx = canvas.getContext('2d');
const DIRECTION_BTN_SIZE = parseInt(windowWidth*50/896);
const FUNCTION_BTN_SIZE = DIRECTION_BTN_SIZE;
const AB_BTN_SIZE = DIRECTION_BTN_SIZE;

export default class Main {

    constructor() {
        this.dirCodes = [];
        this.funCodes = [];

        //初始化中间屏幕
        this.ui = new JSNESUI(padding)
        this.nes = new JSNES(this.ui);
        this.ui.setNES(this.nes);

        // 初始化事件监听
        this.initEvent();
        //填充背景色
        ctx.fillStyle = "#70f3ff";
        ctx.fillRect(0,0, windowWidth, windowHeight);

        this.drawDirectionButtons();
        this.drawFuncButtons();
        this.drawABButtons();
        this.drawChooseButton();
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

                //左半侧只有方向键
                if (x < windowWidth/2) {
                    if (_this.chooseGame(x, y)) {
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
            })
        });

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
            && x <= this.abX + AB_BTN_SIZE
            && y <= this.abY + AB_BTN_SIZE);
    }
}

let data = {
    "经典": [
        ['纽约大拳猫', 'roms/rom2/RockinCats.nes'],
        ['赤影战士 Kage', 'roms/other/Kage.nes'],
        ['中国象棋', 'roms/other/Zhong Guo Xiang Qi.nes'],
        ['吃豆精灵 (J) (V1.1) Pac-Man [!]', 'roms/other/Pac-Man.nes'],
        ['沙罗曼蛇 (U) Life Force', 'roms/rom2/Life Force [!].nes'],
        ['1943 (U) 1943 - The Battle of Midway', 'roms/rom2/1943.nes'],
        ['脱狱 Cross Fire (J)', 'roms/rom2/Cross Fire (J).nes'],
        ['撞球咖啡馆 Shufflepuck Cafe', 'roms/rom2/Shufflepuck Cafe.nes'],
        ['功夫 (J) (V1.2) Yie Ar Kung-Fu [!]', 'roms/rom1/(J) (V1.2) Yie Ar Kung-Fu [!].nes'],
    ],
    "魂斗罗": [
        ['魂斗罗1(U)30', 'roms/Contra/Contra1(U)30.nes'],
        ['魂斗罗1(U)30F', 'roms/Contra/Contra1(U)30F.nes'],
        ['魂斗罗1(U)30L', 'roms/Contra/Contra1(U)30L.nes'],
        ['魂斗罗1(U)30M', 'roms/Contra/Contra1(U)30M.nes'],
        ['魂斗罗1(U)30S', 'roms/Contra/Contra1(U)30S.nes'],
        ['魂斗罗1(U)F', 'roms/Contra/Contra1(U)F.nes'],
        ['魂斗罗1(U)L', 'roms/Contra/Contra1(U)L.nes'],
        ['魂斗罗1(U)M', 'roms/Contra/Contra1(U)M.nes'],
        ['魂斗罗1(U)S', 'roms/Contra/Contra1(U)S.nes'],
    ],
    "坦克": [
        ['坦克 (Ch) Missile Tank', 'roms/rom1/(Ch) Missile Tank.nes'],
        ['坦克 (Ch) Tank 1990', 'roms/rom1/(Ch) Tank 1990.nes'],
        ['坦克 (J) Battle City', 'roms/rom1/(J) Battle City.nes'],
    ],
    "超级玛丽": [
        ['超级马里奥1 (W) Super Mario Bros. [!]', 'roms/rom1/(W) Super Mario Bros. [!].nes'],
        ['超级马里奥2 (W) Super Mario Bros. 3 (U)', 'roms/bfirsh/Super Mario Bros. 3 (U) (PRG1) [!].nes'],
        ['马里奥拆屋工 (W) Wrecking Crew [!]', 'roms/rom1/(W) Wrecking Crew [!].nes'],
        ['马里奥医生 Dr. Mario (JU)', 'roms/bfirsh/Dr. Mario (JU).nes'],
    ],
    "双截龙": [
        ['双截龙1 Double Dragon1', 'roms/Double Dragon/Double Dragon1.nes'],
        ['双截龙2 Double Dragon2', 'roms/Double Dragon/Double Dragon2.nes'],
        ['双截龙3 Double Dragon3', 'roms/Double Dragon/Double Dragon3.nes'],
        ['双截龙4 Double Dragon4', 'roms/Double Dragon/Double Dragon4.nes'],
    ],
    "淘金者": [
        ['淘金者(汉化)', 'roms/rom1/TaoJinZhe.nes'],
        ['淘金者(J)', 'roms/rom1/Championship Lode Runner (J).nes'],
    ],
    "俄罗斯方块": [
        ['俄罗斯方块LJ65', 'roms/lj65/lj65.nes'],
        ['俄罗斯方块Tetris(U)', 'roms/other/Tetris (U) [!].nes'],
        ['俄罗斯方块Tetris 2(U)', 'roms/other/Tetris 2 (U) [!].nes'],
    ],
    "赛车": [
        ['F1赛车 (J) F-1 Race [!]', 'roms/rom1/(J) F-1 Race [!].nes'],
        ['摩托车大赛 (JU) (PRG0) Mach Rider [!]', 'roms/rom1/(JU) (PRG0) Mach Rider [!].nes'],
        ['越野机车 (JU) Excitebike [!]', 'roms/rom1/(JU) Excitebike [!].nes'],
        ['火箭车 (J) Road Fighter [!]', 'roms/rom1/(J) Road Fighter [!].nes'],
    ],
    "1981": [
        ['五子棋 (5) 日版', 'roms/1981/5.nes'],
    ],
    // "不可用": [
    //     ['Concentration Room', 'roms/croom/croom.nes'],
    //     ['LJ65', 'roms/lj65/lj65.nes'],
    //     ['赤色要塞 (KC) Jackal', 'roms/other/Jackal.nes'],
    //     ['花式撞球 (U) Side Pocket', 'roms/rom2/Side Pocket.nes'],
    //     ['彩虹岛 (U) Rainbow Islands', 'roms/rom2/Rainbow Islands.nes'],
    //     ['快打旋风 (U) Mighty Final Fight', 'roms/rom2/Mighty Final Fight.nes'],
    //     ['七宝奇谋1 (J) Goonies, The [!]', 'roms/rom1/(J) Goonies, The [!].nes'],
    //     ['俄罗斯方块 (Tengen) Tetris [!]', 'roms/rom1/(Tengen) Tetris [!].nes'],
    //     ['兵蜂1 (J) TwinBee [!]', 'roms/rom1/(J) TwinBee [!].nes'],
    //     ['冒险岛1 (J) Takahashi Meijin no Bouken Shima [!]', 'roms/rom1/(J) Takahashi Meijin no Bouken Shima [!].nes'],
    //     ['南极大冒险 (J) Antarctic Adventure [!]', 'roms/rom1/(J) Antarctic Adventure [!].nes'],
    //     ['叮当1 (J) Dig Dug [!]', 'roms/rom1/(J) Dig Dug [!].nes'],
    //     ['影之传说 (J) Kage no Densetsu [!]', 'roms/rom1/(J) Kage no Densetsu [!].nes'],
    //     ['打砖块1 (J) Arkanoid [!]', 'roms/rom1/(J) Arkanoid [!].nes'],
    //     ],
    "忍者龙剑传": [
        ['忍者龙剑传1 (PC10) Ninja Gaiden', 'roms/Ninja_Gaiden/Ninja_Gaiden1.nes'],
        ['忍者龙剑传2 (PC10) Ninja Gaiden II - The Dark Sword of Chaos', 'roms/Ninja_Gaiden/Ninja_Gaiden2.nes'],
        ['忍者龙剑传3 (PC10) Ninja Gaiden III - The Ancient Ship of Doom', 'roms/Ninja_Gaiden/Ninja_Gaiden3.nes'],
        ['小蜜蜂 (J) Galaxian [!]', 'roms/rom1/(J) Galaxian [!].nes'],
        ['AV麻雀俱乐部 (Hacker) AV Mahjongg', 'roms/rom1/(Hacker) AV Mahjongg.nes'],
    ],
};