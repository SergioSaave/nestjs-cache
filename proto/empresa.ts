/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "empresa";

export interface GetEmpresaRequest {
  rut: string;
}

export interface GetEmpresaResponse {
  empresa: Empresa | undefined;
}

export interface GetEmpresasRequest {
}

export interface GetEmpresasResponse {
  empresas: Empresa[];
}

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

export const EMPRESA_PACKAGE_NAME = "empresa";

export interface EmpresaServiceClient {
  getEmpresa(request: GetEmpresaRequest): Observable<GetEmpresaResponse>;

  getEmpresas(request: GetEmpresasRequest): Observable<GetEmpresasResponse>;
}

export interface EmpresaServiceController {
  getEmpresa(
    request: GetEmpresaRequest,
  ): Promise<GetEmpresaResponse> | Observable<GetEmpresaResponse> | GetEmpresaResponse;

  getEmpresas(
    request: GetEmpresasRequest,
  ): Promise<GetEmpresasResponse> | Observable<GetEmpresasResponse> | GetEmpresasResponse;
}

export function EmpresaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getEmpresa", "getEmpresas"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EmpresaService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EmpresaService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMPRESA_SERVICE_NAME = "EmpresaService";
