import keytochar from './keytochar';

let lastTime = null,
    nextTime = null,
    code = '',
    scanreceive = {
        listenFlag: false,
        _handler: function (e) {
            var keycode = e.which || e.keyCode || e.charCode;
            var shiftKey = e.shiftKey;
            nextTime = new Date();
            if (keycode === 13) {
                if (lastTime && (nextTime - lastTime < 30)) {
                    // 扫码枪
                    scanreceive.callback ? scanreceive.callback(code) : "";
                }
                code = '';
                lastTime = null;
                e.preventDefault();
            } else {
                var word = keytochar(shiftKey, keycode);
                if (!word) {
                    return
                }
                if (!lastTime) {
                    code = word;
                } else {
                    if (nextTime - lastTime < 30) {
                        code += word;
                    } else {
                        code = '';
                    }
                }
                lastTime = nextTime;
            }
        },
        listen: function () {
            if (this.listenFlag) {
                return;
            }
            this.listenFlag = true;
            $(document).on('keydown', this._handler);
        },
        unListen: function () {
            // this.callback = null;
            if (this.listenFlag) {
                $(document).off('keydown', this._handler);
                this.listenFlag = false;
            }
        }
    }
export default  scanreceive;
