import {z} from 'zod';
import {plainToInstance, Type} from 'class-transformer';
import {Role} from '../role/role.domain';
import {CreateUserProps, UpdateUserProps} from './user.types';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

export class User {
  userId: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  image: string;
  userStatus: USER_STATUS;

  @Type(() => Role)
  role: Role;

  createdAt: Date;
  updatedAt: Date;

  static readonly #validator = z.object({
    userName: z.string().nullish(),
    email: z.string().email(),
    phone: z.string().nullish(),
    password: z.string(),
    image: z.string().nullish(),
    userStatus: z.nativeEnum(USER_STATUS).default(USER_STATUS.NOT_VERIFIED),
    role: z.intersection(z.instanceof(Role), z.object({ roleId: z.number() })),
    homeAddress: z.string().nullish(),
    employeeNo: z.string().nullish(),
    designation: z.string().nullish(),
    dateOfBirth: z.date().nullish(),
    signature: z.string().nullish(),
    document: z.string().nullish(),
  });

  static create(createUserProps: CreateUserProps) {
    return plainToInstance(User, this.#validator.parse(createUserProps), {
      exposeUnsetFields: false,
    });
  }

  static update(updateUserProps: UpdateUserProps) {
    return plainToInstance(
      User,
      this.#validator.partial().parse(updateUserProps),
      { exposeUnsetFields: false },
    );
  }

  static toDomain(user: User) {
    return plainToInstance(User, user, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
    });
  }

  static toDomains(users: User[]) {
    return users?.map(this.toDomain);
  }
}
