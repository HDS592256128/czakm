/*
 * @Author: chongxuan
 * @Date: 2019-03-18 15:18:08
 * @Description: 同步Dist文件夹到后端java项目中
 */
const fse = require('fs-extra');
const path = require('path');
const rm = require('rimraf');
const chalk = require('chalk');
const dir = '../../akm-ggcg-manager/src/main/resources/dist';


console.log(chalk.cyan('正在移动前端文件...'));
rm(path.resolve(__dirname, dir), err => {
  if (err) {throw err;}
  fse.copy(path.resolve(__dirname, '../dist'), path.resolve(__dirname, dir))
    .then(() => {
      console.log(chalk.green('移动完成'));
    })
    .catch(err => console.error(err));
});
