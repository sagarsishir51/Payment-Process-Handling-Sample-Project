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
import { Transaction } from '../../../core/domain/transaction/transaction.domain';
import { PAYMENT_PROVIDER, TRANSACTION_STATUS } from '../../../common/enums/transaction/transaction.enum';
import { UserEntity } from '../user/user.entity';

@Entity('transaction')
export class TransactionEntity extends BaseEntity implements Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column({ default: TRANSACTION_STATUS.INITIATED })
  status: TRANSACTION_STATUS;

  @Column()
  paymentProvider: PAYMENT_PROVIDER;

  @Column({ nullable: true })
  remarks: string;

  @Column({nullable: true })
  paymentProviderId: string;

  @Column({nullable: true })
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

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
