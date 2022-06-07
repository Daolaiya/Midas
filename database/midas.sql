\echo 'Delete and recreate midas db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS midas;
CREATE DATABASE midas;
\connect midas

\i midas-schema.sql
\i midas-seed.sql

\echo 'Delete and recreate midas_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS midas_test;
CREATE DATABASE midas_test;
\connect midas_test

\i midas-schema.sql
