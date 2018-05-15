export default function ({ store, error }) {
  if (process.client) {
    console.log('Is client')
  } else {
    console.log('Is server')
  }
  // if (!store.state.auth.user) {
  //   error({
  //     message: 'You are not connected',
  //     statusCode: 403
  //   })
  // }
}
