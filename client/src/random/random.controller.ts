import { Controller, Logger, Post } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  private readonly logger = new Logger(RandomController.name);
  constructor(private readonly randomService: RandomService) { }

  @Post('numbers')
  streamNumbers(): Observable<MessageEvent> {
    return this.randomService.getRandomNumberStream().pipe(
      tap(data => this.logger.log(`Processing data: ${data}`)),
      map(data => {
        const event = { data: data.toString() } as MessageEvent;
        this.logger.log(`Emitting event: ${JSON.stringify(event)}`);
        return event;
      })
    );
  }
}


