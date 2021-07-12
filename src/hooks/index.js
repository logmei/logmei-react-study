
import React from 'react'
import ReactDom from 'react-dom'

const states = []
let floatStateIndex = 0
function myUseState(val){
  const currCursor = floatStateIndex
  states[currCursor] = states[currCursor] || val
  function setFun(v){
    states[currCursor] = v
    render()
  }
  floatStateIndex++
  
  return [states[currCursor],setFun]
}

[1,3,6,8,9] [8]

const HooksTest = ()=>{
  const [state1,setState1] = myUseState(0)
  const [state2,setState2] = myUseState(0)

  const handlerState1 = ()=>{
    setState1(state1+1)
  }

  const handlerState2 = ()=>{
    setState2(state2+1)
  }

  return (
    <div>
      <div onClick={handlerState1}>state[0]:{state1}</div>
      <div onClick={handlerState2}>state[1]:{state2}</div>
    </div>
  )
}

function render(){
  ReactDom.render(<React.StrictMode><HooksTest></HooksTest></React.StrictMode>,document.getElementById('root'))
  floatStateIndex=0
}

render()