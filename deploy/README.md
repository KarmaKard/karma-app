Ansible Playbooks
=================

Use [ansible](http://www.ansible.com/get-started) to deploy and provision resources.

## Deploy Process

1. Merge `master` branch into `release` branch.
2. Push `release` branch to github.com
3. Run Ansible `deploy` playbook

Run with `ansible-playbook -v -i inventories/edge deploy.yml --ask-sudo-pass --vault-password-file ../.vault_pass`
