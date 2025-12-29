# ESLint/Prettier Troubleshooting

## If you see warnings in VSCode that don't appear in the terminal:

### 1. Restart ESLint Server

- Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type: `ESLint: Restart ESLint Server`
- Press Enter

### 2. Reload VSCode Window

- Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type: `Developer: Reload Window`
- Press Enter

### 3. Clear ESLint Cache

```bash
# From project root
rm -rf node_modules/.cache
pnpm install
```

### 4. Check ESLint Output

- Open Output Panel: `View > Output`
- Select "ESLint" from the dropdown
- Look for errors or configuration issues

### 5. Verify Extensions

Make sure you have these extensions installed:

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)

### 6. Check ESLint Status

- Look at the bottom-right status bar
- You should see "ESLint" with a checkmark
- If you see an error icon, click it to see details

## Common Issues

### "Failed to load plugin" errors

```bash
# Reinstall dependencies
pnpm install
```

### Prettier and ESLint conflicts

Our configuration already handles this, but if you see formatting conflicts:

```bash
# Reformat everything
pnpm format
```

### ESLint not running

- Check that `eslint.config.mjs` exists in the root
- Ensure `eslint.experimental.useFlatConfig` is set to `true` in settings

## Verify Configuration is Working

Run these commands - they should pass without warnings:

```bash
pnpm lint              # Should show 0 errors, 0 warnings
pnpm format:check      # Should show all files formatted correctly
```
