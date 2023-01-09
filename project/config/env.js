const argv = process.argv;
const DEFAULT_ENV = 'dev';
const [NODE_ENV] = argv.splice(-1) || [DEFAULT_ENV];

const env = {
    dev: "http: api-test.com",
    test: "http: api-test.com",
    prod: "http: api-prod.com"
}

console.log(argv)
module.exports = env[NODE_ENV];