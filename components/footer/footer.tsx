import { createStyles, Text, Container, ActionIcon, Group, MantineNumberSize } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';

let data = [
    {
        title: 'PRODUCT',
        links: [
            { label: 'Products', link: 'https://rovolution.me/#products' },
            { label: 'Premium', link: 'https://www.rovolution.me/premium' },
            { label: 'Help and Support', link: 'https://rovolution.me/help-support' },
            { label: 'Report Bug', link: 'https://rovolution.me/report-bug' },
        ],
    },
    {
        title: 'COMPANY',
        links: [
            {
                label: 'Rovolution',
                link: 'https://www.rovolution.me',
            },
            {
                label: 'Rovolution Logistics',
                link: 'https://logistics.rovolution.me',
            },
            {
                label: 'Rovolution Group Management',
                link: 'https://gm.rovolution.me',
            },
            {
                label: 'Rovolution Status',
                link: 'https://status.rovolution.me',
            },
        ],
    },
    {
        title: 'LEGAL',
        links: [
            { label: 'Privacy Policy', link: '/PrivacyPolicy' },
            { label: 'Terms Of Service', link: '#' },
            { label: 'Accepted Used', link: '#' },
            { label: 'Refund Policy', link: '#' },
        ],
    },
];

const useStyles = createStyles((theme) => ({
    footer: {
        [theme.fn.smallerThan('950' as MantineNumberSize)]: {
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.md,
        },
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    logo: {
        maxWidth: 200,
        height: '100%',

        [theme.fn.smallerThan('950' as MantineNumberSize)]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '120px',
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan('950' as MantineNumberSize)]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',

        [theme.fn.smallerThan('950' as MantineNumberSize)]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',

        [theme.fn.smallerThan('950' as MantineNumberSize)]: {
            display: 'none',
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        minWidth: 'auto',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,

        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,

        paddingBottom: '5px',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            marginTop: '150px',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

export default function FooterLinks() {
    const { classes } = useStyles();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Link legacyBehavior key={index} href={link.link} passHref>
                <a>
                    <Text className={classes.link}>{link.label}</Text>
                </a>
            </Link>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    let height = Math.round((500 / 1850) * 300);
    let width = Math.round((1850 / 500) * height);

    return (
        <footer className={classes.footer /*+ " bg-[#0c1925]" */}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Text size="xs" color="dimmed" className={classes.description + ' absolute flex flex-col'}>
                        <div style={{ height, width }}>
                            <Image src="/Banner.png" alt="Logo" width={width} height={height} style={{ objectFit: 'contain' }} />
                        </div>
                        <p className={`w-[400px]`}>
                            Rovolution is a company that create next generation tolling for all size Roblot communities, we are not
                            affiliated to Roblox! We operated under our parent company Gerald. Digital
                        </p>
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2022 Rovolution. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
