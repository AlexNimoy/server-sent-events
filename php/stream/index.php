<?php
header("Content-Type: text/event-stream");

$id = 0;
while (1) {
  echo "id: " . ++$id . "\n",
       "event: message\n",
       'data: ' . rand(1, 10), "\n\n";

  sleep(1);
}
