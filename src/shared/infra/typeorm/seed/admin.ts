import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'fotografaaeBackend', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash(Buffer.from('admin').toString('base64'), 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      login, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@fotografaae.com', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

  await connection.query(
    `INSERT INTO modules (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('57f9f262-327a-4954-89ff-5e2e58f4efca', 'Tabelas', 'now()', 'now()'),
			('6c6175ae-31d7-4f7b-8e2b-87e783e276d3', 'Photography', 'now()', 'now()')`
  )


  // menu options

  await connection.query(
    `INSERT INTO menu_options (
      id,
      module_id,
      sequence,
      label,
      route,
      icon,
      key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'fa-solid fa-lock', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('7e5e621b-7b97-4998-8edf-4299bfef8d56', '57f9f262-327a-4954-89ff-5e2e58f4efca', '002', 'Tabelas', '', 'TableView', 'common', 'now()', 'now()'),
			('5434a620-d0b2-4e0a-a585-ea88e0918b85', '57f9f262-327a-4954-89ff-5e2e58f4efca', '002001', 'Estados', '/states', 'List', 'common-states', 'now()', 'now()'),
			('7524a116-7801-4342-8706-6bd466d634b4', '57f9f262-327a-4954-89ff-5e2e58f4efca', '002002', 'Cidades', '/cities', 'List', 'common-cities', 'now()', 'now()'),
			('57522b70-1404-4f29-a82a-d76d377a53e2', '57f9f262-327a-4954-89ff-5e2e58f4efca', '002003', 'Subscriptions', '/subscriptions', '', 'common-subscriptions', 'now()', 'now()'),
			('b8e0eb80-fc13-4f9c-a15f-0a9744547efe', '6c6175ae-31d7-4f7b-8e2b-87e783e276d3', '003', 'Photography', '', 'fa-solid fa-gear', 'photography', 'now()', 'now()'),
			('1cc362c4-a6eb-407a-b219-524a343c3e1a', '6c6175ae-31d7-4f7b-8e2b-87e783e276d3', '003001', 'Categories', '/categories', 'List', 'photography-categories', 'now()', 'now()'),
			('717fc93a-7d41-4d40-8da6-47c0aee58d16', '6c6175ae-31d7-4f7b-8e2b-87e783e276d3', '003002', 'Photographers', '/photographers', 'List', 'photography-photographers', 'now()', 'now()'),
			('7b5eb910-c426-45f6-867f-c0d296d0e1e0', '6c6175ae-31d7-4f7b-8e2b-87e783e276d3', '003003', 'PhotographersCategories', '/photographers-categories', 'List', 'photography-photographers-categories', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('2c96cde2-1c64-4569-90e5-d04cefa12569', '3c99decf-f975-4b16-b552-0747afd397a3', 'common', true, 'now()', 'now()'),
			('4053f644-9965-4ac5-8782-9baf1d29fcc2', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-states', true, 'now()', 'now()'),
			('e9466e61-bd21-41fa-bd5c-c16b12588f64', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-cities', true, 'now()', 'now()'),
			('1a463b9b-1d6b-49e9-aeaf-b6f9a4af8198', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-subscriptions', true, 'now()', 'now()'),
			('4b50653e-b250-4cfa-87a5-19950e9d955e', '3c99decf-f975-4b16-b552-0747afd397a3', 'photography', true, 'now()', 'now()'),
			('d4078651-6330-40c3-9e73-973a2e44cb00', '3c99decf-f975-4b16-b552-0747afd397a3', 'photography-categories', true, 'now()', 'now()'),
			('2a790551-9230-4fab-b8f4-ac018ae4a36d', '3c99decf-f975-4b16-b552-0747afd397a3', 'photography-photographers', true, 'now()', 'now()'),
			('c7f0a4e2-74b7-4340-861c-5135af340529', '3c99decf-f975-4b16-b552-0747afd397a3', 'photography-photographers-categories', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  
  // configs

  await connection.query(
    `INSERT INTO configs (
      id,
      title,
      description,
      created_at,
      updated_at
    ) values 
      ('62e4bde6-56f0-4dae-b06a-c3ffcbd58047', 'email', '{"service":"gmail","smtpHost":"smtp.gmail.com","smtpPort":587,"smtpUser":"desenvweb@vamilly.com.br","smtpPass":"NCjEr<N39AUb3bC<"}', 'now()', 'now()')`
  )

  await connection.query(
    `INSERT INTO categories (
      id,
      name,
      created_at,
      updated_at
    ) values 
     ('19a3e68a-ca74-458b-a92e-dab044e364a5', 'Casamento', 'now()', 'now()'),
     ('e3867dfc-0d0f-49dd-8b97-619ff2691d79', 'Aniversário', 'now()', 'now()'),
     ('aab8929a-1d0a-49c3-bee3-209bd865eb4b', 'Batizado', 'now()', 'now()'),
     ('4f507c0a-7fa5-4dc7-abe3-1741450773f3', 'Ensaio', 'now()', 'now()'),
     ('92a12729-a1f3-4de8-be8c-0acd2092d900', 'Evento Empresarial', 'now()', 'now()'),
     ('eac2385f-e42a-4c4d-bd82-a1504f46bf0c', 'Pet', 'now()', 'now()'),
     ('9d67242c-e5c0-439f-8bc2-70ef46f1a8c9', 'Gestante', 'now()', 'now()'),
     ('f1b7d7b4-1f7c-4f5c-8d8f-6e9e5f6e1b7b', 'Newborn', 'now()', 'now()'),
     ('8364544e-e487-4d7c-b027-cfae3b6e17f3', 'Família', 'now()', 'now()'),
     ('04919135-b777-4d8b-b357-54707f9d751c', 'Outros', 'now()', 'now()')
     `
  )

  await connection.close()
}

export async function admin() {
  await create().then(() => console.log('Admin and Security tables created!'))
}
