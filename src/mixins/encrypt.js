/*
 * @Author: chongxuan
 * @Date: 2019-07-29 21:25:45
 * @Description: AES 加密
 */
import CryptoJS from "crypto-js";
export default {
    methods: {
        encrypt(key, iv, word) {
            const srcs = CryptoJS.enc.Utf8.parse(word);
            const _key = CryptoJS.enc.Utf8.parse(key);
            const _iv = CryptoJS.enc.Utf8.parse(iv);
            const encrypted = CryptoJS.AES.encrypt(srcs, _key, {
                iv: _iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        pwdEncode: function (word) {
            return this.encrypt("PWDAESKEYFORYZT9", "PWDAESKEYFORYZT9", word);
        }
    }
};