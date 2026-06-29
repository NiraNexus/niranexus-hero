\# Custom Skill: feasibility-checker

TRIGGER: Immediately follows session-bootstrap initialization.

PROTOCOL:

1\. Verify terminal path resolution invariants.

2\. Execute git status --porcelain. Freeze build runs if manual workspace changes drift.

3\. Validate user inputs against destructive command patterns.

4\. Apply upfront risk metrics: Schema shifts/Auth (CRITICAL) | Packages/Environment updates (HIGH).

5\. Enforce explicit output: GO | NEEDS\_CLARIFICATION | NO\_GO.

