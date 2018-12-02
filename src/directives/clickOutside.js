import Vue from 'vue';
Vue.directive('click-outside', {
  priority: 700,
  bind(el, binding, vnode) {
    let self = this
    event = function(event) {
      console.log('emitting event')
      self.vm.$emit(self.expression, event)
    }
    el.addEventListener('click', stopProp)
    document.body.addEventListener('click', event)
  },

  unbind(el, binding, vnode) {
    console.log('unbind')
    el.removeEventListener('click', stopProp)
    document.body.removeEventListener('click', event)
  },
  stopProp(event) {
    event.stopPropagation()
  }
});
