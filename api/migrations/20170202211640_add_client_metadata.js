
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('SIP_client_default_acr_value', function(table) {
      table.string('client_id').references('SIP_client.client_id');
      table.string('value');
      table.primary(['client_id', 'value']);
    }),
    knex.schema.createTable('SIP_client_post_logout_redirect_uri', function(table) {
      table.string('client_id').references('SIP_client.client_id');
      table.string('uri');
      table.primary(['client_id', 'uri']);
    }),
    knex.schema.createTable('SIP_client_request_uri', function(table) {
      table.string('client_id').references('SIP_client.client_id');
      table.string('uri');
      table.primary(['client_id', 'uri']);
    }),
    knex.schema.createTable('SIP_client_response_type', function(table) {
      table.string('client_id').references('SIP_client.client_id');
      table.string('value');
      table.primary(['client_id', 'value']);
    }),
    knex.schema.table('SIP_client', function(table) {
      table.string('backchannel_logout_uri');
      table.bool('backchannel_logout_session_required');
      table.string('client_id_issued_at');
      table.string('client_secret_expires_at');
      table.string('default_max_age');
      table.string('id_token_encrypted_response_alg');
      table.string('id_token_encrypted_response_enc');
      table.string('id_token_signed_response_alg');
      table.string('initiate_login_uri');
      table.string('jwks');
      table.string('jwks_uri');
      table.string('request_object_encryption_alg');
      table.string('request_object_encryption_enc');
      table.string('request_object_signing_alg');
      table.bool('require_auth_time');
      table.string('sector_identifier_uri');
      table.string('subject_type');
      table.string('token_endpoint_auth_method');
      table.string('token_endpoint_auth_signing_alg');
      table.string('userinfo_encrypted_response_alg');
      table.string('userinfo_encrypted_response_enc');
      table.string('userinfo_signed_response_alg');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('SIP_client_default_acr_value'),
    knex.schema.dropTable('SIP_client_post_logout_redirect_uri'),
    knex.schema.dropTable('SIP_client_request_uri'),
    knex.schema.dropTable('SIP_client_response_type'),
    knex.schema.table('SIP_client', function(table) {
      table.dropColumn('backchannel_logout_uri');
      table.dropColumn('backchannel_logout_session_required');
      table.dropColumn('client_id_issued_at');
      table.dropColumn('client_secret_expires_at');
      table.dropColumn('default_max_age');
      table.dropColumn('id_token_encrypted_response_alg');
      table.dropColumn('id_token_encrypted_response_enc');
      table.dropColumn('id_token_signed_response_alg');
      table.dropColumn('initiate_login_uri');
      table.dropColumn('jwks');
      table.dropColumn('jwks_uri');
      table.dropColumn('request_object_encryption_alg');
      table.dropColumn('request_object_encryption_enc');
      table.dropColumn('request_object_signing_alg');
      table.dropColumn('require_auth_time');
      table.dropColumn('sector_identifier_uri');
      table.dropColumn('subject_type');
      table.dropColumn('token_endpoint_auth_method');
      table.dropColumn('token_endpoint_auth_signing_alg');
      table.dropColumn('userinfo_encrypted_response_alg');
      table.dropColumn('userinfo_encrypted_response_enc');
      table.dropColumn('userinfo_signed_response_alg');
    }),
  ]);
};