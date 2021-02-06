import * as cdk from '@aws-cdk/core';

import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway'


export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const LambdaRestAPI = new apigateway.RestApi(this, 'LambdaRestApi', {
      restApiName:"LambdaRestApi",
    })

    const regsiterUserLambda = new NodejsFunction(this, 'regsiterUserLambda', {
      entry: 'src/lambda/handlers/regsiterUserLambda.ts',
      timeout:cdk.Duration.seconds(60)
    });
    const getUsersLambda = new NodejsFunction(this, 'getUsersLambda', {
      entry: 'src/lambda/handlers/getUsersLambda.ts',
      timeout:cdk.Duration.seconds(60)
    });
    const getUserLambda = new NodejsFunction(this, 'getUserLambda', {
      entry: 'src/lambda/handlers/getUserLambda.ts',
      timeout:cdk.Duration.seconds(60)
    });
    const updateUserLambda = new NodejsFunction(this, 'updateUserLambda', {
      entry: 'src/lambda/handlers/updateUserLambda.ts',
      timeout:cdk.Duration.seconds(60)
    });
    const deleteUserLambda = new NodejsFunction(this, 'deleteUserLambda', {
      entry: 'src/lambda/handlers/deleteUserLambda.ts',
      timeout:cdk.Duration.seconds(60)
    });


    const users=LambdaRestAPI.root.addResource('users')
    users.addMethod('POST', new apigateway.LambdaIntegration(regsiterUserLambda))
    users.addMethod('GET', new apigateway.LambdaIntegration(getUsersLambda))
    const user=users.addResource("{userId}")
    user.addMethod('PATCH',new apigateway.LambdaIntegration(updateUserLambda))
    user.addMethod('GET',new apigateway.LambdaIntegration(getUserLambda))
    user.addMethod('DELETE',new apigateway.LambdaIntegration(deleteUserLambda))

  }
}
