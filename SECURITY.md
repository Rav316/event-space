# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public GitHub issue.

Report it privately via GitHub's [Security Advisories](../../security/advisories/new) feature or by emailing the maintainer directly.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

You can expect an acknowledgement within 48 hours and a fix or mitigation plan within 7 days for critical issues.

## Scope

| Area | In Scope |
|---|---|
| Authentication / JWT | Yes |
| API authorization bypass | Yes |
| SQL injection | Yes |
| File upload vulnerabilities | Yes |
| Dependency vulnerabilities (CVE) | Yes |
| Grafana / RabbitMQ / Prometheus misconfiguration | Yes |

## Out of Scope

- Issues requiring physical access to the server
- Denial of service attacks
- Social engineering
