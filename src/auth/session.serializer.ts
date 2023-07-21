import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {


    serializeUser(user: any, done: CallableFunction) {
        done(null, user);
    }

    async deserializeUser(payload: string, done: CallableFunction) {
        done(null, payload)
    }
}