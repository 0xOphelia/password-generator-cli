# Password Generator CLI

Simple command line tool for generating secure passwords.

## Installation

```bash
npm install -g .
```

## Usage

Generate a basic password:
```bash
passgen
```

Options:
- `-l, --length <number>` - Set password length (default: 12)
- `-n, --numbers` - Include numbers
- `-s, --symbols` - Include symbols  
- `-u, --uppercase` - Include uppercase letters
- `--no-lowercase` - Exclude lowercase letters

## Examples

```bash
# 16 character password with numbers
passgen -l 16 -n

# Complex password with all character types
passgen -l 20 -n -s -u
```