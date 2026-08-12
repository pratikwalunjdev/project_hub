<?php

/**
 * Minimal HS256 JWT implementation — avoids a composer dependency on shared hosting.
 * Only supports what this app needs: sign a payload, verify + decode it, with expiry.
 */

function base64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string
{
    $padded = str_pad($data, strlen($data) % 4 === 0 ? strlen($data) : strlen($data) + (4 - strlen($data) % 4), '=');
    return base64_decode(strtr($padded, '-_', '+/'));
}

function jwt_sign(array $payload, string $secret, int $expiresInSeconds = 604800): string
{
    $header = ['typ' => 'JWT', 'alg' => 'HS256'];
    $payload['iat'] = time();
    $payload['exp'] = time() + $expiresInSeconds;

    $segments = [
        base64url_encode(json_encode($header)),
        base64url_encode(json_encode($payload)),
    ];

    $signature = hash_hmac('sha256', implode('.', $segments), $secret, true);
    $segments[] = base64url_encode($signature);

    return implode('.', $segments);
}

/** Returns the decoded payload array, or null if invalid/expired. */
function jwt_verify(string $token, string $secret): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    [$headerB64, $payloadB64, $signatureB64] = $parts;

    $expectedSignature = hash_hmac('sha256', "$headerB64.$payloadB64", $secret, true);
    $actualSignature = base64url_decode($signatureB64);

    if (!hash_equals($expectedSignature, $actualSignature)) {
        return null;
    }

    $payload = json_decode(base64url_decode($payloadB64), true);
    if (!is_array($payload)) {
        return null;
    }

    if (isset($payload['exp']) && time() > $payload['exp']) {
        return null;
    }

    return $payload;
}
