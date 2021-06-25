const { Credentials } = require('uport-credentials');
const NodeRSA = require("node-rsa");
const bcrypt = require('bcrypt');

const generateSalt = async (key) => {
  const salt = await bcrypt.genSalt(10);
  console.log(`${key}=${salt}`);
}

identity = Credentials.createIdentity();
console.log(`DIDI_ISSUER_DID=${identity.did}`);
console.log(`DIDI_ISSUER_PRIVATE_KEY=${identity.privateKey}`);
generateSalt('DIDI_ISSUER_HASH_SALT');
nodeRSA = new NodeRSA({b: 2048});
let rsaString = nodeRSA.exportKey("pkcs1");
rsaString = rsaString.replace(/(\r\n|\n|\r)/gm,"")
console.log(`DIDI_ISSUER_RSA_PRIVATE_KEY="${rsaString}"`);

encrypted = nodeRSA.encrypt(identity.privateKey, "base64");
console.log('');	
console.log(`Use this for DIDI Issuer on "/ops/<ENVIRONMENT>/configs/mongo-init.js" script with the following "private_key":
db.registers.insertOne({
  private_key: "${encrypted}"
})
`);