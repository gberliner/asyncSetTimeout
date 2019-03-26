# asyncSetTimeout: a "setInterval" for async functions (using setTimeout)

Function asyncSetTimeout takes an async function and repeatedly attempts to resolve its promise, for up to "n" times, after a delay of "ms" milliseconds before each try.
