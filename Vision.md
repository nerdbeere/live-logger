Vision
===========

Logging
-------------

```PHP
Log::beginScope();

	Log::assert('myVar', $this->myVar);

	Log::beginScope('myScope');

		Log::assert('myVar', $this->myVar);

	Log::endScope();

Log::endScope();
```


```Javascript
Scopes: [
	{
		id: 1,
		data: {
			myVar: null,
		},
		children: ['myScope']
	},
	{
		id: 'myScope',
		data: {
			myVar: true,
		},
		children: []
	}
]
```