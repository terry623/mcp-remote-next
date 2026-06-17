import { describe, it, expect, afterEach } from 'vitest'
import { createMCPClient, listTools } from './utils.js'
import type { MCPClient } from './utils.js'

describe('MCP Remote E2E', () => {
  let client: MCPClient | null = null

  afterEach(async () => {
    if (client) {
      await client.cleanup()
      client = null
    }
  })

  it('connects to Cloudflare docs MCP server', async () => {
    client = await createMCPClient('https://docs.mcp.cloudflare.com/mcp')
    const tools = await listTools(client.client)
    const toolNames = tools.map((t) => t.name)
    expect(toolNames).toContain('search_cloudflare_documentation')
    expect(toolNames).toContain('migrate_pages_to_workers_guide')
  }, 30000)

  it('connects to Context7 MCP server', async () => {
    client = await createMCPClient('https://mcp.context7.com/mcp')
    const tools = await listTools(client.client)
    const toolNames = tools.map((t) => t.name)
    expect(toolNames).toContain('resolve-library-id')
    expect(toolNames).toContain('get-library-docs')
  }, 30000)
})
