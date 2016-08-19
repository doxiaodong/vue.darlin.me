import {
  Tabbar,
  TabbarItem
} from 'vux-components/tabbar'

export default {
  components: {
    'tabbar': Tabbar,
    'tabbar-item': TabbarItem
  },
  data() {
    return {
      msg: 'vue.darlin.me'
    }
  },
  watch: {
    msg() {
      console.log(111)
    }
  },
  computed: {
    ttt() {
      return this.msg + 2
    }
  }
}
