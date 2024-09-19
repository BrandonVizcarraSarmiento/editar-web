declare module 'multiparty' {
    import * as http from 'http';
  
    interface File {
      originalFilename: string;
      path: string;
    }
  
    interface Fields {
      [key: string]: string[];
    }
  
    class Form {
      parse(req: http.IncomingMessage, callback: (err: Error | null, fields: Fields, files: { [key: string]: File | File[] }) => void): void;
    }
  
    export default Form;
  }
  