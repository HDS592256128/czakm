module.exports = {
  // off; 数组前后括号必须换行的要求有点严格，不采纳
  'array-bracket-newline': 0,
  // error; 数组的括号前后禁止有空格
  'array-bracket-spacing': [2, 'never'],
  // off; 数组里面的元素强制换行有点严格，不采纳
  'array-element-newline': 0,
  // error; 代码块如果在一行，则大括号内的首尾必须有空格，比如 function (a, b) { retur a + b; }
  'block-spacing': [2, 'always'],
  // error; 大括号的用法要求
  'brace-style': 2,
  // error; 所有的控制结构都要求使用大括号
  curly: [2, 'all'],
  // off; 变量命名需要以驼峰命名法，对属性字段不做限制
  camelcase: [0, { properties: 'never' }],
  // off; 注释的首字母必须大写，对此不做限制
  'capitalized-comments': 0,
  // error; 默认不允许尾随逗号, ie8及以下浏览器会报错
  'comma-dangle': 2,
  // error; 逗号后面强制要求加空格
  'comma-spacing': 2,
  // error; 逗号必须写在最后面
  'comma-style': [2, 'last'],
  // off; 文件尾部不限制是否有新的空行
  'eol-last': 0,
  // off; 函数名和执行它的括号之间禁止有空格
  'func-call-spacing': [2, 'never'],
  // off; 函数赋值给变量时，函数名必须和赋值的变量名一致的限制不采纳
  'func-name-matching': 0,
  // off; 不限制匿名函数的命名问题
  'func-names': 0,
  // off; 必须只使用函数申明或只使用函数表达式
  'func-style': 0,
  // off; 变量黑名单，不采纳
  'id-blacklist': 0,
  // off; 变量命名长度不做限制
  'id-length': 0,
  // off; 变量命令的字符需要在某个正则匹配规则里面，不采纳
  'id-match': 0,
  // error; 一个缩进必须用四个空格替代, switch语句里面的case 2个空格
  indent: [
    2,
    2,
    {
      SwitchCase: 1,
      flatTernaryExpressions: true
    }
  ],
  // error; jsx 中的属性必须用双引号
  'jsx-quotes': [2, 'prefer-double'],
  // error; 对象字面量中冒号前面禁止有空格，后面必须有空格
  'key-spacing': [
    2,
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict'
    }
  ],
  // error; 关键字前后必须要加上空格
  'keyword-spacing': [
    2,
    {
      before: true,
      after: true
    }
  ],
  // off; 注释的位置不进行限制
  'line-comment-position': [1, 'above'],
  // wran; 注释前后必须有空行的限制
  'lines-around-comment': [
    1,
    {
      beforeBlockComment: true, //（默认）在块注释之前需要一个空行
      afterBlockComment: false, //块注释后需要一个空行
      beforeLineComment: true, // 行注释前需要一个空行
      afterLineComment: false, // 行注释后需要一个空行
      allowBlockStart: true, // 允许注释出现在块语句的开始处
      allowBlockEnd: false // 允许注释出现在块语句的末尾
    }
  ],
  // off; 对换行符不限制
  'linebreak-style': 0,
  // error; 代码块嵌套的深度禁止超过 5 层
  'max-depth': [2, 5],
  // error; 单行最多允许200个字符, 对包含url的行不进行此限制
  'max-len': [
    2,
    {
      code: 250,
      tabWidth: 2,
      ignoreUrls: true
    }
  ],
  // off; 某个文件能够放置的最大代码行数，不限制
  'max-lines': 0,
  // error; 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
  'max-nested-callbacks': ['error', 5],
  // error; 函数的参数禁止超过 10 个
  'max-params': [2, 10],
  // off; 一个函数块里面的语句行数的限制，不采纳
  'max-statements': 0,
  // off; 一行中的语句数量
  'max-statements-per-line': 0,
  // off; 三目元算语句换行限制，不采纳
  'multiline-ternary': 0,
  // error; 构造函数的必须以大写字母开头
  'new-cap': 2,
  // error; new 后面类必须带上括号
  'new-parens': 2,
  // off; 链式调用必须换行的限制，不采纳
  'newline-per-chained-call': 0,
  // error; 禁止使用 Array 构造函数
  'no-array-constructor': 2,
  // off; 位操作，不进行限制
  'no-bitwise': 0,
  // off; continue语句的使用，不限制
  'no-continue': 0,
  // off; 内联注释不限制
  'no-inline-comments': 1,
  // off; 允许单独使用if语句，而不配套使用else、else if等
  'no-lonely-if': 0,
  // error; 禁止混用空格和缩进
  'no-mixed-spaces-and-tabs': 2,
  // off; 连续赋值比如 a = b = c = 4; 不限制
  'no-multi-assign': 0,
  // off; 连续空行，不限制
  'no-multiple-empty-lines': 0,
  // off; if里面不允许出现否定表达式， 不采纳
  'no-negated-condition': 0,
  // off; 允许三元表达式的嵌套使用
  'no-nested-ternary': 0,
  // off; 禁止直接 new Object
  'no-new-object': 2,
  // off; 允许使用 ++ 或 --
  'no-plusplus': 0,
  // off; 允许使用三元表达式
  'no-ternary': 0,
  // error; 禁止行尾部有空格
  'no-trailing-spaces': 2,
  // off; 允许变量名中出现下划线
  'no-underscore-dangle': 0,
  'no-unneeded-ternary': 0,
  // error; 禁止属性前有空格，比如 foo. bar()
  'no-whitespace-before-property': 2,
  // error; 大括号内的首尾必须有换行
  'object-curly-newline': [
    2,
    {
      multiline: true,
      consistent: true
    }
  ],
  // off; 对象字面量内的属性每行必须只有一个，不采纳
  'object-property-newline': 2,
  // off; 声明变量时，禁止一条语句声明多个变量
  'one-var': [
    0,
    {
      var: 'never',
      let: 'never',
      const: 'never'
    }
  ],
  // error; 变量申明必须每行一个
  'one-var-declaration-per-line': [2, 'always'],
  // error; 必须使用单引号
  quotes: 0,
  // error; 结尾必须有分号
  semi: 2,
  // error; 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
  'semi-spacing': [
    2,
    {
      before: false,
      after: true
    }
  ],
  // error; 分号必须写在行尾，禁止在行首出现
  'semi-style': [2, 'last'],
  'sort-keys': 0,
  'sort-vars': 0,
  // error; if, function 等的大括号之前必须要有空格
  'space-before-blocks': [2, 'always'],
  // error; function 的小括号前面必须有空格
  'space-before-function-paren': 0,
  // error; 小括号内的首尾禁止有空格
  'space-in-parens': [2, 'never'],
  // error; 操作符左右必须有空格, const ret = 'hello' + 'world';
  'space-infix-ops': 2,
  // off; 注释空格不限制
  'spaced-comment': 2,
  // off; case 子句冒号前禁止有空格，冒号后必须有空格
  'switch-colon-spacing': [
    2,
    {
      after: true,
      before: false
    }
  ]
};
