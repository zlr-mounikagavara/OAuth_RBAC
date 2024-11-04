import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDto {
@ApiProperty({
    description: 'Email address of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

}
