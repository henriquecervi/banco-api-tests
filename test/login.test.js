const request = require('supertest')
const { expect } = require('chai')

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando utilizar credenciais válidas', async () => {
            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'henrique',
                    'password': '123456'
                })

            expect(response.status).to.equal(200)
            expect(response.body.token).to.be.not.empty()
            expect(response.body.token).to.be.a('string')
        })
    })
})