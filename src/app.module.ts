import { Module } from '@nestjs/common';
import { FooController } from './fooController';
import { DataService } from './dataService';


@Module({
  imports: [],
  controllers: [FooController],
  providers: [DataService],
})
export class AppModule {}
