import { IsIn, IsNumber, IsString } from 'class-validator';

export class Token42 {
    @IsString()
    access_token: string;

    @IsIn(['bearer'])
    token_type: 'bearer';

    @IsNumber()
    expires_in: number;

    @IsString()
    refresh_token: string;

    @IsString()
    scope: string;

    @IsNumber()
    created_at: number;

    @IsNumber()
    secret_valid_until: number;
}
