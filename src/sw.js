self.addEventListener('install',function(event){
  debugger
  event.waitUtil(
    caches.open('v1').then(cache=>{
      return cache.addAll([
        '/',
        '/nothing.png',
      ])
    })
  )
})

self.addEventListener('fetch',function(event){
  debugger
  event.respondWith(caches.match(event.request).then((response)=>{
    if(response!==undefined){
      return response
    } else {
      return fetch(event.request).then(response=>{
        let responseClone = response.clone()
        caches.open('v1').then(cache=>{
          cache.put(event.request,responseClone)
        })
        return response;
      }).catch(()=>{
        return caches.match('/nothing.png')
      })
    }
  }))
})

