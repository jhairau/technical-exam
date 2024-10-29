Notes

In production for ~1 year means that we have existing customers using our contract
The scenaio is to make an assessment
An important new client is coming which probably means soon!
We don't know if the client wants any APi changes
We do know the client might increaes our consumption by 1000x
There is "some" time to make changes to the codebase before the project kicks off

1. Note issues
2. determine 5 most critical parts that need changing
3. Architecture and production run time

Don't need to fix but that is encouraged.

Thoughts on timing. BOM isn't giving us to the minute results and I've observed 0:15 and 0:10 minute intervals, which tells me they are batching and it not a realtime stream. Which to me means that we also don't need to focus on a realtime stream (not in docs)

# Caching
I would probably look at using AWS CloudFront to do caching at the edge using a TTL of X instead of using a lru-cache on a single instance or running a REDIS instance that I need to connect to. CloudFront makes 

We can use the cache-control: max-age to control how long we want individual requests to be cached for

We can use stale-while-revalidate which means that the request will immediately return the stale response, but in the background we will process the request and provide to CloudFront async

stale-if-error can also ensure that we return the stale data if our service ever goes down