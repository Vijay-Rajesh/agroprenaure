import { readFile } from 'node:fs/promises';
import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing. Add it to .env.local before setting up Neon.');
}

const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8');
const ageMigration = await readFile(new URL('../database/migrations/2026-10-01-age-groups.sql', import.meta.url), 'utf8');
const questionMigration = await readFile(new URL('../database/migrations/2026-10-01-seed-existing-questions.sql', import.meta.url), 'utf8');
const cmsMigration = await readFile(new URL('../database/migrations/2026-10-01-site-cms.sql', import.meta.url), 'utf8');
const surveyQuestionStepsMigration = await readFile(new URL('../database/migrations/2026-10-02-survey-question-steps.sql', import.meta.url), 'utf8');
const optionalPersonalInfoMigration = await readFile(new URL('../database/migrations/2026-10-03-optional-personal-info.sql', import.meta.url), 'utf8');
const profileQuestionsMigration = await readFile(new URL('../database/migrations/2026-10-04-manage-profile-questions.sql', import.meta.url), 'utf8');
const statements = [schema, ageMigration, questionMigration, cmsMigration, surveyQuestionStepsMigration, optionalPersonalInfoMigration, profileQuestionsMigration]
  .flatMap((source) => source.split(/;\s*(?:\r?\n|$)/))
  .map((statement) => statement.trim())
  .filter(Boolean);
const sql = neon(process.env.DATABASE_URL);

for (const statement of statements) {
  await sql.query(statement);
}

console.log(`Applied ${statements.length} idempotent schema statements to Neon.`);
