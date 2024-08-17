> ##  🚧 WIP<br>
> ### This project is under active development and might include breaking changes.
> See open issues to become an early contributor.

<p align="center">
  <a href="https://github.com/nirvanaOSS/vidur">
   <img src="./header.png" alt="Logo">
  </a>

  <h3 align="center">Vidur (powered by ProfileCity)</h3>

  <p align="center">
    The open-source next-gen Recruiting OS.
    <br />
    <a href="https://www.profilecity.xyz/vidur"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://discord.gg/9ms5uYF8xF">Discord</a>
    ·
    <a href="https://www.profilecity.xyz/vidur">Website</a>
    ·
    <a href="https://github.com/profilecity/vidur/issues">Issues</a>
  </p>
</p>

<p align="center">
   <a href="https://x.com/profilecityhq"><img src="https://img.shields.io/twitter/follow/profilecityhq" alt="Follow Us on X"></a>
   <a href="https://discord.gg/9ms5uYF8xF"><img src="https://img.shields.io/badge/Discord%20-%20Join%20the%20Community%20-%20%235865F2" alt="Join the Community"></a>
   <a href="https://www.linkedin.com/company/profilecity"><img src="https://img.shields.io/badge/LinkedIn%20-%20The%20Nirvana%20Labs%20-%20%230E92D5" alt="Follow Us on LinkedIn"></a>
   <a href="https://www.producthunt.com/products/vidur"><img src="https://img.shields.io/badge/Product%20Hunt%20-%20Vidur%20-%20%23DA552F" alt="Product Hunt"></a>
</p>

# Recruiting OS for forward thinking companies
Vidur is an open-source, next-gen Recruiting OS. Its intuitive and modern interface combines advanced candidate profiles, team workspace, plugins,  one-click apply features, and a lot more enabling forward-thinking companies to efficiently manage their recruitment processes from start to finish.

![Collage Image](asset/collage.png)

## Development Setup
```sh
# Requirements: A PostgreSQL instance up-and-running.
# Clone the repo and cd into the folder.
npm i -g yarn         # install yarn package manager, if you don't have already.
yarn                  # install all the dependencies
cp .env.example .env  # Create env file and fill the fields. (DO NOT CHANGE PORT)
yarn migration:apply  # Create database schema.
yarn dev              # Finally, start the dev server.
```

**Or simply use Docker**
```bash
docker compose --profile dev up 
```

This command starts the `db` and `app` services using the `dev` profile. It runs PostgreSQL as `database` and the app as `vidur_app`.

## Contributing
There are several ways to start contributing to Vidur. See [contribution guide](./CONTRIBUTING.md) to get started.

## Staying ahead
Star Vidur on GitHub and be instantly notified of new releases.
![Star Image](asset/star-repo.gif)

## Security disclosure
To protect your privacy, please avoid posting security issues on GitHub. Instead, send your questions to team@vidurjobs.xyz and we will provide you with a more detailed answer.
