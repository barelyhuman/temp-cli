# temp-cli

simple cli runner to get Apple SOC Temperatures for M1 Macbook Air's

Haven't tested on other M1's so I would be careful and I hold no responsibilty for it.

## Credits

All credits for the original sensors objective c code to [freedomtan](https://github.com/freedomtan), this is just a cli wrapping to get more targeted data

## Usage

It needs the sensors code to be built on the using Mac so you'll have to clone the repo, then run the below command in the `sources/lib/sensors` folder

```sh
make
```

then back to the root of the project and run one of the following.

```sh
npm run link
# or
yarn link
```

## LICENSE

The licenses are a part of derivative work by "freedom" Koan-Sin Tan so read both licenses before doing anything.

[temp-cli LICENSE](/LICENSE)

[sensors LICENSE](/source/lib/sensors/license)
