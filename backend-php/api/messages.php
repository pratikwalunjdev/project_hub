<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/auth.php';

send_cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id = path_segment();

$readPatch = false;
if ($id !== null && str_ends_with($id, '/read')) {
    $id = substr($id, 0, -strlen('/read'));
    $readPatch = true;
}

if ($method === 'GET' && !$id) {
    require_auth();
    $stmt = db()->query(
        'SELECT id, name, email, subject, body, is_read AS isRead, created_at AS createdAt
         FROM messages ORDER BY created_at DESC'
    );
    json_response($stmt->fetchAll());
}

if ($method === 'POST') {
    $body = json_body();
    $name = trim($body['name'] ?? '');
    $email = trim($body['email'] ?? '');
    $messageBody = trim($body['body'] ?? '');

    if ($name === '' || $email === '' || $messageBody === '') {
        json_error('name, email and body are required');
    }

    $stmt = db()->prepare('INSERT INTO messages (name, email, subject, body) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, trim($body['subject'] ?? '') ?: null, $messageBody]);

    json_response(['id' => (int) db()->lastInsertId()], 201);
}

if ($method === 'PATCH' && $id && $readPatch) {
    require_auth();
    db()->prepare('UPDATE messages SET is_read = 1 WHERE id = ?')->execute([$id]);
    json_response(['id' => (int) $id, 'isRead' => true]);
}

if ($method === 'DELETE' && $id) {
    require_auth();
    db()->prepare('DELETE FROM messages WHERE id = ?')->execute([$id]);
    json_response(null, 204);
}

json_error('Not found', 404);
