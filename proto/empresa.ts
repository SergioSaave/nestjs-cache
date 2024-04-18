/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "empresa";

export interface Empresa {
  id: number;
  rut: string;
  razonSocial: string;
  fechaActuacion: string;
  fechaRegistro: string;
  fechaAprobacionSii: string;
  Anio: number;
  Mes: string;
  ComunaTributaria: string;
  RegionTributaria: number;
  CodigoSociedad: string;
  TipoActuacion: string;
  Capital: number;
  ComunaSocial: string;
  RegionSocial: number;
}

export interface FeedRequest {
}

export interface FeedResponse {
  feed: Empresa[];
}

export const EMPRESA_PACKAGE_NAME = "empresa";

export interface EmpresasClient {
  /** Read operations */

  feed(request: FeedRequest): Observable<FeedResponse>;
}

export interface EmpresasController {
  /** Read operations */

  feed(request: FeedRequest): Promise<FeedResponse> | Observable<FeedResponse> | FeedResponse;
}

export function EmpresasControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["feed"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Empresas", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Empresas", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMPRESAS_SERVICE_NAME = "Empresas";
