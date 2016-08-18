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

    // fetch start
    console.log('fetch start')
    return fetch(url, {
      method: name.toUpperCase(),
      body: body,
      headers: config.headers
    }).then((response) => {
      // fetch success
      console.log('fetch success')
      console.log('fetch complete')
      return response
    }, (error) => {
      // fetch error
      console.log('fetch error')
      console.log('fetch complete')
      return Promise.reject(error)
    })
  }

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, args)
    .then((response) => {
      console.log('1:', response)
      return response
    }, (error) => {
      console.log('1:', error)
      return Promise.reject(error)
    })
  }

  static request(...args) {
    return this.dhttpFn('request', args)
  }

  static get(...args) {
    return this.dhttpFn('get', args)
  }

  static post(...args) {
    return this.dhttpFn('post', args)
  }

  static put(...args) {
    return this.dhttpFn('put', args)
  }

  static delete(...args) {
    return this.dhttpFn('delete', args)
  }

  static patch(...args) {
    return this.dhttpFn('patch', args)
  }

  static head(...args) {
    return this.dhttpFn('head', args)
  }

}

export class Dhttp2 extends Dhttp {

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, args)
    .then((response) => {
      console.log('2:', response)
      return response
    }, (error) => {
      console.log('2:', error)
      return Promise.reject(error)
    })
  }

}

export class Dhttp3 extends Dhttp {

  static dhttpFn(name, ...args) {
    return this.dhttpFnRequest(name, args)
    .then((response) => {
      console.log('3:', response)
      return response
    }, (error) => {
      console.log('3:', error)
      return Promise.reject(error)
    })
  }

}
