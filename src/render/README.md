### React渲染流程
#### 设计理念
* 跨平台渲染 => 虚拟DOM
* 快速响应=> 异步可中断+增量渲染
#### 性能瓶颈
浏览器刷新频率60Hz,大概16.6ms渲染一次，而JS线程和渲染线程是互斥的，所以如果JS线程执行任务时间超过16.6ms的话，就会导致掉帧，导致卡顿，解决办法就是React利用空闲的时间进行更新，不影响渲染
把一个耗时的任务分成一个个小任务，分布再每一帧里的方式叫时间切片

### React16+的渲染流程
* scheduler 选择高优先级的任务进入reconciler
* reconciler 计算变更内容
* react-dom 把变更内容渲染到页面上（commit）