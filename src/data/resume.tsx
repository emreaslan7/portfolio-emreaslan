import { Icons } from '@/components/icons';
import { HomeIcon, NotebookIcon, LibraryBig, Sparkles, Pi } from 'lucide-react';
import { ReactLight } from '@/components/ui/svgs/reactLight';
import { NextjsIconDark } from '@/components/ui/svgs/nextjsIconDark';
import { Typescript } from '@/components/ui/svgs/typescript';
import { Nodejs } from '@/components/ui/svgs/nodejs';
import { Python } from '@/components/ui/svgs/python';
import { Docker } from '@/components/ui/svgs/docker';
import { Javascript } from '@/components/ui/svgs/javascript';
import { Tensorflow } from '@/components/ui/svgs/tensorflow';
import { Keras } from '@/components/ui/svgs/keras';
import { Mongodb } from '@/components/ui/svgs/mongodb';
import { Redux } from '@/components/ui/svgs/redux';
import { Solidity } from '@/components/ui/svgs/solidity';

export const DATA = {
  name: 'Emre Aslan',
  initials: 'EA',
  url: 'https://www.emreaslan.dev',
  location: 'Istanbul, Turkey',
  linkedin: 'https://www.linkedin.com/company/jotform/',
  browser: 'https://www.jotform.com/',
  locationLink: 'https://www.google.com/maps/place/Istanbul,+Turkey',
  description:
    'Software Developer focused on AI/ML, Web3, image processing, full-stack software development, and blockchain.',
  summary:
    'I am an Electrical and Electronics Engineering student with a strong foundation in programming, artificial intelligence, and image processing. I enjoy applying engineering principles to real-world challenges through hands-on AI, image processing, blockchain, and full-stack projects. I am currently focusing on deep learning, machine learning, and Web3 development while looking for opportunities to contribute to practical, innovative products.',
  avatarUrl: '/me.png',
  skills: [
    { name: 'JavaScript', icon: Javascript },
    { name: 'TypeScript', icon: Typescript },
    { name: 'Python', icon: Python },
    { name: 'TensorFlow', icon: Tensorflow },
    { name: 'Keras', icon: Keras },
    { name: 'React', icon: ReactLight },
    { name: 'Next.js', icon: NextjsIconDark },
    { name: 'Node.js', icon: Nodejs },
    // { name: 'Express' },
    { name: 'MongoDB', icon: Mongodb },
    { name: 'Redux', icon: Redux },
    { name: 'Solidity', icon: Solidity },
    // { name: 'Hardhat' },
    // { name: 'Ethers.js' },
    // { name: 'Tailwind CSS' },
    { name: 'Docker', icon: Docker },
  ],
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/blog', icon: NotebookIcon, label: 'Blog' },
  ],
  notebook: {
    icon: LibraryBig,
    label: 'Notebooks',
    links: [
      { href: 'https://ai.emreaslan.dev', label: 'AI', icon: Sparkles },
      { href: 'https://cryptomath.emreaslan.dev', label: 'CryptoMath', icon: Pi },
    ],
  },
  contact: {
    email: 'emreaslan.eth@gmail.com',
    tel: '',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/emreaslan7',
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: 'Send Email',
        url: 'mailto:emreaslan.eth@gmail.com',
        icon: Icons.email,
        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/emreaslan7/',
        icon: Icons.linkedin,
        navbar: true,
      },
      // X: {
      //   name: 'X',
      //   url: 'https://twitter.com/blockenddev',
      //   icon: Icons.x,
      //   navbar: true,
      // },
      // Hashnode: {
      //   name: 'Hashnode',
      //   url: 'https://emreaslan.hashnode.dev/',
      //   icon: Icons.globe,
      //   navbar: true,
      // },
      Kaggle: {
        name: 'Kaggle',
        url: 'https://www.kaggle.com/emreaslan7',
        icon: Icons.kaggle,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: 'Jotform',
      href: 'https://www.jotform.com/',
      location: 'Istanbul, Turkey',
      linkedin: 'https://www.linkedin.com/company/jotform/',
      browser: 'https://www.jotform.com/',
      logoUrl:
        'https://media.licdn.com/dms/image/v2/D4D0BAQHMfKQkTTHuiw/company-logo_200_200/B4DZyPciKbH4AM-/0/1771933148709/jotform_logo?e=2147483647&v=beta&t=PMx4SLPMfR7fHvW3KGI6hBfuXtdNpTIUTqeUueYfP_g',
      companyDuration: '11 months',
      workMode: 'Hybrid',
      roles: [
        {
          title: 'Frontend Support Engineer',
          employmentType: 'Part-time',
          start: 'Nov 2025',
          end: 'Present',
          duration: '8 months',
          location: 'Istanbul, Turkey',
          linkedin: 'https://www.linkedin.com/company/jotform/',
          browser: 'https://www.jotform.com/',
          description:
            'Supporting customer-facing frontend work, improving UI behavior, and shipping small product fixes while collaborating with the core product team.',
          highlights: [
            'Built and maintained reusable React and TypeScript UI pieces.',
            'Worked closely with product and design to keep releases consistent and responsive.',
          ],
        },
        {
          title: 'Software Developer Internship',
          employmentType: 'Intern',
          start: 'Aug 2025',
          end: 'Jan 2026',
          duration: '6 months',
          location: 'Istanbul, Turkey',
          linkedin: 'https://www.linkedin.com/company/jotform/',
          browser: 'https://www.jotform.com/',
          description:
            'Contributed to internal product flows while learning how to ship features in a professional team setting.',
          highlights: [
            'Developed scalable web app features with React, JavaScript, and TypeScript.',
            'Implemented reusable, component-based structures and worked with RESTful APIs.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: 'Electrical and Electronics Engineering',
      href: 'https://www.emreaslan.dev',
      degree: 'Bachelor of Engineering - BE',
      location: 'Bursa, Turkey',
      logoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbOFzFUkzj60euBs5yYnfTVboO4qPlau-vJQqaF9x7j48vKE1d8mx6JIw&s=10',
      start: '2021',
      end: '2026 (Expected)',
    },
  ],
  projects: [
    {
      title: 'H.A.L.O.',
      href: 'https://halo-production-d6b4.up.railway.app/',
      miniDesc: 'LLM Routing System with RL',
      date: 'Q1-2026',
      active: true,
      description:
        'A hardware-aware local LLM routing system that intelligently selects the best model for any machine via a two-stage RouteLLM + DQN decision pipeline, with an interactive demo playground.',
      technologies: ['Python', 'FastAPI', 'PyTorch', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
      links: [
        {
          type: 'Website',
          href: 'https://halo-production-d6b4.up.railway.app/',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/halo',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/halo-logo.png',
      video: '',
    },
    {
      title: 'Angiography Analysis Tool',
      href: '',
      miniDesc: 'Automated Angiography Analysis',
      date: 'Q1-2025',
      active: true,
      description:
        'A PyQt5-based desktop application for automated analysis of angiography images and videos. Integrates YOLO-based object detection, semantic segmentation, and stenosis tracking to assist in evaluating vascular structures from interventional cardiology procedures.',
      technologies: ['Python', 'PyQt5', 'OpenCV', 'TensorFlow', 'YOLO', 'PyTorch', 'NumPy', 'scikit-learn'],
      links: [
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/angiography-analysis',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/angiography-analysis-tool-logo.png',
      video: '',
    },
    {
      title: 'Securify',
      href: 'https://securify-0.vercel.app/',
      miniDesc: 'Multi-wallet Blockchain App',
      date: 'Q2-2024',
      isHackathonWinner: true,
      active: true,
      description:
        'An easy-to-use blockchain wallet for associations, companies, and communities. Users can create multiple wallets, group them, transfer USDC across different blockchains, and keep transactions transparent on-chain.',
      technologies: [
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'shadcn/ui',
        'MongoDB',
        'Prisma',
        'NextAuth',
        'Web3.js',
        'Circle',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://securify-0.vercel.app/',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/securify',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/securify-logo.png',
      video: '',
    },
    {
      title: 'WIFG',
      href: 'https://wifg-solana-explorer.vercel.app/',
      miniDesc: 'Solana Block Explorer',
      date: 'Q2-2024',
      active: true,
      description:
        'A Solana blockchain data explorer with a modern interface for viewing, analyzing, and understanding blockchain information in real time.',
      technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Web3.js', 'Solana'],
      links: [
        {
          type: 'Website',
          href: 'https://wifg-solana-explorer.vercel.app/',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/wifg-solana-explorer',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/wifg-logo.png',
      video: '',
    },
    // {
    //   title: 'Twitella',
    //   href: 'https://twitella.vercel.app/',
    //   dates: 'Full-stack Project',
    //   active: true,
    //   description:
    //     'A MERN stack social application that helps users connect, share posts, follow conversations, and engage with people around shared interests.',
    //   technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Material UI'],
    //   links: [
    //     {
    //       type: 'Website',
    //       href: 'https://twitella.vercel.app/',
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: 'Source',
    //       href: 'https://github.com/emreaslan7/twitella',
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: '/projects/twitella-mockup.png',
    //   video: '',
    // },
    // {
    //   title: 'MetaverseMarketplace',
    //   href: 'https://nftmarketplacepolygon.vercel.app/',
    //   dates: 'Web3 Project',
    //   active: true,
    //   description:
    //     'A Polygon NFT marketplace where artists and photographers can showcase and sell work while collectors explore and purchase collections.',
    //   technologies: ['JavaScript', 'Next.js', 'Tailwind CSS', 'Solidity', 'Ethers.js', 'Hardhat', 'Polygon'],
    //   links: [
    //     {
    //       type: 'Website',
    //       href: 'https://nftmarketplacepolygon.vercel.app/',
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: 'Source',
    //       href: 'https://github.com/emreaslan7/nftmarketplacepolygon',
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: '/projects/metaversemarketplace-mockup.png',
    //   video: '',
    // },
    // {
    //   title: 'RoboPunksNFT',
    //   href: 'https://robo-punks-nft-git-master-emreaslan7.vercel.app/',
    //   dates: 'Web3 Learning Project',
    //   active: true,
    //   description:
    //     'An ERC-721 NFT minting website built to practice smart contract development with Solidity, Hardhat, OpenZeppelin, React, and Ethers.js.',
    //   technologies: ['JavaScript', 'React', 'Solidity', 'Ethers.js', 'Hardhat', 'Chakra UI'],
    //   links: [
    //     {
    //       type: 'Website',
    //       href: 'https://robo-punks-nft-git-master-emreaslan7.vercel.app/',
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: 'Source',
    //       href: 'https://github.com/emreaslan7/RoboPunksNFT-mintingwebsite',
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: '/projects/robopunksnft-mockup.png',
    //   video: '',
    // },
    {
      title: 'HearthHue',
      href: 'https://hearth-hue.vercel.app/',
      miniDesc: 'Charity Donation dApp',
      date: 'Q2-2023',
      active: true,
      description:
        'A charity donation dApp where people can donate ETH that is automatically stored and managed through a smart contract.',
      technologies: ['JavaScript', 'React', 'Solidity', 'Hardhat', 'Ethers.js'],
      links: [
        {
          type: 'Website',
          href: 'https://hearth-hue.vercel.app/',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/ether-donation-dapp',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/HearthHue-logo.png',
      video: '',
    },
    {
      title: 'ETHscanSimply',
      href: 'https://ethscansimply.vercel.app/',
      miniDesc: 'Simply Ethereum Data Explorer',
      date: 'Q1-2023',
      active: true,
      description:
        'A beginner-friendly interface for exploring Ethereum blockchain data without the complexity of traditional block explorers.',
      technologies: ['JavaScript', 'Next.js', 'Ethers.js', 'Chakra UI', 'Ethereum'],
      links: [
        {
          type: 'Website',
          href: 'https://ethscansimply.vercel.app/',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/emreaslan7/EthScanSimply',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/projects/ethscansimply-logo.png',
      video: '',
    },
    // {
    //   title: 'Spend Bitcoin',
    //   href: 'https://spend-bitcoin.vercel.app/',
    //   dates: 'Frontend Project',
    //   active: true,
    //   description:
    //     'An interactive Bitcoin price-history experience that asks what you could buy with one bitcoin in different years.',
    //   technologies: ['JavaScript', 'React', 'Redux', 'Tailwind CSS'],
    //   links: [
    //     {
    //       type: 'Website',
    //       href: 'https://spend-bitcoin.vercel.app/',
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: 'Source',
    //       href: 'https://github.com/emreaslan7/spend-bitcoin',
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: '/projects/spendbitcoin-mockup.png',
    //   video: '',
    // },
    // {
    //   title: 'Removiect',
    //   href: 'https://removiect.netlify.app/',
    //   dates: 'Frontend Project',
    //   active: true,
    //   description:
    //     'A personal movie tracking app for searching movies and viewing related information, built while practicing React and Tailwind CSS.',
    //   technologies: ['JavaScript', 'React', 'Tailwind CSS'],
    //   links: [
    //     {
    //       type: 'Website',
    //       href: 'https://removiect.netlify.app/',
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: 'Source',
    //       href: 'https://github.com/emreaslan7/react-movie',
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: '/projects/removiect-mockup.png',
    //   video: '',
    // },
  ],
  hackathons: [
    {
      title: 'Securify',
      dates: 'Hackathon Winner',
      location: 'Web3 / Circle',
      description:
        'Built a blockchain wallet for organizations and communities, with multi-wallet grouping and USDC transfers across chains.',
      image: '/projects/securify-logo.png',
      win: 'Winner',
      links: [
        {
          title: 'Source',
          icon: <Icons.github className="h-4 w-4" />,
          href: 'https://github.com/emreaslan7/securify',
        },
        {
          title: 'Live',
          icon: <Icons.globe className="h-4 w-4" />,
          href: 'https://securify-0.vercel.app/',
        },
      ],
    },
    {
      title: 'Build-focused learning',
      dates: 'Current',
      location: 'AI/ML, Web3, and full-stack software',
      description: 'Continuously turning technical learning into practical projects, experiments, and written notes.',
      image: '',
      links: [
        {
          title: 'GitHub',
          icon: <Icons.github className="h-4 w-4" />,
          href: 'https://github.com/emreaslan7',
        },
      ],
    },
  ],
} as const;
