export const state = () => ({
  products: [],
  product: {},
  editProduct: {},

  editOptionGroup: {
    name: '',
    multiselect: '',
    options: []
  }
})

export const mutations = {
  setProducts (state, products) {
    state.products = products
  },
  setProduct (state, product) {
    state.product = product
  },

  setOptionGroup (state, { index }) {
    console.log('setOptionGroup', index)
    state.product.optionGroups[index] = state.editOptionGroup
  },

  setOptionGroupField (state, { field, value }) {
    console.log('setOptionGroupField', field, value)
    state.editOptionGroup[field] = value
  },

  toEditOptionGroup (state, { index }) {
    console.log('toEdit', index, state.product.optionGroups[index])
    state.editOptionGroup = state.product.optionGroups[index]
  },

  emptyOptionGroup (state) {
    state.editOptionGroup = {}
  },

  addOptionGroup (state) {
    state.product.optionGroups.push(state.editOptionGroup)
  },

  removeOptionGroup (state, { index }) {
    state.product.optionGroups.splice(index, 1)
  }

}

export const actions = {
  async fetchProducts ({ commit }) {
    const products = await this.$axios.$get('/menu')
    commit('setProducts', products)
  },
  async fetchProduct ({ commit }, id) {
    const product = await this.$axios.$get(`/menu/${id}`)
    commit('setProduct', product)
  },
  async deleteProduct ({ dispatch }, id) {
    await this.$axios.$delete(`/menu/${id}`)
    dispatch('fetchProducts')
  }
}
