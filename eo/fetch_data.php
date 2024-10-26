<?php
// fetch_data.php
header('Content-Type: application/json');

// Function to fetch candlestick data from Alpha Vantage API
function fetchCandlestickData() {
    $api_key = "DJNYLGV3K4CW6Y6B"; // Your Alpha Vantage API key
    $api_url = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=1min&apikey=$api_key";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    // Check if data is available
    if (isset($data['Time Series FX (1min)'])) {
        // Format data to make it compatible with the pattern check function
        $candles = [];
        foreach ($data['Time Series FX (1min)'] as $time => $values) {
            $candles[] = [
                'open' => (float)$values['1. open'],   // Convert to float
                'close' => (float)$values['4. close']  // Convert to float
            ];
        }
        // Return only the latest candles, ordered by time
        return array_slice(array_reverse($candles), 0, 6);
    }
    return null;
}

// Function to check the up-down and down-up pattern
function checkPatterns($candles) {
    $upDownPattern = [];
    $downUpPattern = [];
    
    for ($i = 1; $i < count($candles); $i++) {
        if ($candles[$i]['close'] > $candles[$i]['open']) {
            $upDownPattern[] = "up";
            $downUpPattern[] = "down";
        } else {
            $upDownPattern[] = "down";
            $downUpPattern[] = "up";
        }
    }

    // Check for six consecutive patterns
    $upDownMatch = array_slice($upDownPattern, -6) === ["up", "down", "up", "down", "up", "down"];
    $downUpMatch = array_slice($downUpPattern, -6) === ["down", "up", "down", "up", "down", "up"];
    
    return $upDownMatch || $downUpMatch;
}

// Fetch the data and check the patterns
$candles = fetchCandlestickData();
$signal = false;
if ($candles) {
    $signal = checkPatterns($candles);
}

// Return the result as JSON
echo json_encode(['signal' => $signal]);
?>
