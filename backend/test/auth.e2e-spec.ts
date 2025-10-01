import request from 'supertest';

describe('Auth e2e', () => {
  const base = 'http://localhost:4000';
  const email = `auth_e2e_${Date.now()}@example.com`;

  beforeAll(async () => {
    // Register user for login
    await request(base)
      .post('/users/register')
      .send({ email, password: 'secret123', fullname: 'Auth E2E' })
      .set('Accept', 'application/json');
  });

  it('logs in with valid credentials', async () => {
    const res = await request(base)
      .post('/auth/login')
      .send({ email, password: 'secret123' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
  }, 10000);

  it('fails with invalid credentials', async () => {
    const res = await request(base)
      .post('/auth/login')
      .send({ email, password: 'wrong' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(401);
  }, 10000);
});
