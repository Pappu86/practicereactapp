import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('mypos', null, null, {
  dialect: 'sqlite',
  operatorsAliases: Sequelize.Op,
  storage: './myshop.sqlite'
});

const TenantModel = db.define('tenant', {
  name: { type: Sequelize.STRING },
  subdomain: { type: Sequelize.STRING }
});

const BranchModel = db.define('branch', {
  name: { type: Sequelize.STRING }
});

const CashRegisterModel = db.define('cashRegister', {
  name: { type: Sequelize.STRING }
});

const PaymentTypeModel = db.define('paymentType', {
  name: { type: Sequelize.STRING }
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
});

TenantModel.hasMany(AuthorModel);

TenantModel.hasMany(BranchModel);
BranchModel.belongsTo(TenantModel);

BranchModel.hasMany(CashRegisterModel);
CashRegisterModel.belongsTo(BranchModel);

BranchModel.hasMany(PaymentTypeModel);
PaymentTypeModel.belongsTo(BranchModel);

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {

    return TenantModel.create({
      name: casual.title,
      subdomain: casual.word
    }).then(tenant => {

      _.times(5, () => 
        tenant.createBranch({
          tenantId: tenant.id,
          name: casual.title
        })
      );


      tenant.createAuthor({
        firstName: casual.first_name,
        lastName: casual.last_name
      }).then(author => {
        return author.createPost({
          title: `A post by ${author.first_name}`,
          text: casual.sentences(3)
        });
      });

      return tenant;
    });

  });
});

const Tenant = db.models.tenant;

const Branch = db.models.branch;
const CashRegister = db.models.cashRegister;
const PaymentType = db.models.paymentType;

const Author = db.models.author;
const Post = db.models.post;

export { Tenant, Branch, CashRegister, PaymentType, Author, Post };