import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface CommitData {
    date: string; // Date in 'YYYY-MM-DD' format
    count: number; // Number of commits
}

interface GitHubHeatmapProps {
    commitData: CommitData[];
}

const GitHubHeatmap: React.FC<GitHubHeatmapProps> = ({ commitData }) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return (
        <CalendarHeatmap
            startDate={sixMonthsAgo}
            endDate={new Date()}
            values={commitData}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-scale-${Math.min(value.count, 4)}`;
            }}
        />
    );
};

export default GitHubHeatmap;
