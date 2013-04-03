LiveLogger
===========

What is it?
-------------

Realtime logs from multiple resources aggregated in a single timeline.

Installation
-------------

Prerequesites: rabbitmq, nodejs

1. cd live-logger/server
2. npm install
3. create a config.js based on config.example.js
4. node app.js

visit localhost:3000 with your browser


Architecture
-------------

![Architecture](https://www.lucidchart.com/publicSegments/view/515bd458-3d98-4bc4-869b-6ea00a000771/image.png "Architecture")

Message Layout
-------------
```Javascript

    {
        head: {
            contentType: 'JSON' // 'JSON' or 'TEXT'
        },
        body: {
            foo: true
        }
    }
    
    {
        head: {
            contentType: 'TEXT' // 'JSON' or 'TEXT'
        },
        body: 'foobar'
    }

```
