import Cookies from 'cookies'

export const state = () => ({
  sidebar: false,
  options: {},

  user: null,
  token: null
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setOptions (state, options) {
    state.options = options
  },

  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },

  SET_TOKEN (state, token) {
    state.token = token
  },

  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app, req, res, redirect }) {
    // Set options
    const options = await app.$axios.$get('/options')
    commit('setOptions', options)

    // Set token from cookies
    const cookies = new Cookies(req, res)
    const token = cookies.get('token')

    if (token) {
      commit('SET_TOKEN', token)
    } else {
      redirect('/login')
    }
  }
}

export const strict = false
