import Vue from 'vue'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js Isu App')
  })
})
