import {Column, Entity, OneToMany, PrimaryColumn} from "../../../../src";
import {Article} from "./Article";

@Entity()
export class Category {

    @PrimaryColumn()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Article, article => article.category)
    articles: Article[];

}
