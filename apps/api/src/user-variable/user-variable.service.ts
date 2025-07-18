import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { Injectable, Logger } from '@nestjs/common';
import { nullToUndefined } from 'src/common/utils';

@Injectable()
export class UserVariableService {
  private readonly logger = new Logger(UserVariableService.name);
  constructor(private readonly prismaService: PrismaService) { }

  public async create(inputs: Prisma.UserVariableCreateInput) {
    this.logger.verbose(`--> user variable creation started`);
    const userVariable = await this.prismaService.userVariable.create({
      data: inputs,
    });
    this.logger.verbose(`--> user variable created`);
    return userVariable;
  }

  public async list(query?: any) {
    this.logger.verbose(`--> user variables list started`);

    this.logger.debug(`--> user variables list query: ${JSON.stringify(query)}`);
    const total = await this.prismaService.userVariable.count({
      where: query?.where,
    });
    const userVariable = await this.prismaService.userVariable.findMany(query);
    this.logger.verbose(`--> user variables fetched`);
    return {
      total: total,
      items: userVariable.map((dashboard) => nullToUndefined(dashboard)),
    };
  }

  public async getById(id: string) {
    this.logger.verbose(`--> user variable by id started`);
    const userVariable = await this.prismaService.userVariable.findUnique({
      where: {
        id,
      },
    });
    this.logger.verbose(`--> user variable fetched`);
    return userVariable;
  }

  public async getByUserId(id: string) {
    this.logger.verbose(`--> user variable by ownerId started`);
    const userVariable = await this.prismaService.userVariable.findMany({
      where: {
        ownerId: id,
      },
    });
    this.logger.verbose(`--> user variable fetched`);
    return userVariable;
  }

  public async getByUserIdAndQuery(
    id: string,
    query: { [key: string]: string | number },
  ) {
    this.logger.verbose(`--> user variable by ownerId and key started`);
    const userVariable = await this.prismaService.userVariable.findFirst({
      where: {
        ownerId: id,
        ...query,
      },
    });
    this.logger.verbose(`--> user variable fetched`);
    return userVariable;
  }

  public async update(
    inputs: Prisma.UserVariableUncheckedUpdateInput,
    id: string,
  ) {
    this.logger.verbose(`--> user variable updating started`);

    const widget = await this.prismaService.userVariable.update({
      data: { ...inputs, isPublic: inputs.isPublic ? true : false },
      where: { id },
    });
    this.logger.verbose(`--> user variable updated`);
    return widget;
  }

  // Delete the user variable
  public async delete(id: string) {
    this.logger.verbose(`--> user variable deletion started`);
    const userVariable = await this.prismaService.userVariable.delete({
      where: { id },
    });
    this.logger.verbose(`--> user variable deleted`);
    return userVariable;
  }
}
