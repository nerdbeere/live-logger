LiveLogger
===========

cd live-logger/server
npm install
node app.js

visit localhost:3000 with your browser





Message Layout
===========
```Javascript

    {
        head: {
            contentType: 'JSON'|'TEXT'
        },

        body: {
            //some stuff
        }

    }

```