## Notes
- PHP is written to work with PostgreSQL.
- You have to create your own db_connection.php in pages/pieces with PDO - function.( it's only used in upload and gallery.php)
- You need to translate scss to css wtih whatever you'd like.
- Game uses p5.js

## Functionality
### Game
- it's a little game made with js using p5.js
### Gallery / upload
- send a jpg/png/gif/webp that's less than 4mb to database
- it's stored as bytea in the database
- table structure:

| Column      | Type |
| ----------- | ----------- |
| id_image      | bigint(not null/auto inc.)       |
| imgname   | text        |
| img      | bytea       |
| type   | text        |
| public      | boolean       |
