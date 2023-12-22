.PHONY: deps test

reqs:
	pip3 install virtualenv

deps: reqs
	python3 -m venv .venv; \
	. .venv/bin/activate; \
	pip3 install -U pip
	pip3 install -U wheel
	pip3 install -r requirements.txt

lint:
	. .venv/bin/activate; \
	flake8 .

test:
	. .venv/bin/activate; \
	pytest -vv

ansible-deps:
	. .venv/bin/activate; \
	ansible-galaxy install -r requirements.yml

ansible:
	. .venv/bin/activate; \
	ansible-playbook -i inventory.ini --diff playbook.yml --ask-vault-pass

run:
	. .venv/bin/activate; \
	ansible-playbook -i inventory.ini --diff playbook.yml --ask-vault-pass