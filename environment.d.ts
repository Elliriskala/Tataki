declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DT_KEY:string;
        DB_HOST:string;
        DB_USER:string;
        DB_PASS:string;
        DB_NAME:string;
        JWT_SECRET:string;
      }
    }
  }
  
  export {};
  