import _ from 'lodash'
// TODO: move methods to packages/ as crane-cli packages
export default {
  data () {
    return {
      craneStates: {},
    }
  },

  computed: {
    routeParams () {
      return this.$route.params
    }
  },

  methods: {
    getAttr (target, key) {
      return target[key]
    },

    linkTo (url) {
      this.$router.push(url)
    },

    linkToByName (name, params) {
      this.$router.push({
        name,
        params,
      })
    },

    getState (key) {
      return this.craneStates[key]
    },

    setState (state_id, value) {
      this.$set(this.craneStates, state_id, value)
    },

    getComponent (component_id) {
      return this.$refs[component_id]
    },

    excute (component_id, method, ...args) {
      const component = this.getComponent(component_id)
      if (component && _.isFunction(component[method])) {
        component[method](...args)
      }
    },

    translate (path) {
      return this.$t(path)
    },

    sum (a, b) {
      return a + b
    },
  },
}
