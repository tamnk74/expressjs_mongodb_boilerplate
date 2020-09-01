rm -f .git/hooks/pre-commit.sample
cp './internals/scripts/pre-commit.sample' './.git/hooks/pre-commit'
chmod +x .git/hooks/pre-commit