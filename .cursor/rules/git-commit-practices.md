# Git Commit and Push Best Practices

## Core Principles

### Commit Related Changes
A commit should be a wrapper for related changes. For example, fixing two different bugs should produce two separate commits. Small commits make it easier for other developers to understand the changes and roll them back if something goes wrong.

### Commit Often
Committing often keeps your commits small and helps you commit only related changes. Moreover, it allows you to share your code more frequently with others. That way it's easier for everyone to integrate changes regularly and avoid having merge conflicts.

### Don't Commit Half-Done Work
You should only commit code when a logical component is completed. Split a feature's implementation into logical chunks that can be completed quickly so that you can commit often. If you need a clean working copy, consider using Git's stash feature instead.

### Test Your Code Before You Commit
Resist the temptation to commit something that you "think" is completed. Test it thoroughly to make sure it really is completed and has no side effects. Having your code tested is even more important when it comes to pushing/sharing your code with others.

## Commit Message Format

### Structure
```
<type>: <subject> (50 chars or less)

<body text wrapped at 72 characters>
```

### Rules
- **Capitalized, short summary** (50 chars or less)
- **Always leave the second line blank**
- **Wrap body text to 72 characters**
- **Use imperative mood**: "Fix bug" not "Fixed bug" or "Fixes bug"
- **Separate summary from body** with a blank line

### Good Examples

**Simple commit (no body needed):**
```
feat: Add districts layer to map visualization
```

**Complex commit with body:**
```
refactor: Extract Mapbox utilities into reusable modules

- Move constants to lib/constants/mapbox.ts
- Create district types in lib/types/districts.ts  
- Extract map initialization logic
- Improve code reusability across components
```

**Bug fix:**
```
fix: Resolve district popup positioning issue

The popup was appearing off-screen for districts near map edges.
Updated popup positioning logic to ensure it stays within viewport
bounds by checking container dimensions before setting coordinates.
```

## Commit Types

Use these prefixes for consistent commit categorization:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring (no functionality change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **perf**: Performance improvements
- **ci**: CI/CD pipeline changes

## Branching Strategy

### Use Branches Extensively
- **Feature branches**: `feature/district-visualization`
- **Bug fixes**: `fix/popup-positioning`
- **Hotfixes**: `hotfix/security-patch`
- **Releases**: `release/v1.2.0`

### Branch Naming Convention
```
<type>/<description-in-kebab-case>

Examples:
feature/mapbox-integration
fix/auth-token-validation
refactor/component-structure
docs/deployment-guide
```

## Push Guidelines

### Before Pushing
1. **Run tests**: Ensure all tests pass
2. **Check lint**: Fix any linting errors
3. **Review changes**: Use `git diff` to review your changes
4. **Squash if needed**: Combine related commits for cleaner history

### Push Frequency
- **Push feature branches regularly** to backup work
- **Don't push to main/master directly** (use pull requests)
- **Push early, push often** on feature branches
- **Coordinate with team** on shared branches

### Force Push Guidelines
- **Never force push to shared branches** (main, develop, etc.)
- **Only force push to your own feature branches**
- **Use `--force-with-lease`** instead of `--force` when needed
- **Communicate with team** before force pushing shared work

## Pre-commit Checklist

Before every commit, verify:
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Code follows project style guide
- [ ] Commit message follows format guidelines
- [ ] Only related changes are included
- [ ] Sensitive data is not committed (.env files, keys, etc.)

## Pull Request Best Practices

### Before Creating PR
- [ ] Rebase on latest main/develop
- [ ] Squash commits if needed
- [ ] Write descriptive PR title and description
- [ ] Add reviewers and labels
- [ ] Link related issues

### PR Description Template
```
## What changed?
Brief description of the changes

## Why?
Motivation for the change

## How to test?
Steps to verify the changes work

## Screenshots (if applicable)
Visual changes or new features

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Common Mistakes to Avoid

❌ **Don't:**
- Commit large, unrelated changes together
- Use vague commit messages like "fix stuff" or "update"
- Commit commented-out code or debug statements
- Include personal files or IDE configurations
- Force push to shared branches
- Commit directly to main/master

✅ **Do:**
- Write clear, descriptive commit messages
- Commit early and often with logical chunks
- Use branches for all feature work
- Test before committing and pushing
- Keep commits atomic and focused
- Use consistent commit message format

## Useful Git Aliases

Add these to your `.gitconfig` for improved workflow:
```bash
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --decorate --all
    amend = commit --amend --no-edit
```

## Emergency Procedures

### Undo Last Commit (not pushed)
```bash
git reset --soft HEAD~1  # Keep changes staged
git reset HEAD~1         # Keep changes unstaged
git reset --hard HEAD~1  # Discard changes entirely
```

### Undo Last Commit (already pushed)
```bash
git revert HEAD  # Creates new commit that undoes the last one
```

### Fix Wrong Commit Message (not pushed)
```bash
git commit --amend -m "New commit message"
```

This rule ensures consistent, high-quality commits that improve code maintainability and team collaboration. 