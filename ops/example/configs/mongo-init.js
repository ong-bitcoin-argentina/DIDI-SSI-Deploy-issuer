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

print('END #################################################################')


