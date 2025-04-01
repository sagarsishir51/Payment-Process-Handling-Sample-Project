import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Role} from 'src/core/domain/role/role.domain';
import {PrivilegeEntity} from '../privilege/privilege.entity';

@Entity('role')
export class RoleEntity extends BaseEntity implements Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ unique: true })
  roleName: string;

  @ManyToMany(() => PrivilegeEntity, (privilege) => privilege.roles)
  @JoinTable()
  privileges: PrivilegeEntity[];

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
