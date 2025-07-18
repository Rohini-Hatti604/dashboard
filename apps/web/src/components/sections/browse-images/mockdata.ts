import { ImageDetails } from "@/types/browse-images";
import { ICVE } from "../../../../../../packages/shared/src/entities/images/cve";
import { IImagePackage } from "../../../../../../packages/shared/src/entities/images/package";

export interface ProvenanceData {
    description: string;
    requirements: string[];
    registryInfo: string;
    registryTags: string[];
    starterImages: string[];
}

export interface SpecificationsData {
    apk: string;
    shell: string;
    environmentVariables?: string;
    entrypoint?: string;
    volumes?: string
    cmd?: string;
    stopSignal?: string;
    workingDirectory?: string;
    rawConfiguration: string[];
}

export interface VulnerabilitiesData {
    id: string;
    severity: "low" | "normal" | "high" | "emergency";
    package: string;
    version: string;
    lastDetected: string;
    description: string;
    references: string[];
}

export interface TagTableRow {
    tag: string;
    pullUrl: string;
    compressedSize: string;
    architecture: string;
    lastChanged: string;
    variant: "dev" | "non-dev";
}
export interface SBOMTableRow {
    package: string;
    version: string;
    repository: string;

    license: string;
    architecture: string;
    tag: string;
}


export interface AdvisoryTableRow {
    id :string;
    name : string;
    cveId: string;
    description : string;
    
    cvssScore: number;
     cvssVector: string;
     fixedInVersion?: string;
    packages?: IImagePackage[];
    severity:  "low" | "medium" | "high" | "critical" | "all";
    status: "under_investigation" | "fixed" | "not_fixed" | "confirmed" | "fix_in_progress" | "upstream_fix_available" | "upstream_fix_not_available" | "wont_fix" | "false_positive"; // Status of the vulnerability
    imageVersionId: string;
    imageId: string;
    createdAt: string | Date;
    publishedAt: string;
    detectedAt: string;
    updatedAt: string;
}

export type ImageDetailsData = Record<string, ImageDetails & { provenance?: ProvenanceData, specifications?: SpecificationsData, vulnerabilitiesData?: VulnerabilitiesData[], advisoriesData?: AdvisoryTableRow[], tagsData?: TagTableRow[],sbom: SBOMTableRow[] }>;

