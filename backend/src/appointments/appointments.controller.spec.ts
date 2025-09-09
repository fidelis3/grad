import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  const mockAppointmentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPatientId: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: mockAppointmentsService,
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment successfully', async () => {
      const createDto: CreateAppointmentDto = {
        patientName: 'John Doe',
        patientEmail: 'john@example.com',
        doctorId: 1,
        doctorName: 'Dr. Smith',
        specialty: 'Cardiology',
        date: '2025-01-01',
        time: '10:00',
        type: 'consultation',
        reason: 'Regular checkup',
        status: 'confirmed',
      };

      const mockRequest = { user: { userId: 'user-id' } };
      const mockAppointment = { _id: 'appointment-id', ...createDto };
      mockAppointmentsService.create.mockResolvedValue(mockAppointment);

      const result = await controller.create(createDto, mockRequest);

      expect(service.create).toHaveBeenCalledWith({
        ...createDto,
        patientId: 'temp-patient-id',
        patientName: 'John Doe',
        patientEmail: 'john@example.com',
      });
      expect(result).toEqual(mockAppointment);
    });

    it('should create appointment with default patient name when not provided', async () => {
      const createDto: CreateAppointmentDto = {
        doctorId: 1,
        doctorName: 'Dr. Smith',
        specialty: 'Cardiology',
        date: '2025-01-01',
        time: '10:00',
        type: 'consultation',
        reason: 'Regular checkup',
      };

      const mockRequest = { user: { userId: 'user-id' } };
      const mockAppointment = { _id: 'appointment-id', ...createDto };
      mockAppointmentsService.create.mockResolvedValue(mockAppointment);

      await controller.create(createDto, mockRequest);

      expect(service.create).toHaveBeenCalledWith({
        ...createDto,
        patientId: 'temp-patient-id',
        patientName: 'Test Patient',
      });
    });
  });

  describe('findAll', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [
        { _id: '1', patientName: 'John Doe', reason: 'Checkup' },
        { _id: '2', patientName: 'Jane Smith', reason: 'Follow-up' },
      ];

      mockAppointmentsService.findAll.mockResolvedValue(mockAppointments);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockAppointments);
    });
  });

  describe('findMyAppointments', () => {
    it('should return appointments for logged-in user', async () => {
      const mockRequest = { user: { userId: 'user-id' } };
      const mockAppointments = [
        { _id: '1', patientId: 'user-id', reason: 'Checkup' },
        { _id: '2', patientId: 'user-id', reason: 'Follow-up' },
      ];

      mockAppointmentsService.findByPatientId.mockResolvedValue(mockAppointments);

      const result = await controller.findMyAppointments(mockRequest);

      expect(service.findByPatientId).toHaveBeenCalledWith('user-id');
      expect(result).toEqual(mockAppointments);
    });
  });

  describe('findOne', () => {
    it('should return appointment by id', async () => {
      const appointmentId = 'appointment-id';
      const mockAppointment = { _id: appointmentId, reason: 'Checkup' };

      mockAppointmentsService.findById.mockResolvedValue(mockAppointment);

      const result = await controller.findOne(appointmentId);

      expect(service.findById).toHaveBeenCalledWith(appointmentId);
      expect(result).toEqual(mockAppointment);
    });
  });

  describe('update', () => {
    it('should update appointment successfully', async () => {
      const appointmentId = 'appointment-id';
      const updateData = { reason: 'Updated reason' };
      const updatedAppointment = { _id: appointmentId, ...updateData };

      mockAppointmentsService.update.mockResolvedValue(updatedAppointment);

      const result = await controller.update(appointmentId, updateData);

      expect(service.update).toHaveBeenCalledWith(appointmentId, updateData);
      expect(result).toEqual(updatedAppointment);
    });
  });

  describe('remove', () => {
    it('should delete appointment successfully', async () => {
      const appointmentId = 'appointment-id';

      mockAppointmentsService.delete.mockResolvedValue(undefined);

      const result = await controller.remove(appointmentId);

      expect(service.delete).toHaveBeenCalledWith(appointmentId);
      expect(result).toEqual({ message: 'Appointment deleted successfully' });
    });
  });
});
