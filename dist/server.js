"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
async function bootstrap() {
    const server = app_1.default.listen(config_1.port, () => {
        console.log(`Server running on port ${config_1.port}`);
    });
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed');
            });
        }
        process.exit(1);
    };
    const unexpectedErrorHandler = (error) => {
        console.error(error);
        exitHandler();
    };
    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', () => {
        console.log('SIGTERM received');
        if (server) {
            server.close();
        }
    });
}
bootstrap();
