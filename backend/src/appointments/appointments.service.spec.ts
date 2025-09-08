import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentsService } from './appointments.service';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let model: Model<AppointmentDocument>;

  const mockAppointmentModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getModelToken(Appointment.name),
          useValue: mockAppointmentModel,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    model = module.get<Model<AppointmentDocument>>(getModelToken(Appointment.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment successfully', async () => {
      const createDto: CreateAppointmentDto = {
        patientId: 'patient-id',
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

      const mockAppointment = {
        _id: 'appointment-id',
        ...createDto,
        save: jest.fn().mockResolvedValue({
          _id: 'appointment-id',
          ...createDto,
        }),
      };

      // Mock the constructor
      const mockConstructor = jest.fn().mockImplementation(() => mockAppointment);
      (service as any).appointmentModel = mockConstructor;

      const result = await service.create(createDto);

      expect(mockAppointment.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [
        { _id: '1', patientId: 'patient-1', reason: 'Checkup' },
        { _id: '2', patientId: 'patient-2', reason: 'Follow-up' },
      ];

      mockAppointmentModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAppointments),
      });

      const result = await service.findAll();

      expect(mockAppointmentModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockAppointments);
    });
  });

  describe('findByPatientId', () => {
    it('should return appointments for a specific patient', async () => {
      const patientId = 'patient-id';
      const mockAppointments = [
        { _id: '1', patientId, reason: 'Checkup' },
        { _id: '2', patientId, reason: 'Follow-up' },
      ];

      mockAppointmentModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAppointments),
      });

      const result = await service.findByPatientId(patientId);

      expect(mockAppointmentModel.find).toHaveBeenCalledWith({ patientId });
      expect(result).toEqual(mockAppointments);
    });
  });

  describe('findById', () => {
    it('should return appointment by id', async () => {
      const appointmentId = 'appointment-id';
      const mockAppointment = { _id: appointmentId, reason: 'Checkup' };

      mockAppointmentModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAppointment),
      });

      const result = await service.findById(appointmentId);

      expect(mockAppointmentModel.findById).toHaveBeenCalledWith(appointmentId);
      expect(result).toEqual(mockAppointment);
    });

    it('should return null if appointment not found', async () => {
      mockAppointmentModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.findById('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update appointment successfully', async () => {
      const appointmentId = 'appointment-id';
      const updateData = { reason: 'Updated reason' };
      const updatedAppointment = { _id: appointmentId, ...updateData };

      mockAppointmentModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedAppointment),
      });

      const result = await service.update(appointmentId, updateData);

      expect(mockAppointmentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        appointmentId,
        updateData,
        { new: true },
      );
      expect(result).toEqual(updatedAppointment);
    });
  });

  describe('delete', () => {
    it('should delete appointment successfully', async () => {
      const appointmentId = 'appointment-id';

      mockAppointmentModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      });

      await service.delete(appointmentId);

      expect(mockAppointmentModel.findByIdAndDelete).toHaveBeenCalledWith(appointmentId);
    });
  });
});
