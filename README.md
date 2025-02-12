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
- `-c, --check` - Show password strength analysis
- `-b, --batch <number>` - Generate multiple passwords

## Examples

```bash
# 16 character password with numbers
passgen -l 16 -n

# Complex password with all character types
passgen -l 20 -n -s -u

# Generate password with strength check
passgen -l 15 -n -s -u -c

# Generate 5 passwords at once
passgen -b 5 -n -u
```