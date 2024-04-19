import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

@Module({
  controllers: [AppController],
  providers: [AppService, AppController]
})
export class HttpModule {}
