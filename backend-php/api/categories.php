<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/auth.php';

send_cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id = path_segment();

if ($method === 'GET') {
    $stmt = db()->query(
        'SELECT c.id, c.name, COUNT(p.id) AS projectCount
         FROM categories c
         LEFT JOIN projects p ON p.category_id = c.id
         GROUP BY c.id
         ORDER BY c.name'
    );
    json_response($stmt->fetchAll());
}

if ($method === 'POST') {
    require_auth();
    $body = json_body();
    $name = trim($body['name'] ?? '');
    if ($name === '') {
        json_error('name is required');
    }

    $stmt = db()->prepare('INSERT INTO categories (name) VALUES (?)');
    $stmt->execute([$name]);
    json_response(['id' => (int) db()->lastInsertId(), 'name' => $name], 201);
}

if ($method === 'PUT' && $id) {
    require_auth();
    $body = json_body();
    $name = trim($body['name'] ?? '');
    if ($name === '') {
        json_error('name is required');
    }

    $stmt = db()->prepare('UPDATE categories SET name = ? WHERE id = ?');
    $stmt->execute([$name, $id]);
    json_response(['id' => (int) $id, 'name' => $name]);
}

if ($method === 'DELETE' && $id) {
    require_auth();
    $stmt = db()->prepare('DELETE FROM categories WHERE id = ?');
    $stmt->execute([$id]);
    json_response(null, 204);
}

json_error('Not found', 404);
