import React from 'react'
import ReactDom from 'react-dom'

const allLen = 1000000
const allList = new Array(allLen).fill().map((v,index)=>index)
const divStyle = {
  height: '800px',
  overflow: 'auto'
}

const rowHeight = 20
let startNum = 0
let endNum = 100
let batchNum = 20
let fresh = false

let lastScrollTop = 0
export class App extends React.Component{
  divRef = React.createRef()
  state = {
    list:allList.slice(startNum,endNum)
  }


  componentDidMount(){
    console.log(this.divRef.current)
  }

  scrollFun = (e)=>{
    
    const nowScrollTop = e.target.scrollTop
    console.log(nowScrollTop)
    if(fresh) return 
    const direction = nowScrollTop - lastScrollTop // 负的代表向上滑动，正的代表向下滑动
    batchNum = Math.floor(Math.abs(direction)/24)
    if(direction>50 && startNum<=allLen-batchNum && endNum<=allLen-batchNum){
      startNum +=batchNum
      endNum += batchNum
      startNum = startNum>allLen?allLen-batchNum:startNum
      endNum = endNum>allLen?allLen:endNum
      lastScrollTop = nowScrollTop
      fresh = true
    } else if(direction<0 && startNum>=batchNum && endNum>=20+batchNum) {
      startNum -=batchNum
      endNum -= batchNum
      startNum = startNum<0?0:startNum
      endNum = endNum<batchNum?batchNum:endNum
      lastScrollTop = nowScrollTop
      fresh = true
    }
    if(fresh){
      this.setState(()=>{
        setTimeout(()=>{
          fresh = false
          this.divRef.current.scrollTo(100,100)
          lastScrollTop = 100
        },0)
        return {
          list:allList.slice(startNum,endNum)
        }
      })
    }
   
  }

  render(){
    return (
      <div style={divStyle} ref={this.divRef} onScroll={throttle(this.scrollFun,200,false)}>
        <ul>
          {
            this.state.list.map((v,index)=>{
              return <li key={index}>{v}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

ReactDom.render(<App></App>,document.getElementById('root'))


function throttle(fn,wait,isImmediately){
  let immediately = isImmediately
  let timer = null

 
  return (...rest)=>{
    const timerFun = (params)=>{
      timer = setTimeout((imme)=>{
        if(!imme)fn.apply(this,params)
        timer = null
        window.clearTimeout()
      },wait,immediately)
    }
    if(immediately){
      fn.apply(this,rest)
      timerFun(rest)
      immediately = false
    }else{
      if(timer === null){
        timerFun(rest)
      }
    }
  }
}