<?php

require_once __DIR__ . '/env.php';

function send_cors_headers(): void
{
    $allowed = env('CORS_ORIGIN', '*');
    $origins = array_map('trim', explode(',', $allowed));
    $requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($allowed === '*') {
        header('Access-Control-Allow-Origin: *');
    } elseif (in_array($requestOrigin, $origins, true)) {
        header("Access-Control-Allow-Origin: $requestOrigin");
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    if ($status === 204) {
        exit;
    }
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function json_error(string $message, int $status = 400): void
{
    json_response(['error' => $message], $status);
}

function json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/** Extracts the trailing /{id} segment (if any) that .htaccess passes through PATH_INFO. */
function path_segment(): ?string
{
    $pathInfo = $_SERVER['PATH_INFO'] ?? '';
    $segment = trim($pathInfo, '/');
    return $segment === '' ? null : $segment;
}
