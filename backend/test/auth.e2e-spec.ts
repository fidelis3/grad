// auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/doctor-signup (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/doctor-signup')
      .send({
        fullname: 'Dr Test',
        email: 'test@doctor.com',
        professionalRole: 'doctor',
        password: 'password123',
        confirmPassword: 'password123',
      })
      .expect(201);

    // Type-safe access
    expect(response.body).toHaveProperty('accessToken');
  });

  afterAll(async () => {
    await app.close();
  });
});
