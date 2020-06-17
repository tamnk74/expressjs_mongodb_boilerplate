import AWS from 'aws-sdk';
import { accessKeyId, secretAccessKey, region } from '../config/s3';

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region
});

const s3 = new AWS.S3();

export const getObject = ({ bucketName, fileKey }) => {
  const options = {
    Bucket: bucketName,
    Key: fileKey
  };

  return s3.getObject(options).promise();
}

export const uploadFile = ({ bucketName, filePath, data, metadata }) => {
  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: data,
    Metadata: metadata,
  };

  return s3.putObject(params).promise();
}

export const removeFile = ({ bucketName, filePath }) => {
  const params = {
    Bucket: bucketName,
    Key: filePath,
  };

  return s3.deleteObject(params).promise();
}