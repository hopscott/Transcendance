import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { Request } from 'express';
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PayloadDto } from './dto/payload.dto';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService) { }


    async login(user: any/*, is2FAAuthenticated: boolean*/): Promise<any> {
        const payload: PayloadDto = {
            id: user.id,
            // is2FAEnabled: user.twoFactorAuthStatus,
            // is2FAAuthenticated,
        };
        console.log('payload: ', payload);
        return this.jwtService.sign(payload);
    }

    async signup(dto: AuthDto) {

        // Set default profile pic
        const profilePictureUrl = '/images/logo.png';
        const absoluteUrl = this.config.get('API_BASE_URL') + `${profilePictureUrl}`;
        // Hash password
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    profilePicture: absoluteUrl,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    userPoints: 0,
                    userLevel: 1.4, // a changer
                },
            });
            console.log(this.signToken(user.id, user.email));
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                };
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) throw new ForbiddenException('Credentials incorrect',);

        // Compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        // If password does not match throw exception
        if (!pwMatches) throw new ForbiddenException(
            'Credentials incorrect',
        );
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string): Promise< any > {
        // const payload = {
        //     sub: userId,
        //     email
        // };
        // const secret = this.config.get('JWT_SECRET');

        const payload: PayloadDto = {
            id: userId,
            // is2FAEnabled: user.twoFactorAuthStatus,
            // is2FAAuthenticated,
        };
        console.log('payload: ', payload);
        return {
                accessToken: this.jwtService.sign(payload) }

        // const token = await this.jwtService.signAsync(
        //     payload,
        //     {
        //         expiresIn: '30m',
        //         secret: secret,
        //     },
        // );
        // console.log(token);
        // return {
        //     accessToken: token,
        // };
    }
}