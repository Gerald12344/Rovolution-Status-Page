import Styled from 'styled-components';
import Footer from '../components/footer';
import UptimeComponent from '../components/misc_shit/uptimeComp';
import UptimeTitle from '../components/misc_shit/titlePage';
import { useState } from 'react';
import MainUptimeBanner from '../components/misc_shit/uptimeBanner';
import { CreateAndRunAggregation } from '../server/database/Aggregation';
import { getManyFromUtilsFolder } from '../server/database/MongoMethods';
import { GlobalMetaTags } from '../components/globalMetaTags';

const Root = Styled.div`
    min-height:80vh;
    min-width:100vw;
    text-align:center;
    & > h1 {
        font-size:40px;
    }
`;

const Holder = Styled.div`
    & > div {
        margin-top:20px;
    }
    &:last-child{
        margin-bottom:50px;
    }
`;

interface Data {
    name: string;
    status: number;
    logs: { type: number; datetime: string; duration: string };
    percent: string;
}

export interface downProps {
    down: String;
}

export interface DataFromSSR {
    _id: ID;
}

interface ID {
    date: DateClass;
    down: { [key: string]: number };
}

interface DateClass {
    year: number;
    month: number;
    day: number;
}

export default function Uptime({
    data,
    down,
    statusArray,
}: {
    data: DataFromSSR[];
    down: downProps[];
    statusArray: { [key: string]: number }[];
}) {
    const [allOperating, setallOperating] = useState<Boolean>(down.map((item) => item.down).length > 0 ? false : true);
    const [whosDown, setWhosDown] = useState(down.map((item) => item.down));

    let status = statusArray[0];

    return (
        <>
            <GlobalMetaTags
                title={'Rovolution Status - ' + (allOperating ? 'All Running' : 'Server Outage!')}
                description={
                    'Rovolution status page reporting on the status of all Rovolution pages with incident history, full automated!'
                }
            />
            <Root>
                <UptimeTitle allOperating={allOperating} />

                {allOperating === false && <MainUptimeBanner who={whosDown as string[]} />}
                <h1>Uptime History</h1>

                <Holder>
                    <UptimeComponent
                        title="Rovolution Discord Bot"
                        description={'Rovolution Verification Bot'}
                        data={data}
                        dbTitle="Rovolution Bot"
                        down={down}
                        percent={status['Rovolution Bot']}
                    />
                    <UptimeComponent
                        title="Rovolution Core Database"
                        description={
                            'The heart of Rovolution where all data is stored and maintained, if this fails there will be a full system outage.'
                        }
                        data={data}
                        dbTitle="Rovolution Database"
                        down={down}
                        percent={status['Rovolution Database']}
                    />
                    <UptimeComponent
                        title="Rovolution Website"
                        description={'Rovolution website at https://www.rovolution.me'}
                        data={data}
                        dbTitle="Rovolution Site"
                        down={down}
                        percent={status['Rovolution Site']}
                    />
                    <UptimeComponent
                        title="Rovolution Logistics Website"
                        description={'Rovolution Logistics website at https://logistics.rovolution.me'}
                        data={data}
                        dbTitle="Logistics"
                        down={down}
                        percent={status['Logistics']}
                    />
                    <UptimeComponent
                        title="Rovolution Game Analytics"
                        description={'Rovolution game analytics backend!'}
                        data={data}
                        dbTitle="Analytics"
                        down={down}
                        percent={status['Analytics']}
                    />
                </Holder>
            </Root>
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    let data = await CreateAndRunAggregation({
        db: 'uptime',
        diffDB: 'utils',
        req: {
            query: {
                pid: undefined,
                week: false,
            },
        } as any,
        fetchValues: ['data.down', 'data.officalStatement'],
        pipeline: {
            _id: {
                date: {
                    year: '$date.year',
                    month: '$date.month',
                    day: '$date.day',
                },
                down: '$data.down',
                officalStatement: '$data.officalStatement',
            },
        },
    });

    const down = await getManyFromUtilsFolder('whats_down', {});
    const status = await getManyFromUtilsFolder('cache', {
        humanKey: 'uptime-ratios',
    });

    return {
        props: {
            data,
            down,
            statusArray: status,
        },
    };
}
