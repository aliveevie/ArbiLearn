declare module '@vercel/blob' {
  export interface PutOptions {
    access?: 'public' | 'private';
    contentType?: string;
    addRandomSuffix?: boolean;
  }

  export interface PutResponse {
    url: string;
    pathname: string;
  }

  export function put(
    path: string, 
    file: Blob | ArrayBuffer | Uint8Array | File, 
    options?: PutOptions
  ): Promise<PutResponse>;
} 