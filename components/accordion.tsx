import { Accordion } from '@mantine/core';
import { useState } from 'react';
import { Circle, GreenOrRed, Inline, Ontop } from './misc_shit/uptimeComp';

export default function AccordionComp({ title, children }: { title: string; children: React.ReactNode }) {
    const [anyDown, setAnyDown] = useState(true);

    return (
        <Accordion style={{ width: '85vw', margin: 'auto' }}>
            <Accordion.Item value="Websites">
                <Accordion.Control>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ marginTop: '0px', marginBottom: '0px', textAlign: 'left' }}>{title}</h2>
                        <Inline>
                            <div>
                                <Circle colorInput={anyDown} />
                                <Ontop colorInput={anyDown} />
                            </div>

                            <GreenOrRed colorInput={anyDown}>{anyDown ? 'FULLY OPERATIONAL' : 'SERVER OUTAGE'}</GreenOrRed>
                        </Inline>
                    </div>
                </Accordion.Control>
                <Accordion.Panel>
                    <hr></hr>
                    {children}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
