import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RequestPasswordResetDto } from '../users/dto/request-password-reset.dto';
import { ResetPasswordDto } from '../users/dto/reset-password.dto';
import { ProfessionalRole } from '../users/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    createUser: jest.fn(),
    validateUserCredentials: jest.fn(),
    generatePasswordResetToken: jest.fn(),
    resetPassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const mockUser = {
        _id: 'user-id',
        fullname: 'John Doe',
        email: 'john@example.com',
        professionalRole: ProfessionalRole.PATIENT,
        password: 'hashedPassword',
      };

      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await service.register(registerDto);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual({
        message: 'User registered successfully',
        user: {
          _id: 'user-id',
          fullname: 'John Doe',
          email: 'john@example.com',
          professionalRole: ProfessionalRole.PATIENT,
        },
      });
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      const invalidDto = {
        ...registerDto,
        confirmPassword: 'DifferentPassword',
      };

      await expect(service.register(invalidDto)).rejects.toThrow(
        new BadRequestException('Passwords do not match'),
      );
      expect(mockUsersService.createUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginDto: LoginUserDto = {
      email: 'john@example.com',
      password: 'Password123',
    };

    it('should login user successfully', async () => {
      const mockUser = {
        _id: 'user-id',
        email: 'john@example.com',
        professionalRole: ProfessionalRole.PATIENT,
        password: 'hashedPassword',
        toObject: jest.fn().mockReturnValue({
          _id: 'user-id',
          email: 'john@example.com',
          professionalRole: ProfessionalRole.PATIENT,
          password: 'hashedPassword',
        }),
      };

      const mockToken = 'jwt-token';

      mockUsersService.validateUserCredentials.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(loginDto);

      expect(mockUsersService.validateUserCredentials).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: 'user-id',
        email: 'john@example.com',
        professionalRole: ProfessionalRole.PATIENT,
      });
      expect(result).toEqual({
        message: 'Login successful',
        user: {
          _id: 'user-id',
          email: 'john@example.com',
          professionalRole: ProfessionalRole.PATIENT,
        },
        accessToken: mockToken,
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUsersService.validateUserCredentials.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password'),
      );
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('requestPasswordReset', () => {
    const requestDto: RequestPasswordResetDto = {
      email: 'john@example.com',
    };

    it('should generate password reset token successfully', async () => {
      const mockToken = '123456';
      mockUsersService.generatePasswordResetToken.mockResolvedValue(mockToken);

      const result = await service.requestPasswordReset(requestDto);

      expect(mockUsersService.generatePasswordResetToken).toHaveBeenCalledWith(
        requestDto.email,
      );
      expect(result).toEqual({
        message: 'Password reset token generated successfully',
        resetToken: mockToken,
        expiresIn: '15 minutes',
      });
    });
  });

  describe('resetPassword', () => {
    const resetDto: ResetPasswordDto = {
      resetToken: '123456',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    };

    it('should reset password successfully', async () => {
      mockUsersService.resetPassword.mockResolvedValue(undefined);

      const result = await service.resetPassword(resetDto);

      expect(mockUsersService.resetPassword).toHaveBeenCalledWith(
        resetDto.resetToken,
        resetDto.newPassword,
      );
      expect(result).toEqual({
        message: 'Password reset successfully. You can now login with your new password.',
      });
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      const invalidDto = {
        ...resetDto,
        confirmPassword: 'DifferentPassword',
      };

      await expect(service.resetPassword(invalidDto)).rejects.toThrow(
        new BadRequestException('Passwords do not match'),
      );
      expect(mockUsersService.resetPassword).not.toHaveBeenCalled();
    });
  });
});
