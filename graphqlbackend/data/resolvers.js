import { Tenant, Author, Branch } from './connectors';

const resolvers = {
  Query: {
    tenant(_, args){
      return Tenant.find({ where: args });
    },
    allTenants(){
      return Tenant.findAll();
    },
    branch(_, args) {
      return Branch.find({ where: args });
    },
    allBranches() {
      return Branch.findAll();
    },
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors() {
      return Author.findAll();
    }
  },
  Tenant: {
    branches(tenant){
      return tenant.getBranches();
    },
    authors(tenant){
      return tenant.getAuthors();
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