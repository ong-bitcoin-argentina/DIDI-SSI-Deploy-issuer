# DIDI-SSI-Deploy

# 1. Summary

This guide explains how to deploy the complete **DIDI** solution step by step. To see a more detailed aproach, please refer to [OPS Readme](./ops/README.md).

# 2. Docker & Node version

Each component is dockerized using *Alpine Linux v3.11* with *Node v10.x*. 

# 3. Prerequisites

## 3.1. Minimum Requirements

* **RAM:** 8GB.
* **CPU:** 2 core.
* **HDD:** 30 GB.
* **OS:** Linux (*Debian 10* recommended).

**IMPORTANT:** You also need to have a computer with **Linux** installed (it could be any distro), so you can install needed dependencies and run deployment script.

## 3.2. Access Requirements

* SSH access with **root** user must be enabled.
* Parameter `MaxSessions` must be disabled (commented) or have a value of **100** (or more).

		~$ nano /etc/ssh/sshd_config
		
		# Authentication:

		#LoginGraceTime 2m
		PermitRootLogin yes
		#StrictModes yes
		#MaxAuthTries 6
		MaxSessions 100

* If you update `/etc/ssh/sshd_config` file, after that, you will need to run `service sshd restart` to reload the configuration.
* You have to enable passwordless SSH access to server with root using your personal SSH key (you can do it for more than one if you want). For doing that, add your public key to file `/root/.ssh/authorized_keys`

# 4. Configuration

## 4.1. Creating your own environment
 
 1. Clone this repo in your PC (**don't do it in the server!**).
 2. Create a dedicated folder for the environment you want to deploy. To do that make a copy of the folder `/ops/example`, paste it inside `/ops` and rename it as you want (in the rest of this document we will call it `<environment>`).

## 4.2. Configuring SSH auth for deployment script 

 1. Copy the same public key/s you used on item **3.2** to folder `/ops/<environment>/ansible/ssh-keys` and delete the `example` ones (before that notice the format your SSH key should have).
 2. Edit `/ops/<environment>/ansible/custom-vars.json`to point to the public keys you copied on step **1**. Use the `example` ones to guide yourself,  but delete them after you have put the path to your key/s (those are merelly illustrative).
 3. Edit `/ops/<environment>/ansible/hosts` IP with the one from the server you will deploy to.

## 4.3. Setting up the environment variables

1. Rename the file `/ops/<environment>/docker/.env.example` to `.env`
2. Change values of variables inside the file wich are equal to `<CHANGE_ME>`. Guide yourself using the comments.

**IMPORTANT:** After you have deployed your environment, you will need to perform some **post-deployment** steps (see item **6. Post-Deployment**). To do so (before deploying), you need to set the variable `ENABLE_INSECURE_ENDPOINTS = true`. In case you are deploying a productive environment, after you have performed the *post-deployment* procedure, for security reasons, you will need to re-deploy the entire solution, but this time with variable `ENABLE_INSECURE_ENDPOINTS = false`.

To generate some of the variables you will have to run the script `/deploy-tools/key-generator.js`. For doing that you need to install **Node Version Manager**. To do so, run the following commands:

	~$ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
	~$ source ~/.profile

To run `key-generator.js`run the following commands inside `deploy-tools` folder:

	~$ nvm install
	~$ nvm use
	~$ npm i
	~$ node key-generator.js

## 4.4. Setting up MongoDB Initialization script

Change values of variables inside the file `/ops/<environment>/configs/mongo-init.js` wich are equal to `<CHANGE_ME>`. Guide yourself using the comments. Use the values of the corresponding variables in `.env` file.

## 4.5. Downloading DIDI and Ronda Firebase JSON

1. Login to your **DIDI/RONDA Firebase** console.
2. Press the **gear wheel** on the top-left part of your screen and select the **Project Configuration**  menu.
3. Press the **Service Accounts** tab.
4. Press the **Generate New Private Key** blue button to download the corresponding *JSON* file.
5. Copy the contents of the *JSON* file inside `/ops/<environment>/configs/didi-firebase.json` (or `ronda-firebase.json` if it corresponds).

## 4.6. Exposing MongoDB port

If you are deploying to a testing environment, probably you will want to expose the database port. To do so, edit the `ports` section of service `mongo` in file `/ops/<environment>/docker/docker-compose-overrides.yml`:

* To expose the port: `- 27017:${MONGO_PORT}`
* To hide the port: `- 127.0.0.1:27017:${MONGO_PORT}`

# 5. Deployment

## 5.1. Configuring Server

If this is the first time you are deploying to the server, you will need to perform tasks like these:

* Install *docker*.
* Install *docker-compose*.
* Install other dependencies.
* Enable *docker-compose* to authenticate using your SSH key, so you can run it over the server but executing it remotely from your computer.

To do this, first of all you need to install **Ansible** in your computer (see how to do it in your OS [here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)). After that, go inside `ops` folder and run the following command:

	./ops.sh --config-server <environment>

**IMPORTANT**: You will need to perform this step only if:

* This is the first time you are deploying to your server.
* You need to add an extra authorized SSH Key for *ops.sh* script authentication.

## 5.2. Configuring Swarm

1. Login to the server where you will deploy the solution.
2. Create a file `/swarm/password/password` with a plain text password. An account will be generated the first that you run `swarm` on the server, based on that password.
3. Create a file `/swarm/entrypoint/run.sh` with the following content:

		#!/bin/sh
		swarm --datadir /data --password /password/password --httpaddr 0.0.0.0 --debug --verbosity 4

## 5.3.  Deploying solution

To deploy the solution to your server you need to run the following command:

	./ops.sh --deploy <environment>

This will pull solution's modules from DIDI's public Docker Repo and will run the corresponding containers in your server.

## 5.4. Other useful commands

You can deploy only one specific *docker-compose* module (and its dependent ones) running the following command:

	./ops.sh --deploy <environment> <docker_module>

For example:

	./ops.sh --deploy testing issuer-backend

Also, you can stop/start/restart one module (and its dependent ones) running the following commands:

	./ops.sh --stop <environment> <docker_module>
	./ops.sh --start <environment> <docker_module>
	./ops.sh --restart <environment> <docker_module>

# 6. Post-Deployment

Follow the 3 steps explained [here](https://docs.didi.org.ar/docs/developers/deployment/post-deployment).


