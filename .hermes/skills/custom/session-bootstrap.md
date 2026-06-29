Custom Skill: session-bootstrap

TRIGGER: Fired before Phase 0 initialization.
PROTOCOL:

1. Load AGENTS.md, user.md, AND soul.md strictly from root level path.
2. If .hermes/PROPOSED\_MEMORIES.md contains un-reviewed modifications, pause execution.
3. If AGENTS.md tracks >300 lines, trigger context-engineering compression.
4. Execute session-search to hydrate working memory with both project and user context.

