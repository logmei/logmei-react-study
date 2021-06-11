import React from 'react'
import ReactDOM from 'react-dom'

export class App extends React.Component{
  state = { list:new Array(1000000000).fill(0)}
  add = ()=>{
    this.setState({
      list:[...this.state.list,1]
    })
  }
  render(){
    return (
      <ul>
        <li><input type="text"></input><button onClick={this.add}>添加</button></li>
       {
         this.state.list.map((v,index)=>{
           return <li key={index}>{v}</li>
         })
       } 
      </ul>
    )
  }
}

// ReactDOM.render(<App></App>,document.getElementById('root'))
ReactDOM.unstable_renderSubtreeIntoContainer(document.getElementById('root')).render(<App></App>)

