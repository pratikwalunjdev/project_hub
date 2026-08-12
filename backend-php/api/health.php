<?php

require_once __DIR__ . '/../lib/response.php';

send_cors_headers();
json_response(['status' => 'ok']);
