
header('Content-Type: application/json; charset=utf-8');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}

// Simple input retrieval and validation
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$items = isset($_POST['items']) ? trim($_POST['items']) : '';
$notes = isset($_POST['notes']) ? trim($_POST['notes']) : '';

if ($name === '' || $phone === '' || $items === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please fill name, phone and order items.']);
  exit;
}

// Basic sanitization
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$items = htmlspecialchars($items, ENT_QUOTES, 'UTF-8');
$notes = htmlspecialchars($notes, ENT_QUOTES, 'UTF-8');

// TODO: Replace with real persistence (DB, email, SMS, etc.)
// For now we append to a local file orders.txt (ensure writable permissions)
$record = sprintf(
  "[%s] Name: %s | Phone: %s | Items: %s | Notes: %s\n",
  date('Y-m-d H:i:s'),
  $name,
  $phone,
  $items,
  $notes
);

$file = __DIR__ . '/orders.txt';
if (file_put_contents($file, $record, FILE_APPEND | LOCK_EX) === false) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to save order. Contact admin.']);
  exit;
}

// Optionally: send an admin email (commented out)
// mail('you@yourshop.com', 'New Donut Order', $record);

echo json_encode(['success' => true, 'message' => 'Order received. Thank you!']);
exit;
