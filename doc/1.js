/**
 * @babel/core为babel的核心包，是个载体本身不能进行换行语法
 */
const babel = require('@babel/core')
const sourceCode = `<div>hello <span>wo<span>rld</span></span></div>`
// 转换是用其他包进行转换
// 将源码——》词法分析——》语法分析——》AST——》转成页面源码
const result = babel.transform(sourceCode,{
  plugins:[
    ['@babel/plugin-transform-react-jsx',{runtime:'classic'}]// runtime:classic为老版本的转换规则，automatic为新版的
  ]
})
console.log(result.code)

/**
 * runtime:classic
 * 当前上下文中需要有个React变量
 * 
React.createElement("h1", null, "hello ", React.createElement("span", null, "wo", React.createElement("span", null, "rld")));
 */

/**
 * runtime:automatic
 import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";


_jsxs("h1", {
  children: ["hello ", _jsxs("span", {
    children: ["wo", _jsx("span", {
      children: "rld"
    })]
  })]
});
 */