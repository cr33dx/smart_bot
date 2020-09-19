
import S3 from 'react-aws-s3';
const config = {
  bucketName: 'bearopedia',
  region: 'us-west-2',
  accessKeyId: 'AKIAI42SRURCUNAOCGEA',
  secretAccessKey: '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',
}

export const ReactS3Client = new S3(config);