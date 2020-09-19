import * as AWS from 'aws-sdk';

export const getS3 = () => {
  

 // return s3;
}



export const uploadFileToAws =(updatedFileName, file ) => {
  AWS.config.update({
    region: 'us-west-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:3c40284d-c7fd-4664-bac7-bebcfca1171f'
    })
  });

  var s3 = new AWS.S3({
    region: 'us-west-2',
    params: { Bucket: 'supportgeniemedia' }
  });
  var upload =  AWS.S3.ManagedUpload({
    params: {  
      Bucket: 'bearopedia',
    Key: updatedFileName,
    Body: file,
    ACL: "public-read"
    }
  });

  var promise = upload.promise();

  promise.then(
    function(data) {
      alert("Successfully uploaded photo.");
    },
    function(err) {
      
      console.log(err)
    }
  );
}