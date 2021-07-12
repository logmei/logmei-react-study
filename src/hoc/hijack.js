import React from 'react'
import ReactDom from 'react-dom'

class Parent extends React.Component{
  constructor(props){
    super(props) // 先调用super否则没有this
    this.click3 = this.click1.bind(this)
    this.click1=this.click1.bind(this)
  }

  click1(){// 需要在constructor中绑定this
    console.log('parent click1',this)
  }

  click2 = ()=>{
    console.log('parent click2',this)
  }

  render(){
    return <div onClick={this.click1}>parent click</div>
  }
}

function hijackHoc(component){
  return class extends component{
 
    handlerClick=()=>{
      super.handlerClick()
      console.log('handlerClick hijack')
    }

    render(){
      const parent = super.render()
      return React.cloneElement(parent,{
        onClick:this.handlerClick()
      })
    }
  }
}
@hijackHoc
class HijackComponent extends React.Component{
  state={
    index:0
  }

  constructor(props){
    super(props)
    this.handlerClick = this.handlerClick.bind(this)
  }

  handlerClick(){
    console.log('handlerClick')
    this.setState({
      index:this.state.index+1
    })
  }

  render(){
    return <div onClick={this.handlerClick}>{this.state.index}</div>
  }
}

ReactDom.render(<HijackComponent></HijackComponent>,document.getElementById('root'))