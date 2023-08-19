import { MockHandler } from 'vite-plugin-mock-server'

const mocks: MockHandler[] = [
  {
    pattern: '/api/auth/login',
    handle: (req, res) => {
      const { userName, passWord } = req.body
      console.log(`>>> userName=[${userName}], passWord=[${passWord}]`)
      res.end('Hello world!' + req.url)
    }
  },
  {
    pattern: '/api/auth/users/{userId}',
    method: 'POST',
    handle: (req, res) => {
      const data = {
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    }
  }
]

export default mocks
