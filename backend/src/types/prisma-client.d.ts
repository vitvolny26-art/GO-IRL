declare module '@prisma/client' {
  export class PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    $queryRaw<T = unknown>(
      query: TemplateStringsArray | unknown,
      ...values: unknown[]
    ): Promise<T>;
    $transaction<T>(queries: Promise<T>[]): Promise<T[]>;
  }
}
