<p align="center">
    <em><code>► Open Source Company Vehicles Maintenance Service</code></em>
</p>
<p align="center">
	<!-- local repository, no metadata badges. -->
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=default&logo=TypeScript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/NestJS-E0234E.svg?style=default&logo=NestJS&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=default&logo=MongoDB&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-880000.svg?style=default&logo=Mongoose&logoColor=white" alt="Mongoose">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=default&logo=Jest&logoColor=white" alt="Jest">
  <img src="https://img.shields.io/badge/jsonwebtoken-000000.svg?style=default&logo=json-web-tokens&logoColor=white" alt="jsonwebtoken">
  <img src="https://img.shields.io/badge/AWS-S3-FF9900.svg?style=default&logo=Amazon-S3&logoColor=white" alt="AWS S3">
</p>

<br>

##  Overview

<code>► Open Source Implementations of needed API's for managing and maintaining the status of a company\'s vehicle fleet</code>

---

##  Features

 - CRUD management for Cars, Users, and Drivers
 - Ability for users to manage details of their Cars and Drivers
 - Ability to assign a driver to a car

---

##  Repository Structure

```sh
└── ./
    ├── README.md
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.module.ts
    │   ├── cars
    │   ├── document
    │   ├── driver
    │   ├── interfaces
    │   ├── main.ts
    │   └── user
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── yarn-error.log
    └── yarn.lock
```

---

##  Getting Started

**System Requirements:**

* **Node.js**: `version 12.x or newer`
* **Yarn**: `version 7.x or newer`
* **NestJS**: `version 7.x or newer`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the repository:
>
> ```console
> $ git clone github.com/mmohhamadd/VehicleFleetStatusService
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd VehicleFleetStatusService
> ```
>
> 3. Install the dependencies:
> ```console
> $ yarn install
> ```

###  Usage

<h4>From <code>source</code></h4>

> Run the project using the command below:
> ```console
> $ nest start
> ```

---
##  Project Roadmap

- [X] `► Fuel Management`