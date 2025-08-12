document.addEventListener('DOMContentLoaded', function() {
    // Get results from localStorage
    const results = JSON.parse(localStorage.getItem('analysisResults'));
    if (!results) {
        window.location.href = 'index.html';
        return;
    }
    // Display scores
    document.getElementById('overallScore').textContent = results.overallScore;
    document.getElementById('marketScore').textContent = results.marketScore;
    document.getElementById('competitionScore').textContent = results.competitionScore;
    document.getElementById('monetizationScore').textContent = results.monetizationScore;
    // Display recommendation list
    const recommendationsList = document.getElementById('recommendations');
    results.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
    // Chart.js Radar Chart
    const ctx = document.getElementById('scoresChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Market Demand', 'Competition', 'Monetization'],
            datasets: [{
                label: 'Idea Scores',
                data: [
                    results.marketScore,
                    results.competitionScore,
                    results.monetizationScore
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scale: {
                min: 0,
                max: 100
            }
        }
    });
});
