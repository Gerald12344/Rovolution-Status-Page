import Head from 'next/head';

interface props {
    title: string;
    description: string;
    image?: string;
}

export function GlobalMetaTags(props: props) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="title" content={props.title}></meta>
            <meta
                name="description"
                content={
                    props.description === undefined || props.description === ''
                        ? 'RovolutionLogistics is a powerful tool used to simplify many automation tasks in large roblox groups'
                        : props.description
                }
            ></meta>
            <meta name="subject" content="RovolutionLogistics provides proffesional level logistics solutiuons for Roblox Groups"></meta>
            <meta name="owner" content="GeraldIn2016"></meta>
            <meta name="category" content="Roblox Verification"></meta>
            <meta name="url" content="https://logistics.rovolution.com"></meta>
            <meta name="identifier-URL" content="https://logistics.rovolution.com"></meta>
            <meta
                name="keywords"
                content="Discord Bot, Roblox, Roblox Verification, Roblox Web console, Discord, Roblox Ranking, Auto ranking, Rovolution, Rovolution Discord bot, Rovolution bot, RovolutionLogistics, Roblox Logistics, Training Logger"
            ></meta>
            <meta name="robots" content="index, follow"></meta>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"></meta>
            <meta name="language" content="English"></meta>
            <meta name="author" content="GeraldIn2016"></meta>

            <meta content={props.title} property="og:title"></meta>

            <meta content={props.description} property="og:description"></meta>

            <meta content="Rovolution logistics" property="og:site_name"></meta>
            <meta name="og:url" content="https://logistics.rovolution.me" />
            <meta content={props.image ?? '/Logo.png'} property="og:image"></meta>
            <meta name="theme-color" content="#00a8ff"></meta>
        </Head>
    );
}
