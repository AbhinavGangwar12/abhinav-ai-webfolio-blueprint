
document.addEventListener('DOMContentLoaded', async () => {
    const loadingIndicator = document.querySelector('.loading-indicator');
    const statsGrid = document.querySelector('.stats-grid');
    
    try {
        // Simulate fetching data from Codolio
        // Note: Since we can't directly access the Codolio API, we'll create mock data based on your profile
        // In a real scenario, you would make an API call to fetch this data
        
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
    // This is simulated data based on the Codolio profile: https://codolio.com/profile/nav_12
    // In a real implementation, you would fetch this data from an API
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        languages: [
            { name: 'Python', percentage: 45 },
            { name: 'JavaScript', percentage: 25 },
            { name: 'C++', percentage: 15 },
            { name: 'Java', percentage: 10 },
            { name: 'Other', percentage: 5 }
        ],
        activityOverview: {
            totalCommits: 527,
            totalProjects: 12,
            currentStreak: 7,
            contributions: 873
        },
        contributionTimeline: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [30, 45, 62, 78, 56, 89, 91, 85, 110, 95, 66, 71]
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
                    '#33C3F0', // Teal (primary)
                    '#3B3B6D', // Navy
                    '#6E88FF', // Light Blue
                    '#F1F0FB', // Light Navy
                    '#B5B5E3'  // Muted Purple
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
                backgroundColor: 'rgba(51, 195, 240, 0.2)',
                borderColor: '#33C3F0',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#33C3F0',
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
