import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('account-control-allow-origin', '*')
      .expect('account-control-allow-methods', '*')
      .expect('account-control-allow-headers', '*')
  })
})
