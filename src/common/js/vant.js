//按需引入vant组件
import { 
    DatetimePicker,
    Popup,
    Divider,
    Overlay
} from 'vant';
const vant = {
    install:function(Vue){
        Vue.use(DatetimePicker)
        Vue.use(Popup)
        Vue.use(Divider)
        Vue.use(Overlay);
    }
}
export default vant
