import request from 'supertest';

describe('User e2e', () => {
  const base = 'http://localhost:4000';
  const email = `e2e_test_${Date.now()}@example.com`;

  it('registers a new user (happy path)', async () => {
    const res = await request(base)
      .post('/users/register')
      .send({ email, password: 'secret123', fullname: 'E2E Test' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    const body = res.body as { id?: number; email?: string; password?: string };
    expect(body).toHaveProperty('id');
    expect(body.email).toBe(email);
    expect(body).not.toHaveProperty('password');
  }, 10000);

  it('fails to register duplicate email', async () => {
    const res = await request(base)
      .post('/users/register')
      .send({ email, password: 'secret123', fullname: 'E2E Test' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(409);
  }, 10000);
});
