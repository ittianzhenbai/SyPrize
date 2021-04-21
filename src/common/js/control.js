var fn = function(){
    // 三个步骤:
    // 1.获取html的宽,
    let htmlwidth=document.documentElement.clientWidth || document.body.clientWidth;//有些浏览器documentElement获取不到,那就使用后面的body
    // console.log(htmlwidth); 
    // 2.htmlDom
    let htmlDom=document.getElementsByTagName("html")[0]
    // console.log(htmlDom);
    //3.设置根元素样式
    if(htmlwidth<768){
        htmlDom.style.fontSize = htmlwidth/20+'px';
    }else{
        htmlDom.style.fontSize = 16+'px';
    }
    
}
fn();
window.onresize = fn;