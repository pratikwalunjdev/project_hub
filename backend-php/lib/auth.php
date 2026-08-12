<?php

require_once __DIR__ . '/jwt.php';
require_once __DIR__ . '/response.php';
require_once __DIR__ . '/env.php';

/** Call at the top of any route that must be admin-only. Exits with 401 if not authenticated. */
function require_auth(): array
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');

    if (!str_starts_with($header, 'Bearer ')) {
        json_error('Missing authorization token', 401);
    }

    $token = substr($header, 7);
    $payload = jwt_verify($token, env('JWT_SECRET', ''));

    if ($payload === null) {
        json_error('Invalid or expired token', 401);
    }

    return $payload;
}
