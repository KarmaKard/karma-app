Ansible Playbooks
=================

Use [ansible](http://www.ansible.com/get-started) to deploy and provision resources.

## Provision New Server

Do stuff that I can't remember right now, then...

1. Create file in `deploy/inventories/` for new environment
1. Add variables in `deploy/group_vars/` for new environment
1. Run Ansible `provision` playbook
2. Put your ssh key into `deployer` user
3. Create other users as desired
4. Run Ansible `lock_ssh` playbook

## Deploy Process

1. Merge `master` branch into `release` branch.
2. Push `release` branch to github.com
3. Run Ansible `deploy` playbook

Run with `ansible-playbook -v -i inventories/edge deploy.yml --ask-sudo-pass --vault-password-file ../.vault_pass`
