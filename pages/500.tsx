import Styled from 'styled-components';
import Footer from '../components/footer/footer';
import Image from 'next/image';
import { GlobalMetaTags } from '../components/globalMetaTags';
import Link from 'next/link';

const RootDiv = Styled.div`
    & > div > h1 {
        text-align:center;
        font-size:60px;
    }

`;
const Bigger = Styled.h1`
    
    font-size:60px;

`;
const NotFoundDiv = Styled.div`
    text-align:center;
    min-height:80vh;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    @media (max-width: 780px) {
        flex-direction:column;
    }
`;

const ImageDiv = Styled.div`
    position: relative;
    width: 30%;
    height: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    bottom: 0;
    flex-grow: 2;
    @media (max-width: 780px) {
        width:80%;
    }
`;

let SecondDiv = Styled.div`
    max-width:60%;
    padding:10px;
    min-height:100vh;
    display:flex;
    justify-content: center;
    align-items:center;
    
`;

const StyledLink = Styled.div`
    &:hover {
        cursor:pointer;
        color: blue;
    }
    color: #00a8ff;
    text-decoration:underline;
`;

export default function ErrorPageNotFound() {
    return (
        <RootDiv>
            <GlobalMetaTags title={'RovolutionLogistics - Server Error'} description={''} />
            <NotFoundDiv>
                <ImageDiv>
                    <Image src={`/PreviewAssets/ConstructionWorker.png`} alt="user" priority layout="fill" />
                </ImageDiv>
                <SecondDiv>
                    <div>
                        <Bigger>Unable to reach Rovolution Servers!</Bigger>
                        <h3>
                            If you are seeing this screen there has been a problem connecting to the Rovolution uptime database, this could
                            suggest a full service wide outage, check our Discord for more info!
                        </h3>
                        <StyledLink>
                            <Link legacyBehavior href={'https://discord.gg/cNarSfj43Z'}>
                                <a>Join our Discord</a>
                            </Link>
                        </StyledLink>
                        <pre>Error 500</pre>
                    </div>
                </SecondDiv>
            </NotFoundDiv>
            <Footer />
        </RootDiv>
    );
}
