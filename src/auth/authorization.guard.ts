import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        // Add your custom logic here
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}