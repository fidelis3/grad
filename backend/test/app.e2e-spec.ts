import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
const request = require('supertest');
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should handle 404 for non-existent routes', () => {
    return request(app.getHttpServer())
      .get('/non-existent-route')
      .expect(404);
  });

  describe('Authentication endpoints', () => {
    it('POST /auth/register should validate request body', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          fullname: 'John Doe',
          email: 'invalid-email',
          professionalRole: 'patient',
          password: 'Password123',
          confirmPassword: 'Password123',
        })
        .expect(400);
    });

    it('POST /auth/login should validate request body', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: '',
        })
        .expect(400);
    });
  });

  describe('Appointments endpoints', () => {
    it('GET /api/appointments should return response', () => {
      return request(app.getHttpServer())
        .get('/api/appointments')
        .expect(200);
    });

    it('POST /api/appointments should validate request body', () => {
      return request(app.getHttpServer())
        .post('/api/appointments')
        .send({
          // Missing required fields
          doctorName: 'Dr. Smith',
        })
        .expect(400);
    });
  });
});
