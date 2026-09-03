import { BookCategory, BookTheme, ThemeColors } from './types';

export const THEME_CONFIGS: Record<BookTheme, ThemeColors> = {
  amber: {
    id: 'amber',
    name: 'AI & Deep Learning',
    primary: '#ffffff',
    secondary: '#a1a1aa',
    glow: 'rgba(255, 255, 255, 0.15)',
    border: 'border-border/80 dark:border-border/60',
    badgeBg: 'bg-muted/80 dark:bg-muted/60',
    badgeText: 'text-foreground',
    gradientCover: 'from-zinc-900 via-zinc-900 to-zinc-950',
    gradientInterior: 'from-zinc-950 via-zinc-900 to-zinc-950',
    beamGradient: ['#ffffff', '#71717a'],
    accentText: 'text-foreground',
    accentBg: 'bg-foreground',
    activeRing: 'ring-foreground/20',
  },
  emerald: {
    id: 'emerald',
    name: 'Cryptomath & Number Theory',
    primary: '#ffffff',
    secondary: '#a1a1aa',
    glow: 'rgba(255, 255, 255, 0.15)',
    border: 'border-border/80 dark:border-border/60',
    badgeBg: 'bg-muted/80 dark:bg-muted/60',
    badgeText: 'text-foreground',
    gradientCover: 'from-zinc-900 via-zinc-900 to-zinc-950',
    gradientInterior: 'from-zinc-950 via-zinc-900 to-zinc-950',
    beamGradient: ['#ffffff', '#71717a'],
    accentText: 'text-foreground',
    accentBg: 'bg-foreground',
    activeRing: 'ring-foreground/20',
  },
  violet: {
    id: 'violet',
    name: 'Software Systems & Architecture',
    primary: '#ffffff',
    secondary: '#a1a1aa',
    glow: 'rgba(255, 255, 255, 0.15)',
    border: 'border-border/80 dark:border-border/60',
    badgeBg: 'bg-muted/80 dark:bg-muted/60',
    badgeText: 'text-foreground',
    gradientCover: 'from-zinc-900 via-zinc-900 to-zinc-950',
    gradientInterior: 'from-zinc-950 via-zinc-900 to-zinc-950',
    beamGradient: ['#ffffff', '#71717a'],
    accentText: 'text-foreground',
    accentBg: 'bg-foreground',
    activeRing: 'ring-foreground/20',
  },
};

