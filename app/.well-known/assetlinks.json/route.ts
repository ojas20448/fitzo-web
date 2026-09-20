// Use the Play App Signing certificate, not the upload certificate.
// Public SHA-256 fingerprints may be comma-separated during key rotation.
export const dynamic = 'force-dynamic';

export function GET() {
  const fingerprints = (process.env.FITZO_ANDROID_CERT_SHA256 || '')
    .split(',').map(value => value.trim().toUpperCase()).filter(Boolean);
  if (!fingerprints.length || fingerprints.some(value => !/^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value))) {
    return Response.json({ error: 'App association is not configured' }, { status: 503 });
  }
  return Response.json([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.fitzo.app',
      sha256_cert_fingerprints: fingerprints,
    },
  }]);
}
