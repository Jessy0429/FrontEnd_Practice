//订阅者发布者模式 vue2
function observe(data){
    if (!data || typeof(data) !== 'object') return;
    for (let key in data){
         let value = data[key]
        observe(value)
        let dep = new dependence()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log('get val:' + value)
                if(dep.target) dep.addwatcher(dep.target)//添加订阅者
                return value
            },
            set: function (newVal) {
                if (value === newVal) return;
                value = newVal
                dep.notify()//通知订阅者
                console.log('set newVal')
            }
        })
    }
}
// dep起到订阅者管理员的作用:observer观测到数据变更后应该通知哪些watcher呢？
// 这个时候就需要一个管理员（dep），统一管理订阅者，订阅者通过加入管理员的名单，来和数据源的更新进行沟通。一旦有数据发生变更，只需要通知管理员（dep），管理员负责通知所有订阅者

function dependence(){
    this.watchers = []
}
dependence.prototype = {
    addwatcher: function(w){
        this.watchers.push(w)
    },
    notify: function(){
        this.watchers.forEach((w)=>{
            w.update()//通知订阅者触发更新函数
        })
    }
}

function watch(vm, key, callback){
    this.callback = callback
    this.vm = vm
    this.key = key
    this.value = this.get() //通过get方法将自己添加到dep中 同时缓存旧值
}
watch.prototype = {
    update: function(){
        let value = this.vm.data[this.key]
        let oldVal = this.value
        if(oldVal !== value){
            //初始化时value和现在value不相等才触发回调（dom操作）
            this.value = value
            this.callback.call(this.vm, value, oldVal)
        }
    },
    get: function(){
        dependence.prototype.target = this //将自己缓存，准备添加到依赖中去
        let value = this.vm.data[this.key] //这个操作会触发observe的get
        dependence.prototype.target = null // 释放
        return value
    }
}

// const person = {
//     'sex':'girl',
//     'name':'晓甜甜',
//     'address':'XXX公寓',
//     'parent':{
//       'father':'小明',
//       'mother':'李红'
//     }
// }

