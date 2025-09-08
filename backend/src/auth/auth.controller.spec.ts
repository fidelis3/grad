import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RequestPasswordResetDto } from '../users/dto/request-password-reset.dto';
import { ResetPasswordDto } from '../users/dto/reset-password.dto';
import { ProfessionalRole } from '../users/user.schema';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    requestPasswordReset: jest.fn(),
    resetPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    const registerDto: RegisterUserDto = {
      fullname: 'John Doe',
      email: 'john@example.com',
      professionalRole: ProfessionalRole.PATIENT,
      password: 'Password123',
      confirmPassword: 'Password123',
    };

    it('should register a user successfully', async () => {
      const expectedResult = {
        message: 'User registered successfully',
        user: {
          _id: 'user-id',
          fullname: 'John Doe',
          email: 'john@example.com',
          professionalRole: ProfessionalRole.PATIENT,
        },
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      mockAuthService.register.mockRejectedValue(
        new BadRequestException('Passwords do not match'),
      );

      await expect(controller.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    const loginDto: LoginUserDto = {
      email: 'john@example.com',
      password: 'Password123',
    };

    it('should login user successfully', async () => {
      const expectedResult = {
        message: 'Login successful',
        user: {
          _id: 'user-id',
          email: 'john@example.com',
          professionalRole: ProfessionalRole.PATIENT,
        },
        accessToken: 'jwt-token',
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockAuthService.login.mockRejectedValue(
        new UnauthorizedException('Invalid email or password'),
      );

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('requestPasswordReset', () => {
    const requestDto: RequestPasswordResetDto = {
      email: 'john@example.com',
    };

    it('should request password reset successfully', async () => {
      const expectedResult = {
        message: 'Password reset token generated successfully',
        resetToken: '123456',
        expiresIn: '15 minutes',
      };

      mockAuthService.requestPasswordReset.mockResolvedValue(expectedResult);

      const result = await controller.requestPasswordReset(requestDto);

      expect(authService.requestPasswordReset).toHaveBeenCalledWith(requestDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('resetPassword', () => {
    const resetDto: ResetPasswordDto = {
      resetToken: '123456',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    };

    it('should reset password successfully', async () => {
      const expectedResult = {
        message: 'Password reset successfully. You can now login with your new password.',
      };

      mockAuthService.resetPassword.mockResolvedValue(expectedResult);

      const result = await controller.resetPassword(resetDto);

      expect(authService.resetPassword).toHaveBeenCalledWith(resetDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      mockAuthService.resetPassword.mockRejectedValue(
        new BadRequestException('Passwords do not match'),
      );

      await expect(controller.resetPassword(resetDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
