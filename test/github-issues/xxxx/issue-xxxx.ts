import {Connection} from "../../../src";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../utils/test-utils";
import {Article} from "./entity/Article";
import {expect} from "chai";


describe.only("github issues > #xxxx null values when inserting new entity through cascaded update", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should return with updated values only", async () => {
        for await (const connection of connections) {
            const savedArticle = await connection.getRepository(Article).save({
                title: "Dummy article",
                content: "Germanus amor una falleres finis est.",
                category: {
                    name: "Dummy category",
                    description: "This is a category",
                },
            });
            const updatedArticle = await connection.getRepository(Article).save({
                id: savedArticle.id,
                content: "My updated content",
                category: {
                    name: "My new category",
                    description: "This is another category.",
                },
            });

            console.log(`Updated article:\n${JSON.stringify(updatedArticle)}`);

            expect(updatedArticle.id).not.to.be.undefined;
            expect(updatedArticle.title).to.be.undefined;
            expect(updatedArticle.content).not.to.be.undefined;
            expect(updatedArticle.content).to.equal("My updated content");
            expect(updatedArticle.category).not.to.be.undefined;
            expect(updatedArticle.category.name).not.to.be.undefined;
            expect(updatedArticle.category.name).to.be.equal("My new category");
            expect(updatedArticle.category.description).not.to.be.undefined;
            expect(updatedArticle.category.description).to.be.equal("This is another category.");
        }
    });
});
