import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomModule } from './random/random.module';

@Module({
  imports: [RandomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
