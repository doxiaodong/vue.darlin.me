// import IndexComponent from '../index/index.vue'

export default {
  // components: {
  //   'index-component': IndexComponent
  // },
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
