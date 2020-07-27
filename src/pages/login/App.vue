<template>
  <div class="login-wrap">
    <div class="mask"></div>
    <div class="form-wrap">
      <div class="sys-name f-tac f-push-30">
        <img src="../../assets/images/logo_text.png" alt />
      </div>
      <div class="box">
        <el-form ref="ruleForm" :model="form" :rules="formRules">
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="form.password"
              :type="showPassWord?'text':'password'"
              name="password"
              placeholder="请输入密码"
            ></el-input>
            <i :class="[showPassWord?'fc0 iconfont icon-mimaxianshi':'iconfont icon-mimaxianshi']"
            @click="showPassWordFun()"></i>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="disBtn" @click="submit()" style="width:100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="tips">技术支持 科大讯飞－讯飞智元信息科技有限公司</div> -->
  </div>
</template>

<script>
import encrypt from "@/mixins/encrypt";

export default {
  data() {
    return {
      disBtn: false,
      showPassWord:false,
      form: {
        username: "",
        password: ""
      },
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "submit"
          },
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "submit"
          },
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ]
      }
    };
  },
  mixins: [encrypt],
  methods: {
    showPassWordFun(){
      this.showPassWord = this.showPassWord?false:true;
    },
    submit() {
      if (this.disBtn) {
        return;
      }
      // window.location.href = process.env.BASE_URL + "/index.html";
      this.$refs.ruleForm.validate(flag => {
        if (flag) {
          this.disBtn = true;
          let params = {
            account: this.form.username,
            loginPassword: this.pwdEncode(this.form.password)
          };

          this.$api.common.login(params).then(res => {
            if (!res.flag) {
              this.disBtn = false;
              this.$message.error(res.errMsg || "登录失败");
            } else {
              this.$message.success("登录成功");
              localStorage.setItem("csrf_token", res.data.token);
              setTimeout(() => {
                window.location.href = process.env.BASE_URL + "/index.html";
              }, 500);
            }
          });
        }
      });
    }
  },
  mounted() {
    window.addEventListener("keydown", event => {
      if (event.keyCode == "13") {
        this.submit();
      }
    });
  }
};
</script>

<style lang="scss">
.mask {
  background: url($assets+"/images/login-bg.png") no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
}
.form-wrap {
  position: relative;
  z-index: 10;
  width: 360px;
  margin: 0 auto;
  padding-top: 100px;
  .box {
    background: #fff;
    padding: 40px 30px 30px 30px;
    border-radius: 5px;
    box-shadow: 0 0 8px 2px rgba($color: #000000, $alpha: 0.1);
  }
}
.icon-mimaxianshi {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #ddd;
}
.fc0 {
  color: #ccc;
}

input[name="password"]{
  padding-right: 30px;
}
.tips {
  position: absolute;
  bottom: 100px;
  z-index: 9;
  font-size: 14px;
  color: #eee;
  width: 100%;
  text-align: center;
  margin-top: 100px;
}
</style>