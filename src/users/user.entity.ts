import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  provider: string;

  @Column({ nullable: true })
  accessToken: string;
}
