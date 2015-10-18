# lucky

## Description

CLI tool to measure the state of your luck at the moment.

## What's it for?

Before any important move in your life, you should first consult this tool to see if the timing is right. You can even execute other commands only if your luck is effectively above average.

## Installation

[![NPM](https://nodei.co/npm/lucky.png?compact=true)](https://npmjs.org/package/lucky)

``` bash
$ npm install lucky -g
```

## Options

```bash
$ lucky --help

  Usage: lucky [options]

  CLI tool to measure the state of your luck, at the moment

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -o, --opponents <n>    Number of opponents competing [default 1]
    -r, --rounds <n>       Number of rounds simulated [default 100]
    -C, --no-colors        Do not use fancy colors in output
    -v, --verbose [level]  Verbosity level (0-4) [default 1]
    -s, --silent           Alias for --verbose=0
    -n, --number           Output only the luck number
    -8, --eightball        Transform into a magic 8-ball

  Exit code:

    Exits successfully only if luck is above average
```

## Examples

Minimal verbosity, just show me my luck
```bash
$ lucky
Your luck is 8% above average
```

Include the data behind that luck
```bash
$ lucky -o 2 -r 100 -v 2
You won 32 out of 100 rounds against 2 opponent(s)
Your luck is 4% below average
```

Include the winner of each round
```bash
$ lucky -r 5 -v 3
Round 1
-> The winner is CPU 1
Round 2
-> The winner is Human
Round 3
-> The winner is CPU 1
Round 4
-> The winner is CPU 1
Round 5
-> The winner is CPU 1
You won 1 out of 5 rounds against 1 opponent(s)
Your luck is 60% below average
```

Include the score of each player on each round
```bash
$ lucky -r 3 -v
Round 1
-> Human scored: 111
-> CPU 1 scored: 166
-> The winner is CPU 1
Round 2
-> Human scored: 143
-> CPU 1 scored: 112
-> The winner is Human
Round 3
-> Human scored: 178
-> CPU 1 scored: 127
-> The winner is Human
You won 2 out of 3 rounds against 1 opponent(s)
Your luck is 33% above average
```

Execute different commands depending on whether luck is above average or not
```bash
$ lucky -s && echo "Buy a lottery ticket" || echo "Go watch TV"
Go watch TV
```

Pretend to be a Magic 8-ball
```bash
$ lucky -8
Definitely!
$ lucky -8
Nope
```

Log you luck, add it to a cron and then you can make charts and whatnot
```bash
$ echo `date "+%Y-%m-%d %H:%M:%S"` `lucky -n`% >> ~/luck.log
```

## How does it measure my luck?

It simulates a match against opponents and compares your win-rate against the expected average.

## LICENSE

The MIT License (MIT)

Copyright (c) 2015 Ariel Flesler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
