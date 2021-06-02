import {MyReact} from './source/react'

const virtualDom = MyReact.createElement('div',{id:'a1',key:'a1'},
  'a1',
  MyReact.createElement('div',{id:'b1',key:'b1'},'b1'),
  MyReact.createElement('div',{id:'c1',key:'c1'},'c1')
  )
  console.log(virtualDom)