<?php

$password = $argv[1] ?? null;

if (!$password) {
    fwrite(STDERR, "Usage: php scripts/hash_password.php <password>\n");
    exit(1);
}

echo password_hash($password, PASSWORD_BCRYPT), PHP_EOL;
