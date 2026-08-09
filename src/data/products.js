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

export const PRODUCTS = [
  {
    id: "bimakart-connect",
    name: "Bimakart Connect",
    product: "Insurance Distribution API",
    category: "InsurTech",
    tag: "Live",
    version: "2.4",
    metric: "100+ Insurer Integrations",
    description:
      "Unified insurance API gateway connecting POSP agents, aggregators, and underwriters for instant quote generation and policy issuance.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    icon: Network,
  },
  {
    id: "bimakart-center",
    name: "Bimakart Center",
    product: "Centralized Insurance Operations",
    category: "InsurTech Platform",
    tag: "Live",
    version: "3.1",
    metric: "500K+ Policies Managed",
    description:
      "Command center dashboard for managing policy lifecycles, commissions, agent performance, and real-time claim tracking.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85",
    icon: Database,
  },
  {
    id: "bimakart-suite",
    name: "Bimakart Product Suite",
    product: "Enterprise Insurance Suite",
    category: "InsurTech Ecosystem",
    tag: "Live",
    version: "4.0",
    metric: "End-to-End Automation",
    description:
      "Complete digital insurance stack combining distribution, underwriting automation, compliance engines, and agent portals.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    icon: Layers,
  },
  {
    id: "policy-ocr-fraud",
    name: "Policy OCR & Fraud AI",
    product: "Policy OCR with Fraud Detection",
    category: "Document Intelligence",
    tag: "Live",
    version: "2.0",
    metric: "99.4% Extraction Accuracy",
    description:
      "Intelligent document parsing engine that reads complex insurance policy PDFs, detects tampering, and flags suspicious claim anomalies.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=85",
    icon: Shield,
  },
  {
    id: "quotation-bot",
    name: "Quotation Bot",
    product: "Automated Rate Engine",
    category: "Conversational Commerce",
    tag: "Live",
    version: "1.9",
    metric: "<3s Quote Generation",
    description:
      "Instant quote generation bot calculating premium rates across multiple insurance carriers and outputting formatted comparison sheets.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",
    icon: Cpu,
  },
  {
    id: "enspire-whatsapp-bot",
    name: "Enspire WhatsApp ChatBot",
    product: "Conversational Customer Care",
    category: "Messaging AI",
    tag: "Live",
    version: "3.5",
    metric: "2M+ Messages Handled",
    description:
      "Enterprise WhatsApp bot facilitating policy renewals, claim submissions, document downloads, and FAQs directly inside WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=85",
    icon: MessageSquare,
  },
  {
    id: "wtmf-wellness-bot",
    name: "WTMF Wellness Bot",
    product: "WTMF Chat + Voice bot for mental wellness",
    category: "Healthcare AI",
    tag: "Live",
    version: "1.5",
    metric: "Multimodal Voice & Chat",
    description:
      "Empathetic chat and voice AI copilot offering guided mindfulness exercises, mood tracking, and supportive conversational care.",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=85",
    icon: HeartPulse,
  },
  {
    id: "hahnnemen-ai",
    name: "HahnnemenAI",
    product: "HahnnemenAI (Homeopathy AI)",
    category: "Clinical AI",
    tag: "Live",
    version: "1.2",
    metric: "100,000+ Symptom Mappings",
    description:
      "Specialized AI assistant analyzing clinical cases, rubrics, and symptom totals to assist homeopathic practitioners in remedy synthesis.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=85",
    icon: Brain,
  },
  {
    id: "the-repertory",
    name: "The Repertory",
    product: "Medical Symptom Search Engine",
    category: "Clinical Reference",
    tag: "Live",
    version: "2.1",
    metric: "Sub-second Search Index",
    description:
      "High-speed digital repertory search platform enabling doctors to cross-reference symptoms, remedies, and classical medical literature.",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1920&q=85",
    icon: BookOpen,
  },
  {
    id: "futureogy",
    name: "Futureogy",
    product: "Predictive Horizon Analytics",
    category: "Predictive Intelligence",
    tag: "Live",
    version: "1.0",
    metric: "Pattern Modeling Engine",
    description:
      "Next-gen predictive analytics framework identifying emerging industry trends and strategic decision scenarios through AI forecasting.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=85",
    icon: Sparkles,
  },
  {
    id: "wealth-wisdom",
    name: "Wealth Wisdom",
    product: "Personal Finance & Investment Advisor",
    category: "FinTech AI",
    tag: "Live",
    version: "2.8",
    metric: "Automated Asset Allocation",
    description:
      "Smart wealth management platform offering portfolio health checks, personalized investment insights, and automated financial planning.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    icon: BarChart3,
  },
  {
    id: "aadhar-pan-ocr",
    name: "Aadhar and PAN OCR",
    product: "Aadhar and PAN OCR (No LLM)",
    category: "Identity & Verification",
    tag: "Live",
    version: "3.0",
    metric: "<50ms Deterministic Processing",
    description:
      "Ultra-fast, deterministic computer vision OCR for extracting details from Indian identity cards locally without external LLM API dependencies.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85",
    icon: Activity,
  },
];
