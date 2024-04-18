import { Module } from '@nestjs/common';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [EmpresaModule],
})
export class AppModule {}