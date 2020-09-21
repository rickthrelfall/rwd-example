# rwd-example
Example project to illustrate some aspects of responsive behaviour and theme switching using CSS variables.

Requires TSC v3.9 or later
Requires Live Sass Compiler
Go to Settings->Extensions->Live Sass Compiler->Formats and set savePath to "./css
{
    "liveSassCompile.settings.formats": [
    

        {
            "format": "expanded",
            "extensionName": ".css",
            "savePath": "./css"
        }
    ]
    "
}

'Watch Sass'
Run tsc --watch from the terminal
Go Live

(note that CSS variables my not work in some browsers)

---

To Do:

Fixes for mobile browsers & scrolling
Left menu is just used for testing; fix this as it's currently unusable when collapsed
Animated transitions when open/close menu etc.
Clean up typescript
Complete the themes
Complete the typography retrieval & typeography style updates based on viewport/device

