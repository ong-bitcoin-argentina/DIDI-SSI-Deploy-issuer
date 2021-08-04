print('Start #################################################################');

/*
#############
#DIDI Issuer#
#############

db = db.getSiblingDB('$DIDI_ISSUER_MONGO_DB');
db.createUser(
  {
    user: '$DIDI_ISSUER_MONGO_USERNAME',
    pwd: '$DIDI_ISSUER_MONGO_PASSWORD',
    roles: [{ role: 'readWrite', db: '$DIDI_ISSUER_MONGO_DB' }],
  },
);
db.createCollection('users');
db.createCollection('registers');
print('-------- Registering issuer associated with basic templates...');

db.registers.insertOne({
  "_id" : ObjectId("5fe0d9051e89ab3e55265fa5"),
  "deleted" : false,
  "createdOn" : ISODate("2020-04-22T00:00:00.0000"),
  "status" : "Creado",
  "name" : "$DIDI_ISSUER_NAME",
  //Use "/deploy-tools/key-generator.js" to generate this value.
  (#) "private_key" : "<CHANGE_ME>",
  "__v" : 0,
  "messageError" : "",
  "blockHash" : "fake",
  //Choose an expire date for registry (10 years from now is a good value, but you can choose whatever future date you want). Example: "2030-01-01T00:00:00.000Z"
  "expireOn" : ISODate("2030-01-01T00:00:00.0000")
});
*/

db = db.getSiblingDB('<CHANGE_ME>');
db.createUser(
  {
    user: '<CHANGE_ME>',
    pwd: '<CHANGE_ME>',
    roles: [{ role: 'readWrite', db: '<CHANGE_ME>' }],
  },
);
db.createCollection('users');
db.createCollection('registers');
print('-------- Registering issuer associated with basic templates...');

db.registers.insertOne({
  "_id" : ObjectId("5fe0d9051e89ab3e55265fa5"),
  "deleted" : false,
  "createdOn" : ISODate("2020-04-22T00:00:00.0000"),
  "status" : "Creado",
  "name" : "<CHANGE_ME>",
  //Use "/deploy-tools/key-generator.js" to generate this value.
  /*(#)*/ "private_key" : "<CHANGE_ME>",
  "did" : "did:ethr:<CHANGE_ME>",
  "__v" : 0,
  "messageError" : "",
  "blockHash" : "fake",
  //Choose an expire date for registry (10 years from now is a good value, but you can choose whatever future date you want). Example: "2030-01-01T00:00:00.0000"
  "expireOn" : ISODate("2030-01-01T00:00:00.0000")
});

print('END #################################################################')


