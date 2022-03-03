import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as AwsOidcRole from '../lib/aws-oidc-role-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsOidcRole.AwsOidcRoleStack(app, 'MyTestStack', {roleName: 'test'});
  // THEN
  const template = Template.fromStack(stack);
  template.templateMatches({
    "Resources": {}
  })
});
