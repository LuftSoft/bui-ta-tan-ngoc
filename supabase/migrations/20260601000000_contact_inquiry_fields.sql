/*
  # Extend contacts with freelance inquiry fields

  1. Changes
    - `contacts.project_type` (text, nullable) — e.g. "web", "mobile", "mvp", "consulting", "other"
    - `contacts.budget_range` (text, nullable) — e.g. "<5k", "5-10k", "10-25k", "25k+", "not_sure"
    - `contacts.timeline` (text, nullable) — e.g. "asap", "1-3m", "3-6m", "exploring"
    - `subject` made nullable — the new form derives a subject from project_type instead

  2. Security
    - No policy changes. Anon can still INSERT only; authenticated SELECT/UPDATE.

  3. Backwards compatibility
    - Existing rows untouched. New columns nullable so old clients keep working.
*/

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS timeline text;

ALTER TABLE contacts
  ALTER COLUMN subject DROP NOT NULL;

-- Light input guards so a malicious anon insert can't dump GBs of text.
ALTER TABLE contacts
  ADD CONSTRAINT contacts_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contacts_email_len CHECK (char_length(email) BETWEEN 3 AND 254),
  ADD CONSTRAINT contacts_message_len CHECK (char_length(message) BETWEEN 1 AND 5000),
  ADD CONSTRAINT contacts_subject_len CHECK (subject IS NULL OR char_length(subject) <= 200);
