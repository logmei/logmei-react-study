### ReactElement是什么？
```
// s是我们写的jsx
const s = '<div>hello <span>wo<span>rld</span></span></div>'
// 下面是将s转为react语法代码,返回的都是ReactElement
React.createElement("div", null, "hello ",
    React.createElement("span", null, "wo", 
        React.createElement("span", null, "rld")
    )
 );
 // 将react代码转为AST
 

![WechatIMG54.jpeg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92c22c86342c434f8983691130d098db~tplv-k3u1fbpfcp-watermark.image)
```
### ReactElement主要使用Object.defineProperty设置属性
#### Object.defineProperty
> 语法Object.defineProperty(obj,propkey,descriptor)
##### 描述对象descriptor的属性有哪些
* configurable:是否可修改属性，若为false则不能修改该属性的任何描述，也不可以删除，设置为true才可以对属性描述进行修改和删除；默认为false;
```
var a = Object.defineProperty({},'key',{})// 默认configurable没false
/**
以下调用会报错：
Uncaught TypeError: Cannot redefine property: key
    at Function.defineProperty (<anonymous>)
    at <anonymous>:1:8
*/
Object.defineProperty(a,'key',{configurable:true})
delete a.key // 输出false，删除失败

```
* enumerable:是否可枚举，默认false.
```
//继续以上例子
for(var key in a){console.log(key)} // 输出undefined
Object.keys(a) // 输出[]
```
* value:属性对应的值
* writable:是否可以改变value的值，默认为false
```
//继续以上例子
a.key =1 
console.log(a) // {key: undefined}
```
* get:存取描述，返回属性的值,默认为undefined
```
Object.defineProperty(a,'key1',{
    configurable:true,
    enumerable:true,
    get(){return '2'}
   })
console.log(a.key1) // 2
// 存取描述和value、wriable不能同时使用
Object.defineProperty(a,'key1',{
    configurable:true,
    enumerable:true,
    writable:true
    get(){return '2'}
   })
 /**
VM2292:1 Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
    at Function.defineProperty (<anonymous>)
    at <anonymous>:1:8
*/


```
* set：存取描述，设置属性值，默认返回undefined
```
var key1Value = '2'
// 存取描述和value、wriable不能同时使用
Object.defineProperty(a,'key1',{
    configurable:true,
    enumerable:true,
    get(){return key1Value},
    set(newV) {key1Value = newV}
   })
```
##### 数据描述符
> 如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。

ref和key均为数据描述符，因此react中判断ref和key是否有效是利用```Object.getOwnPropertyDescriptor(a,'key').get```来判断
```
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
```
##### Object.freeeze
冻结的对象不能被修改，但被冻结的对象的属性是个对象，那这个属性可以被修改的，因此属性不想被修改也需要被冻结
```
// ReactElement返回被冻结的对象
if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
  }
```
### 属性遍历
* for...in：循环遍历对象自身和继承的属性，（不包括：enumerable为false、Symbol属性）
```
for(let prop in config){
    // 自身属性  去掉预设的ref和key
    if(config.hasOwnProperty(prop) && !RESERVED_PROPS.hasOwnProperty(prop)){
      props[prop] = config[prop]
    }
  }
```
* Object.keys：循环遍历对象自身的属性（不包括：继承、enumerable为false,Symbol属性）
```
  Object.keys(config).forEach(prop=>{
    if(!RESERVED_PROPS.hasOwnProperty(prop)){
      props[prop] = config[prop]
    }
  })
```
* Object.getOwnPropertyNames：循环遍历对象自身属性，包括enumerable为false的（不包含：继承，Symbol）
```
Object.getOwnPropertyNames(config).forEach(prop=>{
    if(!RESERVED_PROPS.hasOwnProperty(prop) && Object.getOwnPropertyDescriptor(config,prop).enumerable){
      props[prop] = config[prop]
    }
  })
```