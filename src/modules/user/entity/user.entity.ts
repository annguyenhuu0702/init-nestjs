import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'full_name',
  })
  fullName: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    name: 'phone',
  })
  phone: string;

  @Column({
    name: 'thumbnail',
  })
  thumbnail: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
