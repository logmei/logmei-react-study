import React from 'react'
import MyReact from './source/react.js'
console.log('myreact',MyReact)

const virtualDom = (
  <div id="h1">hello <span id="w1" key="w1">wo<span key="r1">rld</span></span></div>
)
const virtualDom1 = React.createElement('div',{id:'h1'},
  'hello',
  React.createElement('span',{id:'w1',key:'w1'},'wo',React.createElement('span',{key:'r1'},'rld')),
  
  )
const virtualDom2 = MyReact.createElement('div',{id:'h1'},
  'hello',
  MyReact.createElement('span',{id:'w1',key:'w1'},'wo',MyReact.createElement('span',{key:'r1'},'rld')),
  
  )

console.log('jsx输出',virtualDom)
console.log('react createElement',virtualDom1)
console.log('自定义的createElement',virtualDom2)
console.log('判断自定义的element是否符合为有效的ReactElement',React.isValidElement(virtualDom2))
