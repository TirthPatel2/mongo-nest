import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
const DBURL: string = 'mongodb://127.0.0.1/mongo-nest';

@Module({
  imports: [MongooseModule.forRoot(DBURL), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