export const KNOWLEDGE_BOOKS: BookCategory[] = [
  {
    id: 'ai',
    theme: 'amber',
    title: 'AI & Deep Learning',
    subtitle: 'Stanford & DeepLearning.AI Specialization Compendium',
    volume: 'VOL. I',
    tagline: 'ai.emreaslan.dev',
    description:
      'A comprehensive mdBook knowledge base covering Machine Learning & Deep Learning Specializations by Stanford & Andrew Ng, spanning 18,350+ lines of bilingual notes.',
    spineTitle: 'AI.EMREASLAN.DEV • VOL. I',
    edition: '2026 Edition • mdBook Spec',
    totalPages: 384,
    stats: {
      chapters: 7,
      nodes: 7,
      difficulty: 'Expert',
      readTime: '45 min',
    },
    subtopics: [
      {
        id: 'ai-node-1',
        title: 'PyTorch 2.x & CUDA',
        category: 'Engine & Compilation',
        iconName: 'Cpu',
        badge: 'Core Engine',
        summary:
          'TorchDynamo graph capture, AOTAutograd, Inductor codegen, and custom CUDA kernel optimization with FlashAttention-2.',
        deepDive:
          'Deep architectural dive into TorchDynamo interception of Python frame evaluation, fused triton kernel generation, and zero-redundancy optimizer state sharding (FSDP).',
        keyConcepts: ['TorchDynamo & AOTAutograd', 'Triton Kernel JIT', 'FSDP & DDP Multi-GPU', 'CUDAGraphs Memory Trees'],
        codeSnippet: '@torch.compile(mode="max-autotune")\ndef forward_pass(x, weight):\n    return torch.matmul(x, weight.t())',
        formula: 'L_{\\text{FSDP}} = \\frac{1}{N} \\sum_{i=1}^N \\nabla_{\\theta_i} \\mathcal{L}',
      },
      {
        id: 'ai-node-2',
        title: 'Computer Vision & CNNs',
        category: 'Computer Vision',
        iconName: 'Eye',
        badge: 'CNN Architectures',
        summary:
          'Classic & modern CNN backbones: LeNet, ResNet, Inception, MobileNet, EfficientNet, and receptive field mechanics.',
        deepDive:
          'Detailed exploration of residual skip connections, depthwise separable convolutions, and feature map reduction.',
        keyConcepts: ['ResNet Skip Connections', 'Inception Multi-Scale Filters', 'MobileNet Inverted Residuals', 'Batch Normalization'],
        codeSnippet: 'x = Conv2D(64, 3, padding="same", activation="relu")(inputs)\nx = ResidualBlock(64)(x)',
        formula: 'y = \\mathcal{F}(x, \\{W_i\\}) + x',
      },
      {
        id: 'ai-node-3',
        title: 'Transformers & Attention',
        category: 'Language & Attention',
        iconName: 'Sparkles',
        badge: 'Transformers & LLMs',
        summary:
          'Scaled Dot-Product Attention, Multi-Head Attention, RoPE position embeddings, SwiGLU, and Transformer encoders.',
        deepDive:
          'Mathematical formulations of backpropagation through time (BPTT), vanishing gradient mitigation via gating, and self-attention tensor mechanics.',
        keyConcepts: ['Multi-Head Attention', 'Rotary Positional Embeddings (RoPE)', 'Grouped-Query Attention (GQA)', 'SwiGLU Activations'],
        codeSnippet: 'attn_scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)\nattn_weights = F.softmax(attn_scores, dim=-1)',
        formula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
      },
      {
        id: 'ai-node-4',
        title: 'YOLOv8 & Detection',
        category: 'Real-Time Detection',
        iconName: 'Scan',
        badge: 'Object Detection',
        summary:
          'Anchor-free single-stage detection, Task-Aligned Assigner (TAL), Distribution Focal Loss (DFL), and multi-object ByteTrack integration.',
        deepDive:
          'Path Aggregation Network (PANet) neck architectures, decoupled detection heads separating classification and bounding box regression, and ONNX deployment.',
        keyConcepts: ['Anchor-Free Decoupled Heads', 'Distribution Focal Loss (DFL)', 'CIoU & GIoU Bounding Box Losses', 'TensorRT FP16 Engine Export'],
        codeSnippet: 'results = model.predict(source=frame, conf=0.45, iou=0.6, device=0)\nfor box in results[0].boxes: print(box.xyxy, box.cls)',
        formula: '\\mathcal{L}_{\\text{CIoU}} = 1 - \\text{IoU} + \\frac{\\rho^2(b, b^{gt})}{c^2} + \\alpha v',
      },
      {
        id: 'ai-node-5',
        title: 'Diffusion & Generative AI',
        category: 'Generative Models',
        iconName: 'Flame',
        badge: 'Diffusion & SDEs',
        summary:
          'Latent diffusion models (LDM), score-based generative modeling, DDIM/Euler schedulers, and ControlNet spatial conditioning.',
        deepDive:
          'Mathematical formulations of forward and reverse stochastic differential equations (SDEs), noise prediction networks, and cross-attention text conditioning.',
        keyConcepts: ['Classifier-Free Guidance (CFG)', 'Latent VAE Autoencoding', 'DDIM / Flow Matching Schedulers', 'LoRA Adapter Injections'],
        codeSnippet: 'eps_pred = unet(x_t, t, encoder_hidden_states=text_emb)\nx_prev = scheduler.step(eps_pred, t, x_t).prev_sample',
        formula: 'x_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}} \\left( x_t - \\frac{1-\\alpha_t}{\\sqrt{1-\\bar{\\alpha}_t}} \\epsilon_\\theta(x_t, t) \\right) + \\sigma_t z',
      },
      {
        id: 'ai-node-6',
        title: 'Reinforcement Learning',
        category: 'Decision Systems',
        iconName: 'Gamepad2',
        badge: 'RL & Decisions',
        summary:
          'Markov Decision Processes, Bellman equation, Policy Gradients, Q-Learning, DQN, and Recommender Systems.',
        deepDive:
          'State-action value approximation, temporal difference learning, and exploration vs. exploitation trade-offs.',
        keyConcepts: ['Bellman Optimality Equation', 'Q-Learning & Deep Q-Networks', 'Recommender Collaborative Filtering', 'Policy Iteration'],
        codeSnippet: 'q_target = reward + gamma * torch.max(next_q_values, dim=1)[0] * (1 - dones)',
        formula: 'Q(s, a) = R(s, a) + \\gamma \\max_{a\'} Q(s\', a\')',
      },
      {
        id: 'ai-node-7',
        title: 'Medical Image 3D Seg',
        category: 'Biomedical AI',
        iconName: 'Activity',
        badge: '3D Volumetric',
        summary:
          '3D U-Net architectures, MONAI medical pipeline, generalized Dice loss, and volumetric CT/MRI multi-organ mask prediction.',
        deepDive:
          'Voxel spacing normalization, sliding-window volumetric inference, deep supervision layers, and topological loss formulations for vessel segmentation.',
        keyConcepts: ['3D U-Net & DynUNet Backbones', 'MONAI Transforms & Spatial Augmentations', 'Soft Dice & Focal Hybrid Loss', 'Connected Volume Filtering'],
        codeSnippet: 'dice_loss = DiceCELoss(to_onehot_y=True, softmax=True, lambda_dice=0.6, lambda_ce=0.4)\nloss = dice_loss(pred_logits, target_masks)',
        formula: '\\text{Dice}(P, G) = \\frac{2 \\sum |P_i \\cap G_i| + \\epsilon}{\\sum |P_i| + \\sum |G_i| + \\epsilon}',
      },
    ],
  },
  {
    id: 'cryptomath',
    theme: 'emerald',
    title: 'Cryptomath',
    subtitle: 'Number Theory, Modular Arithmetic & ZKP Foundations',
    volume: 'VOL. II',
    tagline: 'cryptomath.emreaslan.dev',
    description:
      'Rigorous mathematical compendium on number theory, modular arithmetic, abstract algebra, and modern cryptographic systems published at cryptomath.emreaslan.dev.',
    spineTitle: 'CRYPTOMATH.EMREASLAN.DEV • VOL. II',
    edition: '2026 Edition • Math Spec',
    totalPages: 312,
    stats: {
      chapters: 7,
      nodes: 7,
      difficulty: 'Advanced',
      readTime: '40 min',
    },
    subtopics: [
      {
        id: 'cm-node-1',
        title: 'Modular Arithmetic',
        category: 'Number Theory',
        iconName: 'Binary',
        badge: 'Modular Math',
        summary:
          'Divisibility rules, quotient-remainder theorem, modular addition, multiplication, and equivalence relations.',
        deepDive:
          'Ring of integers modulo n, congruence properties, and modular arithmetic identities underpinning modern cipher primitives.',
        keyConcepts: ['Quotient-Remainder Theorem', 'Modular Congruence Classes', 'Ring \\(\\mathbb{Z}/n\\mathbb{Z}\\)', 'Modular Subtraction & Division'],
        codeSnippet: 'def mod_add(a, b, m):\n    return ((a % m) + (b % m)) % m',
        formula: 'a \\equiv b \\pmod{m} \\iff m \\mid (a - b)',
      },
      {
        id: 'cm-node-2',
        title: 'Euclid & Extended GCD',
        category: 'Algorithms',
        iconName: 'Grid3X3',
        badge: 'GCD & Inverses',
        summary:
          'Greatest Common Divisor, Euclidean Algorithm, Extended Euclidean Algorithm, and Bezout’s Identity.',
        deepDive:
          'Computing modular multiplicative inverses, solving linear Diophantine equations, and least common multiple (LCM) properties.',
        keyConcepts: ['Euclidean GCD Division', 'Extended GCD Algorithm', "Bézout's Identity", 'Modular Multiplicative Inverse'],
        codeSnippet: 'def ext_gcd(a, b):\n    if a == 0: return b, 0, 1\n    gcd, x1, y1 = ext_gcd(b % a, a)\n    return gcd, y1 - (b // a) * x1, x1',
        formula: 'a x + b y = \\gcd(a, b)',
      },
      {
        id: 'cm-node-3',
        title: 'Prime Factorization & CRT',
        category: 'Prime Systems',
        iconName: 'Lock',
        badge: 'CRT & Primes',
        summary:
          'Prime factorization, Fundamental Theorem of Arithmetic, and the Chinese Remainder Theorem (CRT).',
        deepDive:
          'Solving systems of simultaneous modular congruences with pairwise coprime moduli and applications to fast cryptographic operations.',
        keyConcepts: ['Prime Factorization Uniqueness', 'Chinese Remainder Theorem (CRT)', 'Pairwise Coprime Moduli', 'Large Integer Decomposition'],
        codeSnippet: 'def crt(remainders, moduli):\n    M = math.prod(moduli)\n    return sum(r * (M // m) * mod_inv(M // m, m) for r, m in zip(remainders, moduli)) % M',
        formula: 'x \\equiv a_i \\pmod{m_i} \\implies x \\equiv \\sum_{i=1}^k a_i M_i y_i \\pmod{M}',
      },
      {
        id: 'cm-node-4',
        title: 'RSA Cryptosystem',
        category: 'Public-Key Crypto',
        iconName: 'Key',
        badge: 'RSA & Mod Pow',
        summary:
          'Fast modular exponentiation (repeated squaring), RSA key generation, encryption, decryption, and trapdoor one-way functions.',
        deepDive:
          'Security hardness of integer factorization, Chosen Ciphertext Attacks, padding schemes, and quantum Shor algorithm implications.',
        keyConcepts: ['Fast Modular Exponentiation \\(O(\\log e)\\)', 'RSA Key Pair Generation', 'Trapdoor One-Way Permutation', 'Many-Time Pad Attacks'],
        codeSnippet: 'def fast_mod_pow(base, exp, mod):\n    res = 1; base %= mod\n    while exp > 0:\n        if exp % 2 == 1: res = (res * base) % mod\n        exp //= 2; base = (base * base) % mod\n    return res',
        formula: 'c = m^e \\bmod N, \\quad m = c^d \\bmod N',
      },
      {
        id: 'cm-node-5',
        title: "Euler's Totient & Fermat",
        category: 'Theorems',
        iconName: 'ShieldCheck',
        badge: 'Theorems',
        summary:
          "Fermat's Little Theorem, Euler's Totient Function \\(\\phi(n)\\), Euler's Totient Theorem, and modular exponent identities.",
        deepDive:
          'Totient product formulas for composite numbers, group theory orders of elements, and algebraic polynomial commitments.',
        keyConcepts: ["Fermat's Little Theorem", "Euler's Totient Function \\(\\phi(n)\\)", 'Order of Elements in Groups', 'Modular Inverse by Totient'],
        codeSnippet: 'def euler_phi(p, q):\n    return (p - 1) * (q - 1)',
        formula: 'a^{\\phi(n)} \\equiv 1 \\pmod{n} \\quad \\text{if } \\gcd(a, n) = 1',
      },
      {
        id: 'cm-node-6',
        title: 'Zero-Knowledge Proofs (ZKP)',
        category: 'Modern Cryptography',
        iconName: 'Workflow',
        badge: 'ZKP Foundations',
        summary:
          'Interactive proof systems, soundness, completeness, zero-knowledge property, and zk-SNARK / zk-STARK mathematics.',
        deepDive:
          'Arithmetic circuits, R1CS constraint systems, QAP polynomial reductions, and cryptographic pairings.',
        keyConcepts: ['Completeness & Soundness', 'Arithmetic Circuits & R1CS', 'Polynomial Commitments (KZG)', 'Schwartz-Zippel Lemma'],
        codeSnippet: 'def verify_zk_proof(vk, proof, public_inputs):\n    return pairing_check(proof.A, proof.B, vk.alpha, vk.beta)',
        formula: '\\Pr[\\text{Verify}(\\pi) = 1] = 1 \\quad (\\text{Completeness})',
      },
      {
        id: 'cm-node-7',
        title: 'Elliptic Curve Crypto',
        category: 'Algebraic Curves',
        iconName: 'Sigma',
        badge: 'ECC Curves',
        summary:
          'Weierstrass elliptic curves, point addition group laws, Discrete Log Problem (ECDLP), and secp256k1 signature schemes.',
        deepDive:
          'Scalar point multiplication, double-and-add algorithm, projective coordinates avoiding inversions, and ECDSA validation.',
        keyConcepts: ['Weierstrass Curve Form', 'Point Addition & Doubling', 'ECDLP Hardness', 'secp256k1 & ECDSA'],
        codeSnippet: 'P3 = point_add(P1, P2, a, p)\nQ = scalar_mult(k, G, a, p)',
        formula: 'y^2 \\equiv x^3 + a x + b \\pmod{p}',
      },
    ],
  },
  {
    id: 'software',
    theme: 'violet',
    title: 'Software Systems',
    subtitle: 'Full-Stack Architecture, Distributed Systems & Web3',
    volume: 'VOL. III',
    tagline: 'software.emreaslan.dev',
    description:
      'System design, full-stack reactive web applications, asynchronous backend engines, database caching, containerized cloud workflows, and Ethereum smart contract protocols.',
    spineTitle: 'SOFTWARE.EMREASLAN.DEV • VOL. III',
    edition: '2026 Edition • Systems Spec',
    totalPages: 420,
    stats: {
      chapters: 7,
      nodes: 7,
      difficulty: 'Expert',
      readTime: '50 min',
    },
    subtopics: [
      {
        id: 'sw-node-1',
        title: 'Next.js & React 19',
        category: 'Web Architecture',
        iconName: 'Layers',
        badge: 'Frontend & SSR',
        summary:
          'Next.js App Router, React Server Components (RSC), TypeScript strict type systems, Redux state graphs, and Tailwind v4.',
        deepDive:
          'Hydration boundaries, streaming SSR with Suspense, client state machines, and atomic UI component architecture.',
        keyConcepts: ['Server Actions & RSC', 'TypeScript Advanced Generics', 'Atomic Component Design', 'Client-Side State Slices'],
        codeSnippet: 'export default async function Page() {\n  const data = await fetchCachedData();\n  return <Component data={data} />;\n}',
        formula: '\\text{TTFB} + \\text{Streaming Duration} \\to \\min',
      },
      {
        id: 'sw-node-2',
        title: 'FastAPI & High-Perf APIs',
        category: 'Backend & Services',
        iconName: 'Terminal',
        badge: 'API & Microservices',
        summary:
          'FastAPI asynchronous async/await endpoints, Pydantic data validation, Node.js/Express event loops, and RESTful/GraphQL gateways.',
        deepDive:
          'Non-blocking IO event loop concurrency, JWT authentication middleware, rate limiting, and structured error responses.',
        keyConcepts: ['Asynchronous Async/Await IO', 'Pydantic Strict Schemas', 'JWT Token Security', 'API Rate Limiting'],
        codeSnippet: '@app.post("/v1/predict", response_model=OutputSchema)\nasync def predict_endpoint(payload: InputSchema):\n    return await inference_engine.process(payload)',
        formula: '\\text{Throughput} = \\frac{\\text{Concurrent Requests}}{\\text{Mean Latency}}',
      },
      {
        id: 'sw-node-3',
        title: 'TypeScript Systems',
        category: 'Language Architecture',
        iconName: 'Code2',
        badge: 'Strict Types',
        summary:
          'Conditional types, template literal types, Discriminated Unions, infer keywords, and end-to-end type safety.',
        deepDive:
          'Zero-runtime overhead static guarantees, type-safe API contracts, and compile-time schema transformations.',
        keyConcepts: ['Discriminated Unions', 'Template Literal Types', 'Conditional Generic Inference', 'Zod Schema Validation'],
        codeSnippet: 'type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };',
        formula: 'T \\extends U \\,?\\, X : Y',
      },
      {
        id: 'sw-node-4',
        title: 'MongoDB & Redis Caching',
        category: 'Data & Storage',
        iconName: 'Database',
        badge: 'Databases & Redis',
        summary:
          'MongoDB document modeling, indexing strategies, aggregation pipelines, Redis in-memory cache, and vector databases.',
        deepDive:
          'Compound B-tree indexes, read/write sharding, cache invalidation protocols, and vector similarity embeddings.',
        keyConcepts: ['MongoDB Aggregation Pipelines', 'Compound Index Optimization', 'Redis Cache-Aside Pattern', 'Vector Embeddings (HNSW)'],
        codeSnippet: 'db.collection.aggregate([\n  { $match: { status: "active" } },\n  { $group: { _id: "$category", count: { $sum: 1 } } }\n])',
        formula: '\\text{Hit Rate} = \\frac{\\text{Cache Hits}}{\\text{Cache Hits} + \\text{Cache Misses}} \\ge 95\\%',
      },
      {
        id: 'sw-node-5',
        title: 'Docker & Cloud CI/CD',
        category: 'Infrastructure',
        iconName: 'Box',
        badge: 'Containers & CI/CD',
        summary:
          'Multi-stage Docker builds, container orchestration, GitHub Actions automated CI/CD pipelines, and cloud deployment.',
        deepDive:
          'Minimal production container images with Alpine/Distroless, environment variable secrets management, and automated test runners.',
        keyConcepts: ['Multi-Stage Dockerfiles', 'GitHub Actions Workflows', 'Zero-Downtime Deployments', 'Secrets Management'],
        codeSnippet: 'FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN pnpm build\nFROM node:20-alpine AS runner\nCOPY --from=builder /app/.next/standalone ./',
        formula: '\\text{Deploy Risk} \\propto \\frac{\\text{Change Size}}{\\text{Deploy Frequency}}',
      },
      {
        id: 'sw-node-6',
        title: 'Solidity & Smart Contracts',
        category: 'Web3 & Blockchain',
        iconName: 'Coins',
        badge: 'Solidity & EVM',
        summary:
          'EVM execution model, Solidity smart contract development, Hardhat testing suites, Ethers.js integration, and ERC standards.',
        deepDive:
          'Gas optimization techniques, reentrancy guards, automated unit testing with Hardhat/Chai, and decentralized Uniswap V2 AMM mechanics.',
        keyConcepts: ['EVM Gas Optimization', 'Reentrancy Protection', 'Hardhat Automated Tests', 'Uniswap AMM Math'],
        codeSnippet: 'function swap(uint amount0Out, uint amount1Out, address to) external lock {\n    require(amount0Out > 0 || amount1Out > 0, "INSUFFICIENT_OUTPUT");\n    // EVM execution...\n}',
        formula: 'x \\cdot y = k \\quad (\\text{Constant Product AMM})',
      },
      {
        id: 'sw-node-7',
        title: 'Web3 & Ethers Protocols',
        category: 'Decentralized Apps',
        iconName: 'Blocks',
        badge: 'Web3 Protocols',
        summary:
          'JSON-RPC provider connections, signer transactions, event listening filters, and multi-call batching.',
        deepDive:
          'Contract ABI decoding, state change simulations, gas estimation strategies, and decentralized wallet connect workflows.',
        keyConcepts: ['JSON-RPC Providers & Signers', 'Event Filter Subscriptions', 'Multicall Read Batching', 'ERC-20 / ERC-721 Standards'],
        codeSnippet: 'const contract = new ethers.Contract(address, abi, signer);\nconst tx = await contract.transfer(recipient, amount);\nawait tx.wait();',
        formula: '\\text{Total Gas} = \\sum_{i=1}^n \\text{GasUsed}_i \\times \\text{GasPrice}',
      },
    ],
  },
];
