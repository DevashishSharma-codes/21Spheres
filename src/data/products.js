import {
  Network,
  Cpu,
  Shield,
  Sparkles,
  BarChart3,
  Database,
  Layers,
  MessageSquare,
  HeartPulse,
  Brain,
  BookOpen,
  Activity,
} from "lucide-react";

// 3 Background Image Styles shared by user
export const QUOTE_BG_IMAGES = {
  // Style 1: Gold & Grey Fluid Marble Swirl (Image 1)
  goldSwirl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85",
  // Style 2: Turquoise & Coral Liquid Ink in Water (Image 2)
  liquidInk: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=85",
  // Style 3: Royal Blue to Mint Cyan Gradient (Image 3)
  blueGradient: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=85",
};

export const PRODUCTS = [
  {
    id: "bimakart-connect",
    name: "Bimakart Connect",
    product: "Insurance Distribution API Gateway",
    category: "InsurTech",
    tag: "Live",
    version: "2.4",
    metric: "100+ Insurer Integrations",
    headline: "Get insurance quotes in the format that's expected.",
    subhead: "Unified insurance API gateway connecting POSP agents, aggregators, and underwriters for sub-3s quote generation and instant policy issuance.",
    description:
      "Bimakart Connect standardizes multi-carrier policy requests into a single unified JSON contract. Pass a customer payload and the engine validates schema, queries 100+ insurer APIs concurrently, and formats structured responses for immediate agent checkout.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Network,
    techStack: ["Node.js", "FastAPI", "Redis Cache", "AWS EKS", "GraphQL"],
    highlights: [
      { title: "Concurrent Carrier Queries", desc: "Broadcast single payload to 100+ insurance carriers simultaneously with automatic fallback handling." },
      { title: "Normalized JSON Schema", desc: "No more parsing custom carrier XMLs. Get structured, type-safe policy quotes out of the box." },
      { title: "Sub-50ms Gateway Routing", desc: "Ultra-low latency routing layer deployed across global edge locations." },
      { title: "Automated Commission Tracking", desc: "Real-time ledger recording POSP commission splits and payout reconciliations." },
    ],
    codeSnippets: {
      python: `import bimakart

client = bimakart.Client(api_key="bk_live_9f8a72b1c4")

# Request multi-carrier quotes concurrently
quotes = client.quotes.create(
    vehicle_number="KA01EQ4590",
    coverage_type="comprehensive",
    addons=["zero_dep", "engine_protect"],
    output_format="json"
)

print(f"Generated {len(quotes.results)} quotes in {quotes.latency_ms}ms")`,
      typescript: `import { BimakartClient } from "@21spheres/bimakart";

const bimakart = new BimakartClient({ apiKey: process.env.BIMAKART_API_KEY });

const quotes = await bimakart.quotes.generate({
  vehicleId: "KA01EQ4590",
  policyType: "COMPREHENSIVE",
  addons: ["ZERO_DEP", "ENGINE_PROTECT"],
});

console.log(\`Fetched \${quotes.data.length} quotes in \${quotes.executionTimeMs}ms\`);`,
      curl: `curl -X POST https://api.21spheres.studio/v2/bimakart/quotes \\
  -H "Authorization: Bearer bk_live_9f8a72b1c4" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vehicle_number": "KA01EQ4590",
    "coverage": "comprehensive",
    "addons": ["zero_dep"]
  }'`
    },
    ceoQuote: "Bimakart Connect was engineered to eliminate carrier fragmentation. We turned complex multi-vendor integrations into a single, bulletproof API endpoint that processes millions of quotes with sub-second SLA.",
  },
  {
    id: "bimakart-center",
    name: "Bimakart Center",
    product: "Centralized Insurance Operations",
    category: "InsurTech Platform",
    tag: "Live",
    version: "3.1",
    metric: "500K+ Policies Managed",
    headline: "Command center for policy lifecycles & claim tracking.",
    subhead: "Command center dashboard for managing policy lifecycles, commissions, agent performance, and real-time claim tracking.",
    description:
      "A high-frequency control panel for insurance brokerages and agency networks. Oversee half a million policy records with real-time state telemetry, automated commission audits, and live agent activity streams.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Database,
    techStack: ["React 19", "TailwindCSS", "PostgreSQL", "WebSockets", "ClickHouse"],
    highlights: [
      { title: "Real-time Telemetry Dashboard", desc: "Live event stream of incoming policies, claims, and agent registrations." },
      { title: "Commission Reconciliation Engine", desc: "Automated math verification comparing carrier payout statements against internal ledgers." },
      { title: "Agent Hierarchy & Access Control", desc: "Granular RBAC for POSP managers, branch leads, and compliance officers." },
      { title: "One-Click Claim Audit", desc: "Instant visual timeline showing document uploads, OCR verification, and carrier status updates." },
    ],
    codeSnippets: {
      python: `from bimakart_center import OperationsEngine

center = OperationsEngine(cluster_id="center_east_01")

# Run automated commission audit across 50,000 policy records
audit_summary = center.reconcile_commissions(
    period="2026-Q1",
    auto_flag_discrepancies=True
)

print(f"Audit completed: {audit_summary.matched_pct}% verified automatically")`,
      typescript: `import { OperationsCenter } from "@21spheres/bimakart-center";

const center = new OperationsCenter({ clusterId: "center_east_01" });

const stats = await center.getLiveMetrics({
  timeframe: "24h",
  includeClaims: true,
});`,
      curl: `curl -X GET "https://api.21spheres.studio/v3/center/metrics?timeframe=24h" \\
  -H "Authorization: Bearer center_live_8391a2"`
    },
    ceoQuote: "With Bimakart Center, we gave operations teams real-time visibility into thousands of daily policy transactions. Zero lag, zero discrepancy.",
  },
  {
    id: "bimakart-suite",
    name: "Bimakart Product Suite",
    product: "Enterprise Insurance Suite",
    category: "InsurTech Ecosystem",
    tag: "Live",
    version: "4.0",
    metric: "End-to-End Automation",
    headline: "The complete digital insurance operating system.",
    subhead: "Complete digital insurance stack combining distribution, underwriting automation, compliance engines, and agent portals.",
    description:
      "An end-to-end enterprise platform powering insurance carriers and national brokerages. From customer onboarding to underwriting rules and compliance reporting, Bimakart Suite orchestrates the entire value chain.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: Layers,
    techStack: ["Next.js", "Go", "Docker", "Kubernetes", "Kafka"],
    highlights: [
      { title: "Underwriting Rule Engine", desc: "Configurable decision trees for instant auto-approval of standard risk profiles." },
      { title: "Compliance & Regulatory Vault", desc: "Automated IRDAI reporting and encrypted audit trail storage." },
      { title: "Multi-Tenant Agent Portals", desc: "White-label portals custom branded for thousands of channel partners." },
      { title: "High-Concurrency Kafka Pipeline", desc: "Event-driven microservices handling peak policy surge traffic seamlessly." },
    ],
    codeSnippets: {
      python: `from bimakart_suite import UnderwritingEngine

engine = UnderwritingEngine(tenant_id="enterprise_v4")

# Process applicant risk evaluation
decision = engine.evaluate_risk({
    "applicant_age": 34,
    "cibil_score": 780,
    "pre_existing_conditions": None
})

print(f"Risk Status: {decision.status} | Premium Multiplier: {decision.rate}")`,
      typescript: `import { UnderwritingEngine } from "@21spheres/bimakart-suite";

const engine = new UnderwritingEngine({ tenantId: "enterprise_v4" });
const decision = await engine.evaluateRisk({
  applicantAge: 34,
  cibilScore: 780,
});`,
      curl: `curl -X POST https://api.21spheres.studio/v4/suite/underwrite \\
  -H "Authorization: Bearer suite_v4_99a812" \\
  -d '{"cibil_score": 780, "age": 34}'`
    },
    ceoQuote: "Bimakart Suite is our flagship enterprise demonstration. It unites underwriting, agent workflows, and distribution into a single zero-downtime architecture.",
  },
  {
    id: "policy-ocr-fraud",
    name: "Policy OCR & Fraud AI",
    product: "Policy OCR with Fraud Detection",
    category: "Document Intelligence",
    tag: "Live",
    version: "2.0",
    metric: "99.4% Extraction Accuracy",
    headline: "Extract document text & detect fraud anomalies in <50ms.",
    subhead: "Intelligent document parsing engine that reads complex insurance policy PDFs, detects tampering, and flags suspicious claim anomalies.",
    description:
      "A deterministic computer vision and machine learning engine that parses noisy policy PDFs, PAN cards, and medical invoices. Detects image manipulation, font mismatches, and pixel tampering with sub-50ms execution speed.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Shield,
    techStack: ["Python OCR", "OpenCV", "PyTorch", "ONNX Runtime", "C++"],
    highlights: [
      { title: "99.4% Field Extraction Accuracy", desc: "Trained on millions of Indian insurance documents, invoices, and IDs." },
      { title: "Pixel-Level Tampering Detection", desc: "Flags Photoshop modifications, copy-paste artifacts, and metadata alterations." },
      { title: "No External LLM Dependency", desc: "Runs locally on edge CPUs with zero API latency or third-party cloud data leak." },
      { title: "Structured JSON Output", desc: "Outputs standardized key-value JSON ready for database insertion." },
    ],
    codeSnippets: {
      python: `import policy_ocr

engine = policy_ocr.OCREngine(model="vision_v2_fast")

# Analyze policy PDF for details and tampering
result = engine.parse_document(
    file_path="policy_doc_9921.pdf",
    check_fraud=True
)

print(f"Extracted Policy: {result.policy_number} | Fraud Risk: {result.fraud_score}%")`,
      typescript: `import { OCREngine } from "@21spheres/policy-ocr";

const ocr = new OCREngine({ model: "vision_v2_fast" });
const res = await ocr.parseDocument("policy_doc_9921.pdf");
console.log(\`Policy: \${res.policyNumber}, Fraud Score: \${res.fraudScore}%\`);`,
      curl: `curl -X POST https://api.21spheres.studio/v2/ocr/parse \\
  -F "file=@policy_doc.pdf" \\
  -H "Authorization: Bearer ocr_live_771b2"`
    },
    ceoQuote: "By replacing heavy external LLMs with deterministic computer vision models, we achieved a 99.4% accuracy rate while keeping execution latency under 50ms.",
  },
  {
    id: "quotation-bot",
    name: "Quotation Bot",
    product: "Automated Rate Engine",
    category: "Conversational Commerce",
    tag: "Live",
    version: "1.9",
    metric: "<3s Quote Generation",
    headline: "Automated premium rate calculations delivered instantly.",
    subhead: "Instant quote generation bot calculating premium rates across multiple insurance carriers and outputting formatted comparison sheets.",
    description:
      "An automated rate engine built for conversational interfaces and web widgets. Instant premium quotes generated across health, motor, and term life insurance lines in seconds.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Cpu,
    techStack: ["Node.js", "Redis", "WebSockets", "React", "Express"],
    highlights: [
      { title: "Sub-3s Execution SLA", desc: "Fetches rates across 25+ insurers faster than standard browser load times." },
      { title: "PDF Comparison Sheet Generator", desc: "Generates branded side-by-side quote comparison PDFs automatically." },
      { title: "Dynamic Premium Calculator", desc: "Instant re-quote calculation as users adjust deductible or add-on sliders." },
      { title: "Plug & Play Web Widget", desc: "Embeddable script tag with zero styling overhead for partner portals." },
    ],
    codeSnippets: {
      python: `from quotation_bot import RateEngine

engine = RateEngine()

quote = engine.calculate_rate(
    sum_insured=500000,
    age=29,
    pincode="560001"
)

print(f"Best Rate: ₹{quote.best_premium}/yr across {quote.carriers_count} carriers")`,
      typescript: `import { RateEngine } from "@21spheres/quotation-bot";

const engine = new RateEngine();
const quote = await engine.calculateRate({ sumInsured: 500000, age: 29 });`,
      curl: `curl -X POST https://api.21spheres.studio/v1/quote/calculate \\
  -d '{"sum_insured": 500000, "age": 29}'`
    },
    ceoQuote: "Speed is conversion in InsurTech. Quotation Bot cuts quote latency from 30 seconds to under 3 seconds.",
  },
  {
    id: "enspire-whatsapp-bot",
    name: "Enspire WhatsApp ChatBot",
    product: "Conversational Customer Care",
    category: "Messaging AI",
    tag: "Live",
    version: "3.5",
    metric: "2M+ Messages Handled",
    headline: "Enterprise WhatsApp bot for instant customer service.",
    subhead: "Enterprise WhatsApp bot facilitating policy renewals, claim submissions, document downloads, and FAQs directly inside WhatsApp.",
    description:
      "High-throughput conversational AI agent deployed on WhatsApp Cloud API. Enables policyholders to download digital policy cards, initiate claims, and receive renewal reminders directly inside chat.",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: MessageSquare,
    techStack: ["WhatsApp Business API", "Node.js", "MongoDB", "Redis", "LangChain"],
    highlights: [
      { title: "2 Million+ Messages Processed", desc: "Proven architecture handling high volume policy renewal surges." },
      { title: "Direct Document Generation", desc: "Sends PDF policy cards and receipt documents inside WhatsApp chat." },
      { title: "Interactive Button Menus", desc: "Native WhatsApp list messages and quick reply buttons for zero-typing UX." },
      { title: "Human Agent Handoff", desc: "Seamless transition to live support desk when complex claim exceptions arise." },
    ],
    codeSnippets: {
      python: `from enspire_bot import WhatsAppBot

bot = WhatsAppBot(channel_token="wa_enspire_live")

# Send automated renewal reminder with PDF attachment
bot.send_template_message(
    to="919876543210",
    template="policy_renewal_v1",
    params={"name": "Rahul", "policy_no": "POL-99210"}
)`,
      typescript: `import { WhatsAppBot } from "@21spheres/enspire-bot";

const bot = new WhatsAppBot({ token: process.env.WA_TOKEN });
await bot.sendTemplateMessage({ to: "919876543210", template: "renewal_notice" });`,
      curl: `curl -X POST https://api.21spheres.studio/v3/enspire/send \\
  -d '{"to": "919876543210", "template": "policy_renewal_v1"}'`
    },
    ceoQuote: "Enspire turns WhatsApp into a complete self-serve portal where policyholders complete renewals in under 60 seconds.",
  },
  {
    id: "wtmf-wellness-bot",
    name: "WTMF Wellness Bot",
    product: "Multimodal Mental Health AI",
    category: "Healthcare AI",
    tag: "Live",
    version: "1.5",
    metric: "Multimodal Voice & Chat",
    headline: "Empathetic voice & chat AI for guided mental wellness.",
    subhead: "Empathetic chat and voice AI copilot offering guided mindfulness exercises, mood tracking, and supportive conversational care.",
    description:
      "A compassionate multimodal AI companion designed for wellness organizations. Integrates real-time speech processing and empathetic sentiment analysis to provide supportive conversations and mindfulness routines.",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: HeartPulse,
    techStack: ["WebRTC", "Whisper STT", "FastAPI", "React Native", "PyTorch"],
    highlights: [
      { title: "Real-time Voice Stream", desc: "Sub-400ms audio response latency for natural, conversation-flow audio." },
      { title: "Empathetic Sentiment Engine", desc: "Detects vocal stress and tone nuances to adapt conversational pacing." },
      { title: "Guided Mindfulness Scripts", desc: "Personalized audio meditation routines based on daily mood logs." },
      { title: "HIPAA Compliant Privacy", desc: "Zero persistent biometric recording with end-to-end local encryption." },
    ],
    codeSnippets: {
      python: `from wtmf_ai import WellnessSession

session = WellnessSession(user_id="user_7719")

# Process audio stream chunk & generate empathetic response
response = session.process_voice_chunk(audio_bytes=raw_pcm_data)
print(f"Sentiment: {response.emotion} | Text: {response.transcript}")`,
      typescript: `import { WellnessSession } from "@21spheres/wtmf-ai";

const session = new WellnessSession({ userId: "user_7719" });
const res = await session.processAudioChunk(pcmBuffer);`,
      curl: `curl -X POST https://api.21spheres.studio/v1/wtmf/session \\
  -H "Content-Type: audio/pcm" --data-binary "@audio.pcm"`
    },
    ceoQuote: "Healthcare software demands empathetic design. WTMF combines low-latency voice streaming with strict privacy guarantees.",
  },
  {
    id: "hahnnemen-ai",
    name: "HahnnemenAI",
    product: "HahnnemenAI (Homeopathy AI)",
    category: "Clinical AI",
    tag: "Live",
    version: "1.2",
    metric: "100,000+ Symptom Mappings",
    headline: "Specialized clinical AI for remedy synthesis & symptom rubrics.",
    subhead: "Specialized AI assistant analyzing clinical cases, rubrics, and symptom totals to assist homeopathic practitioners in remedy synthesis.",
    description:
      "A clinical intelligence platform for classical homeopathic practitioners. Cross-references complex patient case histories against classical repertory rubrics and Materia Medica to synthesize candidate remedies.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Brain,
    techStack: ["Python", "Neo4j Graph Database", "FastAPI", "React", "Typesense"],
    highlights: [
      { title: "100,000+ Classical Rubric Mappings", desc: "Digitized graph repository linking symptoms, modalities, and remedies." },
      { title: "Weighted Repertorization Engine", desc: "Calculates mathematical symptom totals across Kent, Boericke, and Allen repertories." },
      { title: "Case Synthesis Assistant", desc: "Highlights peculiar and characteristic symptoms for practitioner verification." },
      { title: "Sub-Second Query Performance", desc: "Graph database indexing delivering instant rubric lookups." },
    ],
    codeSnippets: {
      python: `from hahnnemen import ClinicalSynthesizer

synth = ClinicalSynthesizer()

# Synthesize remedy options for clinical symptoms
result = synth.repertorize(
    symptoms=["headache_throbbing", "worse_sunlight", "desire_cold_water"],
    repertory="Boericke"
)

for remedy in result.top_remedies[:3]:
    print(f"Remedy: {remedy.name} | Score: {remedy.total_score}")`,
      typescript: `import { ClinicalSynthesizer } from "@21spheres/hahnnemen";

const synth = new ClinicalSynthesizer();
const remedies = await synth.repertorize({ symptoms: ["headache_throbbing"] });`,
      curl: `curl -X POST https://api.21spheres.studio/v1/hahnnemen/repertorize \\
  -d '{"symptoms": ["headache_throbbing", "worse_sunlight"]}'`
    },
    ceoQuote: "HahnnemenAI maps classical clinical wisdom onto graph databases, helping practitioners analyze complex cases in seconds.",
  },
  {
    id: "the-repertory",
    name: "The Repertory",
    product: "Medical Symptom Search Engine",
    category: "Clinical Reference",
    tag: "Live",
    version: "2.1",
    metric: "Sub-second Search Index",
    headline: "High-speed medical symptom search engine for practitioners.",
    subhead: "High-speed digital repertory search platform enabling doctors to cross-reference symptoms, remedies, and classical medical literature.",
    description:
      "An instant search engine for clinical references and symptom rubrics. Built with sub-10ms fuzzy search matching across thousands of medical texts and classical literature.",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: BookOpen,
    techStack: ["Typesense", "Rust", "React", "TailwindCSS", "Web Workers"],
    highlights: [
      { title: "Sub-10ms Search Latency", desc: "In-memory C++ index delivering instant results as you type." },
      { title: "Fuzzy Match & Synonym Handling", desc: "Intelligent medical term resolution across archaic and modern terminology." },
      { title: "Cross-Reference Mapping", desc: "Link symptoms directly to source literature chapters." },
      { title: "Offline Web App Support", desc: "Full local index cache allowing doctors to search without internet access." },
    ],
    codeSnippets: {
      python: `from repertory_search import Index

idx = Index(cache_local=True)
matches = idx.search("stitching pain in chest", limit=5)
print(f"Found {len(matches)} rubrics in {idx.last_latency_ms}ms")`,
      typescript: `import { RepertoryIndex } from "@21spheres/repertory";

const idx = new RepertoryIndex();
const results = await idx.search("stitching pain in chest");`,
      curl: `curl -X GET "https://api.21spheres.studio/v2/repertory/search?q=chest+pain"`
    },
    ceoQuote: "The Repertory brings sub-10ms search speeds to classical medical literature so practitioners find exact rubrics effortlessly.",
  },
  {
    id: "futureogy",
    name: "Futureogy",
    product: "Predictive Horizon Analytics",
    category: "Predictive Intelligence",
    tag: "Live",
    version: "1.0",
    metric: "Pattern Modeling Engine",
    headline: "AI horizon forecasting for market & industry trends.",
    subhead: "Next-gen predictive analytics framework identifying emerging industry trends and strategic decision scenarios through AI forecasting.",
    description:
      "A predictive analytics platform for forward-thinking decision makers. Models macro industry signals, patent filings, and market data to forecast emerging competitive horizons.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Sparkles,
    techStack: ["Python", "Prophet", "PyTorch", "DuckDB", "React"],
    highlights: [
      { title: "Multi-Horizon Scenario Modeling", desc: "Simulate strategic outcomes across 12-month, 36-month, and 5-year trajectories." },
      { title: "Signal Ingestion Pipeline", desc: "Processes news, regulatory filings, and market data feed continuously." },
      { title: "Interactive Graph Visualizer", desc: "Explorable node visualizer mapping industry cross-currents." },
      { title: "Automated Executive Briefing", desc: "Generates executive summaries with statistical confidence bounds." },
    ],
    codeSnippets: {
      python: `from futureogy import HorizonModel

model = HorizonModel(domain="insurtech_asia")
forecast = model.predict(horizon_months=24)

print(f"Dominant Trend: {forecast.primary_trend} | Probability: {forecast.confidence}%")`,
      typescript: `import { HorizonModel } from "@21spheres/futureogy";

const model = new HorizonModel({ domain: "insurtech_asia" });
const forecast = await model.predict({ horizonMonths: 24 });`,
      curl: `curl -X POST https://api.21spheres.studio/v1/futureogy/predict \\
  -d '{"domain": "insurtech_asia", "horizon": 24}'`
    },
    ceoQuote: "Futureogy gives enterprise leadership a quantitative lens into emerging industry horizons.",
  },
  {
    id: "wealth-wisdom",
    name: "Wealth Wisdom",
    product: "Personal Finance & Investment Advisor",
    category: "FinTech AI",
    tag: "Live",
    version: "2.8",
    metric: "Automated Asset Allocation",
    headline: "Smart portfolio health checks & automated financial planning.",
    subhead: "Smart wealth management platform offering portfolio health checks, personalized investment insights, and automated financial planning.",
    description:
      "An intelligent wealth advisor platform providing automated portfolio rebalancing, risk profile assessments, and tax-optimized asset allocation strategies.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: BarChart3,
    techStack: ["Python", "FastAPI", "React Native", "PostgreSQL", "QuantLib"],
    highlights: [
      { title: "Automated Rebalancing Engine", desc: "Calculates optimal trade executions to realign portfolios with target allocation." },
      { title: "Tax Loss Harvesting", desc: "Identifies tax-efficient loss harvesting opportunities automatically." },
      { title: "Risk Profile Assessment", desc: "Quantitative questionnaire establishing personalized volatility thresholds." },
      { title: "Bank-Grade Encryption", desc: "256-bit AES data encryption and multi-factor biometric authentication." },
    ],
    codeSnippets: {
      python: `from wealth_wisdom import PortfolioAdvisor

advisor = PortfolioAdvisor(user_id="usr_8821")
rebalance = advisor.suggest_trades(risk_tolerance="moderate")

for trade in rebalance.orders:
    print(f"Action: {trade.action} {trade.asset} | Qty: {trade.quantity}")`,
      typescript: `import { PortfolioAdvisor } from "@21spheres/wealth-wisdom";

const advisor = new PortfolioAdvisor({ userId: "usr_8821" });
const plan = await advisor.suggestTrades({ riskTolerance: "MODERATE" });`,
      curl: `curl -X POST https://api.21spheres.studio/v2/wealth/rebalance \\
  -d '{"risk_tolerance": "moderate"}'`
    },
    ceoQuote: "Wealth Wisdom combines quantitative financial modeling with frictionless mobile user experiences.",
  },
  {
    id: "aadhar-pan-ocr",
    name: "Aadhar and PAN OCR",
    product: "Aadhar and PAN OCR (No LLM)",
    category: "Identity & Verification",
    tag: "Live",
    version: "3.0",
    metric: "<50ms Deterministic Processing",
    headline: "Deterministic identity card OCR without cloud API latency.",
    subhead: "Ultra-fast, deterministic computer vision OCR for extracting details from Indian identity cards locally without external LLM API dependencies.",
    description:
      "A deterministic computer vision engine built specifically for Aadhar and PAN cards. Extracts name, DOB, ID number, and address in under 50ms locally on device or on-prem server.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: Activity,
    techStack: ["OpenCV", "C++", "Python", "ONNX Runtime", "WebAssembly"],
    highlights: [
      { title: "Sub-50ms Local Execution", desc: "No cloud roundtrips. Processes images locally in browser or on edge server." },
      { title: "No External LLM Costs", desc: "Deterministic computer vision models eliminating expensive API tokens." },
      { title: "100% On-Premise Privacy", desc: "Zero identity data leaves your infrastructure perimeter." },
      { title: "Tamper & Liveness Detection", desc: "Detects physical card photos vs screen screenshots." },
    ],
    codeSnippets: {
      python: `import identity_ocr

ocr = identity_ocr.CardScanner(mode="deterministic_fast")

card_data = ocr.scan_image(image_bytes=raw_img_bytes)

print(f"Extracted PAN: {card_data.id_number} | Name: {card_data.name} | Latency: {card_data.time_ms}ms")`,
      typescript: `import { CardScanner } from "@21spheres/identity-ocr";

const scanner = new CardScanner();
const result = await scanner.scanImage(imageBlob);
console.log(\`ID: \${result.idNumber}, Name: \${result.name}, Speed: \${result.timeMs}ms\`);`,
      curl: `curl -X POST https://api.21spheres.studio/v3/identity/scan \\
  -F "card_image=@pan_card.jpg"`
    },
    ceoQuote: "Identity verification must be instant and private. Our deterministic engine processes Indian ID cards in under 50ms with zero cloud dependencies.",
  },
];
