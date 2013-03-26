LiveLogger
===========

What is it?
-------------

Realtime logs from multiple resources aggregated in a single timeline.

Installation
-------------

1. cd live-logger/server
2. npm install
3. node app.js

visit localhost:3000 with your browser


Message Layout
-------------
```Javascript

    {
        head: {
            contentType: 'JSON' // 'JSON' or 'TEXT'
        },
        body: {
            //some stuff
        }
    }
    
    {
        head: {
            contentType: 'TEXT' // 'JSON' or 'TEXT'
        },
        body: 'foobar'
    }

```
