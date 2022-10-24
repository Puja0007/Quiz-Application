import { SingnupResponse } from './signup.model';

export interface LoginResponse extends SingnupResponse {
  duration: number;
  token: string;
  __v: number;
  _id: string;
}
