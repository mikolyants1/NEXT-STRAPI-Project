import { Prisma, PrismaClient,User } from '@prisma/client';

export class db {
    private static prisma: PrismaClient | null = null;

    public static getPrisma() {
        if (!this.prisma) {
            this.prisma = new PrismaClient();
        }
        return this.prisma;
    }

    public static async getUserById(id: string) {
        const user = await this.getPrisma().user.findUnique({
            where: {
                id,
            },
        });
        return user || null;
    }

    public static async getUserByName(username:string):Promise<User|null> {
        try {
          const user = await this.getPrisma().user.findUnique({
             where: {
                username,
             },
          });
        return user;
       } catch (e) {
         console.log(e)
         return null;
       }
    }

    public static async createUser(data:Prisma.UserCreateInput):Promise<User|null> {
      const user = await this.getPrisma().user.create({
        data
      });
      return user || null;
    }
}