import React, { useEffect, useState } from "react";
import { fetchGitHubContributions, processCommitData } from "../../data/apis/github";
import GitHubHeatmap from "../GithubHeatmap";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { css } from "styled-components";

interface GitHubHeatmapContainerProps {
    username: string;
}
const Container = createStyledMotionComponent('div')(props => css`
    padding: 1rem;
`)
const GitHubHeatmapContainer: React.FC<GitHubHeatmapContainerProps> = ({ username }) => {
    const [commitData, setCommitData] = useState<{ date: string; count: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetchGitHubContributions(username);
            const processedData = processCommitData(rawData);
            setCommitData(processedData);
        };

        fetchData();
    }, [username]);

    return <GitHubHeatmap commitData={commitData} />;
};

export default GitHubHeatmapContainer;
