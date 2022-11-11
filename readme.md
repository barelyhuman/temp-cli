# temp-cli

simple cli runner to get Apple SOC Temperatures for M1 Macbook Air's

Haven't tested on other M1's so I would be careful and I hold no responsibilty for it.

## Credits

All credits for the original sensors objective c code to [freedomtan](https://github.com/freedomtan), this is just a cli wrapping to get more targeted data

## Usage

0. Install the required dependencies for the package.

```sh
yarn install --frozen-lockfile
```

1. Change into the original sensors library code, which is at `source/lib/sensors` and run the following command

```sh
make
```

2. then back to the root of the project and run one of the following.

```sh
./source/index.js
```

## LICENSE

The licenses are a part of derivative work by "freedom" Koan-Sin Tan so read both licenses before doing anything.

[temp-cli LICENSE](/LICENSE)

[sensors LICENSE](/source/lib/sensors/license)
