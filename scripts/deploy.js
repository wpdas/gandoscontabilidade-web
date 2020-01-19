const path = require('path');
const s3UploadFolder = require('s3-folder-upload');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'Deploy static sonia web site to S3 Bucket.'
});

parser.addArgument('--bucket', {
  help: 'bucket where the files will be stored',
  type: String,
  metavar: 'NAME',
  required: true
});

parser.addArgument('--region', {
  help: 'the region where the aws s3 bucket is',
  type: String,
  metavar: 'NAME',
  required: true
});

const {
  bucket: MARKETING_BUILD_BUCKET,
  region: AWS_REGION
} = parser.parseArgs();

const BUILD_DIR = path.join(__dirname, '../packages/landing-gatsby/public');

const CREDENTIALS = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  bucket: MARKETING_BUILD_BUCKET
};

const OPTIONS = {
  useFoldersForFileTypes: false,
  useIAMRoleCredentials: false
};

function main() {
  s3UploadFolder(BUILD_DIR, CREDENTIALS, OPTIONS);
}

main();
