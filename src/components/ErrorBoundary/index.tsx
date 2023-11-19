import React from "react"

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
