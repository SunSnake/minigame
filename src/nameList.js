
export default class NameList {
    
    constructor() {
        this.names = [
            //0,1,2,3,4
            '纽约大拳猫', '赤影战士', '中国象棋', '吃豆精灵', '沙罗曼蛇',
            //5,6,7,8
            '1943 (U) 1943 - The Battle of Midway', '脱狱', '撞球咖啡馆', '功夫',
            //9,10,11,12,13
            '魂斗罗(U)L', '魂斗罗(U)M', '魂斗罗(U)F', '魂斗罗(U)S', '魂斗罗(U)30',
            //14,15,16,17
            '魂斗罗(U)30L', '魂斗罗(U)30M', '魂斗罗(U)30F', '魂斗罗(U)30S',
            //18,19,20
            '坦克 (Ch) Missile Tank', '坦克 (Ch) Tank 1990', '坦克 (J) Battle City',
            //21,22,23,24
            '超级马里奥1', '超级马里奥2', '马里奥拆屋工', '马里奥医生',
            //25,26,27,28
            '双截龙1', '双截龙2', '双截龙3', '双截龙4',
            //29,30
            '淘金者(汉化)', '淘金者(J)',
            //31,32,33
            '俄罗斯方块LJ65', '俄罗斯方块Tetris(U)', '俄罗斯方块Tetris 2(U)',
            //34,35,36,37
            'F1赛车', '摩托车大赛', '越野机车', '火箭车',
            //38,39,40
            '五子棋', '小蜜蜂', 'AV麻雀俱乐部',
            //41,42,43
            '忍者龙剑传1', '忍者龙剑传2', '忍者龙剑传3',
        ];
        
        /*let data = {
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
                ['魂斗罗(U)30', 'roms/Contra/Contra1(U)30.nes'],
                ['魂斗罗(U)30F', 'roms/Contra/Contra1(U)30F.nes'],
                ['魂斗罗(U)30L', 'roms/Contra/Contra1(U)30L.nes'],
                ['魂斗罗(U)30M', 'roms/Contra/Contra1(U)30M.nes'],
                ['魂斗罗(U)30S', 'roms/Contra/Contra1(U)30S.nes'],
                ['魂斗罗(U)F', 'roms/Contra/Contra1(U)F.nes'],
                ['魂斗罗(U)L', 'roms/Contra/Contra1(U)L.nes'],
                ['魂斗罗(U)M', 'roms/Contra/Contra1(U)M.nes'],
                ['魂斗罗(U)S', 'roms/Contra/Contra1(U)S.nes'],
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
        };*/
    }
    
}