export interface CattsErrorInterface {
  code: number;
  message: string;
  details: string[];
}

export class CattsError extends Error implements CattsErrorInterface {
  code: number;
  details: string[];

  constructor({ code, message, details }: CattsErrorInterface) {
    super(message);
    this.name = "CattsError";
    this.code = code;
    this.details = details;
  }
}