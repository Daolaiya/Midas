-- Both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES
    ('testadmin','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Test','Admin','joel@joelburton.com',TRUE),
    ('testuser','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Test','User','joel@joelburton.com', FALSE)
;

-- INSERT INTO media (title, type, cast_list, description)
-- VALUES 
--     ('Inception', 'movie', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page', 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from'),
--     ('Run', 'show', 'Tom Hanks, Sandra Bullock', 'A guy runs a lot for some reason')
-- ;

-- INSERT INTO favorites (username, media_id) VALUES ('testuser',1),('testadmin',2);
