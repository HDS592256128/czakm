module.exports = {
  // off; 箭头函数返回值可以只是一个值，没必须一定用大括号写成多条语句.
  'arrow-body-style': 0,
  // off; 箭头函数的参数必须用括号包裹起来，限制去掉。当只有一个参数时，没必要使用括号
  'arrow-parens': 0,
  // error; 箭头函数的箭头前后必须有空格
  'arrow-spacing': [
    2,
    {
      before: true,
      after: true
    }
  ],
  // error; generator 的 * 前面禁止有空格，后面必须有空格
  'generator-star-spacing': [
    2,
    {
      before: false,
      after: true
    }
  ],
  // error; 禁止import重复模块
  'no-duplicate-imports': 2,
  // error; 禁止采用var去定义变量，必须使用let或者const
  'no-var': 2,
  // off; 必须使用箭头函数作为回调，不采纳
  'prefer-arrow-callback': 0,
  // error; 变量如果没有发生修改，则必须使用const进行命名
  'prefer-const': 2,
  // off; 强制使用结构的限制，不采纳
  'prefer-destructuring': 0,
  // off; 不强制使用模板字符串，字符串拼接也是可取的
  'prefer-template': 0,
  // error; ... 的后面禁止有空格
  'rest-spread-spacing': [2, 'never'],
  // off; import 的排序不用限制
  'sort-imports': 0,
  // error; 模板字符串内的首尾禁止有空格，比如${test}不要写成${ test }
  // TODO: 当jsx代码里有xxProp={``}会导致eslint出错奔溃，先注释
  'template-curly-spacing': [2, 'never'],
  // error; yield* 后面必须加空格
  'yield-star-spacing': [2, 'after']
}
