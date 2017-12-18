import { Author } from './connectors';

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors() {
      return Author.findAll();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    }
  }
};

export default resolvers;