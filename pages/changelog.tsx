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
                    'Rovolution automated changelog to list all patches, bug fixes and changes being implement across all Rovolution systems, from Logistics, to Analytics!'
                }
            />
        </>
    );
}
