import Vuex from 'vuex'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      ajaxurl: 'https://www.globalbrands.co.uk/cms/wp-json',
      menu: false,
      target: false,
      brandcolour: false,
      submenuClass: '',
      pagename: '',
      mobileMenuStatus: false
    },
    mutations: {
      savemenu (state, links) {
        state.menu = links
      },
      updatesubmenuclass (state, newClass) {
        state.submenuClass = newClass
      },
      deleteScrollTarget (state) {
        state.target = false
      },
      updatepagename (state, name) {
        state.pagename = name
      },
      updatebrandcolour (state, colour) {
        state.brandcolour = colour
      },
      setMobileMenuStatus (state, status) {
        state.mobileMenuStatus = status
      }
    },
    actions: {
      nuxtServerInit (state, {store}) {
        return axios.get(store.state.ajaxurl + '/custom/menu')
          .then((res) => {
            store.commit('savemenu', res.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  })
}

export default store
