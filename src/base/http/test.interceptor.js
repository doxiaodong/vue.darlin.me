export const TestInterceptor = {
  request(url, request) {
    console.log('i request', url, request)
  },

  success(success) {
    console.log('i success', success)
  },

  error(error) {
    console.log('i error', error)
  },

  response(response) {
    console.log('i response', response)
  }
}
