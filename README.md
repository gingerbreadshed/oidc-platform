# OpenID Connect Identity Platform

The synapse OpenID Connect platform uses [node-oidc-provider](https://github.com/panva/node-oidc-provider) to provide user authentication for our clients' applications. node-oidc-provider is an [OpenID Connect](http://openid.net/connect/) provider library. In order to fully understand the ins and outs of this application understanding OpenID Connect is a must.

## Usage Documentation
- [Installation](docs/installation.md)
- [Implementation](docs/implementation.md)

## Setting up for development

0. Copy `common.template.env` as `common.env` and provide a mailgun key
0. Set the OIDC_DB_* vars based on what RDBMS you are using.
0. Run either `./compose-mysql up` or `./compose-postgres up`
0. Create an oauth client by posting to http://localhost:9000/op/reg with the following:
```
Headers:
{
    "Content-Type": "application/json",
    "Authorization": "Bearer token1", // common.env -> OIDC_INITIAL_ACCESS_TOKEN value
}
Body:
{
    "response_types": ["code id_token token"],
    "grant_types": [
        "authorization_code",
        "implicit",
        "client_credentials"
    ],
    "redirect_uris": ["https://sso-client.dev:3000/"],
    "post_logout_redirect_uris": ["https://sso-client.dev:3000/logout"]
}
```
0. In `test-client/src` create a copy of `config.template.js` and call it `config.js`. Fill in the
client_id and client_secret of the client you created in the previous step.
0. Add `sso-client.dev`for `127.0.0.1` to your hosts file
0. `npm i` and `npm start` in `test-client`

## Session Management

Sessions are persisted by default, a user can manually log out by visiting `${prefix}/session/end`. The following query parameters should also be sent: `id_token_hint` is to allow the client to determine which user is logging out, and `post_logout_redirect_uri` allows the user to be redirected back to the client app.

## Clients

Clients can be registered dynamically with the `registration` endpoint defined in the OICD provider's Hapi plugin. By default this is `${prefix}/reg`. Any of the [OpenID Client Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata) can be supplied. The Bearer token for this request is validated against the `OIDC_INITIAL_ACCESS_TOKEN` environment variable. YOU MUST PROVIDE A STRONG TOKEN in production to prevent unauthorized clients from being added.

## Keystores

node-oidc-provider uses [node-jose](https://github.com/cisco/node-jose) keys and stores to encrypt, sign and decrypt things (mostly tokens and stuff). For security purposes YOU SHOULD PROVIDE YOUR OWN KEYS. The synapse OpenID Connect platform provides a default set of keys so that it will work if you do not provide your own, but PLEASE DO NOT USE THE DEFAULTS IN PRODUCTION.

### Generating Keys

We provide a script that, if you're using docker-compose, can be run like this:

```
$ docker-compose exec synapse-oidc npm run generate-keys
$ docker-compose exec synapse-oidc cat keystores.json > keystores.json
```

Now you have a `keystores.json` file. Put that in an AWS S3 bucket and provide these environment variables:

```
KEYSTORE=keystores.json //a file name
KEYSTORE_BUCKET=bucket-name //a S3 bucket

AWS_ACCESS_KEY_ID=string //standard aws access key env var
AWS_SECRET_ACCESS_KEY=string //standard aws secret key env var
```

When `KEYSTORE` and `KEYSTORE_BUCKET` are provided the Synapse OpenID Provider will attempt to pull the keystores from S3 when the node service starts. If you provide the `KEYSTORE` and `KEYSTORE_BUCKET` variables but NOT the AWS credential variables then the provider api will fail to start.
