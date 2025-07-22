const request = require('supertest')
const { expect } = require('chai')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            //capturar o token
            const loginResponse = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'henrique',
                    'senha': '123456'
                })

                const token = loginResponse.body.token

            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 4,
                    contaDestino: 3,
                    valor: 10.00,
                    token: ''
                })
            expect(response.status).to.equal(201)
        })

        it('Deve retornar erro com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {

            const loginResponse = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'henrique',
                    'senha': '123456'
                })

            const token = loginResponse.body.token
            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 4,
                    contaDestino: 3,
                    valor: 9.00,
                    token: ''
                })
            expect(response.status).to.equal(422)
        })
    })
})