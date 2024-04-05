import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Events } from './events.entity';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageLink: string;

  @ManyToOne(() => Events, (event) => event.photos)
  eventId: number;
}
