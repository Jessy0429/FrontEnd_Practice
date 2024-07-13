function throttle(func, delay){
    let timer = null;
    return function(){
        if(timer) return;
        timer = setTimeout(()=>{
                func.apply(this, arguments)
                timer = null
            }, delay)
    }
}

function debounce(func, delay){
    let timer = null
    return () => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this, arguments);
            timer = null;
        }, delay);
    }

}

const t = throttle((arg)=>{console.log(arg)}, 200)
t(1)