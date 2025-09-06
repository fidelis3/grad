import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
MongooseModule.forRoot(process.env.MONGO_URI), // MongoDB connection string
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
