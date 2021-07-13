const fs = require('fs')
const path = require('path')

module.exports = class GeneratorFile {

 
  createTestFile(methodName,classFile,isClass = false){
    const testSource = `
    test('Test ${methodName}',()=>{
      const ${isClass? '{'+methodName+'}':methodName} = require('${classFile}')
      const ret = ${methodName}()
    })
    `

    const testFileUrl = this.getFileName(classFile)
    this.exisFile(testFileUrl).then(()=>{
      const writeStream = fs.createWriteStream(testFileUrl,{encoding:'utf-8'})
      writeStream.write(testSource)
      writeStream.end()
      writeStream.on('finish',()=>{
        console.log('书写完毕')
      })
    })
    
  }
  
  getFileName(classFile){
    const classF = path.parse(classFile)
    // const resolvePath = path.resolve(".")
    // const dir = path.join(resolvePath,'__test__')
    
    return path.format({
      dir:path.join(classF.dir,'__test__'),
      name:classF.name,
      ext:'.test.js'
    })
  }


exisFile(url){
  const dir = path.parse(url).dir.split(path.sep)
  this.existDir(dir)
  /**
   * r+ 打开文件用于读写。
    w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
    a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
    a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
   */
  return new Promise((resolve,reject)=>{
    fs.open(url,'w+',(err)=>{
      if(err){
        reject(err)
      }else{
        resolve('success')
      }
    })
  })
  
}

// 判断路径是否存在，不存在创建
existDir(dir){
  console.log(dir)
  let newDir = ''
  for(let i = 0;i<dir.length;i++){
     newDir = i==0?dir[i]:path.join(newDir,dir[i])
    if(!fs.existsSync(newDir)){
        fs.mkdirSync(newDir)
    }
  }
}

}
