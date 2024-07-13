//原省
function ajax1(url) {
  let xhr = new XMLHttpRequest() //实例化，以调用方法
  xhr.open('get', url)  //参数2，url。参数三：异步
  xhr.onreadystatechange = () => {  //每当 readyState 属性改变时，就会调用该函数。
    if (xhr.readyState === 4) {  //XMLHttpRequest 代理当前所处状态。
      if (xhr.status >= 200 && xhr.status < 300) {  //200-300请求成功
        let string = request.responseText
        //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
        let object = JSON.parse(string)
      }
    }
  }
  request.send() //用于实际发出 HTTP 请求。不带参数为GET请求
}

//promise版本
function ajax2(method, url, data, timeout) {
    const p = new Promise((resolve, reject)=>{
        var xmlhttp, timer;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //  2.设置请求方式和请求地址；
        // 判断请求的类型是POST还是GET
        if (method === 'get') {
            xmlhttp.open(method, url + "?t=" + new Date().getTime(), true);
            xmlhttp.send();
        } else {
            xmlhttp.open(method, url, true);
            // 注意：在post请求中，必须在open和send之间添加HTTP请求头：setRequestHeader(header,value);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            //  3.发送请求；
            xmlhttp.send(data);
        }
        //  4.监听状态的变化；
        xmlhttp.onreadystatechange = function () {
            clearInterval(timer);
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
                    //  5.处理返回的结果；
                    resolve(xmlhttp);//成功后回调；
                } else {
                    reject(xmlhttp);//失败后回调；
                }
            }
        }
        //判断外界是否传入了超时时间
        if (timeout) {
            timer = setInterval(function () {
                xmlhttp.abort();//中断请求
                clearInterval(timer);
            }, timeout);
        }
    })

}
