Vision
===========

__PHP:__
*   Productive environment
	* Minimal load, set a % or rule when to log
	* Fire & forget
	* Disable on 1. failure
	* Let no exception come through

*   Singleton
	* Easy integration
	* Lazy
	
*   Config Provider function
	* Easy integration
	* Lazy


__Protocol:__
* AMQP
* Socket (soom™)
* FLOOM (soom™)


__Frontend:__
*   Scope analytics
	* Analyze countless Snapshots of a critical environment


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
