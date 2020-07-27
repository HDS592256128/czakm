module.exports = {
  // off; 变量定义时强制赋值或者强制先定义后赋值有点严格
  'init-declarations': 0,
  // error; 禁止label名称和var相同
  'no-label-var': 2,
  // error; 禁止将undefined当成标志符
  'no-undefined': 2,
  // error; 禁止使用未定义的变量, typeof 后面的变量除外
  'no-undef': [
    2,
    {
      typeof: false
    }
  ],
  // error; 变量使用之前必须进行定义
  'no-use-before-define': 2
}
