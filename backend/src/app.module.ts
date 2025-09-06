// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Explicitly specify the .env file location
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string), // Type assertion or use validation below
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}