
// 其他属性略

const REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for?Symbol.for('react.element'):0xeac7
/**
 * ReactElement 
 * 工厂函数，创建一个React element,它不是一个class，所以不能用new去调用，而且instanceof检查类型也是不起作用的，
 * 若想检查类型需要用$$type进行判断，react源码中是是使用的Symbol.for('react.element')，
 * 可以使用React.isValidElement来判断
 * 
 *  */ 
const MyReactElement =function(type,key,ref,props){
  const element = {
    $$typeof:REACT_ELEMENT_TYPE, // react中使用的是Symbol,确定唯一性
    type,
    key,
    ref,
    props
  }
  return element;
}

const RESERVED_PROPS={
  key:true,
  ref:true
}
/**
 * 
 * @param {*} type 
 * @param {*} config 
 * @param  {...any} children 
 * @returns 
 */
// 创建createElement
function CreateElement(type,config,...res){
  const props = {}
  let ref,key = null
  // 设置最外层的ref，key
  if(config!==null){
    if(hasValidDescript(config,'ref')){
      ref = config.ref
    }
    if(hasValidDescript(config,'key')){
      key = config.key
    }
  
  // 循环遍历对象自身的属性（不包括：继承、enumerable为false,Symbol属性）
  Object.keys(config).forEach(prop=>{
    if(!RESERVED_PROPS.hasOwnProperty(prop)){
      props[prop] = config[prop]
    }
  })
 }

 // 获取children
  if(res.length>0){
    if(res.length===1)props.children = res[0]
    else props.children = [...res]
  }

  return MyReactElement(
    type,
    key,
    ref,
    props
  )
}
// 判断是否为数据描述符
function hasValidDescript(config,key){
  if(config && Object.prototype.hasOwnProperty.call(config,key)){
      return !Object.getOwnPropertyDescriptor(config,key).get
  }
  return false
}

export default {
  createElement:CreateElement
}


