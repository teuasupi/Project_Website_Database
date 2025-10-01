import request from 'supertest';

describe('Protected route e2e', () => {
  const base = 'http://localhost:4000';
  const email = `protected_e2e_${Date.now()}@example.com`;
  let token: string;

  it('registers and logs in then accesses protected /users/me', async () => {
    const reg = await request(base)
      .post('/users/register')
      .send({ email, password: 'secret123', fullname: 'Protected E2E' })
      .set('Accept', 'application/json');
    expect(reg.status).toBe(201);

    const login = await request(base)
      .post('/auth/login')
      .send({ email, password: 'secret123' })
      .set('Accept', 'application/json');
    expect(login.status).toBe(201);
    const loginBody = login.body as { access_token?: string };
    expect(loginBody).toHaveProperty('access_token');
    token = loginBody.access_token as string;

    const res = await request(base)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const resBody = res.body as { id?: number; email?: string };
    expect(resBody).toHaveProperty('id');
    expect(resBody.email).toBe(email);
  }, 20000);
});
