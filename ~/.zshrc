export PATH=~/.npm-global/bin:$PATH

export ZSH="Users/sg/.oh-my-zsh"

ZSH_THEME="robbyrussell"
plugins=(git)
source $ZSH/oh-my-zsh.sh

alias dps="docker ps"
alias k="kubectl"
alias comp='zip -vr /tmp/`basename $PWD` .zip . -x "**node_modules"'
alias code="code-insiders"