export const IMAGE_DATA: ImageDetailsData = {
    prometheus: {
        id: "prometheus",
        name: "Prometheus",
        logo: "/prometheus.svg",
        tags: ["ARM", "Microservices", "Monitoring", "Metrics", "Open Source", "Observability", "FIPS", "Kubernetes", "Cloud Native", "Grafana", "Alerting"],
        fips: true,
        stigHardened: true,
        lastUpdated: "17 Jun 2025",
        vulnerabilities: 2,
        pulls: 21863,
        dockerPull: "docker space pull clnstrt reg.dev/.../postgre",
        overview:
            "Prometheus is an Open-Source Monitoring and Metrics Platform. It collects real-time data from services and applications. Helps track performance, health, and usage trends across your stack.",
        intendedUses: [
            "Competitive coding: Excels at benchmarks like Codeforces and LiveCodeBench.",
            "Code generation and repair: Strong at structured, logic-heavy tasks using synthetic and real-world code datasets.",
            "Research: Ideal for experimenting with reinforcement learning for LLMs (via GRPO+) and context-length scaling.",
        ],
        usageTips: [
            "Prompting: Avoid system prompts; keep instructions in the user message.",
            "Sampling: Use temperature=0.6, top_p=0.95.",
            "Token limits: Allocate at least 40k tokens; pull full context.",
        ],
        provenance: {
            description:
                "All Chainguard container images contain verifiable signatures and high-quality SBOMs (software bill of materials), features that enable users to confirm the origin of each image build and have a detailed list of everything that is packed within.\n\nYou'll need cosign and jq in order to download and verify image attestations.",
            requirements: [
                "cosign",
                "jq"
            ],
            registryInfo: "Registry and Tags for apko Image",
            registryTags: [
                "cgr.dev/chainguard - the Public Registry contains our Starter Images, which typically comprise the latest* versions of an image.",
                "cgr.dev/<your-org-name> - contains all Production Images that your organisation has access to. ",
                "The commands listed on this page will default to the latest tag, but you can specify a different tag to fetch attestations for."
            ],
            starterImages: [
                "cosign verify \\",
                "--certificate-oidc-issuer=https://token.actions.githubusercontent.com \\",
                "--certificate-identity=https://github.com/chainguard-images/images/.github/workflows/release.yaml@refs/heads/main \\",
                "cgr.dev/chainguard/apko | jq"
            ]
        },
        specifications: {
            apk: "no",
            shell: "yes",
            environmentVariables: "PATH=/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt",
            entrypoint: "/usr/bin/apko",
            cmd: "--help",
            workingDirectory: "/work",
            rawConfiguration: [
                "cosign verify \\",
                "--certificate-oidc-issuer=https://token.actions.githubusercontent.com \\",
                "--certificate-identity=https://github.com/chainguard-images/images/.github/workflows/release.yaml@refs/heads/main \\",
                "cgr.dev/chainguard/apko | jq"
            ]
        },
        vulnerabilitiesData: [
            {
                id: "CVE-2024-12345",
                severity: "high",
                package: "example-package",
                version: "1.0.0",
                lastDetected: "2025-06-01T07:07:49Z",
                description: "This is a high severity vulnerability affecting example-package version 1.0.0.",
                references: ["https://example.com/cve-2024-12345", "https://security.example.com/advisories/CVE-2024-12345", "https://nvd.nist.gov/vuln/detail/CVE-2024-12345", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12345"]
            },
            {
                id: "CVE-2024-67890",
                severity: "normal",
                package: "another-package",
                version: "2.3.4",
                lastDetected: "2025-06-15T07:07:49Z",
                description: "This is a normal severity vulnerability affecting another-package version 2.3.4.",
                references: ["https://example.com/cve-2024-67890", "https://security.example.com/advisories/CVE-2024-67890", "https://nvd.nist.gov/vuln/detail/CVE-2024-67890", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-67890"]
            },
            {
                id: "CVE-2023-54321",
                severity: "low",
                package: "third-package",
                version: "0.9.8",
                lastDetected: "2025-02-20T07:07:49Z",
                description: "This is a low severity vulnerability affecting third-package version 0.9.8.",
                references: ["https://example.com/cve-2023-54321", "https://security.example.com/advisories/CVE-2023-54321", "https://nvd.nist.gov/vuln/detail/CVE-2023-54321", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-54321"]
            }
        ],
        tagsData: [
            {
                tag: "2.55.1-r2",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "526 KB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "non-dev",
            },
            {
                tag: "2.55.1-r2-dev",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "1 MB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 day ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "100 MB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 week ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "1 GB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 month ago",
                variant: "dev",
            },
            {
                tag: "latest-dev",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "64 GB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 year ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "109.20MB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "109.20MB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "dev",
            },
            {
                tag: "latest-dev",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "109.20MB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "1 GB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 month ago",
                variant: "dev",
            },
            {
                tag: "latest-dev",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "64 GB",
                architecture: "x86_64 + arm64",
                lastChanged: "1 year ago",
                variant: "dev",
            },
            {
                tag: "adoptium-openjdk-11-dev.adopt",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "109.20MB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "dev",
            },
            {
                tag: "latest-dev",
                pullUrl: "cgr.dev/cleanstart/latest.php",
                compressedSize: "109.20MB",
                architecture: "x86_64 + arm64",
                lastChanged: "12 hours ago",
                variant: "dev",
            },
        ],
        
    advisoriesData: [
            
  {
  id: "CVE-2025-58251",
  name: "Example vulnerability",
  description: "This is a mock vulnerability.",
  cveId: "CVE-2025-58251",
  cvssScore: 5.6,
  cvssVector: "AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
  severity: "medium",
  status: "fixed",
  publishedAt: "2025-06-12",
  detectedAt: "2025-06-10",
  updatedAt: "2025-07-01",
  imageVersionId: "image-1",
  imageId: "prometheus",
  createdAt: "2025-06-10T00:00:00Z",
  packages: [
    {
      id: "pkg-1",
      name: "busybox",
      version: "1.34.1-r10",
      imageVersionId: "image-1",
      repositoryName: "alpine",
      size: 1024,
      architecture: ["x86_64"],
      license: "GPL-2.0"
    }
  ]
},

{
  id: "CVE-2025-4639",
  name: "Example vulnerability",
  description: "This is a mock vulnerability.",
  cveId: "CVE-2025-4639",
  cvssScore: 5.6,
  cvssVector: "AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
  severity: "high",
  status: "wont_fix",
  publishedAt: "2025-06-12",
  detectedAt: "2025-06-10",
  updatedAt: "2025-07-01",
  imageVersionId: "image-1",
  imageId: "prometheus",
  createdAt: "2025-06-10T00:00:00Z",
  packages: [
    {
      id: "pkg-1",
      name: "busybox",
      version: "1.34.1-r10",
      imageVersionId: "image-1",
      repositoryName: "alpine",
      size: 1024,
      architecture: ["x86_64"],
      license: "GPL-2.0"
    }
  ]
},

{
  id: "CVE-2025-4640",
  name: "Example vulnerability",
  description: "This is a mock vulnerability.",
  cveId: "CVE-2025-4640",
  cvssScore: 5.6,
  cvssVector: "AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
  severity: "low",
  status: "wont_fix",
  publishedAt: "2025-06-12",
  detectedAt: "2025-06-10",
  updatedAt: "2025-07-01",
  imageVersionId: "image-1",
  imageId: "prometheus",
  createdAt: "2025-06-10T00:00:00Z",
  packages: [
    {
      id: "pkg-1",
      name: "busybox",
      version: "1.34.1-r10",
      imageVersionId: "image-2",
      repositoryName: "alpine",
      size: 1024,
      architecture: ["x86_64"],
      license: "GPL-2.0"
    }
  ]
},

{
  id: "CVE-2025-4641",
  name: "Example vulnerability",
  description: "This is a mock vulnerability.",
  cveId: "CVE-2025-4641",
  cvssScore: 5.6,
  cvssVector: "AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
  severity: "medium",
  status: "fixed",
  publishedAt: "2025-06-12",
  detectedAt: "2025-06-10",
  updatedAt: "2025-07-01",
  imageVersionId: "image-1",
  imageId: "prometheus",
  createdAt: "2025-06-10T00:00:00Z",
  packages: [
    {
      id: "pkg-1",
      name: "busybox",
      version: "1.34.1-r10",
      imageVersionId: "image-2",
      repositoryName: "alpine",
      size: 1024,
      architecture: ["x86_64"],
      license: "GPL-2.0"
    }
  ]
},

{
  id: "CVE-2025-4642",
  name: "Example vulnerability",
  description: "This is a mock vulnerability.",
  cveId: "CVE-2025-4642",
  cvssScore: 5.6,
  cvssVector: "AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
  severity: "low",
  status: "wont_fix",
  publishedAt: "2025-06-12",
  detectedAt: "2025-06-10",
  updatedAt: "2025-07-01",
  imageVersionId: "image-1",
  imageId: "prometheus",
  createdAt: "2025-06-10T00:00:00Z",
  packages: [
    {
      id: "pkg-1",
      name: "busybox",
      version: "1.34.1-r10",
      imageVersionId: "image-2",
      repositoryName: "alpine",
      size: 1024,
      architecture: ["x86_64"],
      license: "GPL-2.0"
    }
  ]
},





],

            
            
            
        
    sbom: [
            {
                package: "cleanstart-openjdk-11",
                version: "11.0.15.1-r2",
                repository: "cleanstart",
                license: "GPL-2.0-with-classpath-exception",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "cleanstart-openjdk-11-jdk",
                version: "11.0.15.1-r2",
                repository: "cleanstart",
                license: "GPL-2.0-with-classpath-exception",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "cleanstart-openjdk-11-jre",
                version: "11.0.15.1-r2",
                repository: "cleanstart",
                license: "GPL-2.0-with-classpath-exception",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "busybox",
                version: "1.34.1-r10",
                repository: "Wolfi",
                license: "GPL-2.0-only",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "ca-certificates",
                version: "20240530-r1",
                repository: "Wolfi",
                license: "MPL-2.0",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "freetype",
                version: "2.10.4-r3",
                repository: "cleanstart",
                license: "FTL OR GPL-2.0-or-later",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "zlib",
                version: "1.2.11-r9",
                repository: "cleanstart",
                license: "Zlib license",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "busybox-selinux",
                version: "1.34.1-r10",
                repository: "cleanstart",
                license: "GPL-2.0-only",
                architecture: "x86",
                tag: "latest",
            },
             {
                package: "cleanstart-openjdk-11-jre",
                version: "11.0.15.1-r2",
                repository: "cleanstart",
                license: "GPL-2.0-with-classpath-exception",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "busybox",
                version: "1.34.1-r10",
                repository: "Wolfi",
                license: "GPL-2.0-only",
                architecture: "x86",
                tag: "latest",
            },
             {
                package: "cleanstart-openjdk-11-jre",
                version: "11.0.15.1-r2",
                repository: "cleanstart",
                license: "GPL-2.0-with-classpath-exception",
                architecture: "x86",
                tag: "latest",
            },
            {
                package: "busybox",
                version: "1.34.1-r10",
                repository: "Wolfi",
                license: "GPL-2.0-only",
                architecture: "x86",
                tag: "latest",
            },
        ]
    },
};



export interface PackageTableRow {
    name: string;
    version: string;
    repository: string;
    license: string;
}

export const PACKAGE_DATA: PackageTableRow[] = [
    { name: "alpine-keys", version: "2.4-r5", repository: "Wolfi", license: "MIT" },
    { name: "apk-tools", version: "2.14.10-r", repository: "Wolfi", license: "GPL-2.0-only" },
    { name: "apko", version: "0.279-r0", repository: "Wolfi", license: "Apache-2.0" },
    { name: "bash", version: "5.2.37-r33", repository: "Wolfi", license: "GPL-3.0-or-later" },
    { name: "busybox", version: "1.37.0-r42", repository: "Wolfi", license: "GPL-2.0-only" },
    { name: "ca-certificates-bundle", version: "20241121-r42", repository: "Wolfi", license: "MPL-2.0 AND MIT" },
    { name: "cleanstart-baselayout", version: "20230214-r13", repository: "Wolfi", license: "MIT" },
    { name: "cyrus-sasl", version: "2.1.28-r42", repository: "Wolfi", license: "BSD-3-Clause" },
    { name: "apko", version: "0.279-r0", repository: "Wolfi", license: "Apache-2.0" },
    { name: "bash", version: "5.2.37-r33", repository: "Wolfi", license: "GPL-3.0-or-later" },
    { name: "busybox", version: "1.37.0-r42", repository: "Wolfi", license: "GPL-2.0-only" },
];

export interface VulnerabilityTableRow {
    cveId: string;
    severity: string;
    package: string;
    version: string;
    lastDetectedDate: string;
}

export const VULNERABILITIES_DATA: VulnerabilityTableRow[] = [
    {
        cveId: "CVE-2025-46394",
        severity: "Low",
        package: "busybox",
        version: "1.34.1-r10",
        lastDetectedDate: "2025-04-10T07:07:49Z",
    },
    {
        cveId: "CVE-2025-58251",
        severity: "Low",
        package: "busybox",
        version: "1.34.1-r10",
        lastDetectedDate: "2025-05-12T07:07:49Z",
    },
];

export interface AdvisoryPackage {
    originPackage: string;
    status: string;
    fixedVersion: string;
    lastUpdated: string;
}

export const ADVISORY_PACKAGES_DATA: AdvisoryPackage[] = [
    {
        originPackage: "busybox",
        status: "fixed",
        fixedVersion: "1.34.1-r10",
        lastUpdated: "2025-06-12",
    },
    {
        originPackage: "apk-tools",
        status: "pending Upstream Fix",
        fixedVersion: "2.14.10-r1",
        lastUpdated: "2025-06-11",
    },
    {
        originPackage: "cyrus-sasl",
        status: "fix Not Planned",
        fixedVersion: "2.1.28-r42",
        lastUpdated: "2025-06-10",
    },
];