const PROMISE_STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
//获取promise状态
/*
function checkState_1(promise) {
  const t = {};
  return Promise.race([promise, t]).then((res) => {
      console.log(res)
      if (res === t) return PROMISE_STATE.PENDING;
      else return PROMISE_STATE.FULFILLED
  }).catch(() => PROMISE_STATE.REJECTED)
}

function checkState_2(promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(PROMISE_STATE.PENDING);
    }, 0);
    promise.then(() => {
      resolve(PROMISE_STATE.FULFILLED);
    }).catch(() => {
      resolve(PROMISE_STATE.REJECTED);
    });
  })

}

let a = Promise.resolve(1);
let b = Promise.reject();
let c = new Promise(() => {});
//
checkState_1(a).then(state => console.log(state)); // fulfilled
checkState_1(b).then(state => console.log(state)); // rejected
checkState_1(c).then(state => console.log(state)); // pending
 */

//手写Promise
class MyPromise {
    constructor(executor) {
        this._status = PROMISE_STATE.PENDING
        this._value = undefined;
        this._resolveQueue = [];
        this._rejectQueue = []
        const resolve = (value) => {
            if (this._status === PROMISE_STATE.PENDING){
                this._status = PROMISE_STATE.FULFILLED;
                this._value = value;
                 while (this._resolveQueue.length){
                    const callback = this._resolveQueue.shift()
                    setTimeout(callback(value))
                }
            }
        }
        const reject = (value) => {
             if (this._status === PROMISE_STATE.PENDING){
                this._status = PROMISE_STATE.REJECTED;
                this._value = value;
                while (this._rejectQueue.length){
                    const callback = this._resolveQueue.shift()
                    setTimeout(callback(value))
                }
            }
        }
        try {
            executor(resolve, reject)
        } catch (error){
            reject(error)
        }
    }

    then(onFullfilled, onRejected){
        if (typeof onFullfilled != 'function'){
            onFullfilled = value => value
        }
        if (typeof onRejected != 'function'){
            onRejected = value => value
        }
        return new MyPromise((resolve, reject)=>{
            function resolveFn(value){
                try{
                    const x = onFullfilled(value)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                    else {
                        resolve(value)
                    }
                } catch (error){
                    reject(error)
                }
            }

            function rejectFn(value){
                try{
                    const x = onRejected(value)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                    else {
                        resolve(value)
                    }
                } catch (error){
                    reject(error)
                }
            }

            if(this._status === PROMISE_STATE.FULFILLED){
                setTimeout(resolveFn(this._value))
            }
            else if (this._status ===  PROMISE_STATE.REJECTED){
                setTimeout(rejectFn(this._value))
            }
            else{
                this._resolveQueue.push(resolveFn);
                this._rejectQueue.push(rejectFn);
            }
        })
    }
    catch(rejectFn){
        return this.then(undefined, rejectFn)
    }
     // 静态resolve方法
     static resolve(value) {
          return value instanceof MyPromise ? value : new MyPromise(resolve => resolve(value))
      }
     static reject(error) {
          return new MyPromise((resolve, reject) => reject(error))
        }
    static all(promiseArr){
        let count = 0;
        let result = []
        return new MyPromise((resolve, reject) => {
            if (promiseArr.length === 0) resolve(result);
            for (let promise of promiseArr){
                if (promise instanceof MyPromise){
                    promise.then((value)=>{
                        count++;
                        result.push(value)

                    }).catch((error)=>reject(error))
                }
                else{
                    count++;
                    result.push(promise)
                }
                if (count == promiseArr.length) resolve(result);
            }
        })
    }
    static race(promiseArr){
        return new MyPromise((resolve, reject) => {
            for (let promise of promiseArr){
                if (promise instanceof MyPromise){
                    promise.then((value)=>resolve(value)).
                    catch(error=>reject(error))
                }
                else{
                    resolve(promise)
                }
            }
        })
    }
}
//
// mypromise = new MyPromise((resolve, reject)=>{resolve(1)})
// let k = mypromise.then((res)=>{console.log(res)}).catch()
// all = MyPromise.all([mypromise, 't'])
// all.then((res)=>console.log(res))

const p0 = Promise.resolve('123')
const p1 = p0.then(() => {throw new Error('456')})
const p2 = p1.then(_ => {
    console.log('shouldnot be here')
})
const p3 = p2.catch((e) => console.log(e))
const p4 = p3.then((data) => console.log(data))
