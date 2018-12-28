import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const students = [
    { name: '홍길동', depart: '물리', grade: 4.3},
    { name: '임꺽정', depart: '컴퓨터공학', grade: 4.2},
    { name: '장길산', depart: '정보통신공학', grade: 3.8},
]

const typeDefs = gql`
  type Query {    
    students: [Student]
    studentFindOne(name: String): Student
  }
  type Student {
      name: String
      depart: String
      grade: Float      
  }
`;

const resolvers = {
  Query: {
    students: () => students,
    studentFindOne: (_, args) => {        
        return students.find( s => s.name === args.name);
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);