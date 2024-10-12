English | [繁體中文](readme.md)

# Llama cpp on Nodejs

Built with [node-llama-cpp](https://github.com/withcatai/node-llama-cpp)

Still holding on to my belief of not stepping into Python.

It’s not that I can’t use Python.

It’s just that Node.js is so much better. Seriously, who in their right mind would use Python to build a web server?

The syntax is a mess, and the performance sucks.

And don’t even get me started on those damn compatibility issues.

You spend half a day just debugging,

only to find out later that, despite their claim of supporting 3.12, you still have to use 3.11.

Python is suck.

# Hey!

Please install [Git](https://git-scm.com/) first.

# Basic Configuration

I've set everything up. Just use it.

Make sure to adjust the parameters in `config.json`.

And put gguf on `models` folder.

remember unzip `fontawesome.zip` on `website` folder.

If it doesn’t run, don’t blame me.

# Execution

Windows 10/11 (Tested environment)
```bat
start.bat
```

Linux
```sh
chmod 777 .\start.sh
.\start.sh
```

Done!

# Open Source

I’m open-sourcing this. Use it however you want.

If you do end up using it, just buy me a cold brew green tea next time, and we’re good.

THX~

# Comparison
All using `gemma 2b Q3` for inference, with the prompt: "As an AI, please explain five benefits you can bring to the world."

Results are as follows:
| Hardware | Time (s) |
|----------|----------|
| RTX3070 Laptop | 2.411(s) |
| i7-11800H | 62.531(s) |
| i5-8250U | 210.012(s) |

\*Sigh\*, I guess the i5-8250U is just not worth it...

## Author

Calou Zhou
