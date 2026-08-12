<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/auth.php';

send_cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id = path_segment();

if ($method === 'GET' && $id === 'summary') {
    require_auth();

    $totals = db()->query(
        'SELECT COUNT(*) AS pageViews, COUNT(DISTINCT session_id) AS totalVisitors,
                AVG(duration_seconds) AS avgDurationSeconds
         FROM page_views'
    )->fetch();

    $byDay = db()->query(
        'SELECT DATE(created_at) AS day, COUNT(DISTINCT session_id) AS visitors
         FROM page_views
         WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
         GROUP BY DATE(created_at)
         ORDER BY day'
    )->fetchAll();

    json_response(array_merge($totals, ['byDay' => $byDay]));
}

if ($method === 'GET' && !$id) {
    require_auth();
    $stmt = db()->query(
        'SELECT id, page, session_id AS sessionId, referrer, device, location,
                duration_seconds AS durationSeconds, created_at AS createdAt
         FROM page_views ORDER BY created_at DESC LIMIT 200'
    );
    json_response($stmt->fetchAll());
}

if ($method === 'POST') {
    $body = json_body();
    $page = $body['page'] ?? '';

    if ($page === '') {
        json_error('page is required');
    }

    $stmt = db()->prepare(
        'INSERT INTO page_views (page, session_id, referrer, device, location, duration_seconds)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $page,
        $body['sessionId'] ?? null,
        $body['referrer'] ?? null,
        $body['device'] ?? null,
        $body['location'] ?? null,
        $body['durationSeconds'] ?? null,
    ]);

    json_response(null, 201);
}

json_error('Not found', 404);
