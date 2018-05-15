export const state = () => ({
  orders: [],
  order: {}
})

export const getters = {
  getLineItemOptionQuantity: (state) => ({ menuitemId, groupId, optionId }) => {

  }
}

export const mutations = {
  setOrders (state, orders) {
    state.orders = orders
  },
  setOrder (state, order) {
    state.order = order
  }
}

export const actions = {
  async fetchOrders ({ commit }) {
    const orders = await this.$axios.$get('/order')
    commit('setOrders', orders)
  },
  async fetchOrder ({ commit }, id) {
    const order = await this.$axios.$get(`/order/${id}`)
    commit('setOrder', order)
  },
  async updateOrder ({ commit, state }) {
    const id = state.order._id
    const order = await this.$axios.$put(`/order/${id}`, state.order)
    commit('setOrder', order)
  },
  async deleteOrder ({ dispatch }, id) {
    await this.$axios.$delete(`/order/${id}`)
    dispatch('fetchOrders')
  }
}
