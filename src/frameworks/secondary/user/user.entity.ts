import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from 'src/core/domain/user/user.domain';
import {RoleEntity} from '../role/role.entity';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

@Entity('user')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: USER_STATUS.NOT_VERIFIED })
  userStatus: USER_STATUS;

  @ManyToOne(() => RoleEntity, { nullable: false })
  role: RoleEntity;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Date;
}
