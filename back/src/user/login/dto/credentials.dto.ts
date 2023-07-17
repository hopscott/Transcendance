import { IsNotEmpty, IsString } from "class-validator";

export class CredentialsDTO {
	@IsString()
	@IsNotEmpty()
	username: string

	@IsString()
	@IsNotEmpty()
	password: string
}