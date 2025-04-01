import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {RoleEntity} from '../role/role.entity';
import {PRIVILEGE_NAME, PRIVILEGE_SUBNAME,} from 'src/common/enums/privilege/privilege.enum';

@Entity('privilege')
@Index(['privilegeName', 'privilegeSubName'], { unique: true })
export class PrivilegeEntity extends BaseEntity implements Privilege {
  @PrimaryGeneratedColumn()
  privilegeId: number;

  @Column()
  privilegeName: PRIVILEGE_NAME;

  @Column()
  privilegeSubName: PRIVILEGE_SUBNAME;

  @ManyToMany(() => RoleEntity, (role) => role.privileges)
  roles: RoleEntity[];

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
