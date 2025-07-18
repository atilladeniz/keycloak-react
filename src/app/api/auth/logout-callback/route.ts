export async function GET() {
  // This is the callback after Keycloak logout
  // Simply return a success page that closes itself
  return new Response(`
    <html>
      <body>
        <script>
          // Notify parent window if in iframe
          if (window.parent !== window) {
            window.parent.postMessage('keycloak-logout-complete', '*');
          }
          // Close window or redirect
          window.close();
          // Fallback redirect
          setTimeout(() => {
            window.location.href = '/';
          }, 100);
        </script>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}