import {MongoClient} from 'mongodb';
import * as config from "config";

describe('insert', () => {
    it("should just be", () => {
        expect(2+2).toBe(4);
    })
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(config.get("mongoURI"), {
//       useNewUrlParser: true,
//     });
//     db = await connection.db("test");
//   });

//   afterAll(async () => {
//     await db.collection('users').deleteMany({})
//     await connection.close();
//     await db.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });
});