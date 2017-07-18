exports.up = function(knex, Promise) {
  const addTemplateTable = knex.schema.createTable('SIP_client_email_templates', table => {
  	table.uuid('id').primary();
  	table.text('template');
  });

  const addClientTemplateReference = knex.schema.table('SIP_client', table => {
  	table.uuid('reset_password_template_id').references('id').inTable('SIP_client_email_templates').onDelete('CASCADE').onUpdate('CASCADE');
  });

  return Promise.all([
  	addTemplateTable,
  	addClientTemplateReference
  ]);
};

exports.down = function(knex, Promise) {
  const removeTemplateTable = knex.schema.dropTable('SIP_client_email_templates');

  const removeClientTemplateReference = knex.schema.table('SIP_client', table => {
  	table.dropColumn('reset_password_template_id');
  });

  return Promise.all([
	removeTemplateTable,
	removeClientTemplateReference
  ]);
};
