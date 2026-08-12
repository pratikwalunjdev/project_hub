<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/auth.php';

send_cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id = path_segment();

if ($method === 'GET') {
    $stmt = db()->query(
        'SELECT t.id, t.name, COUNT(pt.project_id) AS projectCount
         FROM technologies t
         LEFT JOIN project_technologies pt ON pt.technology_id = t.id
         GROUP BY t.id
         ORDER BY t.name'
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

    $stmt = db()->prepare('INSERT INTO technologies (name) VALUES (?)');
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

    $stmt = db()->prepare('UPDATE technologies SET name = ? WHERE id = ?');
    $stmt->execute([$name, $id]);
    json_response(['id' => (int) $id, 'name' => $name]);
}

if ($method === 'DELETE' && $id) {
    require_auth();
    $stmt = db()->prepare('DELETE FROM technologies WHERE id = ?');
    $stmt->execute([$id]);
    json_response(null, 204);
}

json_error('Not found', 404);
