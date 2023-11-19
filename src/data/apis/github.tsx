import axios from 'axios';

interface GitHubEvent {
    type: string;
    created_at: string;
    payload: {
        commits: any[];
    };
}

export const fetchGitHubContributions = async (username: string): Promise<GitHubEvent[]> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return [];
    }
};
export const processCommitData = (events: GitHubEvent[]): { date: string; count: number }[] => {
    const commitData: Record<string, number> = {};

    events.forEach(event => {
        if (event.type === 'PushEvent') {
            event.payload.commits.forEach(commit => {
                // Check if commit.author and commit.author.date exist
                if (commit.author && commit.author.date) {
                    const date = new Date(commit.author.date);
                    // Check if the date is valid
                    if (!isNaN(date.getTime())) {
                        const formattedDate = date.toISOString().split('T')[0];
                        commitData[formattedDate] = (commitData[formattedDate] || 0) + 1;
                    }
                }
            });
        }
    });

    return Object.entries(commitData).map(([date, count]) => ({ date, count }));
};
