import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { Injectable, Logger } from '@nestjs/common';
import { nullToUndefined } from 'src/common/utils';

@Injectable()
export class RoleService {
    private readonly logger = new Logger(RoleService.name);
    constructor(private readonly prismaService: PrismaService) { }

    // Create
    public async create(inputs: Prisma.RoleCreateInput) {
        this.logger.verbose(`--> Role creation started`);
        const role = await this.prismaService.role.create(
            {
                data: inputs,
            },
        );
        this.logger.verbose(`--> Role created`);
        return role;
    }

    // Update
    public async update(
        inputs: Prisma.RoleUncheckedUpdateInput,
        id: string,
    ) {
        this.logger.verbose(`--> role updating started`);
        const role = await this.prismaService.role.update({
            data: inputs,
            where: { id },
        });
        this.logger.verbose(`--> role updated`);
        return role;
    }

    // Get by name
    public async getByName(name: string) {
        this.logger.verbose(`--> Role by name started`);
        const role = await this.prismaService.role.findUnique({
            where: {
                name: name,
            },
        });
        this.logger.verbose(`--> dashboard fetched`);


        return { ...role };
    }

    // list
    public async list(query?: any) {
        this.logger.verbose(`--> roles list started`);

        const total = await this.prismaService.role.count({
            where: query.where,
        });
        const roles =
            await this.prismaService.role.findMany({
                ...query,
                where: {
                    ...query.where,
                },
            });
        this.logger.verbose(`--> roles fetched`);
        return {
            total: total,
            items: roles.map((role) => nullToUndefined(role)),
        };
    }
}
