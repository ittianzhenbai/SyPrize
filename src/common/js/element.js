// 导入自己需要的组件
import { 
    InfiniteScroll,
    Button,
    Option,
    Input,
    Form,
    FormItem,
    CheckboxGroup,
    Select,
    Notification
  } from 'element-ui'
  const element = {
    install: function (Vue) {
      Vue.use(InfiniteScroll)
      Vue.use(Button)
      Vue.use(Input)
      Vue.use(Select)
      Vue.use(Option)
      Vue.use(Form)
      Vue.use(FormItem)
      Vue.use(CheckboxGroup)
      Vue.prototype.$notify = Notification
    }
  }
  export default element