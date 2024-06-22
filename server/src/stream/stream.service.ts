import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class StreamService {
  generateRandomNumberStream(): Observable<number> {
    return interval(100).pipe(
      map(() => Math.floor(Math.random() * 1000)),
    );
  }
}


