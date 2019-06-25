import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "../../../../src";
import {Category} from "./Category";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.articles, { cascade: [ "insert", "update" ]})
    category: Category;

    @Column()
    content: string;

    @Column()
    title: string;

}
