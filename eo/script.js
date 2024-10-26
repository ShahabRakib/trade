document.addEventListener('DOMContentLoaded', function() {
    const alertSound = document.getElementById('alertSound');
    const signalText = document.getElementById('signal-text');

    function checkCandlestickPatterns() {
        fetch('fetch_data.php')
            .then(response => response.json())
            .then(data => {
                if (data.signal) {
                    signalText.textContent = "Matched!";
                    alertSound.play(); // Play sound if matched
                } else {
                    signalText.textContent = "No Match";
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Set interval to check every minute (60000 milliseconds)
    setInterval(checkCandlestickPatterns, 60000);
    // Initial check when the page loads
    checkCandlestickPatterns();
});
