import Vuex from 'vuex'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      ajaxurl: 'https://staging.globalbrands.co.uk/cms/wp-json',
      menu: false,
      loading: false,
      brandcolour: false,
      submenuClass: ''
    },
    mutations: {
      savemenu (state, links) {
        state.menu = links
      },
      updatesubmenuclass (state, newClass) {
        state.submenuClass = newClass
      },
      updateloadingState (state, status) {
        state.loading = status
      },
      updatebrandcolour (state, colour) {
        state.brandcolour = colour
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
