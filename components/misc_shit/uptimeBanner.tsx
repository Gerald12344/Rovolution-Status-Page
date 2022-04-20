import { Paper } from '@mantine/core';
import Styled from 'styled-components';

const Root = Styled.div`
    height:max-content;
    width: 80%;
    margin:auto;
    min-height:200px;
`;
const Background = Styled.div`
    border-color: rgba(201, 42, 42, 0.74);
    border-style: solid;
    color:white;
    border-width: 4px;
    background-color: rgba(201, 42, 42, 0.74);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    p,h3{
        margin:0px;
    }
`;

export default function MainUptimeBanner({ who }: { who: string[] }) {
    return (
        <Root>
            <Paper shadow="xs" p="md" component={Background} withBorder>
                <h1>Some Rovolution Critical Services are down!</h1>
                <h3>We are currently experiencing issues with:</h3>
                <ul>
                    {who.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </Paper>
        </Root>
    );
}
