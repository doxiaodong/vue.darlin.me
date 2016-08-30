import Interceptors from './interceptor'

const httpInterceptor = {
  request: [],
  success: [],
  error: [],
  response: []
}
Interceptors.forEach((interceptor) => {
  if (interceptor.request) {
    httpInterceptor.request.push(interceptor.request)
  }
  if (interceptor.success) {
    httpInterceptor.success.push(interceptor.success)
  }
  if (interceptor.error) {
    httpInterceptor.error.push(interceptor.error)
  }
  if (interceptor.response) {
    httpInterceptor.response.push(interceptor.response)
  }
})

export class Dhttp {

  static dhttpFnRequest(name, ...args) {
    let url = args[0]
    let body = args[1]
    let config = args[2] || {}

    let fetchOptions = {
      method: name.toUpperCase(),
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    }

    if (body) {
      fetchOptions.body = body
    }

    if (config.headers) {
      fetchOptions.headers = config.headers
    }

    if (config.redirect) {
      fetchOptions.redirect = config.redirect
    }

    // fetch start
    // console.log('fetch start')
    httpInterceptor.request.forEach((requestFn) => {
      requestFn(url, fetchOptions)
    })

    let retFetch = fetch(url, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    }, (error) => {
      return Promise.reject(error)
    })

    retFetch.then((response) => {
      // fetch success
      httpInterceptor.success.forEach((successFn) => {
        successFn(response)
      })
      httpInterceptor.response.forEach((responseFn) => {
        responseFn(response)
      })
    }, (error) => {
      // fetch error
      httpInterceptor.error.forEach((errorFn) => {
        errorFn(error)
      })
      httpInterceptor.response.forEach((responseFn) => {
        responseFn(error)
      })
    })

    return retFetch
  }

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, ...args)
    .then((response) => {
      return response
    }, (error) => {
      return Promise.reject(error)
    })
  }

  static request(...args) {
    return this.dhttpFn('request', ...args)
  }

  static get(...args) {
    return this.dhttpFn('get', ...args)
  }

  static post(...args) {
    return this.dhttpFn('post', ...args)
  }

  static put(...args) {
    return this.dhttpFn('put', ...args)
  }

  static delete(...args) {
    return this.dhttpFn('delete', ...args)
  }

  static patch(...args) {
    return this.dhttpFn('patch', ...args)
  }

  static head(...args) {
    return this.dhttpFn('head', ...args)
  }

}

export class Dhttp1 extends Dhttp {

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, ...args)
    .then((response) => {
      if (response.status === 1) {
        return response.data
      } else {
        Promise.reject(response)
      }
    }, (error) => {
      return Promise.reject(error)
    })
  }

}

export class Dhttp2 extends Dhttp {

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, ...args)
    .then((response) => {
      return response
    }, (error) => {
      return Promise.reject(error)
    })
  }

}

export class Dhttp3 extends Dhttp {

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, ...args)
    .then((response) => {
      if (response.status === 1) {
        return response
      } else {
        Promise.reject(response)
      }
    }, (error) => {
      return Promise.reject(error)
    })
  }

}
