import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, ProfessionalRole } from './user.schema';
import { ConflictException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';


jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  const mockUser = {
    _id: 'user-id',
    fullname: 'John Doe',
    email: 'john@example.com',
    professionalRole: ProfessionalRole.DOCTOR,
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    
    const MockUserConstructor = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue({ ...data, _id: 'user-id' }),
    }));

    
    Object.assign(MockUserConstructor, mockUserModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserConstructor,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    const registerUserDto: RegisterUserDto = {
      fullname: 'John Doe',
      email: 'john@example.com',
      professionalRole: ProfessionalRole.DOCTOR,
      password: 'password123',
      confirmPassword: 'password123',
    };

    it('should create a user successfully', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);

      const result = await service.createUser(registerUserDto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: registerUserDto.email });
      expect(result).toBeDefined();
    });

    it('should throw ConflictException if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(service.createUser(registerUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findUserByEmail', () => {
    it('should return user when found', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      mockUserModel.findOne.mockReturnValue({ exec: execMock });

      const result = await service.findUserByEmail('john@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      mockUserModel.findOne.mockReturnValue({ exec: execMock });

      const result = await service.findUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findUserById', () => {
    it('should return user when found', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      mockUserModel.findById.mockReturnValue({ exec: execMock });

      const result = await service.findUserById('user-id');

      expect(mockUserModel.findById).toHaveBeenCalledWith('user-id');
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      mockUserModel.findById.mockReturnValue({ exec: execMock });

      const result = await service.findUserById('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('validateUserCredentials', () => {
    it('should return user when credentials are valid', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      mockUserModel.findOne.mockReturnValue({ exec: execMock });
      mockedBcrypt.compare.mockResolvedValue(true as never);

      const result = await service.validateUserCredentials('john@example.com', 'password123');

      expect(result).toEqual(mockUser);
    });

    it('should return null when credentials are invalid', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      mockUserModel.findOne.mockReturnValue({ exec: execMock });
      mockedBcrypt.compare.mockResolvedValue(false as never);

      const result = await service.validateUserCredentials('john@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });
});