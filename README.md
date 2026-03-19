# disease-surveillance

An implementation to automate the workflows for Community Health Promoters (CHPs) in Kenya, built on the [Community Health Toolkit (CHT)](https://communityhealthtoolkit.org/).

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js v20+** — use [nvm](https://github.com/nvm-sh/nvm) to manage versions
- **Docker** — for running a local CHT instance
- **cht-conf v3** — the CLI tool for uploading config to CHT
- **Prettier** — for code formatting

### Install nvm and Node 20

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Install cht-conf and Prettier

```bash
npm install --global cht-conf@3
npm install --global prettier
```

> **Note:** Use `cht-conf@3` — this project was built against version 3 of the test harness and is not compatible with cht-conf v6+.

### Fix Docker socket permissions (Linux)

If you get Docker permission errors, run:

```bash
sudo usermod -aG docker $USER
sudo systemctl start docker
sudo systemctl enable docker
echo 'export DOCKER_HOST=unix:///var/run/docker.sock' >> ~/.bashrc
source ~/.bashrc
```

---

## Running a Local CHT Instance

### 1. Create an instance folder and download the compose files

```bash
mkdir ~/cht-instance && cd ~/cht-instance

curl -s -o docker-compose.yml \
  https://staging.dev.medicmobile.org/_couch/builds_4/medic:medic:master/docker-compose/cht-couchdb.yml

curl -s -o cht-core.yml \
  https://staging.dev.medicmobile.org/_couch/builds_4/medic:medic:master/docker-compose/cht-core.yml
```

### 2. Create a `.env` file

```bash
cat > .env << EOF
COUCHDB_USER=medic
COUCHDB_PASSWORD=password
COUCHDB_SECRET=$(openssl rand -hex 16)
COUCHDB_UUID=$(openssl rand -hex 16)
CHT_HTTP_PORT=80
CHT_HTTPS_PORT=443
EOF
```

### 3. Start the CHT stack

```bash
docker compose -f docker-compose.yml -f cht-core.yml up -d
```

Wait 2–3 minutes for all services to start, then verify:

```bash
docker ps
```

You should see 6 containers running: `nginx`, `api`, `sentinel`, `couchdb`, `haproxy`, `nouveau`.

### 4. Open the CHT web UI

Navigate to **https://localhost** in Chrome. Accept the SSL warning and log in with:

- **Username:** `medic`
- **Password:** `password`

---

## Setting Up the Project

### 1. Clone the repo

```bash
git clone https://github.com/Brink-Innovation/disease-surveillance.git
cd disease-surveillance
```

> **NB: DO NOT initialize another repository on your machine. Just clone this one.**

### 2. Install dependencies

```bash
npm install
```

### 3. Upload config to your local CHT instance

```bash
cht --url=https://medic:password@localhost \
    --accept-self-signed-certs \
    upload-app-settings \
    upload-contact-forms \
    upload-app-forms \
    upload-resources \
    upload-branding
```

> **NB: Do NOT compile anything on the master branch — just upload as all is up to date.**

---

## Creating a Test User

The default `medic` admin account has no place or contact assigned, so tasks are disabled for it. To test the full CHP workflow:

1. Log in as `medic` at `https://localhost`
2. Go to **☰ → App Management → Users → Add User**
3. Fill in:
   - **Username:** `test_chp`
   - **Password:** `Medic.123`
   - **Role:** Community Health Promoter
   - **Place:** *(select a Community Health Unit you created)*
   - **Contact:** *(select or create a CHP contact)*
4. Open an **incognito window** and log in as `test_chp` to see tasks, forms, and reports

---

## Running Tests

```bash
# Install dependencies
npm install

# Run all unit tests
npm run unittest

# Run individual test suites
npm run test-tasks       # Task automation tests
npm run test-forms       # Form validation tests
npm run test-summaries   # Contact summary tests
npm run test-targets     # KPI target tests
```

Expected result: **23 passing, 0 failing**

---

## Contributing

1. Ensure you are on `master` before creating a new branch:
   ```bash
   git branch          # confirm you are on master
   git pull origin master
   ```

2. Create a new branch for your feature:
   ```bash
   git checkout -b your-feature-name
   ```
   Use hyphenated, descriptive branch names e.g. `cholera-followup-task`.

   > **NB:** Pushing directly to `master` is disabled. All changes must go through a Pull Request.

3. Push your branch and open a Pull Request:
   ```bash
   git push --set-upstream origin your-feature-name
   ```

4. Request a review from your cell lead. Once approved, your changes will be merged to `master`.

5. For subsequent pushes on the same branch:
   ```bash
   git push
   ```

---

## Project Structure

```
disease-surveillance/
├── app_tasks/          # Task automation rules per role (CHP, CHA, DSO)
├── app_targets/        # KPI dashboard targets per role
├── contact_summaries/  # Patient/contact profile card fields
├── forms/              # XLS/XML data entry forms
├── nools-extras.js     # Shared utility functions
├── tasks.js            # Entry point — merges all role tasks
├── targets.js          # Entry point — merges all role targets
├── contact-summary.templated.js  # Entry point — merges all contact fields
└── test/               # Mocha unit tests (forms, tasks, targets, summaries)
```

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| CHT (Community Health Toolkit) | 4.x / 5.x | Core framework |
| cht-conf | 3.x | Config upload CLI |
| Node.js | 20+ | Runtime |
| Mocha | ^5.2.0 | Test runner |
| chai | ^4.3.7 | Test assertions |
| cht-conf-test-harness | ^3.0.14 | CHT unit test simulator |
| Luxon | ^3.4.3 | Date/time handling |
| Docker | 24+ | Local CHT instance |
