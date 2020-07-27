// 最佳实践
const bestPractice = require('./build/eslint-config/best-practice.js');
// 变量
const variable = require('./build/eslint-config/variable.js');
// ES6
const es6 = require('./build/eslint-config/es6.js');
// 代码风格相关
const codeStyle = require('./build/eslint-config/code-style.js');

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: Object.assign({}, bestPractice, variable, es6, codeStyle,{
    // 自定义规则
    // 详细说明请看https://eslint.org/docs/rules/XXXX         XXXX就是case名称
    'no-console': 0,      // 生产环境尽量不要有console.log (忽略此条，打包时会删除console)
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,     // 生产环境不允许debugger
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,        // 生产环境不允许alert
    'no-unused-vars': 0,          //没有用到的参数应该删除
    'no-inline-comments': 0,      //关于注释是在上还是在侧的严格约束
    'line-comment-position': 0,   //关于注释是在上还是在侧的严格约束
    'space-before-function-paren': 0, //一对小括号后跟空格
    'lines-around-comment': 0,     //注释上要空行
    'vue/no-unused-vars': 0       //Vue模板参数未使用
  }),
  parserOptions: {
    parser: 'babel-eslint'
  }
};
