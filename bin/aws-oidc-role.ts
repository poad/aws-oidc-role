#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsOidcRoleStack } from '../lib/aws-oidc-role-stack';

const app = new cdk.App();

const repo = app.node.tryGetContext('repo') as string | undefined;
const OIDCProviderArn = app.node.tryGetContext('OIDCProviderArn') as string | undefined;

new AwsOidcRoleStack(app, repo ? `aws-github-${repo}-oidc-role-stack` : 'aws-github-oidc-role-stack', {
  repo,
  OIDCProviderArn,
});
