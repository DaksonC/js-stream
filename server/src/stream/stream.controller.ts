import { Controller, Post, Body, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private readonly randomNumberStreamService: StreamService) { }

  @Post('numbers')
  @Sse()
  streamNumbers(@Body() body: { random: boolean }): Observable<MessageEvent> {
    console.log(`Received request with body: ${JSON.stringify(body)}`);
    if (body.random) {
      return this.randomNumberStreamService.generateRandomNumberStream().pipe(
        map(number => {
          const event = { data: number.toString() } as MessageEvent;
          console.log(`Emitting event: ${JSON.stringify(event)}`);
          return event;
        })
      );
    }
    throw new Error('Invalid request body');
  }
}


