<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/jwt.php';
require_once __DIR__ . '/../lib/env.php';

send_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body = json_body();
$email = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if ($email === '' || $password === '') {
    json_error('Email and password are required');
}

$adminEmail = env('ADMIN_EMAIL');
$adminPasswordHash = env('ADMIN_PASSWORD_HASH');

if (!$adminEmail || !$adminPasswordHash) {
    json_error('Admin credentials are not configured', 500);
}

if ($email !== $adminEmail || !password_verify($password, $adminPasswordHash)) {
    json_error('Invalid email or password', 401);
}

$token = jwt_sign(['email' => $email], env('JWT_SECRET', ''));
json_response(['token' => $token]);
