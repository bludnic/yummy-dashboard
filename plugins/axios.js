export default ({ $axios, redirect, store, env }) => {
  // $axios.defaults.baseURL = 'https://yummy-rest-api.herokuapp.com' // look in nuxt.config
  $axios.defaults.baseURL = process.env.apiURL
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = 'Bearer ' + store.state.token // set token
    console.log('Making request to:', config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      redirect('/404')
    } else if (code === 401) {
      redirect('/login')
    }
  })
}
