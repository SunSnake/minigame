/*
JSNES, based on Jamie Sanders' vNES
Copyright (C) 2010 Ben Firshman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

export default class JSNESUI {
    constructor() {
        var self = this;

        self.screen = canvas;
        self.loadROM();

        /*console.log(wx.getSystemInfoSync().windowWidth)
        console.log(wx.getSystemInfoSync().windowHeight)*/

        /*if (typeof roms != 'undefined') {
            self.setRoms(roms);
        }*/

        self.canvasContext = canvas.getContext('2d');
        self.canvasImageData = self.canvasContext.getImageData(0, 0, 256, 240);
        //self.canvasImageData = self.canvasContext.getImageData(100, 0, 442, 414);
        self.resetCanvas();


        function handleFire(e, turbo) {
            var parent = $('#controls-fire');
            if (turbo) {
                parent = $('#controls-turbofire');
            }
            var myLocation = e.originalEvent.changedTouches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
            if ($(realTarget).hasClass('a')) {
                $('.a', parent).addClass('active');
                $('.b', parent).removeClass('active');
                clearInterval(self.interval);
                if (turbo) {
                    self.nes.keyboard.keyDown({
                        keyCode: 'AA'
                    });
                    self.nes.keyboard.keyUp({
                        keyCode: 90
                    });
                    self.interval = setInterval(function() {
                        self.nes.keyboard.keyDown({
                            keyCode: 'AA'
                        });
                    }, 50);
                } else {
                    self.nes.keyboard.keyDown({
                        keyCode: 88
                    });
                    self.nes.keyboard.keyUp({
                        keyCode: 90
                    });
                }
            } else if ($(realTarget).hasClass('b')) {
                $('.a', parent).removeClass('active');
                $('.b', parent).addClass('active');
                clearInterval(self.interval);
                if (turbo) {
                    self.nes.keyboard.keyUp({
                        keyCode: 88
                    });
                    self.nes.keyboard.keyDown({
                        keyCode: 'BB'
                    });
                    self.interval = setInterval(function() {
                        self.nes.keyboard.keyDown({
                            keyCode: 'BB'
                        });
                    }, 50);
                } else {
                    self.nes.keyboard.keyUp({
                        keyCode: 88
                    });
                    self.nes.keyboard.keyDown({
                        keyCode: 90
                    });
                }
            } else if ($(realTarget).hasClass('c')) {
                $('.a', parent).addClass('active');
                $('.b', parent).addClass('active');
                clearInterval(self.interval);
                if (turbo) {
                    self.nes.keyboard.keyDown({
                        keyCode: 'AA'
                    });
                    self.nes.keyboard.keyDown({
                        keyCode: 'BB'
                    });
                    self.interval = setInterval(function() {
                        self.nes.keyboard.keyDown({
                            keyCode: 'AA'
                        });
                        self.nes.keyboard.keyDown({
                            keyCode: 'BB'
                        });
                    }, 50);
                } else {
                    self.nes.keyboard.keyDown({
                        keyCode: 88
                    });
                    self.nes.keyboard.keyDown({
                        keyCode: 90
                    });
                }
            } else {
                clearInterval(self.interval);
                $('.a', parent).removeClass('active');
                $('.b', parent).removeClass('active');
                self.nes.keyboard.keyUp({
                    keyCode: 88
                });
                self.nes.keyboard.keyUp({
                    keyCode: 90
                });

            }
        }

        window.AudioContext = window.webkitAudioContext || window.AudioContext;
        try {
            self.audio = new AudioContext();
        } catch (e) {
            // lets fallback to Flash (for Internet Explorer 8-11)
            self.dynamicaudio = new DynamicAudio({
                swf: nes.opts.swfPath + 'dynamicaudio.swf'
            });
        }
    }

    setNES(nes) {
        this.nes = nes;
    };

    loadROM() {
        let self = this;
        wx.request({
            url: 'http://127.0.0.1:8001/1981/5.nes',
            responseType: 'arraybuffer',
            success: function (res) {
                let data = res.data;
                let result = String.fromCharCode.apply(null, new Uint8Array(data));
                self.nes.loadRom(result);
                self.nes.start();
                self.enable();
            },
            fail: err => {
                console.log(err)
            }
        })
    }

    resetCanvas() {
        this.canvasContext.fillStyle = 'black';
        // set alpha to opaque
        this.canvasContext.fillRect(0, 0, 256, 240);
        //this.canvasContext.fillRect(100, 0, 442, 414);

        // Set alpha
        for (var i = 3; i < this.canvasImageData.data.length - 3; i += 4) {
            this.canvasImageData.data[i] = 0xFF;
        }
    }

    /*
     *
     * nes.ui.screenshot() --> return <img> element :)
     */
    screenshot() {
        var data = this.screen[0].toDataURL("image/png"),
            img = new Image();
        img.src = data;
        return img;
    }

    /*
     * Enable and reset UI elements
     */
    enable() {
        /*this.buttons.pause.attr("disabled", null);
        if (this.nes.isRunning) {
            this.buttons.pause.attr("value", "暂停");
        } else {
            this.buttons.pause.attr("value", "继续");
        }
        this.buttons.restart.attr("disabled", null);
        if (this.nes.opts.emulateSound) {
            this.buttons.sound.attr("value", "关闭声音");
        } else {
            this.buttons.sound.attr("value", "打开声音");
        }*/
    }

    updateStatus(s) {
        /*this.status.text(s);*/
    }

    setRoms(roms) {
        this.romSelect.children().remove();
        $("<option>选择游戏...</option>").appendTo(this.romSelect);
        for (var groupName in roms) {
            if (roms.hasOwnProperty(groupName)) {
                var optgroup = $('<optgroup></optgroup>').
                attr("label", groupName);
                for (var i = 0; i < roms[groupName].length; i++) {
                    $('<option>' + roms[groupName][i][0] + '</option>')
                        .attr("value", roms[groupName][i][1])
                        .appendTo(optgroup);
                }
                this.romSelect.append(optgroup);
            }
        }
    }

    writeAudio(samples) {
        //return this.dynamicaudio.writeInt(samples);
        // Use fallback if available and return early
        if (this.dynamicaudio) {
            return this.dynamicaudio.writeInt(samples);
        }
        // Create output buffer (planar buffer format)
        var buffer = this.audio.createBuffer(2, samples.length, this.audio.sampleRate);
        var channelLeft = buffer.getChannelData(0);
        var channelRight = buffer.getChannelData(1);
        // Convert from interleaved buffer format to planar buffer
        // by writing right into appropriate channel buffers
        var j = 0;
        for (var i = 0; i < samples.length; i += 2) {
            channelLeft[j] = this.intToFloatSample(samples[i]);
            channelRight[j] = this.intToFloatSample(samples[i + 1]);
            j++;
        }
        // Create sound source and play it
        var source = this.audio.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audio.destination); // Output to sound
        // card
        source.start();
    }
    // Local helper function to convert Int output to Float
    // TODO: remove intToFloat and revise papu.js -> sample()
    //       to return AudioBuffer/Float32Array output used in HTML5 WebAudio API
    intToFloatSample(value) {
        return value / 32767; // from -32767..32768 to -1..1 range
    }

    writeFrame(buffer, prevBuffer) {
        let imageData = this.canvasImageData.data;

        let array = [];
        let index = 0;
        let length = 512 * 480;
        let loop = 256 * 240;
        let num = length / loop;
        let finalNum = length % loop;

        let pixel, i, j;
        for (i = 0; i <= loop; i++) {
            let count = num;
            if (i === loop) {
                count = finalNum;
            }

            if (i !== loop) {
                pixel = buffer[i];

                if (pixel !== prevBuffer[i]) {
                    j = i * 4;
                    imageData[j] = pixel & 0xFF;
                    imageData[j + 1] = (pixel >> 8) & 0xFF;
                    imageData[j + 2] = (pixel >> 16) & 0xFF;
                    prevBuffer[i] = pixel;
                }
            }

            for (let k = 0; k < count; k++, index+=4) {
                //this.setNewImgData(imageData, array, index);
            }
        }

        let newImgData = this.canvasContext.createImageData(512, 480);
        newImgData.data.set(array, 0);

        this.canvasContext.putImageData(newImgData, 0, 0);
        //this.canvasContext.putImageData(this.canvasImageData, 0, 0);
    }

    setNewImgData(imageData, newImgData, index) {
        let i = parseInt((index/4)/512);
        let j = parseInt((index/4)%512);

        let x0 = parseInt((240 - 1) * i/(480 - 1));
        let y0 = parseInt((256 - 1) * j/(512 - 1));

        if (j === 512 - 1 && i === 480 - 1) {
            let ind = 4*(x0*256+y0);
            newImgData[index] = imageData[ind];
            newImgData[index+1] = imageData[ind+1];
            newImgData[index+2] = imageData[ind+2];
            newImgData[index+3] = imageData[ind+3];
            return;
        }

        if (j === 512 - 1) {
            let ind1 = 4*(x0*256+y0);
            let ind2 = 4*((x0+1)*256+y0);
            newImgData[index] = (imageData[ind1] + imageData[ind2])/2;
            newImgData[index+1] = (imageData[ind1+1] + imageData[ind2+1])/2;
            newImgData[index+2] = (imageData[ind1+2] + imageData[ind2+2])/2;
            newImgData[index+3] = (imageData[ind1+3] + imageData[ind2+3])/2;
            return;
        }

        if (i === 480 - 1) {
            let ind1 = 4*(x0*256+y0);
            let ind2 = 4*(x0*256+y0+1);
            newImgData[index] = (imageData[ind1] + imageData[ind2])/2;
            newImgData[index+1] = (imageData[ind1+1] + imageData[ind2+1])/2;
            newImgData[index+2] = (imageData[ind1+2] + imageData[ind2+2])/2;
            newImgData[index+3] = (imageData[ind1+3] + imageData[ind2+3])/2;
            return;
        }

        let ind1 = 4*(x0*256+y0);
        let ind2 = 4*((x0+1)*256+y0);
        let ind3 = 4*((x0+1)*256+y0+1);
        let ind4 = 4*(x0*256+y0+1);

        newImgData[index] = (imageData[ind1] + imageData[ind2] + imageData[ind3] + imageData[ind4])/4;
        newImgData[index+1] = (imageData[ind1+1] + imageData[ind2+1] + imageData[ind3+1] + imageData[ind4+1])/4;
        newImgData[index+2] = (imageData[ind1+2] + imageData[ind2+2] + imageData[ind3+2] + imageData[ind4+2])/4;
        newImgData[index+3] = (imageData[ind1+3] + imageData[ind2+3] + imageData[ind3+3] + imageData[ind4+3])/4;
    }
}