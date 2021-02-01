import * as cdk from '@aws-cdk/core';

import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const fnDemo = new NodejsFunction(this, 'demo', {
      entry: 'src/lambda/handlers/createUserLambda.ts',
    });
  }

}
