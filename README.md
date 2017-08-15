# jsonGenerator
This is a webapp used to generate JSON files. It's fairly basic, I mostly use it to digitize forms.

This is a fairly small-scale, basic project I have been working on for the past couple of weeks. I wrote it for myself but then I thought: if someone else could use it too, why not?

### How to use
The app gets loaded in your browser. It could theretically run by itself, but for better results use SimpleHTTPServer or something similar and work through localhost.

* Adding rows is self explanatory. I have tried to keep it clean, and the delete button appears when you have focus on the left(bold) part of a row(the "key", basically), next to the New Row button.
* Edit the title by double-clicking on it.
* Rows resize automatically based on their content(Sometimes when a file is loaded, they're taller - I'm not sure why. Editing the field fixes the height).
* Use the 'Show JSON' checkbox to see how it gets saved in the file.
* Use the Save/Load buttons to save and load files. If you don't add the .json suffix yourself, the app adds it automatically. The title changes to reflect the current file name.
* Obviously the app only saves files as .json. If you tried to save using some other suffix, e.g. a filename of abc.js, it'll get renamed to abc.js.json. This is intentional, but I'm open to discussion.

That's all from me. Hope you guys find this app useful. Have fun!

\*Currently looking for a better way to save/load files. Currently, the file needs to be loaded from the project root and gets saved to the *Downloads* directory(or wherever is set in the user's browser).
