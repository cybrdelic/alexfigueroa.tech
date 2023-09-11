export const getProjectLogos = () => {
    return {
        cybrnet: '/logos/cybrnet.svg',
        portfolio: '/logos/alexfigueroa.tech.svg',
        x1dra: '/logos/x1dra.svg',
        extranyx: '/logos/extranyx.svg',
        oversoulDb: '/logos/oversoul_db.svg'
    }
}

export const getProjectLogoPhotos = () => {
    const getPath = (fileName: string) => {
        return `/logos/photos/${fileName}.png`;
    }
    return {
        x1dra: getPath('x1dra'),
        cybrnet: getPath('cybrnet'),
        portfolio: getPath('alexfigueroa.tech'),
        extranyx: getPath('extranyx'),
        oversoulDb: getPath('oversoul_db')
    }
}
