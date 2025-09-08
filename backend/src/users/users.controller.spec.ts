import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfessionalRole } from './user.schema';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        _id: 'user-id',
        fullname: 'John Doe',
        email: 'john@example.com',
        professionalRole: ProfessionalRole.PATIENT,
      };

      mockUsersService.findUserById.mockResolvedValue(mockUser);

      const result = await controller.findUserById('user-id');

      expect(usersService.findUserById).toHaveBeenCalledWith('user-id');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.findUserById.mockResolvedValue(null);

      await expect(controller.findUserById('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findUserByEmail', () => {
    it('should return user when found', async () => {
      const mockUser = {
        _id: 'user-id',
        fullname: 'John Doe',
        email: 'john@example.com',
        professionalRole: ProfessionalRole.PATIENT,
      };

      mockUsersService.findUserByEmail.mockResolvedValue(mockUser);

      const result = await controller.findUserByEmail('john@example.com');

      expect(usersService.findUserByEmail).toHaveBeenCalledWith('john@example.com');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.findUserByEmail.mockResolvedValue(null);

      await expect(controller.findUserByEmail('nonexistent@example.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
