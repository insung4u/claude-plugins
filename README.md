# insung4u-plugins

Personal Claude Code plugin marketplace managed by [@insung4u](https://github.com/insung4u).

## Add Marketplace

```shell
/plugin marketplace add insung4u/claude-plugins
```

## Install a Plugin

```shell
/plugin install <plugin-name>@insung4u-plugins
```

## Available Plugins

| Plugin | Description |
|--------|-------------|
| `infographic-generator` | 한글 완벽 지원 인포그래픽 생성기 (HTML/CSS + Puppeteer → PNG) |

## Plugin Structure

Each plugin lives under `plugins/<name>/` with the following structure:

```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json       # Plugin metadata
├── skills/               # Slash commands (/name:skill)
├── agents/               # Sub-agents
├── hooks/                # Auto-run hooks
└── mcpServers/           # MCP server configs
```

## Adding a New Plugin

1. Create a directory under `plugins/<plugin-name>/`
2. Add `.claude-plugin/plugin.json`
3. Add plugin content (skills, MCP servers, hooks, etc.)
4. Register in `.claude-plugin/marketplace.json`
5. Push and run `/plugin marketplace update insung4u-plugins`
