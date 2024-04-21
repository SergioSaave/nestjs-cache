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

export interface PartRequest {
  anho: string;
  mes: string;
}

export interface PartResponse {
  empresa: Empresa[];
}

export interface FeedRequest {
  anho: string;
}

export interface FeedResponse {
  feed: Empresa[];
}

export const EMPRESA_PACKAGE_NAME = "empresa";

export interface EmpresasClient {
  registros(request: FeedRequest): Observable<FeedResponse>;

  partition(request: PartRequest): Observable<PartResponse>;
}

export interface EmpresasController {
  registros(request: FeedRequest): Promise<FeedResponse> | Observable<FeedResponse> | FeedResponse;

  partition(request: PartRequest): Promise<PartResponse> | Observable<PartResponse> | PartResponse;
}

export function EmpresasControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["registros", "partition"];
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
