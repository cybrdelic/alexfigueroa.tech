export interface Theme {
    body: string;
    text: string;
    toggleBorder: string;
    gradient: string;
    cardBackground: string;
    primary: string;
    secondary: string;
    accent: string;
    hover: string;
    shadow: string;
    borderRadius: string;
    transition: string;
    fontFamily: string;
    error: string;
    success: string;
    cardColor: string;
}

// lightTheme.ts
export const lightTheme: Theme = {
    body: 'rgba(220,220,220,1)',
    text: 'rgba(0,0,0,1)',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(rgba(250,250,250,1), rgba(240,240,240,1))',
    cardBackground: 'rgba(240,240,240,0.8)',
    primary: 'rgba(255, 0, 200, 1)',
    secondary: 'rgba(0, 255, 200, 1)',
    accent: 'rgba(200, 0, 255, 1)',
    hover: 'rgba(0, 0, 255, 0.5)',
    shadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    transition: 'all 0.3s linear',
    fontFamily: '"Roboto", sans-serif',
    error: 'rgba(255, 0, 0, 1)',
    success: 'rgba(0, 255, 0, 1)',
    cardColor: 'rgba(250,250,250,0.9)'
};

// darkTheme.ts
export const darkTheme: Theme = {
    body: 'rgba(10,10,10,1)',
    text: 'rgba(255,255,255,1)',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(rgba(0,0,0,1), rgba(10,10,10,1))',
    cardBackground: 'rgba(5,5,5,0.8)',
    primary: 'rgba(0, 255, 0, 1)',
    secondary: 'rgba(255, 0, 0, 1)',
    accent: 'rgba(0, 0, 255, 1)',
    hover: 'rgba(255, 255, 255, 0.5)',
    shadow: '0px 0px 20px rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    transition: 'all 0.3s linear',
    fontFamily: '"Roboto", sans-serif',
    error: 'rgba(255, 0, 0, 1)',
    success: 'rgba(0, 255, 0, 1)',
    cardColor: 'rgba(5,5,5,0.9)'
};
