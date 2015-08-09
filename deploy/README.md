Ansible Playbooks
=================

Use [ansible](http://www.ansible.com/get-started) to deploy and provision resources.

## Deploy Playbook

Found in `deploy.yml`.

Run with `ansible-playbook -v -i inventories/edge deploy.yml --ask-sudo-pass --vault-password-file ../.vault_pass`

