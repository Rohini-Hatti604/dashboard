import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface InterfaceService {
  SendRequest(data: {
    app_id: string;
    resource_path: string;
    request_data: any;
  }, metadata: any): Observable<any>;
}

interface InterfaceResponse {
  status: boolean; // Indicates if the request was successful or not (true for success, false for failure).
  message: string; // Optional message giving more context about the response (e.g., error details, success message).
  response_data: string;
}

@Injectable()
export class GrpcService {
  private interfaceService: InterfaceService;

  constructor(@Inject('IAM') private client: ClientGrpc, private configService: ConfigService) { }

  onModuleInit() {
    this.interfaceService =
      this.client.getService<InterfaceService>('InterfaceService');
  }

  getUserDetails(session_id: string): Observable<InterfaceResponse> {

    // Configure metadata with app_id and auth_key
    const metadata = new Metadata();
    metadata.add('app_id', this.configService.get('GRPC_APP_ID') ?? "");
    metadata.add('auth_key', this.configService.get('GRPC_AUTH_KEY') ?? "");

    // Added metadata to the request
    return this.interfaceService.SendRequest({
      app_id: this.configService.get('GRPC_APP_ID') ?? "",
      resource_path: 'get_user_detail',
      request_data: JSON.stringify({
        session_id: session_id,
      }),
    }, metadata);

    // "{\"session_id\": \"50a42b6f-353c-46ef-b191-362206ac00a4\",}"
  }

  logout(session_id: string): Observable<InterfaceResponse> {

    // Configure metadata with app_id and auth_key
    const metadata = new Metadata();
    metadata.add('app_id', this.configService.get('GRPC_APP_ID') ?? "");
    metadata.add('auth_key', this.configService.get('GRPC_AUTH_KEY') ?? "");

    // Added metadata to the request
    return this.interfaceService.SendRequest({
      app_id: this.configService.get('GRPC_APP_ID') ?? "",
      resource_path: 'logout',
      request_data: JSON.stringify({
        session_id: session_id,
      }),
    }, metadata);

    // "{\"session_id\": \"50a42b6f-353c-46ef-b191-362206ac00a4\",}"
  }
}
