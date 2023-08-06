import { INestApplicationContext, Logger } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConfigService } from "@nestjs/config";
import { ServerOptions } from "socket.io";

export class SocketIOAdapter extends IoAdapter {
    private readonly logger = new Logger(SocketIOAdapter.name);
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        // const clientPort = parseInt(this.configService.get('CLIENT_PORT'));

        this.logger.log("Configuring SocketIO server with custom CORS options", {
            ...options,
        });

        const optionsWithCORS: ServerOptions = {
            ...options,
        };

        return super.createIOServer(port, optionsWithCORS);

    };

}