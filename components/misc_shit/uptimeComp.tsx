import { Paper, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { DataFromSSR, downProps } from '../../pages/index';

const Root = Styled.div`
    width:80vw;
    min-width:400px;
    margin:auto;
    text-align:left;
    & > div {
        padding:0px 30px;
        & > div {
            overflow:hidden;
            
        }
    }
    overflow:hidden;
    hr{
        margin-top:0px;
    }

`;

const LineHolder = Styled.div`
    overflow:hidden;
    display:flex;
    width:max-content;
    justify-content:center;
    align-items:center;
    float:right;
    flex-direction:row;
    & > div {
        height:60px;
        width:10px;
        margin:2px;
    }
`;

const ColorChanger = Styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
`;

const MAX_WIDTH = Styled.div`
    height:60px;
    width:10px;
`;

const TextHolder = Styled.div`
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
    justify-content:space-between;
    margin-top:5px;
`;

const GreenOrRed = Styled.p<{ colorInput: Boolean }>`
    font-size:17px;
    color: ${(props) => (props.colorInput ? '#37B24D' : '#C92A2A')};
`;

const Circle = Styled.div<{ colorInput: Boolean }>`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${(props) => (props.colorInput ? 'rgba(55, 178, 78, 0.506)' : 'rgb(201, 42, 42, 0.506)')};
    margin-right:10px;
    filter:blur(3px);
    animation: animatename 4s ease infinite;
    @keyframes animatename{
        0%{
            transform: scale(1);
        }
        25%{
            transform: scale(1.3);
        }
        100%{
            transform: scale(1);
        }
    }
`;

const Ontop = Styled.div<{ colorInput: Boolean }>`

    position:absolute;
    width:20px;
    height:20px;
    border-radius:50%;
    transform:scale(0.75) translateY(-25px);
    filter:blur(0px);
    background-color: ${(props) => (props.colorInput ? 'rgba(55, 178, 78)' : 'rgb(201, 42, 42)')};
`;

const Inline = Styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;

const UptimePercentHolder = Styled.div<{ fullWidth: Boolean }>`
    padding-top:20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    & > hr {
        width:100%;
    }
    & > div{
        width:100%;
        display:flex;
        flex-wrap:nowrap;
        flex-direction:row;
        justify-content: ${(props) => (props.fullWidth ? 'space-between' : 'center')};;
        align-items:center;
        transform:translateY(-38px);
        z-index:1;
       
        p {
            width: max-content;
            background-color:white;
            padding:0px 10px;
        }
    }
    margin-bottom:-38px;
`;

export default function UptimeComponent({
    title,
    description,
    data,
    down,
    dbTitle,
    percent,
}: {
    title: string;
    description: string;
    data: DataFromSSR[];
    down: downProps[];
    dbTitle: string;
    percent: number;
}) {
    const [reason, setReason] = useState('Server Outage');
    const [AmkIDown, setAmkIDown] = useState(down.find((x) => x.down === dbTitle) === undefined);

    const [wider, setWider] = useState(false);
    const [dataLines, setDataLines] = useState({});

    useEffect(() => {
        let updateWidth = () => {
            setWider(window.innerWidth > 1000);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    useEffect(() => {
        if (data === undefined) return;

        // Ok work out days it was down
        let dateIn = new Date();
        dateIn.setMonth(dateIn.getMonth() - 3);
        let startTime = dateIn.getTime();

        let endTime2 = new Date();
        endTime2.setMonth(endTime2.getMonth() + 1);
        let endTime = endTime2.getTime() + 86400000;

        let buildArray: { [key: string]: boolean } = {};

        for (let loopTime = startTime; loopTime < endTime; loopTime += 86400000) {
            let loopDay = new Date(loopTime);
            let formatDay = `${loopDay.getDate()}/${loopDay.getMonth()}/${loopDay.getFullYear()}`;
            buildArray[formatDay] = false;
        }
        setDataLines(buildArray);
    }, [data]);

    useEffect(() => {
        setAmkIDown(down.find((x) => x.down === dbTitle) === undefined);
    }, [down]);

    return (
        <Root>
            <Paper shadow={'xl'} withBorder>
                <TextHolder>
                    <div>
                        <p>
                            <strong>{title}</strong> | <span style={{ color: 'grey' }}>{description}</span>
                        </p>
                    </div>
                    <Inline>
                        <div>
                            <Circle colorInput={AmkIDown} />
                            <Ontop colorInput={AmkIDown} />
                        </div>

                        <GreenOrRed colorInput={AmkIDown}>{AmkIDown ? 'FULLY OPERATIONAL' : reason}</GreenOrRed>
                    </Inline>
                </TextHolder>

                <hr></hr>
                <div>
                    <LineHolder>
                        {Object.keys(dataLines).map((key, k) => {
                            const allOk =
                                data.find((x) => {
                                    let buildDate = `${x._id.date.day}/${x._id.date.month}/${x._id.date.year}`;
                                    return buildDate === key && x._id.down[dbTitle] !== undefined;
                                }) === undefined;

                            return (
                                <ColorChanger key={k} color={allOk ? '#37B24D' : '#D9480F'}>
                                    <Tooltip
                                        wrapLines
                                        width={150}
                                        label={(allOk ? 'No Issues!' : 'Server Outage!') + '\n' + key}
                                        arrowSize={5}
                                        withArrow
                                    >
                                        <MAX_WIDTH />
                                    </Tooltip>
                                </ColorChanger>
                            );
                        })}
                    </LineHolder>
                </div>
                <UptimePercentHolder fullWidth={wider}>
                    <hr></hr>
                    <div>
                        {wider && <p>90 days ago</p>}
                        <p>{percent}% uptime</p>
                        {wider && <p>Today</p>}
                    </div>
                </UptimePercentHolder>
            </Paper>
        </Root>
    );
}
