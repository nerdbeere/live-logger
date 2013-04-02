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
Log::assert('a', 'b'); //Spawns new anonymous scope and logs into it

Log::beginScope(); //Spawns another anonymous scope

	Log::assert('myVar', $this->myVar); //logs into second anonymous scope

	Log::beginScope('myScope'); //begins a named scope

		Log::assert('myVar', $this->myVar); //logs into named scope

	Log::endScope(); //leaves current active scope

Log::endScope(); //leaves current active scope

Log::beginScope('myScope'); //enters previous named scope

	Log::assert('c', 'stuff'); //logs into named scope
	
Log::endScope(); //leaves current active scope
```


```Javascript
Scopes: [
	{
		id: 0,
		data: {
			a: 'b',
		}
	}
	{
		id: 1,
		data: {
			myVar: null,
		}
	},
	{
		id: 'myScope',
		data: {
			myVar: true,
			c: 'stuff'
		}
	}
]
```
