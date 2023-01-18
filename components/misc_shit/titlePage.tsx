import Styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Root = Styled.div`
    margin:20px 40px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    text-align:right;
    h1{
        margin-bottom:0px;
    }
    p{
        margin-top:0px;
    }
    @media (max-width:722px){
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-align:center;
    }
    
`;

const GreenOrRed = Styled.p<{ colorInput: Boolean }>`
    font-size:17px;
    color: ${(props) => (props.colorInput ? '#37B24D' : '#C92A2A')};
`;

const ImageHolder = Styled.div`
    position: relative;
    width: 20%;
    min-height: 100px;
    min-width: 400px;
    aspect-ratio: 1850 / 500;
    
`;

export default function UptimeTitle({ allOperating }) {
    return (
        <Root>
            <ImageHolder>
                <Link legacyBehavior href="https://www.rovolution.me" passHref>
                    <a target="_blank" rel="noreferrer">
                        <Image src="/Banner.png" alt="Logo" layout="fill" />
                    </a>
                </Link>
            </ImageHolder>
            <div>
                <h1>System Status</h1>
                {allOperating && <GreenOrRed colorInput={allOperating}>All Systems Operational</GreenOrRed>}
                {allOperating === false && (
                    <>
                        <GreenOrRed colorInput={allOperating}>Some Systems Not Operational</GreenOrRed>
                    </>
                )}
            </div>
        </Root>
    );
}
