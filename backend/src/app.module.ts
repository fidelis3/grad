import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/defaultdb';
        
        console.log('🔍 Environment check:');
        console.log('MONGO_URI exists:', !!configService.get<string>('MONGO_URI'));
        console.log('MONGO_URI value:', configService.get<string>('MONGO_URI') ? 'Found' : 'Not found');
        console.log('🔗 Using MongoDB connection:', mongoUri.includes('mongodb.net') ? 'Atlas (Cloud)' : 'Local');
        
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule, 
    AuthModule,
    AppointmentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
