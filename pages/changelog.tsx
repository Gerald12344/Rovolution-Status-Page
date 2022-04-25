import { useEffect } from 'react';
import { GlobalMetaTags } from '../components/globalMetaTags';

export default function Uptime() {
    useEffect(() => {
        window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
    }, []);

    return (
        <>
            <GlobalMetaTags
                title={'Rovolution Logistics - Changelog'}
                description={
                    'Rovolution status page reporting on the status of all Rovolution pages with incident history, full automated!'
                }
            />
        </>
    );
}
