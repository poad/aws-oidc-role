import * as cdk from 'aws-cdk-lib/core';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface AwsOidcRoleStackProps extends cdk.StackProps {
  repo?: string,
  OIDCProviderArn?: string,
}

export class AwsOidcRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsOidcRoleStackProps) {
    super(scope, id, props);

    const oidcProvider = new iam.CfnOIDCProvider(this, 'GitHubOIDCProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIdList: [
        'sts.amazonaws.com'
      ],
      thumbprintList: [
        'a031c46782e6e6c662c2c87c76da9aa62ccabd8e'
      ]
    });

    const oidcProviderArn = props.OIDCProviderArn === undefined ? oidcProvider.attrArn : props.OIDCProviderArn;
    new iam.Role(this, 'GitHubOIDCRole', {
      assumedBy: new iam.FederatedPrincipal(oidcProviderArn, {
        StringLike: {
          'token.actions.githubusercontent.com:sub': props.repo ? `repo:poad/${props.repo}:*` : `repo:poad/*:*`,
        },
      }, 'sts:AssumeRoleWithWebIdentity'),
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(this, 'AdminAccessPolicy', 'arn:aws:iam::aws:policy/AdministratorAccess')
      ]
    });
  }
}
