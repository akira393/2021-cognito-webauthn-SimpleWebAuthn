import * as cdk from '@aws-cdk/core';

import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway'


export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const createUserLambda = new NodejsFunction(this, 'createUserLambda', {
      entry: 'src/lambda/handlers/createUserLambda.ts',
    });

    const LambdaRestAPI = new apigateway.RestApi(this, 'LambdaRestApi', {
      restApiName:"LambdaRestApi",
    })

    LambdaRestAPI.root.addResource('todo').addMethod('POST', new apigateway.LambdaIntegration(createUserLambda))


  }
}
