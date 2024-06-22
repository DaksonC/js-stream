import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class RandomService {
  private readonly logger = new Logger(RandomService.name);
  constructor(private readonly httpService: HttpService) { }

  getRandomNumberStream(): Observable<AxiosResponse<any>> {
    return this.httpService.post('http://localhost:3333/stream/numbers', { random: true }).pipe(
      tap(response => this.logger.log('Received response from random number stream', response.data)),
      map(response => response.data)
    );
  }
}



