/*
 * @Author: chongxuan
 * @Date: 2019-10-30 10:31:55
 * @Description: 修改密码
 */

<template>
  <div class="modify-pass">
    <el-dialog title="修改密码"
               :append-to-body="true"
               :close-on-click-modal="false"
               :visible="modifyPassVisible"
               @close="dialogClose"
               @update:visible="val => $emit('update:modifyPassVisible',val)">
      <el-form ref="passform"
               label-width="80px"
               :model="form"
               :rules="rules">
        <el-form-item label="原密码"
                      prop="oldpass">
          <el-input v-model="form.oldpass"
                    autocomplete="off"
                    :type="showOldPassWord?'text':'password'"
                    placeholder="请输入原密码"></el-input>
          <i :class="[showOldPassWord?'fc0 iconfont icon-mimaxianshi':'iconfont icon-mimaxianshi']"
             @click="showPassWordFun('oldpass')"></i>
        </el-form-item>
        <el-form-item label="新密码"
                      :required="true"
                      prop="newpass">
          <el-input v-model="form.newpass"
                    autocomplete="off"
                    :type="showNewPassWord?'text':'password'"
                    placeholder="请输入新密码"></el-input>
          <i :class="[showNewPassWord?'fc0 iconfont icon-mimaxianshi':'iconfont icon-mimaxianshi']"
             @click="showPassWordFun('newpass')"></i>
        </el-form-item>
        <el-form-item label="确认密码"
                      :required="true"
                      prop="renewpass">
          <el-input v-model="form.renewpass"
                    :type="showRenewPassWord?'text':'password'"
                    autocomplete="off"
                    placeholder="请再次输入新密码"></el-input>
          <i :class="[showRenewPassWord?'fc0 iconfont icon-mimaxianshi':'iconfont icon-mimaxianshi']"
             @click="showPassWordFun('renewpass')"></i>
        </el-form-item>
        <el-form-item style="margin-top:-18px;">
          <p style="color:#999;">密码长度8 - 16 位，必须包含大写字母、小写字母、数字和特殊字符</p>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="$emit('update:modifyPassVisible',false)">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import encrypt from "@/mixins/encrypt";

export default {
  mixins: [encrypt],
  data () {
    return {
      showOldPassWord: false,
      showNewPassWord: false,
      showRenewPassWord: false,
      form: {
        oldpass: "",
        newpass: "",
        renewpass: ""
      },
      rules: {
        oldpass: [
          {
            required: true,
            message: "请输入原密码"
          },
          {
            max: 16,
            message: "密码长度不得大于16个字符"
          }
        ],
        newpass: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入新密码"));
              } else if (value.length < 8) {
                callback(new Error("密码长度不得小于8个字符"));
              } else if (value.length > 16) {
                callback(new Error("密码长度不得大于16个字符"));
              } else if (this.checkPassMode(value) < 4) {
                callback(new Error("密码必须包含大写字母、小写字母、数字和特殊字符"));
              } else {
                callback();
              }
            }
          }
        ],
        renewpass: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.newpass) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  props: ["modifyPassVisible", "username"],
  methods: {
    showPassWordFun (type) {
      switch (type) {
        case 'oldpass':
          this.showOldPassWord = this.showOldPassWord ? false : true;
          break;
        case 'newpass':
          this.showNewPassWord = this.showNewPassWord ? false : true;
          break;
        case 'renewpass':
          this.showRenewPassWord = this.showRenewPassWord ? false : true;
          break;
      }
    },
    dialogClose () {
      this.$refs.passform.resetFields();
    },
    // 检验密码包含数字、字母、符号中的几种
    checkPassMode (val) {
      let count = 0;

      if (/\d+/.test(val)) {
        count++;
      }

      if (/[a-z]+/.test(val)) {
        count++;
      }

      if (/[A-Z]+/.test(val)) {
        count++;
      }

      if (/[`~!@#$^&*()_+=|{}':;'-,.\/]+/.test(val)) {
        count++;
      }
      return count;
    },
    submit () {
      this.$refs.passform.validate(data => {
        if (data) {
          let params = {
            account: this.username,
            newPwd: this.pwdEncode(this.form.newpass),
            oldPwd: this.pwdEncode(this.form.oldpass)
          };
          if (this.username) { //登录页直接修改
            this.$api.common.changePasswordFor(params).then(res => {
              if (res.flag) {
                this.$message.success("修改密码成功,请重新登录！");
                setTimeout(() => {
                  window.location.href = process.env.BASE_URL + "/login.html";
                }, 2000);
              } else {
                this.$message.warning(res.errMsg ? res.errMsg : "修改密码失败");
              }
            });
          } else { //登陆后
            delete params.account;
            this.$api.common.modifyPass(params).then(res => {
              if (res.flag) {
                this.$message.success("修改密码成功,即将前往登录！");
                setTimeout(() => {
                  window.location.href = process.env.BASE_URL + "/login.html";
                }, 2000);
              } else {
                this.$message.warning(res.errMsg ? res.errMsg : "修改密码失败");
              }
            });
          }
        }
      });
    }
  }
};
</script>