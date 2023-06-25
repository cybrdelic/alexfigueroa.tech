import { ReactComponent as Cybrnet } from '../../public/logos/cybrnet.svg';
import { ReactComponent as Portfolio } from '../../public/logos/alexfigueroa.tech.svg';
import { ReactComponent as X1dra } from '../../public/logos/x1dra.svg';
import { ReactComponent as Extranyx } from '../../public/logos/extranyx.svg';
import { ReactComponent as OversoulDB } from '../../public/logos/oversoul_db.svg';


export const getProjectLogos = () => {
    return {
        cybrnet: <Cybrnet />,
        portfolio: <Portfolio />,
        x1dra: <X1dra />,
        extranyx: <Extranyx />,
        oversoulDb: <OversoulDB />
    }
}
