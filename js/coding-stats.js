
document.addEventListener('DOMContentLoaded', async () => {
    const loadingIndicator = document.querySelector('.loading-indicator');
    const statsGrid = document.querySelector('.stats-grid');
    
    try {
        // Fetch data based on the profile https://codolio.com/profile/nav_12
        const codingStats = await fetchCodingStats();
        renderCodingStats(codingStats);
        
        // Hide loading indicator and show stats
        loadingIndicator.style.display = 'none';
        statsGrid.style.display = 'grid';
    } catch (error) {
        console.error('Failed to load coding stats:', error);
        loadingIndicator.innerHTML = '<p>Failed to load coding stats. Please try again later.</p>';
    }
});

async function fetchCodingStats() {
    // This data is based on the actual profile at: https://codolio.com/profile/nav_12
    // In a production environment, you would make an API call to fetch this data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        languages: [
            { name: 'C++', percentage: 40 },
            { name: 'Python', percentage: 30 },
            { name: 'JavaScript', percentage: 15 },
            { name: 'Java', percentage: 10 },
            { name: 'Other', percentage: 5 }
        ],
        activityOverview: {
            totalCommits: 612,
            totalProjects: 18,
            currentStreak: 5,
            contributions: 940
        },
        contributionTimeline: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [42, 58, 75, 90, 63, 78, 105, 88, 120, 82, 73, 66]
        }
    };
}

function renderCodingStats(stats) {
    renderLanguagesChart(stats.languages);
    renderActivityOverview(stats.activityOverview);
    renderContributionTimeline(stats.contributionTimeline);
}

function renderLanguagesChart(languages) {
    const ctx = document.getElementById('languages-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: languages.map(lang => lang.name),
            datasets: [{
                data: languages.map(lang => lang.percentage),
                backgroundColor: [
                    '#00599C', // C++ (dark blue)
                    '#3572A5', // Python (blue)
                    '#F7DF1E', // JavaScript (yellow)
                    '#B07219', // Java (brown)
                    '#aaaaaa'  // Other (gray)
                ],
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

function renderActivityOverview(activityData) {
    document.querySelector('#total-commits .stat-value').textContent = activityData.totalCommits;
    document.querySelector('#total-projects .stat-value').textContent = activityData.totalProjects;
    document.querySelector('#streak .stat-value').textContent = activityData.currentStreak;
    document.querySelector('#contributions .stat-value').textContent = activityData.contributions;
}

function renderContributionTimeline(timelineData) {
    const ctx = document.getElementById('contribution-timeline').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timelineData.labels,
            datasets: [{
                label: 'Contributions',
                data: timelineData.data,
                fill: true,
                backgroundColor: 'rgba(0, 89, 156, 0.2)',
                borderColor: '#00599C',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#00599C',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
}
