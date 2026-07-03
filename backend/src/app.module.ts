import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PositiveTagsModule } from './positive-tags/positive-tags.module';
import { NegativeTagsModule } from './negative-tags/negative-tags.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    PositiveTagsModule,
    NegativeTagsModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
