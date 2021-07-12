import React from 'react'
import render from 'react-test-renderer'
import Link from './Link.react'

test('link changes the class when hovered',()=>{
  let component 
  render.act(()=>{
    component = render.create(<Link page="http://www.baidu.com">baidu</Link>)
  })
   
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  render.act(()=>{
    tree.props.onMouseEnter();
  })
 
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  render.act(()=>{
  tree.props.onMouseLeave();
  })
  tree=component.toJSON();
  expect(tree).toMatchSnapshot()
})