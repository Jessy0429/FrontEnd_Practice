class EventBus{
    constructor() {
        this.eventlist = {}
    }
    //发布
    $on(eventName, fn){
        if (!this.eventlist[eventName]){
            this.eventlist[eventName] = [fn]
        }
        else{
            this.eventlist[eventName].push(fn)
        }
    }
    //订阅
    $emit(eventName, args){
        if (!eventName) throw new Error('No event name')
        if (this.eventlist[eventName]){
            for(let fn of this.eventlist[eventName]){
                try{
                    fn(args)
                }catch (e){
                    throw new Error(e + 'eventName:' + eventName)
                }
            }
        }
    }
    $once(eventName, fn){
        const _this = this
        function onceHandle() {
            fn(...arguments)
            _this.$off(eventName, onceHandle)
        }
        this.$on(eventName, onceHandle)
    }
    $off(eventName, fn){
        if (!arguments.length) this.eventlist = {}
        if (Array.isArray(eventName)){
            for (let e of eventName){
                this.$off(e, fn)
            }
        }
        if (arguments.length === 1 || !fn){
            delete this.eventlist[eventName]
        }
        this.eventlist[eventName] = this.eventlist[eventName].filter(
            (f) => f !== fn
        )
    }
}
let bus = new EventBus()
bus.$on('hello', (mes)=>{console.log(mes)})
bus.$emit('hello', 'hello world')
bus.$once('once', (mes)=>{console.log(mes)})
bus.$emit('once',1)