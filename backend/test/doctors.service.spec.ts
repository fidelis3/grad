import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DoctorsService } from '../src/doctors/doctors.service';
import { Doctor } from '../src/doctors/schemas/doctor.schema';
import { Types } from 'mongoose';
import { UsersService } from '../src/users/users.service';
import { AppointmentsService } from '../src/appointments/appointments.service';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let mockDoctorModel;
  let mockUsersService;
  let mockAppointmentsService;

  beforeEach(async () => {
    mockDoctorModel = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    mockUsersService = {
      findById: jest.fn(),
    };
    mockAppointmentsService = {
      findByDoctorId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { provide: getModelToken(Doctor.name), useValue: mockDoctorModel },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { provide: UsersService, useValue: mockUsersService },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { provide: AppointmentsService, useValue: mockAppointmentsService },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
  });

  it('should fetch dashboard data successfully', async () => {
    const mockUserId = new Types.ObjectId('507f1f77bcf86cd799439011'); // Fixed: ObjectId
    const mockUser = { fullname: 'Dr Sara Chen', professionalRole: 'doctor' };
    const mockDoctor = { specialty: 'General' }; // Typed mock, no unsafe access
    const mockAppointments = [
      { patientId: 'patient1' },
      { patientId: 'patient2' },
    ]; // For count

    mockUsersService.findById.mockResolvedValue(mockUser);
    mockDoctorModel.findOne.mockResolvedValue(mockDoctor as Doctor); // Typed as Doctor
    mockAppointmentsService.findByDoctorId.mockResolvedValue(mockAppointments);

    const result = await service.getDashboardData(mockUserId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.fullName).toBe('Dr Sara Chen');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.specialty).toBe('General');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(mockUsersService.findById).toHaveBeenCalledWith(
      mockUserId.toString(),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(mockDoctorModel.findOne).toHaveBeenCalledWith({
      userId: mockUserId,
    });
  });

  it('should throw ForbiddenException if not doctor', async () => {
    const mockUserId = new Types.ObjectId('507f1f77bcf86cd799439011');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mockUsersService.findById.mockResolvedValue({
      professionalRole: 'patient',
    });

    await expect(service.getDashboardData(mockUserId)).rejects.toThrow(
      'Access denied: Doctor only',
    );
  });
});

