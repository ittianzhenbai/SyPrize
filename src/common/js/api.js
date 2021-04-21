import axios from 'axios'
let BASE_URL = ''
if(process.env.NODE_ENV == "development"){
    BASE_URL = "http://syjn.nzsoso.com/"
}else{
    BASE_URL = "http://syjn.nzsoso.com/"
}
axios.defaults.baseURL = BASE_URL;
//使用自定义配置新建一个 axios 实例，指定的配置将与实例的配置合并
const request = axios.create({
    baseURL:BASE_URL,// api 的 base_url
    timeout: 5000,// 请求超时时间
    });
request.interceptors.request.use(config=>{
    // console.log("响应前拦截",config)
    return config
},err =>{
    console.log("响应前拦截",err)
})
request.interceptors.response.use(result => {
    // console.log("响应拦截的正确信息为",result)
    /*
        510 未获取到token参数
    */
    return result.data//拦截放行
},err=>{
    console.log("响应拦截的错误信息为",err,err.response.status)
})



export default request