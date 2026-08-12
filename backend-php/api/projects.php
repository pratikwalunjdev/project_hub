<?php

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/auth.php';

send_cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id = path_segment();

// e.g. PATCH /api/projects/5/status
$statusPatch = false;
if ($id !== null && str_ends_with($id, '/status')) {
    $id = substr($id, 0, -strlen('/status'));
    $statusPatch = true;
}

function attach_technologies(array $projects): array
{
    if (empty($projects)) {
        return $projects;
    }

    $ids = array_column($projects, 'id');
    $placeholders = implode(',', array_fill(0, count($ids), '?'));

    $stmt = db()->prepare(
        "SELECT pt.project_id, t.name
         FROM project_technologies pt
         JOIN technologies t ON t.id = pt.technology_id
         WHERE pt.project_id IN ($placeholders)"
    );
    $stmt->execute($ids);

    $byProject = [];
    foreach ($stmt->fetchAll() as $row) {
        $byProject[$row['project_id']][] = $row['name'];
    }

    foreach ($projects as &$project) {
        $project['technologies'] = $byProject[$project['id']] ?? [];
    }

    return $projects;
}

function find_category_id(?string $categoryName): ?int
{
    if (!$categoryName) {
        return null;
    }
    $stmt = db()->prepare('SELECT id FROM categories WHERE name = ?');
    $stmt->execute([$categoryName]);
    $row = $stmt->fetch();
    return $row ? (int) $row['id'] : null;
}

function sync_technologies(int $projectId, array $technologyNames): void
{
    db()->prepare('DELETE FROM project_technologies WHERE project_id = ?')->execute([$projectId]);

    if (empty($technologyNames)) {
        return;
    }

    $placeholders = implode(',', array_fill(0, count($technologyNames), '?'));
    $stmt = db()->prepare("SELECT id FROM technologies WHERE name IN ($placeholders)");
    $stmt->execute($technologyNames);

    $insert = db()->prepare('INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)');
    foreach ($stmt->fetchAll() as $row) {
        $insert->execute([$projectId, $row['id']]);
    }
}

// GET /api/projects or /api/projects/{id}
if ($method === 'GET' && !$id) {
    $conditions = [];
    $params = [];

    if (!empty($_GET['category'])) {
        $conditions[] = 'c.name = ?';
        $params[] = $_GET['category'];
    }
    if (!empty($_GET['status'])) {
        $conditions[] = 'p.status = ?';
        $params[] = $_GET['status'];
    }

    $where = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';

    $stmt = db()->prepare(
        "SELECT p.id, p.name, p.slug, p.description, p.thumbnail_url AS thumbnailUrl,
                p.live_url AS liveUrl, p.repo_url AS repoUrl, p.status,
                p.created_at AS createdAt, c.name AS category
         FROM projects p
         LEFT JOIN categories c ON c.id = p.category_id
         $where
         ORDER BY p.created_at DESC"
    );
    $stmt->execute($params);
    json_response(attach_technologies($stmt->fetchAll()));
}

if ($method === 'GET' && $id) {
    $stmt = db()->prepare(
        'SELECT p.id, p.name, p.slug, p.description, p.thumbnail_url AS thumbnailUrl,
                p.live_url AS liveUrl, p.repo_url AS repoUrl, p.status,
                p.created_at AS createdAt, c.name AS category
         FROM projects p
         LEFT JOIN categories c ON c.id = p.category_id
         WHERE p.id = ?'
    );
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        json_error('Project not found', 404);
    }

    [$withTech] = attach_technologies([$project]);
    json_response($withTech);
}

if ($method === 'POST') {
    require_auth();
    $body = json_body();
    $name = trim($body['name'] ?? '');
    $slug = trim($body['slug'] ?? '');

    if ($name === '' || $slug === '') {
        json_error('name and slug are required');
    }

    $categoryId = find_category_id($body['category'] ?? null);

    try {
        $stmt = db()->prepare(
            'INSERT INTO projects (name, slug, description, thumbnail_url, live_url, repo_url, category_id, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $name,
            $slug,
            $body['description'] ?? null,
            $body['thumbnailUrl'] ?? null,
            $body['liveUrl'] ?? null,
            $body['repoUrl'] ?? null,
            $categoryId,
            $body['status'] ?? 'Draft',
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') {
            json_error('A project with this slug already exists', 409);
        }
        throw $e;
    }

    $projectId = (int) db()->lastInsertId();
    sync_technologies($projectId, $body['technologies'] ?? []);

    json_response(['id' => $projectId], 201);
}

if ($method === 'PUT' && $id) {
    require_auth();
    $body = json_body();
    $categoryId = find_category_id($body['category'] ?? null);

    $stmt = db()->prepare(
        'UPDATE projects
         SET name = ?, slug = ?, description = ?, thumbnail_url = ?, live_url = ?, repo_url = ?, category_id = ?, status = ?
         WHERE id = ?'
    );
    $stmt->execute([
        $body['name'] ?? null,
        $body['slug'] ?? null,
        $body['description'] ?? null,
        $body['thumbnailUrl'] ?? null,
        $body['liveUrl'] ?? null,
        $body['repoUrl'] ?? null,
        $categoryId,
        $body['status'] ?? 'Draft',
        $id,
    ]);

    if (isset($body['technologies']) && is_array($body['technologies'])) {
        sync_technologies((int) $id, $body['technologies']);
    }

    json_response(['id' => (int) $id]);
}

if ($method === 'PATCH' && $id && $statusPatch) {
    require_auth();
    $body = json_body();
    $status = $body['status'] ?? '';

    if (!in_array($status, ['Draft', 'Published'], true)) {
        json_error('status must be Draft or Published');
    }

    $stmt = db()->prepare('UPDATE projects SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    json_response(['id' => (int) $id, 'status' => $status]);
}

if ($method === 'DELETE' && $id) {
    require_auth();
    $stmt = db()->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    json_response(null, 204);
}

json_error('Not found', 404);
