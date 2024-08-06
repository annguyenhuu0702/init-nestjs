import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

const phoneNumberRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'Mickey',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '0384974745',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(phoneNumberRegex, { message: 'Phone number is not valid for Vietnam' })
  phone: string;

  @ApiPropertyOptional({
    description: 'The thumbnail URL of the user',
    example: 'http://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  thumbnail: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'Mickey',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '0384974745',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(phoneNumberRegex, { message: 'Phone number is not valid for Vietnam' })
  phone: string;

  @ApiPropertyOptional({
    description: 'The thumbnail URL of the user',
    example: 'http://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
